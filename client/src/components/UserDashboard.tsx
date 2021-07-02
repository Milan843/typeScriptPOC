import React, { useState, useEffect, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import { userSchema } from "../utils/yup";
import { editUserAction, logoutAction } from "../redux/actions/auth";

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
  description: string;
  userImage: string;
}

const UserDashboard: React.FC = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<any>>();
  const [userImage, setUserImage] = useState("");
  const [isEdit, setIsEdit] = useState<any>(false);
  const selectedUser = useSelector(({ users }: any) => users.activeUser);

  useEffect(() => {
    if (props.location.pathname.includes("update")) {
      setIsEdit(true);
    }
    if (!selectedUser) {
      const id = props.match.params.userId;
    }
    if (selectedUser?.userImage) {
      setUserImage(selectedUser.userImage);
    }
  }, [selectedUser]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function (dataa: any) {
      let dataURL = dataa.target.result;
      dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
      setUserImage(dataURL);
    };

    reader.readAsDataURL(file);
  };

  const initialValues = {
    _id: selectedUser?._id || "",
    firstName: selectedUser?.firstName || "",
    email: selectedUser?.email || "",
    mobileNumber: selectedUser?.mobileNumber || "",
    address: selectedUser?.address || "",
    description: selectedUser?.description || "",
  };
  const formik: any = useFormik<any>({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: (values: Values) => {
      let payload = { ...values, userImage: userImage };
      dispatch(editUserAction(payload));
    },
  });
  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(logoutAction());
            props.history.push("/");
          }}
        >
          LOGOUT
        </Button>
      </div>
      <form className={classes.container} onSubmit={formik.handleSubmit}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="USER DETAILS" />
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
              />
            </div>
            {isEdit && (
              <input
                id="userImage"
                name="userImage"
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            )}
            {userImage && <img width="100%" src={userImage} alt="" />}
          </CardContent>

          {isEdit ? (
            <CardActions>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                className={classes.registerBtn}
                type="submit"
              >
                Update
              </Button>
            </CardActions>
          ) : (
            <div></div>
            //   <CardActions>
            //     <Button
            //       variant="contained"
            //       size="large"
            //       color="secondary"
            //       className={classes.registerBtn}
            //       onClick={() => props.history.push(`/update/${formik.values._id}`)}
            //     >
            //       Want to update
            //     </Button>
            //   </CardActions>
          )}
        </Card>
      </form>
    </>
  );
  //   }}
  // </Formik>
  //   );
};

export default UserDashboard;
