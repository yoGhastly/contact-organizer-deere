import * as yup from "yup";

export const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  company: yup.string().required("Company is required"),
  position: yup.string().required("Position is required"),
  notes: yup.string(),
  birthday: yup.date().required("Birthday is required"),
});
