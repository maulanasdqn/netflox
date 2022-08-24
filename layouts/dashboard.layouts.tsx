import { FC, ReactElement } from "react";
import { Banner } from "../components/Common/Banner";
import { Navbar } from "../components/Navbar";

interface DashboardLayoutDto {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement | any;
}

export const DashboardLayout: FC<DashboardLayoutDto> = (
  props: DashboardLayoutDto
): ReactElement => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <Banner />
      <section className="flex md:flex-row flex-col gap-y-4 justify-start flex-1 gap-x-4 bg-gray-800 w-full h-[300px] px-6">
        <section className="bg-gray-400 w-full rounded-lg h-full flex text-4xl items-center justify-center">
          Horror
        </section>
        <section className="bg-gray-400 w-full rounded-lg h-full flex text-4xl items-center justify-center">
          Horror
        </section>
        <section className="bg-gray-400 w-full rounded-lg h-full flex text-4xl items-center justify-center">
          Horror
        </section>
        <section className="bg-gray-400 w-full rounded-lg h-full flex text-4xl items-center justify-center">
          Horror
        </section>
      </section>
      <section className="h-auto w-full justify-start items-start grid 1xl:grid-cols-7 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-rows-auto bg-gray-800 p-6 2xl:gap-y-6 1xl:gap-y-5 lg:gap-y-4 gap-3">
        {children}
      </section>
    </>
  );
};
