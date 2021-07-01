import { GET_ERRORS, CLEAR_ERRORS } from './types';
import { IMsg,actionTypes } from '../../utils/interfaces';

// RETURN ERRORS
export const returnErrors = (msg: IMsg, status: number, id: any = null):{type:actionTypes,payload:any} => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

// CLEAR ERRORS
export const clearErrors = ():{type:actionTypes} => {
  return {
    type: CLEAR_ERRORS
  };
};
