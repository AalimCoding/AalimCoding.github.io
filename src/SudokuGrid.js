// Importing necessary components and hooks from Chakra UI and React
import { Grid, GridItem, Button, Box, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "./ThemeContext";
import SudokuInfo from "./SudokuInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faMagnifyingGlass, faBrush /* faGear */ } from "@fortawesome/free-solid-svg-icons";

/* I use Chakra UI Buttons. For docs go to:
https://chakra-ui.com/docs/components/button/usage */


function SudokuGrid() {

  var [showInfo, setShowInfo] = useState(false);
  var [toggleDisplay, setToggleDisplay] = useState(false);

  // Getting the current theme using the useTheme hook
  const { theme } = useTheme();
  const gridSize = 9; // Number of boxes in the grid
  const itemsPerBox = 9; // Number of items per box

  var [themeChoice, setThemeChoice] = useState(0)
  const themeColours = [
    ["#FF6B6B", "#FFA06B", "#FFD56B", "#BCFF6B", "#6BFFB8", "#6BD4FF", "#6B9CFF", "#B86BFF", "#FF6BDA"],
    ["#2E86AB", "#4FADBB", "#72D6D0", "#A0E8D9", "#CAF0F8", "#FFE74C", "#FF5964", "#FFB2B2", "#D7DADB"],
    ["#FF6B6B", "#FFA07A", "#FFD700", "#FFDAB9", "#F0E68C", "#B0E0E6", "#87CEEB", "#6495ED", "#4169E1"],
    ["#355C7D", "#6C5B7B", "#C06C84", "#F67280", "#F8B195", "#F7DB4F", "#2EB872", "#4FD1C5", "#4B4A67"],
    ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#A09ABC", "#6D7993", "#5D576B"],
    ["#FFD700", "#FF8C00", "#FF4500", "#FF6347", "#FF69B4", "#EE82EE", "#8A2BE2", "#4B0082", "#483D8B"],
    ["#83D6DE", "#51A3A3", "#2E5077", "#2A363B", "#FFFFF3", "#E8F0FF", "#B8D0E8", "#709FB0", "#3B8EA5"],
    ["#FF6B6B", "#F9C74F", "#90BE6D", "#43AA8B", "#577590", "#283618", "#FFE66D", "#6D6875", "#A8DADC"],
    ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "#2980B9", "#16A085", "#27AE60", "#F39C12", "#F1C40F"],
    ["#FAD02E", "#F9A602", "#F58F01", "#F56A6A", "#FFBD9E", "#FF725C", "#9A4848", "#50393B", "#3D2629"],
    ["#020887", "#0D31C2", "#2278FF", "#00BFFF", "#A9E0FF", "#F0FFFF", "#FFE4E1", "#FF7F50", "#FF2400"]
  ];


  const [possibleSudokuValues, setPossibleSudokuValues] = useState(() => {
    const initialPossibleValues = Array.from({ length: gridSize }, () =>
      Array(itemsPerBox).fill([1, 2, 3, 4, 5, 6, 7, 8, 9])
    );
    return initialPossibleValues;
  });

  // Initializing the Sudoku grid with initial values using useState hook
  const [SudokuValues, setSudokuValues] = useState(() => {
    const initialSudokuValues = Array.from({ length: gridSize }, () =>
      Array(itemsPerBox).fill(0)
    );
    return initialSudokuValues;
  });

  // Handling the click event on a Sudoku cell
  function handleCellClick(row, column) {
    setSudokuValues((prevValues) => {
      // Creating a copy of the previous Sudoku values array
      const newValues = prevValues.map((rowValues) => [...rowValues]);

      // Updating the selected cell's value
      if (newValues[row][column] < 9) {
        newValues[row][column] += 1;
      } else {
        newValues[row][column] = 0;
      }

      return newValues;
    });
  }

  // Generating the Sudoku grid items
  const gridItems = [];
  for (let i = 0; i < gridSize; i++) {
    const boxItems = [];
    for (let j = 0; j < itemsPerBox; j++) {
      // Calculating cell attributes
      const box = i + 1;
      const itemInBox = j + 1;
      const row = Math.floor(j / 3) + 3 * Math.floor(i / 3);
      const column = (i % 3) * 3 + (j % 3);
      const itemId = `Box ${box} ItemInBox ${itemInBox} Row ${row} Column ${column}`;

      // Creating Sudoku cell components
      boxItems.push(
        <GridItem
          row={row + 1}
          column={column + 1}
          box={box}
          itemInBox={itemInBox}
          aspectRatio="1/1"
          rounded={
            itemInBox === 1 ? "20px 0px 0px 0px" :
              itemInBox === 3 ? "0px 20px 0px 0px" :
                itemInBox === 7 ? "0px 0px 0px 20px" :
                  itemInBox === 9 ? "0px 0px 20px 0px" :
                    "0px 0px 0 px 0px"}

          display="flex"
          alignItems="center"
          justifyContent="center"
          key={itemId}
          id={itemId}
          onClick={() => handleCellClick(row, column)}

          style={{
            cursor: "pointer",

            background:

              SudokuValues[row][column] === 1 ? themeColours[themeChoice][0] :
                SudokuValues[row][column] === 2 ? themeColours[themeChoice][1] :
                  SudokuValues[row][column] === 3 ? themeColours[themeChoice][2] :
                    SudokuValues[row][column] === 4 ? themeColours[themeChoice][3] :
                      SudokuValues[row][column] === 5 ? themeColours[themeChoice][4] :
                        SudokuValues[row][column] === 6 ? themeColours[themeChoice][5] :
                          SudokuValues[row][column] === 7 ? themeColours[themeChoice][6] :
                            SudokuValues[row][column] === 8 ? themeColours[themeChoice][7] :
                              SudokuValues[row][column] === 9 ? themeColours[themeChoice][8] :

                                theme === "light" ? "white" : "black",

            color:
              SudokuValues[row][column] !== 0 ? "black" :
                theme === "light" ? "black" : "white",
            border: "1px solid"
          }}
        >
          {toggleDisplay ? possibleSudokuValues[row][column] : SudokuValues[row][column]}
        </GridItem>
      );
    }

    const boxId = `Box ${i + 1}`;
    // Creating a 3x3 grid for each Sudoku box
    gridItems.push(
      <Grid
        rounded={'23px'}
        aspectRatio="1/1"
        key={boxId}
        id={boxId}
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(3, 1fr)"
        //gap={5}
        style={{
          background: theme === "light" ? "white" : "black",
          color: theme === "light" ? "black" : "white",
          border: "3px solid"
        }}
      >
        {boxItems}
      </Grid>
    );
  }


  function valueInCell(SudokuValues, updatedPossibleValues) {
    // UPDATE POSSIBLE VALUES
    for (var row = 0; row < 9; row++) {
      for (var column = 0; column < 9; column++) {

        //If we know the value of a cell, we can set its possible value to be the value of the cell, as it must be that value.
        if (SudokuValues[row][column] !== 0) {
          updatedPossibleValues[row][column] = [];

          updatedPossibleValues[row][column].push(SudokuValues[row][column]);

        }
      }
    }
  }

  function valueInRowOrColumn(SudokuValues, updatedPossibleValues) {
    for (var row = 0; row < 9; row++) {
      for (var column = 0; column < 9; column++) {
        for (var valueToCheck = 1; valueToCheck <= 9; valueToCheck++) {
          if (SudokuValues[row][column] === valueToCheck) {
            for (var x = 0; x < 9; x++) {

              // Make sure that I dont update the cell with the value in it.
              if (SudokuValues[row][x] !== valueToCheck) {
                updatedPossibleValues[row][x] = updatedPossibleValues[row][x].filter(value => value !== valueToCheck)
              }
              if (SudokuValues[x][column] !== valueToCheck) {
                updatedPossibleValues[x][column] = updatedPossibleValues[x][column].filter(value => value !== valueToCheck)
              }
            }
          }
        }
      }
    }
  }


  function valueInBox(SudokuValues, updatedPossibleValues) {
    for (var row = 0; row < 9; row++) {
      for (var column = 0; column < 9; column++) {
        if (SudokuValues[row][column] !== 0) {
          const boxStartRow = Math.floor(row / 3) * 3;
          const boxStartColumn = Math.floor(column / 3) * 3;

          for (var i = boxStartRow; i < boxStartRow + 3; i++) {
            for (var j = boxStartColumn; j < boxStartColumn + 3; j++) {
              if (i !== row || j !== column) {
                updatedPossibleValues[i][j] = updatedPossibleValues[i][j].filter(
                  value => value !== SudokuValues[row][column]
                );
              }
            }
          }
        }
      }
    }
  }


  function handleButtonClick() {
    // THIS IS THE FUNCTION THAT CHECKS IF AN ANSWER IS VALID FOR A CELL


    //OPTIMISE CODE BY IMMEDIATELY SETTING POSSIBLE VALUE TO ACTUAL VALUE 
    // IF WE HAVE IT , AND THEN IGNORING CASES WHERE ARRAY LENGTH IS 1.

    console.log(possibleSudokuValues)
    var updatedPossibleValues = [...possibleSudokuValues]


    valueInCell(SudokuValues, updatedPossibleValues)


    valueInRowOrColumn(SudokuValues, updatedPossibleValues)


    valueInBox(SudokuValues, updatedPossibleValues)





    setPossibleSudokuValues(updatedPossibleValues)










    // SET THE NEW VALUES
    // Set the value in the Sudoku Grid based on the following conditions:
    // 1. A cell has only one possible value.
    onlyPossibleValueForCell(SudokuValues,possibleSudokuValues)

    //2. Only one box in a row can have a specific value
    onlyValueInRow()

    // 3. Only one value in  a column can have a specific value
    onlyValueInColumn()

    //4. Only one value in a box can have a specific value.
    onlyValueInBox()

    //5. A value must be within a certain row/column in another box, and therefore cannot be in that row/column in our box.
    impliedPlacementInBox()

  }

  function onlyPossibleValueForCell(SudokuValues,possibleSudokuValues) {
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (possibleSudokuValues[row][column].length === 1) {
          const newValue = possibleSudokuValues[row][column][0];
          SudokuValues[row][column] = newValue; // Update the value directly
        }
      }
    }
  }

  function onlyValueInRow() {
    for (let column = 0; column < 9; column++) {
      for (var rowToCheck = 0; rowToCheck < 9; rowToCheck++) {
        for (var valueToCheckInRow = 1; valueToCheckInRow <= 9; valueToCheckInRow++) {
          var validInRow = 0;
          var validPosition = -1;
  
          for (var columnToCheck = 0; columnToCheck < 9; columnToCheck++) {
            if (possibleSudokuValues[rowToCheck][columnToCheck].includes(valueToCheckInRow)) {
              validInRow++;
              validPosition = columnToCheck;
            }
          }
  
          if (validInRow === 1 && validPosition !== -1) {
            SudokuValues[rowToCheck][validPosition] = valueToCheckInRow; // Update directly
            break;
          }
        }
      }
    }
  }

  function onlyValueInColumn() {
    for (let row = 0; row < 9; row++) {
      for (var columnToCheck = 0; columnToCheck < 9; columnToCheck++) {
        for (var valueToCheckInColumn = 1; valueToCheckInColumn <= 9; valueToCheckInColumn++) {
          var validInColumn = 0
          var validPosition = -1; // Initialize position to an invalid value

          for (var rowToCheck = 0; rowToCheck < 9; rowToCheck++) {


            if (possibleSudokuValues[rowToCheck][columnToCheck].includes(valueToCheckInColumn)) {
              validInColumn++
              validPosition = rowToCheck
            }
          }

          if (validInColumn === 1 && validPosition !== -1) {

            // Create a copy of the Sudoku grid
            const newSudokuValues = [...SudokuValues.map((rowValues) => [...rowValues])];

            // Update the value in the Sudoku grid
            newSudokuValues[validPosition][columnToCheck] = valueToCheckInColumn;

            // Set the updated Sudoku grid
            setSudokuValues(newSudokuValues);

            break;//Exit the function after updating a single cell
          }
        }
      }
    }
  }

  function onlyValueInBox() {
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        for (let valueToCheckInBox = 0; valueToCheckInBox < 9; valueToCheckInBox++) {
          let validInBox = 0;
          let validI = -1;
          let validJ = -1;

          const boxStartRow = Math.floor(row / 3) * 3;
          const boxStartColumn = Math.floor(column / 3) * 3;

          for (let i = boxStartRow; i < boxStartRow + 3; i++) {
            for (let j = boxStartColumn; j < boxStartColumn + 3; j++) {
              if (possibleSudokuValues[i][j].includes(valueToCheckInBox)) {
                validInBox++;
                validI = i;
                validJ = j;
              }
            }
          }

          if (validInBox === 1 && validI !== -1 && validJ !== -1) {
            const newSudokuValues = [...SudokuValues.map((rowValues) => [...rowValues])];
            newSudokuValues[validI][validJ] = valueToCheckInBox;
            setSudokuValues(newSudokuValues);
            return; // Exit the function after updating a single cell
          }
        }
      }
    }
  }

  let newSudokuValues

  function impliedPlacementInBox() {
    // Create a copy of the Sudoku grid

    for (let possibleAnswer = 0; possibleAnswer < 9; possibleAnswer++) {
      newSudokuValues = [...possibleSudokuValues.map((rowValues) => [...rowValues])];


      checkRowsForPlacement(possibleAnswer, newSudokuValues);

      checkColumnsForPlacement(possibleAnswer, newSudokuValues);

      setPossibleSudokuValues(newSudokuValues);
    }
    // Set the updated Sudoku grid

  }

  console.log(possibleSudokuValues)



  function checkRowsForPlacement(possibleAnswer, newSudokuValues) {
    let rowtoConsider = -1
    for (let row = 0; row < 9; row += 3) {
      for (let column = 0; column < 9; column += 3) {
        let answerCouldBeInThisRow = 0
        for (let rowInMiniGrid = 0; rowInMiniGrid < 3; rowInMiniGrid++) {
          let validAnswerInRow = 0

          for (let positionInRow = 0; positionInRow < 3; positionInRow++) {

            if (possibleSudokuValues[3 * Math.floor(row / 3) + rowInMiniGrid][3 * Math.floor(column / 3) + positionInRow]) {
              validAnswerInRow += 1
            }
          }
          if (validAnswerInRow !== 0) {
            rowtoConsider = 3 * Math.floor(row / 3) + rowInMiniGrid
            answerCouldBeInThisRow += 1
            console.log(rowtoConsider)
          }
          if (answerCouldBeInThisRow === 1) {
            for (let otherMiniGrids = 1; otherMiniGrids < 3; otherMiniGrids++) {
              for (let positionInRow = 0; positionInRow < 3; positionInRow++) {




                // Update the value in the Sudoku grid
                // THIS WON'T WORK AS JAVASCRIPT DOESNT LIKE [-1] FOR ARRAYS
                // CHANGE THIS TO UPDATE POSSIBLE VALUES, NOT THE SUDOKU VALUE ITSELF

                let rightPosition = 3 * (Math.floor(column / 3) - otherMiniGrids) + positionInRow
                if (rightPosition < 0) { rightPosition = 9 + rightPosition }
                console.log("right position is:", rightPosition)

                newSudokuValues[rowtoConsider][rightPosition] = newSudokuValues[rowtoConsider][rightPosition].filter(value => value !== possibleAnswer)



              }
            }
          }
        }
      }
    }
  }


  function checkColumnsForPlacement(possibleAnswer, newSudokuValues) {
    let columntoConsider = -1
    for (let row = 0; row < 9; row += 3) {
      for (let column = 0; column < 9; column += 3) {
        let answerCouldBeInThisColumn = 0
        for (let columnInMiniGrid = 0; columnInMiniGrid < 3; columnInMiniGrid++) {
          let validAnswerInColumn = 0

          for (let positionInColumn = 0; positionInColumn < 3; positionInColumn++) {

            if (possibleSudokuValues[3 * Math.floor(row / 3) + positionInColumn][3 * Math.floor(column / 3) + columnInMiniGrid]) {
              validAnswerInColumn += 1
            }
          }
          if (validAnswerInColumn !== 0) {
            columntoConsider = 3 * Math.floor(column / 3) + columnInMiniGrid
            answerCouldBeInThisColumn += 1
          }
          if (answerCouldBeInThisColumn === 1) {
            for (let otherMiniGrids = 1; otherMiniGrids < 3; otherMiniGrids++) {
              for (let positionInColumn = 0; positionInColumn < 3; positionInColumn++) {


                // Update the value in the Sudoku grid
                // THIS WON'T WORK AS JAVASCRIPT DOESNT LIKE [-1] FOR ARRAYS

                let rightPosition = 3 * ((row / 3) - otherMiniGrids) + positionInColumn
                console.log("right position is:", rightPosition)
                if (rightPosition < 0) { rightPosition = 9 + rightPosition }

                newSudokuValues[rightPosition][columntoConsider] = newSudokuValues[rightPosition][columntoConsider].filter(value => value !== possibleAnswer)



              }
            }
          }

        }
      }
    }
  }

  // Final main Sudoku grid
  return (
    <div><Grid templateColumns='repeat(5,1fr)'>
      <GridItem colSpan={4}><Grid

        id="Main Grid"
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={5}
        style={{
          background: theme === "light" ? "white" : "black",
          color: theme === "light" ? "black" : "white",
        }}
      >
        {gridItems}
      </Grid>
      </GridItem>
      <VStack> Current Input Number:
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
        <Button>7</Button>
        <Button>8</Button>
        <Button>9</Button>

      </VStack>
    </Grid>

      <Button
        variant='outline'
        style={{
          background: theme === "light" ? "white" : "black",
          color: theme === "light" ? "black" : "white",
        }}
        onClick={handleButtonClick}
      /*  isLoading
      loadingText='Submitting' */
      >
        This is the Sudoku submit button component
      </Button>

      <Box onClick={() => {
        setShowInfo(!showInfo)
      }}>
        <FontAwesomeIcon icon={faCircleInfo} size="2x"
          style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
          }} />
      </Box>
      <SudokuInfo showInfo={showInfo} />



      <Box onClick={() => {
        setToggleDisplay(!toggleDisplay)
      }}>Click to see possible values
        <FontAwesomeIcon icon={faMagnifyingGlass} size="2x"
          style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
          }} />
      </Box>

      <Box onClick={() => {
        setThemeChoice(themeChoice < themeColours.length ? themeChoice++ : 0)
      }}>Click to switch theme
        <FontAwesomeIcon icon={faBrush} size="2x"
          style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
          }} />
      </Box>




      <Box onClick={() => {
        setSudokuValues([
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ])
        const initialPossibleValues = Array.from({ length: gridSize }, () =>
        Array(itemsPerBox).fill([1, 2, 3, 4, 5, 6, 7, 8, 9])
      );
        setPossibleSudokuValues(initialPossibleValues)
      }}>

        Click To Reset Grid</Box>

      <Box onClick={() => {
        setSudokuValues([
          [0, 3, 0, 0, 2, 4, 0, 0, 0],
          [0, 0, 1, 0, 3, 0, 7, 0, 5],
          [0, 0, 0, 5, 0, 0, 8, 0, 0],
          [0, 7, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 4, 0, 8, 0, 0, 5, 7],
          [0, 1, 0, 7, 0, 0, 9, 0, 0],
          [0, 0, 6, 0, 4, 0, 3, 0, 0],
          [0, 5, 0, 0, 0, 0, 0, 2, 0],
          [3, 0, 7, 0, 0, 0, 0, 6, 0]
        ])
        const initialPossibleValues = Array.from({ length: gridSize }, () =>
        Array(itemsPerBox).fill([1, 2, 3, 4, 5, 6, 7, 8, 9])
      );
        setPossibleSudokuValues(initialPossibleValues)
      }}>

        Click To Use Example Grid</Box>

    </div>
  );
}


