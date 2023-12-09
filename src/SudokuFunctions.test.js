import React from "react";
import { render} from "@testing-library/react";
import {SudokuGrid,valueInCell} from "./SudokuGrid";
import { ThemeProvider } from "./ThemeContext";

test("Complete cells have corresponding possible value", () => {
  render(<ThemeProvider><SudokuGrid /></ThemeProvider>);

  var possibleSudokuValues = Array.from({ length: 9 }, () =>
      Array(9).fill([1, 2, 3, 4, 5, 6, 7, 8, 9])
    );


  var mockSudokuValues = [
    [2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  var updatedPossibleValues = [...possibleSudokuValues]

  valueInCell(mockSudokuValues, updatedPossibleValues)

  possibleSudokuValues = updatedPossibleValues

  expect(possibleSudokuValues[0][0]).toBe([2])

});