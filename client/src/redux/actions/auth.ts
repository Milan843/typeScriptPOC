import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import Api from "../../api/index";
import axios from "../../api/axios";
import { setLocalStorage } from "../../services";
import { IAction, IUser, IConfigHeaders } from "../../utils/interfaces";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOGIN_FAIL,
} from "./types";
import { returnErrors } from "./error";

import Users from "../../db/users.json";

export const loginAction =
  (payload: Object) => (dispatch: Dispatch<IAction>) => {
    try {
      const data = JSON.stringify({ ...payload });
      console.log(payload, "payloads");
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
export const login =
  ({ email, password }: IUser) =>
  (dispatch: Dispatch<IAction>) => {
    // Headers

    // Request body
    const data = JSON.stringify({ email, password });

    axios({
      method: "post",
      url: "/login",
      data,
      headers: {
        "Content-type": "application/json",
      },

      // headers: tokenConfig(getState)
    })
      // .post('/api/auth/login', body, config)
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
        // .post('/api/auth/register', body, config)
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
