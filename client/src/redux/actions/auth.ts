import { Dispatch } from "redux";
import axios from "../../api/axios";
import { IAction, IUser, IConfigHeaders } from "../../utils/interfaces";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOGIN_FAIL,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";
import { returnErrors } from "./error";

export const loginAction =
  (payload: Object) => (dispatch: Dispatch<IAction>) => {
    try {
      const data = JSON.stringify({ ...payload });
      axios({
        method: "post",
        url: "/login",
        data,
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) =>
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res,
          })
        )
        .catch((err) => {
          dispatch(
            returnErrors({ msg: err.data?.message }, err.status, "LOGIN_FAIL")
          );
          dispatch({
            type: LOGIN_FAIL,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

export const registerAction =
  (payload: object, cb: Function) => (dispatch: Dispatch<IAction>) => {
    try {
      const data = JSON.stringify({ ...payload });
      console.log(data, "payloadd");

      axios({
        method: "post",
        url: "/signup",
        data,
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(
          (res) =>
            dispatch({
              type: REGISTER_SUCCESS,
              payload: res,
            }),
          cb()
        )
        .catch((err) => {
          dispatch(
            returnErrors(
              { msg: err.data?.message },
              err.status,
              "REGISTER_FAIL"
            )
          );
          dispatch({
            type: REGISTER_FAIL,
          });
        });

      // await Api.apiPost("signUp", payload)
      // cb();
    } catch (err) {
      console.log(err);
    }
  };

export const tokenConfig = (getState: Function) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config: IConfigHeaders = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }

  return config;
};

export const logoutAction: () => void =
  () => async (dispatch: Dispatch<IAction>) => {
    try {
      localStorage.removeItem("token");
      dispatch({ type: LOGOUT });
    } catch (err) {
      console.log(err);
    }
  };

export const getUserById =
  (_id?: string) => (dispatch: Dispatch<IAction>, getState: Function) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios({
      method: "get",
      url: "/getUser",
      params: {
        _id: _id || "",
      },
      ...tokenConfig(getState),
    })
      .then((res: any) => {
        dispatch({
          type: USER_LOADED,
          payload: res.user,
        });

        dispatch(returnErrors({ msg: "User loaded successfully" }, 200));
      })
      .catch((err) => {
        dispatch(returnErrors({ msg: err.data?.message }, err.status));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };

export const editUserAction =
  ({
    firstName,
    email,
    lastName,
    address,
    mobileNumber,
    userImage,
    description,
    _id,
  }: any) =>
  (dispatch: Dispatch<IAction>, getState: Function) => {
    // Headers

    // Request body
    const data = JSON.stringify({
      firstName,
      email,
      lastName,
      address,
      mobileNumber,
      userImage,
      description,
      userId: _id,
    });

    axios({
      method: "post",
      url: "/editUser",
      data,
      ...tokenConfig(getState),
    })
      .then((res: any) => {
        dispatch({
          type: USER_LOADED,
          payload: res.user,
        });

        dispatch(returnErrors({ msg: "User edited successfully" }, 200));
      })
      .catch((err) => {
        dispatch(
          returnErrors({ msg: err.data?.message }, err.status, "EDIT_FAIL")
        );
      });
  };
