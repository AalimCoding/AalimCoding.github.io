import { valueInCell, valueInRowOrColumn, checkColumnsForPlacement,valueInBox, onlyPossibleValueForCell, onlyValueInRow, onlyValueInColumn, onlyValueInBox } from "./SudokuGrid";

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

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (i != 0 && j != 0) {
        expect(possibleSudokuValues[i][j]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
      }
    }
  }
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


  // All other values should be unchanged

  for (let i = 1; i < 9; i++) {
    for (let j = 1; j < 9; j++) {
      if (i != 0 && j != 0) {
        expect(possibleSudokuValues[i][j]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
      }
    }
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

  //Check that the cell we are considering isn't changed.
  expect(possibleSudokuValues[0][0]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // All the other values in the same box have had 2 removed from their possibleValues.
  for (var row = 0; row < 3; row++) {
    for (var column = 0; column < 3; column++) {
      if (row != 0 && column != 0) { expect(possibleSudokuValues[row][column]).toEqual([1, 3, 4, 5, 6, 7, 8, 9]) }
    }
  }


  // All other values should be unchanged

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if ((i < 3 || j < 3) || (i >= 3 && j >= 3)) {
        expect(possibleSudokuValues[i][j]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
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




test("Set cell value if only one cell in the box has the value in its possibleValue array", () => {
  var possibleSudokuValues = Array.from({ length: 9 }, () =>
    Array(9).fill([1, 2, 3, 4, 5, 6, 7, 8, 9])
  );

  // Filter out value 2 from all cells in box 1 except the [0][0].
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (!(i === 0 && j === 0)) {
        possibleSudokuValues[i][j] = possibleSudokuValues[i][j].filter(
          (value) => value !== 2
        );
      }
    }
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

  onlyValueInBox(mockSudokuValues, possibleSudokuValues);

  // Check that the cell [0][0] has changed to be 2.
  expect(mockSudokuValues[0][0]).toEqual(2);

  // Ensure all the other values remain unchanged.
  for (var row = 0; row < 3; row++) {
    for (var column = 0; column < 3; column++) {
      if (!(row === 0 && column === 0)) {
        expect(possibleSudokuValues[row][column].includes(2)).toBe(false);
      }
    }
  }
});











// CREATE TESTS FOR CHECKROWSFORPLACEMENT AND CHECKCOLUMNSFORPLACEMENT

test("checkColumnsForPlacement", () => {

  var possibleSudokuValues = Array.from({ length: 9 }, () =>
    Array(9).fill([1, 2, 3, 4, 5, 6, 7, 8, 9])
  );


  // Filter out value 2 from all the cells in row 1 and 2 in box 7, i.e. columns 7, 8 and 9.
  for (var i = 0; i < 2; i++) {
    for (var j = 6; j < 9; j++) {
      if (!(i === 0 && j === 0)) {
        possibleSudokuValues[i][j] = possibleSudokuValues[i][j].filter(
          (value) => value !== 2
        );
      }
    }
  }


  // Answer of 2 Mock Sudoku Values can only be in column 3 for box 7. So we can remove possiblevalue of 2 from box 1 and 4 column 3.

  /* 
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 3, 0, 0, 0, 0, 0, 0, 0],
  [4, 5, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 0], */


  for (let possibleAnswer = 0; possibleAnswer < 9; possibleAnswer++) {
    newPossibleValues = [...possibleSudokuValues.map((rowValues) => [...rowValues])];

    checkColumnsForPlacement(possibleAnswer, newPossibleValues);
  }

  // Check that the cells in column 3 for boxes 1 and 4 no longer contain 2.
  for (let z = 0; z < 6; z++) {
    expect(newPossibleValues[2][z]).toEqual([1, 3, 4, 5, 6, 7, 8, 9]);
  }


  // Ensure all the other values  we changed remain unchanged.
  for (let i = 0; i < 2; i++) {
    for (let j = 6; j < 9; j++) {
      if (!(i === 0 && j === 0)) {
        expect(newPossibleValues[i][j]).toEqual([1, 3, 4, 5, 6, 7, 8, 9]);
      }
    }
  }

  // Ensure all other values are unchanged:

  // Values from columns 4 to 9 should be unchnaged.
  for (let i = 2; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      expect(newPossibleValues[i][j]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    }
  }

  // Values in columns 1 and 2 upto row 6 should be unchnaged.
  for (let z = 0; z < 6; z++) {
    for (let y = 0; y < 2; z++) {
      expect(newPossibleValues[y][z]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
  }


  //Valies in column 3 in box 7 should be unchanged.
  for (let z = 6; z < 9; z++) {

    expect(newPossibleValues[2][z]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  }


}
)
  ;
