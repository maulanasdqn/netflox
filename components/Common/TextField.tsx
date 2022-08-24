import { FC, InputHTMLAttributes, ReactElement } from "react";

interface TextFieldDto extends InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "number" | "password";
  placeholder: string;
  value: string;
  label: string;
  name: string;
  required?: boolean;
  labelColor?: string;
  behaviour?: string;
  error?: string;
}

export const TextField: FC<TextFieldDto> = (
  props: TextFieldDto
): ReactElement => {
  const {
    type,
    name,
    label,
    error,
    behaviour = "normal",
    labelColor = "text-gray-500",
    value,
    onChange,
    placeholder,
    className,
    required,
  } = props;
  return (
    <section className="flex flex-col gap-y-2">
      <label className={`${labelColor} font-medium text-md`} htmlFor={name}>
        {label}{" "}
        {required && <span className="text-red-900 font-bold text-md">*</span>}
      </label>
      <input
        className={`${className} ${
          behaviour === "normal" && "border-blue-400 focus:outline-blue-600"
        } ${
          behaviour === "error" && "border-red-600 focus:outline-red-800"
        } focus:outline-none border-2 rounded-lg p-3 w-auto h-auto`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {behaviour === "error" && (
        <span className="font-italic text-md text-red-600">{error}</span>
      )}
    </section>
  );
};
