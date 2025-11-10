import * as yup from "yup";

export const contactFormSchema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .max(50, "name must be at most 50 characters"),
  email: yup
    .string()
    .email("Invalid email")
    .required("email is required"),
  subject: yup
    .string()
    .required("subject is required")
    .max(100, "subject must be at most 100 characters"),
  message: yup
    .string()
    .required("message is required")
    .min(10, "message must be at least 10 characters")
    .max(500, "message must be at most 500 characters"),
});