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
  password: stringRequired("Password", 1, 150),
});

export const noteValidationSchema = yup.object({
  title: stringRequired("Title", 1, 50),
  content: stringRequired("Note Content", 6, 500),
});
