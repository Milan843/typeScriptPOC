import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import Api from "../../api/index";
import axios from "../../api/axios";
import { setLocalStorage } from "../../services";
import { IAction } from "../../utils/interfaces";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "./types";
import { returnErrors } from "./error";

import Users from "../../db/users.json";

export const loginAction: (a: string) => void =
  (payload: string) => async (dispatch: Dispatch<IAction>) => {
    try {
      // const res:AxiosResponse<any> = await Api.apiGet("login", payload)
      // setLocalStorage("token", JSON.stringify({id: res.data[0].id, name: res.data[0].firstname}));
      // dispatch({ type: LOGIN_SUCCESS, payload: res.data[0]})
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

export const logoutAction: () => void =
  () => async (dispatch: Dispatch<IAction>) => {
    try {
      localStorage.removeItem("token");
      dispatch({ type: LOGOUT });
    } catch (err) {
      console.log(err);
    }
  };
