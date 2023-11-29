// Importing necessary components and hooks from Chakra UI and React
import { Grid, GridItem, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "./ThemeContext";
import SudokuInfo from "./SudokuInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faGear } from "@fortawesome/free-solid-svg-icons";

/* I use Chakra UI Buttons. For docs go to:
https://chakra-ui.com/docs/components/button/usage */


function SudokuGrid() {

  var [showInfo, setShowInfo] = useState(false);

  // Getting the current theme using the useTheme hook
  const { theme } = useTheme();
  const gridSize = 9; // Number of boxes in the grid
  const itemsPerBox = 9; // Number of items per box


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
          rounded={'20px'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          key={itemId}
          id={itemId}
          onClick={() => handleCellClick(row, column)}

          style={{
            cursor: "pointer",

            background:
              SudokuValues[row][column] === 1 ? "#FF6B6B" :
                SudokuValues[row][column] === 2 ? "#FFA06B" :
                  SudokuValues[row][column] === 3 ? "#FFD56B" :
                    SudokuValues[row][column] === 4 ? "#BCFF6B" :
                      SudokuValues[row][column] === 5 ? "#6BFFB8" :
                        SudokuValues[row][column] === 6 ? "#6BD4FF" :
                          SudokuValues[row][column] === 7 ? "#6B9CFF" :
                            SudokuValues[row][column] === 8 ? "#B86BFF" :
                              SudokuValues[row][column] === 9 ? "#FF6BDA" :

                                theme === "light" ? "white" : "black",

            color:
              SudokuValues[row][column] !== 0 ? "black" :
                theme === "light" ? "black" : "white",
          }}
        >
          {SudokuValues[row][column]}
        </GridItem>
      );
    }

    const boxId = `Box ${i + 1}`;
    // Creating a 3x3 grid for each Sudoku box
    gridItems.push(
      <Grid
        aspectRatio="1/1"
        key={boxId}
        id={boxId}
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={5}
        style={{
          background: theme === "light" ? "white" : "black",
          color: theme === "light" ? "black" : "white",
        }}
      >
        {boxItems}
      </Grid>
    );
  }





  function handleButtonClick() {
    // THIS IS THE FUNCTION THAT CHECKS IF AN ANSWER IS VALID FOR A CELL


    //OPTIMISE CODE BY IMMEDIATELY SETTING POSSIBLE VALUE TO ACTUAL VALUE 
    // IF WE HAVE IT , AND THEN IGNORING CASES WHERE ARRAY LENGTH IS 1.

    console.log(possibleSudokuValues)
    var updatedPossibleValues = [...possibleSudokuValues]

    // UPDATE POSSIBLE VALUES
    for (var row = 0; row < 9; row++) {
      for (var column = 0; column < 9; column++) {

        //If we know the value of a cell, we can set its possible value to be the value of the cell, as it must be that value.
        if (SudokuValues[row][column] !== 0) {
          updatedPossibleValues[row][column] = [];

          updatedPossibleValues[row][column].push(SudokuValues[row][column]);

        }


        // If a cell has a given value, no cell in the same row or column can have that value
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


    //If a cell has a given value, no cell in the same box can have that value.
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



    setPossibleSudokuValues(updatedPossibleValues)











    // SET THE NEW VALUES
    // Set the value in the Sudoku Grid based on the following conditions:
    // 1. A cell has only one possible value.
    onlyPossibleValueForCell()



    //2. Only one box in a row can have a specific value
    onlyValueInRow()


    // 3. Only one value in  a column can have a specific value
    onlyValueInColumn()




    //4. Only one value in a box can have a specific value.
    onlyValueInBox()


    //5. A value must be within a certain row/column in another box, and therefore cannot be in that row/column in our box.


  }

  function onlyPossibleValueForCell() {
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (possibleSudokuValues[row][column].length === 1) {

          // Ensure there's only one possible value in the array for this cell
          const newValue = possibleSudokuValues[row][column][0];

          // Create a copy of the Sudoku grid
          const newSudokuValues = [...SudokuValues.map((rowValues) => [...rowValues])];

          // Update the value in the Sudoku grid
          newSudokuValues[row][column] = newValue;

          // Set the updated Sudoku grid
          setSudokuValues(newSudokuValues);

        }
      }
    }
  }


  function onlyValueInRow() {
    for (let column = 0; column < 9; column++) {
      for (var rowToCheck = 0; rowToCheck < 9; rowToCheck++) {
        for (var valueToCheckInRow = 1; valueToCheckInRow <= 9; valueToCheckInRow++) {
          var validInRow = 0
          var validPosition = -1; // Initialize position to an invalid value

          for (var columnToCheck = 0; columnToCheck < 9; columnToCheck++) {


            if (possibleSudokuValues[rowToCheck][columnToCheck].includes(valueToCheckInRow)) {
              validInRow++
              validPosition = columnToCheck
            }
          }

          if (validInRow === 1 && validPosition !== -1) {

            // Create a copy of the Sudoku grid
            const newSudokuValues = [...SudokuValues.map((rowValues) => [...rowValues])];

            // Update the value in the Sudoku grid
            newSudokuValues[rowToCheck][validPosition] = valueToCheckInRow;

            // Set the updated Sudoku grid
            setSudokuValues(newSudokuValues);

            break;//Exit the function after updating a single cell
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
      for (var column = 0; column < 9; column++) {
        for (var valueToCheckInBox = 1; valueToCheckInBox <= 9; valueToCheckInBox++) {
          var validInBox = 0
          var validPosition = -1; // Initialize position to an invalid value

          const boxStartRow = Math.floor(row / 3) * 3;
          const boxStartColumn = Math.floor(column / 3) * 3;

          for (var i = boxStartRow; i < boxStartRow + 3; i++) {
            for (var j = boxStartColumn; j < boxStartColumn + 3; j++) {



              if (possibleSudokuValues[i][j].includes(valueToCheckInBox)) {
                validInBox++
                let validI = i
                let validJ = j
              }
            }
            if (validInBox === 1 && validPosition !== -1) {

              // Create a copy of the Sudoku grid
              const newSudokuValues = [...SudokuValues.map((rowValues) => [...rowValues])];

              // Update the value in the Sudoku grid
              newSudokuValues[i][j] = valueToCheckInBox;

              // Set the updated Sudoku grid
              setSudokuValues(newSudokuValues);

              break;//Exit the function after updating a single cell
            }
          }
        }
      }
    }
  }

  console.log(possibleSudokuValues)



  // Final main Sudoku grid
  return (
    <div>
      <Grid
        id="Main Grid"
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={10}
        style={{
          background: theme === "light" ? "white" : "black",
          color: theme === "light" ? "black" : "white",
        }}
      >
        {gridItems}
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
      }}>

        Click To Reset Grid</Box>

    </div>
  );
}

export default SudokuGrid;
