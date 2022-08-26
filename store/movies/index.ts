import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { MovieService } from "../../services/movie/index.services";
import { getErrorMessage } from "../../utilities/helper";

const { persistAtom } = recoilPersist();

export const fetchMovieLocal = atom({
  key: "movie-local",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const fetchMovieLocalByGenre = atom({
  key: "movie-local-genre",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const fetchMovieLocalById = atom({
  key: "movie-local-id",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const setMovieById = atom({
  key: "set-movie-by-id",
  default: [],
});

export const movieId = atom({
  key: "movie-id",
  default: 0,
});

export const fetchMovieById = selector({
  key: "fetchMovieById",
  get:
    ({ get }) =>
    async () => {
      const paramId = get(movieId);
      try {
        const res = await MovieService.retrieveMovie(paramId);
        return res;
      } catch (err) {
        getErrorMessage(err);
      }
    },
});
