import { FC, ReactElement } from "react";

export const Banner: FC = (): ReactElement => {
  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <section className="max-h-1/3 w-full gap-y-6 p-6 bg-gray-800">
      <img
        className="object-cover h-[400px] w-full rounded-lg"
        src="https://images7.alphacoders.com/108/thumb-1920-1082482.jpg"
        alt="Banner"
      />
    </section>
  );
};
