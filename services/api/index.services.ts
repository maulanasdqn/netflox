import axios from "axios";

const token = process.env.bearerToken;

const ApiService = {
  init(baseURL: string) {
    axios.defaults.baseURL = baseURL;
  },

  setHeader() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  get(resource: string) {
    return axios.get(resource);
  },

  post(resource: string, data: object) {
    return axios.post(resource, data);
  },

  put(resource: string, data: object) {
    return axios.put(resource, data);
  },

  delete(resource: string) {
    return axios.delete(resource);
  },

  customRequest(data: object) {
    return axios(data);
  },
};

export default ApiService;
