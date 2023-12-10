import {valueInCell} from "./SudokuGrid";

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

  //console.log(possibleSudokuValues)
  //console.log('aaaaaaaaaaaaaaaaaaa')
  valueInCell(mockSudokuValues, possibleSudokuValues);
  //console.log(possibleSudokuValues)
  // Assert that the first cell [0][0] now has 2 as the only possible value
  expect(possibleSudokuValues[0][0][0]).toEqual(2);
});