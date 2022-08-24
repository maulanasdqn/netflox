import { NextPage } from "next";
import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/dashboard.layouts";
import { useInfiniteQuery } from "react-query";
import { MovieService } from "../../services/movie/index.services";
import { useInView } from "react-intersection-observer";

interface MovieDto {
  id: number;
  title: string;
  backdrop_path?: string;
  poster_path?: string;
}

const MovieList: FC<MovieDto> = (x: MovieDto): ReactElement => {
  const [isDetail, setDetail] = useState(false);

  return (
    <>
      <section
        onMouseOver={() => setDetail(!isDetail)}
        className="bg-gray-700 hover:scale-125 shadow-md shadow-gray-900 max-w-[200px] rounded-lg flex-col flex h-[300px] min-h-[300px] max-h-[300px]"
      >
        <img
          className="object-fill w-full h-full"
          src={"https://image.tmdb.org/t/p/original/" + x.poster_path}
          alt={x.title}
        />
      </section>
    </>
  );
};

const MovieDashboard: NextPage = (): ReactElement => {
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
  }, [fetchNextPage, inView]);

  if (status === "loading") return <span>Loading...</span>;
  if (status === "error") return <span>!Error</span>;

  return (
    <DashboardLayout>
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
        <div>
          {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
        </div>
        <span ref={ref} />
      </>
    </DashboardLayout>
  );
};

export default MovieDashboard;