export function valueInCell(SudokuValues, updatedPossibleValues) {
  // UPDATE POSSIBLE VALUES
  for (var row = 0; row < 9; row++) {
    for (var column = 0; column < 9; column++) {

      //If we know the value of a cell, we can set its possible value to be the value of the cell, as it must be that value.
      if (SudokuValues[row][column] !== 0) {
        updatedPossibleValues[row][column] = [];

        updatedPossibleValues[row][column].push(SudokuValues[row][column]);

      }
    }
  }
}

export function valueInRowOrColumn(SudokuValues, updatedPossibleValues) {
  for (var row = 0; row < 9; row++) {
    for (var column = 0; column < 9; column++) {
      for (var valueToCheck = 1; valueToCheck <= 9; valueToCheck++) {
        if (SudokuValues[row][column] === valueToCheck) {
          for (var x = 0; x < 9; x++) {

            // Make sure that I dont update the cell with the value in it.
            if (SudokuValues[row][x] !== valueToCheck) {
              updatedPossibleValues[row][x] = updatedPossibleValues[row][x].filter(value => value !== valueToCheck)
            }
            if (SudokuValues[x][column] !== valueToCheck) {
              updatedPossibleValues[x][column] = updatedPossibleValues[x][column].filter(value => value !== valueToCheck)
            }
          }
        }
      }
    }
  }
}


