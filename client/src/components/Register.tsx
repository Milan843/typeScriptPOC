import React, { useState, useEffect, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import { registerSchema } from "../utils/yup";
import { registerAction } from "../redux/actions/auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    registerBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      background: "#212121",
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(10),
    },
  })
);

interface Values {
  firstName: string;
  email: string;
  mobileNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
  description: string;
  userImage: string;
}

const Register: React.FC = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<any>>();
  const [userImage, setUserImage] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    // const isValidFile = isUserImage(file);
    // if (!isValidFile) {
    //   setFormError({
    //     ...formError,
    //     userImage: { isValid: false, errorMsg: "Enter valid image" },
    //     isFormValid: false,
    //   });

    //   return;
    // }
    // setFormError({
    //   ...formError,
    //   userImage: { isValid: true, errorMsg: "Enter valid image" },
    //   isFormValid: true,
    // });

    const reader = new FileReader();

    reader.onload = function (dataa: any) {
      let dataURL = dataa.target.result;
      dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
      setUserImage(dataURL);

      // setData({
      // 	...data,
      // 	userImage: dataURL,
      // });
    };

    reader.readAsDataURL(file);
  };

  const initialValues = {
    firstName: "",
    email: "",
    mobileNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    description: "",
  };
  const formik: any = useFormik<any>({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (values: Values) => {
      let payload = { ...values, userImage: userImage };
      dispatch(
        registerAction(payload, () => {
          props.history.push("/");
        })
      );
      console.log(payload, "submit");
    },
  });
  //   return (
  //     <Formik
  //       key="registerForm"
  //       initialValues={initialValues}
  //       //   validationSchema={registerSchema}
  //       validator={() => ({})}
  //       onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
  //         setTimeout(() => {
  //           alert(JSON.stringify(values, null, 2));
  //           setSubmitting(false);
  //         }, 500);
  //       }}
  //     >
  //       {(props) => {
  console.log(formik);
  return (
    <form className={classes.container} onSubmit={formik.handleSubmit}>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="REGISTER" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="firstName"
              type="text"
              label="firstName"
              placeholder="firstName"
              margin="normal"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              helperText={formik.errors.firstName}
            />
            <TextField
              fullWidth
              id="email"
              type="email"
              label="email"
              placeholder="email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.errors.email}
            />
            <TextField
              fullWidth
              id="mobileNumber"
              type="text"
              label="Mobile Number"
              placeholder="Mobile Number"
              margin="normal"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              helperText={formik.errors.mobileNumber}
            />
            <TextField
              fullWidth
              id="address"
              type="text"
              label="Address"
              placeholder="Address"
              margin="normal"
              value={formik.values.address}
              onChange={formik.handleChange}
              helperText={formik.errors.address}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={formik.errors.password}
            />
            <TextField
              fullWidth
              id="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder="Confirm password"
              margin="normal"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              helperText={formik.errors.confirmPassword}
            />
            <TextField
              fullWidth
              id="description"
              type="text"
              label="Description"
              placeholder="Description"
              margin="normal"
              value={formik.values.description}
              onChange={formik.handleChange}
              helperText={formik.errors.description}
            />
          </div>
          <input
            id="userImage"
            name="userImage"
            type="file"
            accept="image/*"
            // onChange={(event: any) => {
            //   formik.setFieldValue("image", event.currentTarget.files[0]);
            // }}
            onChange={handleImage}
          />
          {userImage && <img width="100%" src={userImage} alt="" />}
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.registerBtn}
            type="submit"
          >
            REGISTER
          </Button>
        </CardActions>
        <Link to="/">
          <Typography variant="caption">LOGIN PAGE</Typography>
        </Link>
      </Card>
    </form>
  );
  //   }}
  // </Formik>
  //   );
};

export default Register;
