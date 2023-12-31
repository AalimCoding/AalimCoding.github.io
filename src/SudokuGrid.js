// Importing necessary components and hooks from Chakra UI and React
import { Grid, GridItem, Button, Box, Radio, Stack, RadioGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "./ThemeContext";
import SudokuInfo from "./SudokuInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faMagnifyingGlass, faBrush } from "@fortawesome/free-solid-svg-icons";

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

    //Immediately set the possibleValue to the value of the cell
    var COPYpossibleSudokuValues = [...possibleSudokuValues]
    // Add one becasue cell values are zero indexed i.e. 0 to 8 but possibl values are 1 to 9.
    // If the value is less than 9 we set the possible value to increase with the cell
    if (SudokuValues[row][column] !== 9) { COPYpossibleSudokuValues[row][column] = [SudokuValues[row][column] + 1] }
    //Otherwise, if the cell is being reset to 0,i.e. being blank, we want the posible value to reset to default.
    else { COPYpossibleSudokuValues[row][column] = [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    setPossibleSudokuValues(COPYpossibleSudokuValues)
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


      const colorIndex = SudokuValues[row][column] - 1; // Adjusting value to match array indexing (0-based)
      const backgroundColor = colorIndex >= 0 && colorIndex < 9
        ? themeColours[themeChoice][colorIndex]
        : theme === "light"
          ? "white"
          : "black";


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


            background: backgroundColor,
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
        for (let valueToCheck = 1; valueToCheck <= 9; valueToCheck++) {
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


  //TODO FIX THIS FUNCTION - IT REMOVES 8 FROM ALL THE BOXES IN A GRID.
  // TODO This seems to get rid of the desried value from other boxes in the same row
  function valueInBox(SudokuValues, updatedPossibleValues) {
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (SudokuValues[row][column] !== 0) {
          const boxStartRow = Math.floor(row / 3) * 3;
          const boxStartColumn = Math.floor(column / 3) * 3;
          const valueToRemove = SudokuValues[row][column];

          for (let i = boxStartRow; i < boxStartRow + 3; i++) {
            for (let j = boxStartColumn; j < boxStartColumn + 3; j++) {
              if (i !== row || j !== column) {
                const index = updatedPossibleValues[i][j].indexOf(valueToRemove);
                if (index !== -1) {
                  updatedPossibleValues[i][j].splice(index, 1);
                }
              }
            }
          }
        }
      }
    }
  }






  function handleButtonClick() {
    // THIS IS THE FUNCTION THAT CHECKS IF AN ANSWER IS VALID FOR A CELL

    var updatedPossibleValues = [...possibleSudokuValues]

    valueInCell(SudokuValues, updatedPossibleValues)
    valueInRowOrColumn(SudokuValues, updatedPossibleValues)
    valueInBox(SudokuValues, updatedPossibleValues)

    setPossibleSudokuValues(updatedPossibleValues)










    // SET THE NEW VALUES
    // Set the value in the Sudoku Grid based on the following conditions:
    // 1. A cell has only one possible value.
    onlyPossibleValueForCell(SudokuValues, possibleSudokuValues)

    //2. Only one box in a row can have a specific value
    onlyValueInRow()

    // 3. Only one value in a column can have a specific value
    onlyValueInColumn()

    //4. Only one value in a box can have a specific value.
    onlyValueInBox()

    //5. A value must be within a certain row/column in another box, and therefore cannot be in that row/column in our box.
    impliedPlacementInBox()
    //THIS FUNCTION IS BROKEN AND REMOVES THE 8 FROM THE START OF AL BOX ROWS AND COLUMNS

  }

  function onlyPossibleValueForCell(SudokuValues, possibleSudokuValues) {
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
            const newPossibleValues = [...SudokuValues.map((rowValues) => [...rowValues])];

            // Update the value in the Sudoku grid
            newPossibleValues[validPosition][columnToCheck] = valueToCheckInColumn;

            // Set the updated Sudoku grid
            setSudokuValues(newPossibleValues);

            break;//Exit the function after updating a single cell
          }
        }
      }
    }
  }









  function onlyValueInBox() {
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        for (let valueToCheckInBox = 1; valueToCheckInBox <= 9; valueToCheckInBox++) {
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
            const newPossibleValues = [...SudokuValues.map((rowValues) => [...rowValues])];
            newPossibleValues[validI][validJ] = valueToCheckInBox;
            setSudokuValues(newPossibleValues);
            return; // Exit the function after updating a single cell
          }
        }
      }
    }
  }














  let newPossibleValues





  //TODO REDO THIS FUNCTION FROM SCRATC//
  function impliedPlacementInBox() {
    // Create a copy of the Sudoku grid

    for (let possibleAnswer = 0; possibleAnswer < 9; possibleAnswer++) {
      newPossibleValues = [...possibleSudokuValues.map((rowValues) => [...rowValues])];

      checkRowsForPlacement(possibleAnswer, newPossibleValues);

      checkColumnsForPlacement(possibleAnswer, newPossibleValues);

      setPossibleSudokuValues(newPossibleValues);
    }
    // Set the updated Sudoku grid

  }




  function checkRowsForPlacement(possibleAnswer, newPossibleValues) {
    for (let row = 0; row < 9; row += 3) {
      for (let column = 0; column < 9; column += 3) {
        let rowtoConsider = -1;
        for (let rowInMiniGrid = 0; rowInMiniGrid < 3; rowInMiniGrid++) {
          let answerCouldBeInThisRow = 0;
          for (let positionInRow = 0; positionInRow < 3; positionInRow++) {
            const rowIndex = row + rowInMiniGrid;
            const colIndex = column + positionInRow;

            if (!newPossibleValues[rowIndex][colIndex].includes(possibleAnswer)) {
              answerCouldBeInThisRow++;
              rowtoConsider = rowIndex;
            }
          }
          if (answerCouldBeInThisRow === 1) {
            const miniGridStartColumn = Math.floor(column / 3) * 3;
            for (let otherMiniGrids = 0; otherMiniGrids < 3; otherMiniGrids++) {
              if (otherMiniGrids !== Math.floor(rowInMiniGrid / 3)) {
                for (let positionInRow = 0; positionInRow < 3; positionInRow++) {
                  const rightPosition = miniGridStartColumn + positionInRow;
                  newPossibleValues[rowtoConsider][rightPosition] = newPossibleValues[rowtoConsider][rightPosition].filter(value => value !== possibleAnswer);
                }
              }
            }
          }
        }
      }
    }
  }



  function checkColumnsForPlacement(possibleAnswer, newPossibleValues) {
    for (let row = 0; row < 9; row += 3) {
      for (let column = 0; column < 9; column += 3) {
        let columntoConsider = -1;
        for (let columnInMiniGrid = 0; columnInMiniGrid < 3; columnInMiniGrid++) {
          let answerCouldBeInThisColumn = 0;
          for (let positionInColumn = 0; positionInColumn < 3; positionInColumn++) {
            const rowIndex = row + positionInColumn;
            const colIndex = column + columnInMiniGrid;

            if (!newPossibleValues[rowIndex][colIndex].includes(possibleAnswer)) {
              answerCouldBeInThisColumn++;
              columntoConsider = colIndex;
            }
          }
          if (answerCouldBeInThisColumn === 1) {
            const miniGridStartRow = Math.floor(row / 3) * 3;
            for (let otherMiniGrids = 0; otherMiniGrids < 3; otherMiniGrids++) {
              if (otherMiniGrids !== Math.floor(columnInMiniGrid / 3)) {
                for (let positionInColumn = 0; positionInColumn < 3; positionInColumn++) {
                  const rightPosition = miniGridStartRow + positionInColumn;
                  newPossibleValues[rightPosition][columntoConsider] = newPossibleValues[rightPosition][columntoConsider].filter(value => value !== possibleAnswer);
                }
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

      <GridItem colSpan={1}>
        <RadioGroup>
          Current Input Number: {/* TODO THIS USING CUSTOM RADIO BUTTONS */}
          <Stack direction="column">
            <Radio>All</Radio> {/* This is the default selection, allowing you to see all grid cells */}
            <Radio>1</Radio>
            <Radio>2</Radio>
            <Radio>3</Radio>
            <Radio>4</Radio>
            <Radio>5</Radio>
            <Radio>6</Radio>
            <Radio>7</Radio>
            <Radio>8</Radio>
            <Radio>9</Radio>
          </Stack>
        </RadioGroup>
      </GridItem>
    </Grid>

      <Button
        variant='outline'
        style={{
          background: theme === "light" ? "white" : "black",
          color: theme === "light" ? "black" : "white",
        }}
        onClick={handleButtonClick}
      /* isLoading
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
          [0, 3, 2, 0, 0, 0, 5, 0, 7],
          [7, 0, 5, 2, 1, 8, 0, 0, 0],
          [0, 0, 6, 0, 0, 3, 0, 0, 4],
          [3, 0, 8, 0, 6, 2, 0, 4, 5],
          [0, 0, 9, 1, 8, 0, 0, 7, 0],
          [0, 0, 0, 0, 0, 4, 2, 9, 0],
          [0, 8, 4, 0, 3, 1, 0, 0, 0],
          [2, 0, 7, 0, 4, 9, 0, 0, 0],
          [0, 1, 0, 0, 0, 7, 4, 5, 9]
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
      for (let valueToCheck = 1; valueToCheck <= 9; valueToCheck++) {
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
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {

      if (SudokuValues[row][column] !== 0) {
        const boxStartRow = (Math.floor(row / 3)) * 3;
        const boxStartColumn = (Math.floor(column / 3)) * 3;

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

        if (validInColumn === 1 && validPosition !== -1) {
          SudokuValues[validPosition][columnToCheck] = valueToCheckInColumn; // Update directly
          break;
        }
      }
    }
  }
}

export function onlyValueInBox(SudokuValues, possibleSudokuValues) {
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

          SudokuValues[validI][validJ] = valueToCheckInBox;

          break; // Exit the function after updating a single cell
        }
      }
    }
  }
}




export function checkColumnsForPlacement(possibleAnswer, newPossibleValues) {
  // Loop through the Sudoku grid by 3x3 mini-grids
  for (let row = 0; row < 9; row += 3) {
    for (let column = 0; column < 9; column += 3) {
      // Initialize variable to track the column where the answer might be placed
      let columntoConsider = -1;

      // Iterate through each column within the mini-grid
      for (let columnInMiniGrid = 0; columnInMiniGrid < 3; columnInMiniGrid++) {
        // Initialize counter for possible positions the answer might occupy within a column
        let answerCouldBeInThisColumn = 0;

        // Check each cell within the column
        for (let positionInColumn = 0; positionInColumn < 3; positionInColumn++) {
          // Calculate row and column indices for the current cell
          const rowIndex = row + positionInColumn;
          const colIndex = column + columnInMiniGrid;

          // If the cell doesn't contain the possible answer, increment the counter and track the column
          if (!newPossibleValues[rowIndex][colIndex].includes(possibleAnswer)) {
            answerCouldBeInThisColumn++;
            columntoConsider = colIndex;
          }
        }

        // If there's only one possible position for the answer within the column
        if (answerCouldBeInThisColumn === 1) {
          // Calculate the starting row of the mini-grid
          const miniGridStartRow = Math.floor(row / 3) * 3;

          // Iterate through the other mini-grids in the same column but different rows
          for (let otherMiniGrids = 0; otherMiniGrids < 3; otherMiniGrids++) {
            // Exclude the current mini-grid
            if (otherMiniGrids !== Math.floor(columnInMiniGrid / 3)) {
              // Iterate through each cell in the column of the different mini-grid
              for (let positionInColumn = 0; positionInColumn < 3; positionInColumn++) {
                // Calculate the row index within the different mini-grid
                const rightPosition = miniGridStartRow + positionInColumn;

                // Calculate the index to remove the possible answer from the cell
                const indexToRemove = (otherMiniGrids % 3) * 3 + columntoConsider;

                // Filter out the possible answer from the cell in the different mini-grid's column
                newPossibleValues[rightPosition][indexToRemove] = newPossibleValues[rightPosition][indexToRemove].filter(value => value !== possibleAnswer);
              }
            }
          }
        }
      }
    }
  }
}




export default SudokuGrid;
