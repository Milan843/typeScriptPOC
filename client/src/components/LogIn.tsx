import React, { useReducer, useEffect } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "../utils/yup";
import { loginAction } from "../redux/actions/auth";
import { setActiveUserAction } from "../redux/actions/user";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
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

//state type

type State = {
  email: string;
  password: string;
};

const Login = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(({ auth }: any) => auth);

  const initialValues: State = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isAuthenticated.isAuthenticated) {
      if (isAuthenticated.user.userType === "ADMIN") {
        props.history.push("/dashboard");
      } else {
        dispatch(setActiveUserAction(isAuthenticated.user));

        props.history.push(`/update/${isAuthenticated.user._id}`);
      }
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginAction(values));
    },
  });

  return (
    <form className={classes.container} onSubmit={formik.handleSubmit}>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login App" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="email"
              type="email"
              label="email"
              placeholder="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.errors.email}
              margin="normal"
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
          </div>
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            type="submit"
          >
            Login
          </Button>
        </CardActions>

        <Link to="/register">
          <Typography variant="caption">Already Register!!</Typography>
        </Link>
      </Card>
    </form>
  );
};

export default Login;
