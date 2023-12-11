import { valueInCell, valueInRowOrColumn } from "./SudokuGrid";

test("Complete cells have corresponding possible value", () => {

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


  valueInCell(mockSudokuValues, possibleSudokuValues);

  expect(possibleSudokuValues[0][0][0]).toEqual(2);
});




test("Row and columsn correctly updated", () => {

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


  valueInRowOrColumn(mockSudokuValues, possibleSudokuValues);

  //Check that the cell we are conidering isn't changed.
  expect(possibleSudokuValues[0][0]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // All the other values in the same column have had 2 removed from their possibleValues.
  for (var row = 1; row < 9; row++) {
    expect(possibleSudokuValues[row][0]).toEqual([1, 3, 4, 5, 6, 7, 8, 9])
  }

  // All the other values in the same row have had 2 removed from their possibleValues.

  for (var column = 1; column < 9; column++) {
    expect(possibleSudokuValues[0][column]).toEqual([1, 3, 4, 5, 6, 7, 8, 9])
  }

});