import * as yup from "yup";
const stringRequired = (fieldName: string, min: number, max: number) => {
  return yup
    .string()
    .min(min, `${fieldName} Minimum of ${min} characters`)
    .max(max, `${fieldName} Max of ${max} characters`)
    .trim()
    .required(fieldName + " field is required.");
};

export const authValidationSchema = yup.object({
  email: yup.string().email("Must be a valid Email").trim().required("Email is required."),
  password: stringRequired("Password", 6, 150),
});

export const postValidationSchema = yup.object({
  noteTitle: stringRequired("Title", 6, 50),
  noteContent: stringRequired("Note Content", 6, 500),
});
