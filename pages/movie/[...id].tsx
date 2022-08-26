import { randomInt } from "crypto";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Banner } from "../../components/Common/Banner";
import { Loading } from "../../components/Common/Loading";
import { Navbar } from "../../components/Navbar";
import { DashboardLayout } from "../../layouts/dashboard.layouts";
import { HomeLayout } from "../../layouts/home.layouts";
import { MovieService } from "../../services/movie/index.services";
import { isUserAuthenticated } from "../../store/auth";
import { loadImg, toInt } from "../../utilities/helper";
import {
  GenresDto,
  MovieDto,
  MovieResDto,
  Payload,
} from "../../utilities/interface/movie.interface";
import { MovieList } from "./dashboard";

interface MovieSsr {
  movieData: MovieDto;
  movieByGenres: MovieResDto;
}

const MovieDetail: NextPage<MovieSsr> = (props: MovieSsr): ReactElement => {
  const isAuth = useRecoilValue(isUserAuthenticated);
  const router = useRouter();
  const { movieData, movieByGenres } = props;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (!isAuth) {
      router.push("/");
    }
  }, [isAuth, mounted, router]);

  if (!mounted)
    return (
      <HomeLayout center>
        <Loading />
      </HomeLayout>
    );
  return (
    <>
      <Navbar />
      <HomeLayout
        className="flex items-start justify-start overflow-x-hidden"
        height="h-full p-0"
      >
        <section className="w-auto overflow-x-hidden h-full flex-col flex">
          <Banner src={loadImg(movieData.poster_path)}></Banner>
          <div className="flex flex-col gap-y-2">
            <span className="text-white md:text-3xl text-xl">
              {movieData.title}
            </span>
            <span className="text-white md:text-xl">
              {movieData.release_date}
            </span>
            <span className="text-white md:text-2xl text-xsl">
              Genres : {movieData.genres?.map((x) => x.name).join(", ")}
            </span>
            <p className="text-white">{movieData.overview}</p>
            <span className="text-white text-2xl mt-6">
              Smiliar Movies by Genre
            </span>
          </div>
          <DashboardLayout no>
            {movieByGenres.results.map((res: MovieDto, i: number) => (
              <MovieList
                key={i}
                id={res.id}
                title={res.title}
                poster_path={res.poster_path}
                overview={undefined}
                release_date={undefined}
                backdrop_path={""}
              />
            ))}
          </DashboardLayout>
        </section>
      </HomeLayout>
    </>
  );
};

export async function getServerSideProps(ctx: {
  params: { id: string | string[] | undefined };
}) {
  const paramId = toInt(ctx.params.id);
  const movieData: MovieDto = await MovieService.retrieveMovie(paramId);
  const { genres } = movieData;
  const payload: Payload = {
    pageParam: randomInt(2, 10),
    genres: genres?.map((x: GenresDto) => x.id).join("|"),
  };
  const movieByGenres = await MovieService.retrieveMovieByGenres(payload);
  return { props: { movieData, movieByGenres } };
}

export default MovieDetail;
