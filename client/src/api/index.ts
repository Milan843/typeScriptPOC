import axios from "./config";
import apiKeys from "./keys";

const getUrlByKey = (key: string) => {
  return apiKeys[key];
};

class API {
  // eslint-disable-next-line lines-around-comment
  /**
   * auth2 login api
   * @param {string} url String
   * @param {object} payload Object
   * @param {object} action Object e.g {type: 'AUTH', dispatch: function(){} }
   * @returns {Promise<void>} void
   */

  static apiGet = async (key: string, args?: any) => {
    if (typeof args === "string") {
      return axios.get(getUrlByKey(key) + args, {
        withCredentials: false,
      });
    }
    return axios.get(getUrlByKey(key), {
      data: args,
      withCredentials: false,
    });
  };

  static apiGetByKey = async (key: string, args: any, query: string) => {
    if (typeof args === "string") {
      return axios.get(getUrlByKey(key) + args, {
        withCredentials: false,
      });
    }
    return axios.get(`${getUrlByKey(key)}/query?${query}`, {
      data: args,
      withCredentials: false,
    });
  };

  static apiPost = async (key: string, args: any) => {
    return axios.post(getUrlByKey(key), args);
  };

  static apiPostUrl = async (key: string, dynamicUrl: string, args: any) => {
    return axios.post(getUrlByKey(key) + dynamicUrl, args);
  };

  static apiDelete = async (key: string, args: any) => {
    return axios.delete(getUrlByKey(key) + args);
  };
}

export default API;
