import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Nav from "./Nav";
import { ThemeProvider } from "./ThemeContext";

// Mocking ThemeProvider and useTheme context
jest.mock("./ThemeContext", () => ({
    useTheme: jest.fn(() => ({ theme: "light" })),
  }));
  
  // ...rest of your test code
  
test("clicking grid cell updates state", async () => {
  render(
    <ThemeProvider>
      <Nav />
    </ThemeProvider>
  );

  const moonIcon = await screen.findByTestId("moon-svg");

  expect(moonIcon).toBeInTheDocument();
  expect(moonIcon).toHaveStyle("background: white;");

  fireEvent.click(moonIcon);

  expect(moonIcon).toHaveStyle("background: black;");
});
