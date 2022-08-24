/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { FC, ReactElement } from "react";
import { DashboardLayout } from "../../layouts/dashboard.layouts";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { MovieService } from "../../services/movie/index.services";

interface MovieDto {
  id: number;
  title: string;
}

const queryClient = new QueryClient();

const MovieList: FC<MovieDto> = (x: MovieDto): ReactElement => {
  return (
    <>
      <section className="bg-gray-700 shadow-md shadow-gray-500 max-w-[200px] rounded-lg flex-col flex h-[300px] min-h-[300px] max-h-[300px]">
        <span>{x.title}</span>
      </section>
      ;
    </>
  );
};

const MovieDashboard: NextPage = (): ReactElement => {
  const { data, status } = useQuery("movies", MovieService.getMovie);
  if (status === "loading") return <span>Loading...</span>;
  if (status === "error") return <span>!Error</span>;
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>
        {data.results.map((x: MovieDto) => {
          <MovieList key={x.id} id={0} title={x.title} />;
        })}
      </DashboardLayout>
    </QueryClientProvider>
  );
};

export default MovieDashboard;
