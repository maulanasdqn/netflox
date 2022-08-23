import { ButtonHTMLAttributes, FC, ReactElement } from "react";
import Link from "next/link";

interface ButtonDto extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  className?: string;
  children: ReactElement | string;
  size?: "sm" | "md" | "lg";
  to?: string;
  secondary?: boolean;
}

export const Button: FC<ButtonDto> = (props: ButtonDto): ReactElement => {
  const {
    type,
    className = "bg-blue text-white rounded-lg flex items-center justify-center",
    children,
    size = "md",
    to = "",
    secondary = false,
  } = props;
  return (
    <>
      <button
        type={type}
        className={`${className} ${size === "sm" && "p-2 text-sm"} ${
          size === "md" && "p-4 text-md"
        } ${size === "lg" && "p-6 text-lg"}
        ${secondary && "bg-white border-2 border-2 border-blue-400"}
        `}
      >
        {to.length > 0 ? children : <Link href={to}>{children}</Link>}
      </button>
    </>
  );
};
