import { getErrorMessage } from "../../utilities/helper";
import ApiService from "../api/index.services";

const MovieService = {
  getMoviePopular: async function (pageParam: number) {
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: `/movie/popular/?page=${pageParam}`,
    };

    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      getErrorMessage(error);
    }
  },

  getMovieTopRated: async function (pageParam: number) {
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: `/movie/top_rated/?page=${pageParam}`,
    };

    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      getErrorMessage(error);
    }
  },

  getMovieLatest: async function (pageParam: number) {
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: `/movie/latest/?page=${pageParam}`,
    };

    try {
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      getErrorMessage(error);
    }
  },

  retrieveMovie: async function (id: number) {
    const requestData = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: `/movie/${id}/`,
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
