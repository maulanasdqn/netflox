import { ReactNode } from "react";

export interface MovieDto {
  overview: ReactNode;
  release_date: ReactNode;
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  genres?: Array<GenresDto>;
}

export interface MovieResDto {
  page: number;
  results: Array<MovieDto>;
}

export interface GenresDto {
  id: number;
  name: string;
}

export interface Payload {
  pageParam: number;
  genres: string | undefined;
}
