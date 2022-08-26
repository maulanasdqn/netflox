import { FC, ReactElement } from "react";
import { useRecoilValue } from "recoil";
import { DashboardLayout } from "../layouts/dashboard.layouts";
import { fetchMovieById } from "../store/movies";

export const MovieLayout: FC = (): ReactElement => {
  const resMovie = useRecoilValue(fetchMovieById);
  return (
    <DashboardLayout no>
      <>{resMovie}</>
    </DashboardLayout>
  );
};
