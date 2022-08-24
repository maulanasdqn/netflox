import { getErrorMessage } from "../../utilities/helper";
import ApiService from "../api/index.services";

const MovieService = {
  getMovie: async function () {
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: "/discover/movie/",
    };

    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      getErrorMessage(error);
    }
  },
};
export { MovieService };
