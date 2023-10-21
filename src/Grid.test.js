import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Battleships from "./Battleships";
import { ThemeProvider } from "./ThemeContext";

jest.mock("./ThemeContext", () => ({
  useTheme: jest.fn().mockReturnValue({ theme: "light" }),
}));

test("Check grid tiles update when hit", () => {
  render(

      <Battleships />
 
  );

  // find a specific grid tile by role
  const gridTile = screen.getByRole('gridcell');

  // click the grid tile
  fireEvent.click(gridTile);

  // assert the background color of the grid tile after click
  expect(gridTile).toHaveStyle("background-color: blue");

});
