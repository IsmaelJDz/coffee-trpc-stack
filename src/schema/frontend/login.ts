import * as Yup from "yup";
// import { format, isAfter, isEqual } from "date-fns";

const REQUIRED_FIELD = "This field is required";

export const loginSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email().required(REQUIRED_FIELD),
    password: Yup.string().required(REQUIRED_FIELD)
  });
};
