import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Battleships from "./Battleships";
import { ThemeProvider } from "./ThemeContext";

test("clicking grid cell updates state", () => {
  render(<ThemeProvider><Battleships /></ThemeProvider>);
  const gridCell = screen.getByTestId("grid-cell-0-0-0"); // Find the grid cell element using data-testid
  fireEvent.click(gridCell); // Click the grid cell
  const updatedGridCell = screen.getByTestId("grid-cell-0-0-0"); // Find the grid cell again after the click event
  expect(updatedGridCell).toHaveStyle("background-color: blue" ||"background-color: orange"); // Check the background color of the grid cell after click
});
