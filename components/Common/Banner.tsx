import { FC, ImgHTMLAttributes, ReactElement } from "react";

interface BannerDto extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  padding?: string;
}

export const Banner: FC<BannerDto> = (x: BannerDto): ReactElement => {
  const {
    src = "https://images7.alphacoders.com/108/thumb-1920-1082482.jpg",
    padding = "p-6",
  } = x;
  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <section className={`${padding} max-h-1/3 w-full gap-y-6 bg-gray-800`}>
      <img
        className="object-cover md:object-fit md:h-[600px] h-[400px] w-full rounded-lg"
        src={src}
        alt="Banner"
      />
    </section>
  );
};
