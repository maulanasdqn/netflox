import { ButtonHTMLAttributes, FC, ReactElement } from "react";
import Link from "next/link";

interface ButtonDto extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  className?: string;
  children: ReactElement | string;
  size?: "sm" | "md" | "lg";
  to?: string;
  gradient?: boolean;
  behaviour?: "gradient" | "primary" | "secondary" | "error";
  onClick?: VoidFunction;
}

export const Button: FC<ButtonDto> = (props: ButtonDto): ReactElement => {
  const {
    type,
    onClick,
    behaviour = "primary",
    className = `flex items-center justify-center rounded-lg w-auto h-auto shadow-md ${
      behaviour === "gradient" &&
      "bg-gradient-to-r from-indigo-300 via-purple-500 to-pink-400 text-white border-gray-200 border-2 font-medium"
    }
      ${
        behaviour === "primary" &&
        "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
      }
      ${
        behaviour === "secondary" &&
        "bg-transparent border-blue-400 text-blue-400 border-2 hover:bg-white hover:border-blue-400 hover:text-blue-400 font-medium"
      }
      `,
    children,
    size = "md",
    to = "",
  } = props;
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`${className} ${size === "sm" && "px-2 py-1 text-sm"} ${
          size === "md" && "px-4 py-3 text-md"
        } ${size === "lg" && "px-6 py-5 text-lg"}
        `}
      >
        {to.length === 0 ? children : <Link href={to}>{children}</Link>}
      </button>
    </>
  );
};
