import { atom, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
import { MovieService } from "../../services/movie/index.services";
import { getErrorMessage } from "../../utilities/helper";

const { persistAtom } = recoilPersist();

export const fetchMovieLocal = atom({
  key: "movie-local",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const fetchMovieById = selectorFamily({
  key: "fetchMovieById",
  get: (id: number) => async () => {
    try {
      const data = [];
      const res = await MovieService.retrieveMovie(id);
      data.push(res);
      return data;
    } catch (err) {
      getErrorMessage(err);
    }
  },
});

export const fetchMovieByGenre = selectorFamily({
  key: "fetchMovieByGenre",
  get: (genre: string | undefined) => async () => {
    try {
      const res = await MovieService.retrieveMovieByGenres(genre);
      return res.results;
    } catch (err) {
      getErrorMessage(err);
    }
  },
});
