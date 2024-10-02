import React, { useEffect, useState } from "react";
import {
  addTask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
} from "../services/api";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Modal,
  Pagination,
  Switch,
  Typography,
} from "@mui/material";
import response from "../Utils/response";
import Loader from "../component/loader";
import { Add, Delete } from "@mui/icons-material";

export default function Task() {
  const [open, setOpen] = React.useState(false);
  const [openEdit,setOpenEdit] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [editId,setEditId] = useState();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getAll = async () => {
    const data = await getAllTask(page);
    setData(data.data.data);
    setTotal(data.data.totalDoc);
    setLoading(false);
  };

  const taskDelete = async (id) => {
    const data = await deleteTask(id);
    if (data.success) {
      response.success(data.message);
      getAll();
    } else {
      response.error("Try Again!");
    }
  };

  const taskUpdate = async (id, data) => {
    const updateData = await updateTask(id, { completed: !data });
    if (updateData.success) {
      response.success(data.message);
      getAll();
    } else {
      response.error("Try Again!");
    }
  };

  const openUpdateHandler = (id,title,description)=> {
    setTitle(title)
    setDescription(description)
    setEditId(id)
    editOpen()
  }
  const updateFullTask = async () => {
    if(!title && !description) {
        response.error("Please fill the full form!!")
        return
    }
    const updateData = await updateTask(editId, { title,description });
    if (updateData.success) {
      response.success(data.message);
      setTitle("");
      setDescription("");
      handleEditClose();
      getAll();
    } else {
      response.error("Try Again!");
    }
  };

  useEffect(() => {
    getAll(page);
  }, [page]);

  const handleDescription = (data) => {
    setDescription(data);
  };

  const handleTitle = (data) => {
    setTitle(data);
  };

  const handleSubmit = async () => {
    if(!title && !description) {
        response.error("Please fill the full form!!")
        return
    }
    const data = await addTask({ title, description });
    if (data.success) {
      response.success(data.message);
      setTitle("");
      setDescription("");
      getAll();
      handleClose();
    } else {
      response.error("Something went wrong!!");
    }
  };

 

  const handlePageChange = (event,newPage) => {
    setPage(newPage)

  };
  return (
    <div>
      <nav className="navbar bg-primary">
        <div className="container-fluid">
          <p className="navbar-brand">Tasks</p>
          <div className="d-flex" role="search">
            <button
              className="btn btn-success"
              type="submit"
              onClick={(e) => {
                setOpen((prev) => !prev);
              }}
            >
              <Add/>
              Add
            </button>
          </div>
        </div>
      </nav>
      {loading ? (
        <>
          <div className="d-flex justify-content-center">
            <Loader />
          </div>
        </>
      ) : (
        <>
          <table className="table container">
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col">Description</th>
                <th scope="col">Completed</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr>
                  <td>{d.title}</td>
                  <td>{d.description}</td>
                  <td>
                    <Switch
                      checked={d.completed}
                      onChange={(e) => {
                        taskUpdate(d._id, d.completed);
                      }}
                    />
                  </td>
                  <td className="p-2">
                    <span>
                    <Button
                         sx={{ marginRight: 2 }}
                       variant="contained"
                       color="error"
                       endIcon={<Delete />}
                      onClick={(e) => {
                        taskDelete(d._id);
                      }}
                    >
                      Delete
                    </Button>
                    </span>
                   
                    <Button 
                    className="ml-4"
                      variant="contained"
                      endIcon={<EditIcon />}
                      onClick={(e) => {
                        openUpdateHandler(d._id,d.title,d.description);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

<Pagination count={Math.ceil(total/limit)} color="primary"  page={page}  onChange={handlePageChange} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <h3>Add Task</h3>
          <input
            class="form-control"
            type="text"
            value={title}
            placeholder="enter title"
            onChange={(e) => handleTitle(e.target.value)}
          />

          <input
            class="form-control"
            type="text"
            value={description}
            placeholder="enter description"
            onChange={(e) => handleDescription(e.target.value)}
          />
          <button class="btn btn-primary mt-2" onClick={(e) => handleSubmit()}>
            Submit
          </button>
        </Box>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Edit Task</h3>
          <input
            class="form-control"
            type="text"
            value={title}
            placeholder="enter title"
            onChange={(e) => handleTitle(e.target.value)}
          />

          <input
            class="form-control"
            type="text"
            value={description}
            placeholder="enter description"
            onChange={(e) => handleDescription(e.target.value)}
          />
          <button class="btn btn-primary mt-2" onClick={(e) => updateFullTask()}>
            Update
          </button>
        </Box>
      </Modal>

    </div>
  );
}
