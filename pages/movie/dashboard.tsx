import { NextPage } from "next";
import Link from "next/link";
import { Loading } from "../../components/Common/Loading";
import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/dashboard.layouts";
import { useInfiniteQuery } from "react-query";
import { MovieService } from "../../services/movie/index.services";
import { useInView } from "react-intersection-observer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserAuthenticated } from "../../store/auth";
import { useRouter } from "next/router";
import { fetchMovieLocal } from "../../store/movies";
import {
  MovieDto,
  MovieResDto,
} from "../../utilities/interface/movie.interface";
import { loadingState } from "../../store/common";

export const MovieList: FC<MovieDto> = (x: MovieDto): ReactElement => {
  const setLoading = useSetRecoilState(loadingState);
  const [isDetail, setDetail] = useState(false);

  return (
    <>
      <section
        onClick={() => setLoading(true)}
        onMouseOver={() => setDetail(!isDetail)}
        className="bg-gray-700 hover:scale-125 shadow-md shadow-gray-900 max-w-[200px] rounded-lg flex-col flex h-[300px] min-h-[300px] max-h-[300px]"
      >
        <Link href={`/movie/${x.id}`}>
          <img
            className="object-fill w-full h-full"
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "" + x.poster_path}
            alt={x.title}
          />
        </Link>
      </section>
    </>
  );
};

const MovieDashboard: NextPage = (): ReactElement => {
  const [mounted, setMounted] = useState(false);
  const isLoading = useRecoilValue(loadingState);
  const router = useRouter();
  const isAuth = useRecoilValue(isUserAuthenticated);
  const getMovieData = useRecoilValue(fetchMovieLocal);
  const setMovieData = useSetRecoilState(fetchMovieLocal);

  const { inView, ref } = useInView();
  const { data, status, fetchNextPage } = useInfiniteQuery(
    ["projects"],

    async ({ pageParam = 1 }) => {
      const res = await MovieService.getMoviePopular(pageParam);
      return res;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.page ?? undefined,
      getNextPageParam: (lastPage) => lastPage.page + 1 ?? undefined,
    }
  );

  useEffect(() => {
    setMounted(true);

    if (inView) {
      fetchNextPage();
    }

    if (data) {
      setMovieData(data);
    }

    if (!isAuth) {
      setMovieData([]);
      router.push("/");
    }

    return () => {
      setMovieData([]);
    };
  }, [data, fetchNextPage, inView, isAuth, router, setMovieData]);

  if (!mounted) return <></>;

  return (
    <DashboardLayout>
      <>
        {(status === "loading" || isLoading) && <Loading />}
        {getMovieData?.pages?.map((page: MovieResDto, i: number) => (
          <Fragment key={i}>
            {page.results.map((res: MovieDto, i: number) => (
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
          </Fragment>
        ))}
        <span ref={ref} />
      </>
    </DashboardLayout>
  );
};

export default MovieDashboard;
