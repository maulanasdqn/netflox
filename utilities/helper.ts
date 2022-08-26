import { ErrorComplete, ErrorWithMessage } from "./types/error.types";

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any): ErrorComplete => {
  return error.response.data.message;
};

export function toInt(num: string | string[] | undefined) {
  return parseInt(`${num}`);
}

export function loadImg(imgur: string | undefined) {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL + "" + imgur}`;
}
