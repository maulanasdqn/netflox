import { NextPage } from "next";
import Link from "next/link";
import { Loading } from "../../components/Common/Loading";
import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/dashboard.layouts";
import { useInfiniteQuery } from "react-query";
import { MovieService } from "../../services/movie/index.services";
import { useInView } from "react-intersection-observer";
import { useRecoilValue } from "recoil";
import { isUserAuthenticated } from "../../store/auth";
import { useRouter } from "next/router";

interface MovieDto {
  id: number;
  title: string;
  backdrop_path?: string;
  poster_path?: string;
}

export const MovieList: FC<MovieDto> = (x: MovieDto): ReactElement => {
  const [isDetail, setDetail] = useState(false);

  return (
    <>
      <section
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
  const router = useRouter();
  const isAuth = useRecoilValue(isUserAuthenticated);
  const { inView, ref } = useInView();
  const { data, status, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(
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
    if (inView) {
      fetchNextPage();
    }

    if (!isAuth) {
      router.push("/");
    }
  }, [fetchNextPage, inView, isAuth, router]);

  return (
    <DashboardLayout>
      {status === "loading" && <Loading />}
      <>
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.results.map((res: MovieDto, i: number) => (
              <MovieList
                key={i}
                id={res.id}
                title={res.title}
                poster_path={res.poster_path}
              />
            ))}
          </Fragment>
        ))}
        <div className="text-white text-2xl font-semibold">
          {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
        </div>
        <span ref={ref} />
      </>
    </DashboardLayout>
  );
};

export default MovieDashboard;
