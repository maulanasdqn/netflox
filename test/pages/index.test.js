import React from "react";
import { render, screen } from "../test-utils";
import Home from "../../pages/index";

describe("Test Copy Text", () => {
  it("Harusnya merender halaman dengan text welcome didalam nya", () => {
    render(<Home />);

    const welcome = screen.getByText(/Welcome to Netflox/i);

    expect(welcome).toBeInTheDocument();
  });
});

describe("Test Check Button is Rendered", () => {
  it("Harusnya Ada dua element Button di dalam Halaman Home", () => {
    render(<Home />);

    const ButtonLogin = screen.getByText(/Login/i);
    const ButtonRegister = screen.getByText(/Register/i);

    expect(ButtonLogin).toBeInTheDocument();
    expect(ButtonRegister).toBeInTheDocument();
  });
});
