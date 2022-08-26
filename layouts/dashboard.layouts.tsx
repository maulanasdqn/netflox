import { FC, ReactElement } from "react";
import { Banner } from "../components/Common/Banner";
import { Navbar } from "../components/Navbar";

interface DashboardLayoutDto {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement | any;
  no?: boolean;
}

export const DashboardLayout: FC<DashboardLayoutDto> = (
  props: DashboardLayoutDto
): ReactElement => {
  const { children, no = false } = props;
  return (
    <>
      {no ? (
        <section className="h-auto w-full justify-start items-start grid 1xl:grid-cols-7 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-rows-auto bg-gray-800 p-6 2xl:gap-y-6 1xl:gap-y-5 lg:gap-y-4 gap-3">
          {children}
        </section>
      ) : (
        <>
          <Navbar />
          <Banner />
          <section className="flex md:flex-row flex-col gap-y-4 justify-start flex-1 gap-x-4 bg-gray-800 w-full lg:h-[300px] px-6 text-white md:h-[100px]">
            <section className="bg-gray-200 text-gray-700 w-full rounded-lg h-full flex md:text-2xl lg:text-4xl items-center justify-center">
              Popular
            </section>
            <section className="bg-gray-700 w-full rounded-lg h-full flex lg:text-4xl md:text-2xl items-center justify-center">
              Latest
            </section>
            <section className="bg-gray-700 w-full rounded-lg h-full flex lg:text-4xl md:text-2xl items-center justify-center">
              Rating
            </section>
            <section className="bg-gray-700 w-full rounded-lg h-full flex lg:text-4xl md:text-2xl items-center justify-center">
              Upcoming
            </section>
          </section>
          <h1 className="text-white md:text-4xl text-2xl my-6 font-medium text-center bg-gray-800">
            Here the popular movie for you!
          </h1>
          <section className="h-auto w-full justify-start items-start grid 1xl:grid-cols-7 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-rows-auto bg-gray-800 p-6 2xl:gap-y-6 1xl:gap-y-5 lg:gap-y-4 gap-3">
            {children}
          </section>
        </>
      )}
    </>
  );
};
