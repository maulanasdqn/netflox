interface AuthConstantDto {
  wrong: string;
  invalid: string;
  empty: string;
  taken?: string;
}

export const EmailConstant: AuthConstantDto = {
  wrong: "Email Wrong",
  invalid: "Email Invalid",
  empty: "Plese input an email",
  taken: "Email is already been taken",
};

export const PasswordConstant: AuthConstantDto = {
  wrong: "Password Wrong",
  invalid: "Password Invalid",
  empty: "Plese input a password",
};
