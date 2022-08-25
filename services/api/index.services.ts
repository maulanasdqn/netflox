import axios from "axios";

const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

const ApiService = {
  init(baseURL: string | undefined) {
    axios.defaults.baseURL = baseURL;
  },

  setHeader() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  customRequest(data: object) {
    return axios(data);
  },
};

export default ApiService;
