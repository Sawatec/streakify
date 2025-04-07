import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";

describe("RegistrationPage Tests", () => {
  it("renders all elements correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <RegistrationPage />
      </Router>
    );

    expect(getByPlaceholderText("Username")).toBeInTheDocument();
    expect(getByPlaceholderText("E-Mail")).toBeInTheDocument();
    expect(getByPlaceholderText("Passwort")).toBeInTheDocument();
    expect(getByPlaceholderText("Passwort wiederholen")).toBeInTheDocument();
    expect(getByText("Account erstellen")).toBeInTheDocument();
  });
});
