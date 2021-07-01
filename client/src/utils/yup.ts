import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const registerSchema = loginSchema.shape({
  firstName: yup.string().required("FirstName is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  address: yup.string().required("Address is required"),
  mobileNumber: yup.string().required("Phone Number is required"),
  userImage: yup.mixed().required("User Image is required"),
});
