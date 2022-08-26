import React from "react";
import { render, screen } from "../../test-utils";
import Login from "../../../pages/auth/login";

describe("Test Copy Text Login", () => {
  it("Harusnya merender halaman dengan text Login", () => {
    render(<Login />);

    const LoginText = screen.getByText(/Login to your account/i);
    const Email = screen.getByText(/Email/i);
    const Password = screen.getByText(/Email/i);
    const Navbar = screen.getByText(/Netflox/i);

    expect(LoginText).toBeInTheDocument();
    expect(Email).toBeInTheDocument();
    expect(Password).toBeInTheDocument();
    expect(Navbar).toBeInTheDocument();
  });
});
