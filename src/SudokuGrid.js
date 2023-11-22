// Importing necessary components and hooks from Chakra UI and React
import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "./ThemeContext"
import { Button, ButtonGroup } from '@chakra-ui/react'

/* I use Chakra UI Buttons. For docs go to:
https://chakra-ui.com/docs/components/button/usage */


function SudokuGrid() {
  // Getting the current theme using the useTheme hook
  const { theme } = useTheme();
  const gridSize = 9; // Number of boxes in the grid
  const itemsPerBox = 9; // Number of items per box


  var possibleSudokuValues = []
  for (var i = 0; i < 9; i++) {
    possibleSudokuValues.push([])
    for (var j = 0; j < 9; j++) {
      possibleSudokuValues[i].push([1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
  }

  // Initializing the Sudoku grid with initial values using useState hook
  const [SudokuValues, setSudokuValues] = useState(() => {
    const initialSudokuValues = Array.from({ length: gridSize }, () =>
      Array(itemsPerBox).fill(0)
    );
    return initialSudokuValues;
  });

  // Handling the click event on a Sudoku cell
  function handleClick(row, column) {
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
          key={itemId}
          id={itemId}
          onClick={() => handleClick(row, column)}

          style={{
            cursor: "pointer",
            background:
              SudokuValues[row][column] === 1 ? "#FA9189" :
                SudokuValues[row][column] === 2 ? "#FCAE7C" :
                  SudokuValues[row][column] === 3 ? "#FFE699" :
                    SudokuValues[row][column] === 4 ? "#D1FF99" :
                      SudokuValues[row][column] === 5 ? "#B3F5BC" :
                        SudokuValues[row][column] === 6 ? "#D6F6FF" :
                          SudokuValues[row][column] === 7 ? "#9FD1FF" :
                            SudokuValues[row][column] === 8 ? "#E2CBF7" :
                              SudokuValues[row][column] === 9 ? "#D1BDFF" :



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


    console.log(possibleSudokuValues)


    for (var row = 0; row < 9; row++) {
      for (var column = 0; column < 9; column++) {
        for (var valueToCheck = 1; valueToCheck <= 9; valueToCheck++) {
          if (SudokuValues[row][column] == valueToCheck) {
            for (var x = 0; x < 9; x++) {

              // Make sure that I dont update the cell with the value in it.
              if (SudokuValues[row][x] != valueToCheck) {
                possibleSudokuValues[row][x] = possibleSudokuValues[row][x].filter(value => value !== valueToCheck)
              }
              if (SudokuValues[x][column] != valueToCheck) {
                possibleSudokuValues[x][column] = possibleSudokuValues[x][column].filter(value => value !== valueToCheck)
              }
            }
          }
        }


        // Set the value in the Sudoku Grid based on the following conditions:
        // 1. A cell has only one possible value.
        if (possibleSudokuValues[row][column].length == 1) {
          
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
        // colorScheme='teal'
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



    </div>
  );
}

export default SudokuGrid;
