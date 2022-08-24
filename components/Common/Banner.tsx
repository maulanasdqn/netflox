import { FC, ReactElement } from "react";
import Image from "next/image";

export const Banner: FC = (): ReactElement => {
  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <section className="max-h-1/3 w-full gap-y-6 p-6 bg-gray-800">
      <Image
        className="object-cover h-[400px] w-full rounded-lg"
        src="https://rare-gallery.com/resol/1920x1080/350350-4k-wallpaper.jpg"
        alt=""
      />
    </section>
  );
};
