// import { AxiosResponse } from 'axios';
import { Dispatch } from "redux";
// import Api from '../../api/index';
import { IAction } from "../../utils/interfaces";
import { GET_USERS, SET_ACTIVE_USER, DELETE_USER } from "./types";
import { tokenConfig } from "./auth";
import axios from "../../api/axios";
import { returnErrors } from "./error";

export const usersListAction: () => void =
  () => async (dispatch: Dispatch<IAction>) => {
    try {
      // const res:AxiosResponse<any> = await Api.apiGet("userList")
      // dispatch({ type: GET_USERS, payload: res.data })
    } catch (err) {
      console.log(err);
    }
  };
export const getUsers =
  () => (dispatch: Dispatch<IAction>, getState: Function) => {
    axios({
      method: "get",
      url: "/getUserList",
      ...tokenConfig(getState),
    })
      // .get('/api/items')
      .then((res) =>
        dispatch({
          type: GET_USERS,
          payload: res,
        })
      )
      .catch((err) =>
        dispatch(returnErrors({ msg: err.data?.message }, err.status))
      );
  };

export const setActiveUserAction: (a: any) => void =
  (payload: any) => async (dispatch: any) => {
    dispatch({ type: SET_ACTIVE_USER, payload });
  };

export const deleteUserAction =
  (_id: string) => (dispatch: Dispatch<IAction>, getState: Function) => {
    try {
      axios({
        method: "get",
        url: "/deleteUser",
        params: { _id },
        ...tokenConfig(getState),
      })
        // .delete(`/api/items/${id}`, tokenConfig(getState))
        .then((res) =>
          dispatch({
            type: DELETE_USER,
            payload: _id,
          })
        )
        .catch((err) =>
          dispatch(returnErrors({ msg: err.data?.message }, err.status))
        );
      // const res:AxiosResponse<any> = await Api.apiDelete("users", args)
      //   dispatch(usersListAction());
    } catch (err) {
      console.log(err);
    }
  };

// export const getUserById =
//   (_id: string) => (dispatch: Dispatch<IAction>, getState: Function) => {
//     axios({
//       method: "get",
//       url: "/getUser",
//       params: {
//         _id: _id || "",
//       },
//       ...tokenConfig(getState),
//     })
//       // .delete(`/api/items/${id}`, tokenConfig(getState))
//       .then((res: any) => {
//         dispatch({
//           type: EDIT_USER,
//           payload: res?.user,
//         });

//         dispatch(returnErrors({ msg: "User loaded successfully" }, 200));
//       })
//       .catch((err) =>
//         dispatch(returnErrors({ msg: err.data?.message }, err.status))
//       );
//   };
