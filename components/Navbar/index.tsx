import { FC, ReactElement } from "react";

export const Navbar: FC = (): ReactElement => {
  return (
    <header className="bg-gray-700 sticky top-0 items-center flex w-full p-4">
      <figure className="flex items-center">
        <figcaption className="text-white font-bold">Netflox</figcaption>
      </figure>
    </header>
  );
};
