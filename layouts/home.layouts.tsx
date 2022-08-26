import type { NextPage } from "next";
import { ReactElement } from "react";

interface HomeLayoutDto {
  children: ReactElement;
  center?: boolean;
  className?: string;
  height?: string
}

export const HomeLayout: NextPage<HomeLayoutDto> = (
  props: HomeLayoutDto
): ReactElement => {
  const { children, center, className, height = "h-screen" } = props;
  return (
    <section
      className={`
      ${className}
      ${height}
      ${center && "items-center justify-center"} flex w-full p-6`}
    >
      {children}
    </section>
  );
};
