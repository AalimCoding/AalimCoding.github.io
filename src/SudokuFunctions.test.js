import {
  valueInCell,
  valueInRowOrColumn,
  checkColumnsForPlacement,
  valueInBox,
  onlyPossibleValueForCell,
  onlyValueInRow,
  onlyValueInColumn,
  onlyValueInBox
} from "./SudokuGrid";

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

  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      if (row != 0 && column != 0) {
        expect(possibleSudokuValues[row][column]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
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

  for (let row = 1; row < 9; row++) {
    for (let column = 1; column < 9; column++) {
      if (row != 0 && column != 0) {
        expect(possibleSudokuValues[row][column]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
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

  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      if ((row < 3 || column < 3) || (row >= 3 && column >= 3)) {
        expect(possibleSudokuValues[row][column]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
    }
  }


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
  for (var row = 1; row < 9; row++) {
    possibleSudokuValues[0][row] = possibleSudokuValues[0][row].filter(
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
  for (var row = 1; row < 9; row++) {
    possibleSudokuValues[row][0] = possibleSudokuValues[row][0].filter(
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
  for (var row = 0; row < 3; row++) {
    for (var column = 0; column < 3; column++) {
      if (!(row === 0 && column === 0)) {
        possibleSudokuValues[row][column] = possibleSudokuValues[row][column].filter(
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











// TODO CREATE TESTS FOR CHECKROWSFORPLACEMENT AND CHECKCOLUMNSFORPLACEMENT

test("checkColumnsForPlacement", () => {

  var possibleSudokuValues = Array.from({ length: 9 }, () =>
    Array(9).fill([1, 2, 3, 4, 5, 6, 7, 8, 9])
  );


  // Filter out value 2 from all the cells in row 1 and 2 in box 7, i.e. columns 7, 8 and 9.
  for (var row = 0; row < 2; row++) {
    for (var column = 6; column < 9; column++) {
      if (!(row === 0 && column === 0)) {
        possibleSudokuValues[row][column] = possibleSudokuValues[row][column].filter(
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

  let newPossibleValues

  for (let possibleAnswer = 0; possibleAnswer < 9; possibleAnswer++) {
    newPossibleValues = [...possibleSudokuValues.map((rowValues) => [...rowValues])];

    checkColumnsForPlacement(possibleAnswer, newPossibleValues);
  }

  // Check that the cells in column 3 for boxes 1 and 4 no longer contain 2.
  for (let z = 0; z < 6; z++) {
    expect(newPossibleValues[2][z]).toEqual([1, 3, 4, 5, 6, 7, 8, 9]);
  }


  // Ensure all the other values  we changed remain unchanged.
  for (let row = 0; row < 2; row++) {
    for (let column = 6; column < 9; column++) {
      if (!(row === 0 && column === 0)) {
        expect(newPossibleValues[row][column]).toEqual([1, 3, 4, 5, 6, 7, 8, 9]);
      }
    }
  }

  // Ensure all other values are unchanged:

  // Values from columns 4 to 9 should be unchnaged.
  for (let row = 2; row < 9; row++) {
    for (let column = 0; column < 9; column++) {

      expect(newPossibleValues[row][column]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    }
  }

  // Values in columns 1 and 2 upto row 6 should be unchnaged.
  for (let row = 0; row < 6; row++) {
    for (let column = 0; column < 2; column++) {
      expect(newPossibleValues[row][column]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
  }


  //Valies in column 3 in box 7 should be unchanged.
  for (let column = 6; column < 9; column++) {

    expect(newPossibleValues[2][column]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  }


}
)
  ;
