interface MovieDto {
  id: number;
  title: string;
  backdrop_path?: string;
  poster_path?: string;
}

export const StorageService = {
  setMovie(data: Array<MovieDto>) {
    localStorage.setItem("Movie", JSON.stringify(data));
  },

  getMovie() {
    localStorage.getItem("Movie");
  },

  getAuth() {
    localStorage.getItem("auth");
  },

  setAuth(auth: boolean) {
    localStorage.setItem("auth", JSON.stringify(auth));
  },
};