export function valueInBox(SudokuValues, updatedPossibleValues) {
  for (var row = 0; row < 9; row++) {
    for (var column = 0; column < 9; column++) {
      if (SudokuValues[row][column] !== 0) {
        const boxStartRow = Math.floor(row / 3) * 3;
        const boxStartColumn = Math.floor(column / 3) * 3;

        for (var i = boxStartRow; i < boxStartRow + 3; i++) {
          for (var j = boxStartColumn; j < boxStartColumn + 3; j++) {
            if (i !== row || j !== column) {
              updatedPossibleValues[i][j] = updatedPossibleValues[i][j].filter(
                value => value !== SudokuValues[row][column]
              );
            }
          }
        }
      }
    }
  }
}


export function onlyPossibleValueForCell(SudokuValues, possibleSudokuValues) {
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      if (possibleSudokuValues[row][column].length === 1) {
        const newValue = possibleSudokuValues[row][column][0];
        SudokuValues[row][column] = newValue; // Update the value directly
      }
    }
  }
}

export function onlyValueInRow(SudokuValues, possibleSudokuValues) {
  for (let column = 0; column < 9; column++) {
    for (var rowToCheck = 0; rowToCheck < 9; rowToCheck++) {
      for (var valueToCheckInRow = 1; valueToCheckInRow <= 9; valueToCheckInRow++) {
        var validInRow = 0;
        var validPosition = -1;

        for (var columnToCheck = 0; columnToCheck < 9; columnToCheck++) {
          if (possibleSudokuValues[rowToCheck][columnToCheck].includes(valueToCheckInRow)) {
            validInRow++;
            validPosition = columnToCheck;
          }
        }

        if (validInRow === 1 && validPosition !== -1) {
          SudokuValues[rowToCheck][validPosition] = valueToCheckInRow; // Update directly
          break;
        }
      }
    }
  }
}


export function onlyValueInColumn(SudokuValues, possibleSudokuValues) {
  for (let row = 0; row < 9; row++) {
    for (var columnToCheck = 0; columnToCheck < 9; columnToCheck++) {
      for (var valueToCheckInColumn = 1; valueToCheckInColumn <= 9; valueToCheckInColumn++) {
        var validInColumn = 0;
        var validPosition = -1;

        for (var rowToCheck = 0; rowToCheck < 9; rowToCheck++) {
          if (possibleSudokuValues[rowToCheck][columnToCheck].includes(valueToCheckInColumn)) {
            validInColumn++;
            validPosition = rowToCheck;
          }
        }

        if (validInColumn=== 1 && validPosition !== -1) {
          SudokuValues[validPosition][columnToCheck] = valueToCheckInColumn; // Update directly
          break;
        }
      }
    }
  }
}


export default SudokuGrid;
