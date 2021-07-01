import React, { Dispatch, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Theme, IconButton } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  usersListAction,
  //   setActiveUserAction,
} from "../redux/actions/user";
import { Delete, Edit, Visibility } from "@material-ui/icons";
// import Alert from "../components/common/Alert";
import { getFromLocalStorage } from "../services";
import { USERS_LOADING } from "../redux/actions/types";
import { getUsers } from "../redux/actions/user";
import { IUserListDashBoard } from "../utils/interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650,
  },
  dashboard_container: {
    padding: theme.spacing(5),
  },
}));

const Dashboard = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<any>>();
  //   const [activeId, setActiveId] = useState(-1);
  //   const [showAlert, setShowAlert] = useState(false);

  //   const loggedInUser = JSON.parse(getFromLocalStorage("token") || "");
  let allUsers = [];
  allUsers = useSelector(({ users }: any) => users);
  console.log(allUsers);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  //   useEffect(() => {
  //     dispatch(usersListAction());
  //     // eslint-disable-next-line
  //   }, []);

  //   const handleDelete = (id: number) => {
  //     setActiveId(id);
  //     toggleAlert();
  //   };

  //   const handleView = (id: number, path: string) => {
  //     let user = users.find((item: any) => item.id === id);
  //     // dispatch(setActiveUserAction(user));
  //     props.history.push(`/${path}/${id}`);
  //   };

  //   const toggleAlert = () => {
  //     setShowAlert((prev: Boolean) => !prev);
  //   };

  //   const onConfirm = () => {
  //     dispatch(deleteUserAction(`/${activeId}`));
  //     toggleAlert();
  //   };

  return (
    <>
      <div>hello</div>
      {/* <Alert
        open={showAlert}
        message={"Are you sure you want to delete this user ?"}
        onConfirm={onConfirm}
        onCancel={toggleAlert}
        showActions={true}
      /> */}
      <Box className={classes.dashboard_container}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {users?.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.firstname}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">
                    {loggedInUser.role === "admin" && (
                      <IconButton
                        color="primary"
                        size="small"
                        aria-label="upload picture"
                        // onClick={() => handleView(row.id, "edit")}
                      >
                        <Edit />
                      </IconButton>
                    )}
                    <IconButton
                      color="primary"
                      size="small"
                      aria-label="upload picture"
                      //   onClick={() => handleView(row.id, "view")}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      size="small"
                      aria-label="upload picture"
                      //   onClick={() => handleDelete(row.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Dashboard;
