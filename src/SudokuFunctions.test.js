import { valueInCell, valueInRowOrColumn,valueInBox ,onlyPossibleValueForCell,onlyValueInRow, onlyValueInColumn} from "./SudokuGrid";

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




test("Row and columns correctly updated", () => {

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





test("Box correctly updated", () => {

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


  valueInBox(mockSudokuValues, possibleSudokuValues);

  //Check that the cell we are conidering isn't changed.
  expect(possibleSudokuValues[0][0]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // All the other values in the same cbox have had 2 removed from their possibleValues.
  for (var row = 0; row < 3; row++) {
    for (var column = 0; column < 3; column++) {
      if (row != 0 && column != 0) { expect(possibleSudokuValues[row][column]).toEqual([1, 3, 4, 5, 6, 7, 8, 9]) }
    }
  }


});






















// beforeEach function to set up initial values before each test
beforeEach(() => {
  jest.resetModules(); // Reset modules to clear cached state
});

test("Set cell value if only one possible value in cells possibleValue array", () => {
  var possibleSudokuValues = Array.from({ length: 9 }, () =>
    Array(9).fill([1, 2, 3, 4, 5, 6, 7, 8, 9])
  );

  possibleSudokuValues[0][0] = [2]; // Assigning a single value, not an array

  var mockSudokuValues = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  onlyPossibleValueForCell(mockSudokuValues, possibleSudokuValues);

  // Check that the cell [0][0] has changed to be 2.
  expect(mockSudokuValues[0][0]).toEqual(2);

  // Ensure all the other values remain unchanged.
  for (var row = 0; row < 9; row++) {
    for (var column = 0; column < 9; column++) {
      if (!(row === 0 && column === 0)) {
        expect(mockSudokuValues[row][column]).toEqual(0);
      }
    }
  }
});

test("Set cell value if only one cell in the row has the value in its possibleValue array", () => {
  var possibleSudokuValues = Array.from({ length: 9 }, () =>
    Array(9).fill([1, 2, 3, 4, 5, 6, 7, 8, 9])
  );

  // Filter out value 2 from all cells in row 0 except the first one
  for (var i = 1; i < 9; i++) {
    possibleSudokuValues[0][i] = possibleSudokuValues[0][i].filter(
      (value) => value !== 2
    );
  }

  var mockSudokuValues = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  onlyValueInRow(mockSudokuValues, possibleSudokuValues);

  // Check that the cell [0][0] has changed to be 2.
  expect(mockSudokuValues[0][0]).toEqual(2);

  // Ensure all the other values remain unchanged.
  for (var row = 0; row < 9; row++) {
    for (var column = 0; column < 9; column++) {
      if (!(row === 0 && column === 0)) {
        expect(mockSudokuValues[row][column]).toEqual(0);
      }
    }
  }
});



test("Set cell value if only one cell in the column has the value in its possibleValue array", () => {
  var possibleSudokuValues = Array.from({ length: 9 }, () =>
    Array(9).fill([1, 2, 3, 4, 5, 6, 7, 8, 9])
  );

  // Filter out value 2 from all cells in column 0 except the first one
  for (var i = 1; i < 9; i++) {
    possibleSudokuValues[i][0] = possibleSudokuValues[i][0].filter(
      (value) => value !== 2
    );
  }

  var mockSudokuValues = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  onlyValueInColumn(mockSudokuValues, possibleSudokuValues);

  // Check that the cell [0][0] has changed to be 2.
  expect(mockSudokuValues[0][0]).toEqual(2);

  // Ensure all the other values remain unchanged.
  for (var row = 0; row < 9; row++) {
    for (var column = 0; column < 9; column++) {
      if (!(row === 0 && column === 0)) {
        expect(mockSudokuValues[row][column]).toEqual(0);
      }
    }
  }
});
