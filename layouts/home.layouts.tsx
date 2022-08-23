import type { NextPage } from "next";
import { ReactElement } from "react";

interface HomeLayoutDto {
  children: ReactElement;
  center?: boolean;
  className?: string;
}

export const HomeLayout: NextPage<HomeLayoutDto> = (
  props: HomeLayoutDto
): ReactElement => {
  const { children, center, className } = props;
  return (
    <section
      className={`
      ${className}
      ${center && "items-center justify-center"} flex w-full h-screen p-6`}
    >
      {children}
    </section>
  );
};
