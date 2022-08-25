import { NextPage } from "next";
import { useRouter } from "next/router";
import { HomeLayout } from "../../layouts/home.layouts";
import { ReactElement, FC, Fragment, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { fetchMovieByGenre, fetchMovieById } from "../../store/movies";
import { Banner } from "../../components/Common/Banner";
import { Navbar } from "../../components/Navbar";
import { MovieList } from "../movie/dashboard";
import { Loading } from "../../components/Common/Loading";
import { loadingState } from "../../store/common";
import { isUserAuthenticated } from "../../store/auth";

interface GenresDto {
  id: number;
  name: string;
}

interface MovieDto {
  id: number;
  title: string;
  backdrop_path?: string;
  poster_path?: string;
}

const MovieDetailContent: FC = (): ReactElement => {
  const router = useRouter();
  const { id } = router.query;
  const paramId: number = parseInt(`${id}`);
  const movieData = useRecoilValue(fetchMovieById(paramId));
  const genres = movieData?.map((x) => {
    return x.genres.map((y: GenresDto) => y.id).join("|");
  });

  const data = useRecoilValue(fetchMovieByGenre(genres?.toString()));

  return (
    <section className="flex flex-col h-full overflow-x-hidden w-full gap-y-6">
      {movieData?.map((x, i) => (
        <Fragment key={i}>
          <Banner
            padding="p-0"
            key={i}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL + x.backdrop_path}`}
          />
          <div className="flex flex-col gap-y-2 text-white">
            <span className=" text-3xl">{x.title}</span>
            <span className="text-md">Release Date : {x.release_date}</span>
            <span className=" text-2xl">
              Genres : {x.genres.map((x: GenresDto) => x.name).join(", ")}
            </span>
            <div className="flex flex-col gap-y-1">
              <p className="text-lg">Overview</p>
              <p className="text-md">{x.overview}</p>
            </div>
          </div>
        </Fragment>
      ))}
      <h1 className="text-white text-2xl">Smiliar movie</h1>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 1xl:grid-cols-7 2xl:grid-cols-8 overflow-x-auto w-auto h-full">
        {data.map((x: MovieDto, i: number) => (
          <MovieList
            key={i}
            id={x.id}
            title={x.title}
            poster_path={x.poster_path}
          ></MovieList>
        ))}
      </div>
    </section>
  );
};

const MovieDetail: NextPage = (): ReactElement => {
  const router = useRouter();
  const isAuth = useRecoilValue(isUserAuthenticated);
  const loading = useRecoilValue(loadingState);
  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  });
  return (
    <>
      {loading && <Loading />}
      <Navbar />
      <HomeLayout className="w-full" height="h-full">
        <MovieDetailContent />
      </HomeLayout>
    </>
  );
};

export default MovieDetail;
