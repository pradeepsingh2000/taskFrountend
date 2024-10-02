import * as Yup from "yup";

export const TaskSchema = Yup.object({
  title: Yup.string().required("Please enter title"),
  description: Yup.string().required("Please enter description")
});
