// import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
// import Api from '../../api/index';
import { IAction } from '../../utils/interfaces';
import { GET_USERS } from './types';

export const usersListAction: () => void = () => async (dispatch: Dispatch<IAction>) => {
    try {
        // const res:AxiosResponse<any> = await Api.apiGet("userList")
        // dispatch({ type: GET_USERS, payload: res.data })
    } catch (err) {
        console.log(err);
    }
}

export const deleteUserAction: (a:string) => void = (args:string) => async (dispatch: any) => {
    try {
        // const res:AxiosResponse<any> = await Api.apiDelete("users", args)
        dispatch(usersListAction())
    } catch (err) {
        console.log(err);
    }
}