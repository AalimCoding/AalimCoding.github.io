import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "./ThemeContext"

function SudokuGrid() {
  const { theme } = useTheme();
  const gridSize = 9; // Number of boxes in the grid
  const itemsPerBox = 9; // Number of items per box

  const [SudokuValues, setSudokuValues] = useState(() => {
    const initialSudokuValues = Array.from({ length: gridSize }, () =>
      Array(itemsPerBox).fill(0)
    );
    return initialSudokuValues;
  });

  function handleClick(row, column) {
    setSudokuValues((prevValues) => {
      const newValues = prevValues.map((rowValues) => [...rowValues]);

      if (newValues[row][column] < 9) {
        newValues[row][column] += 1;
      } else {
        newValues[row][column] = 0;
      }

      return newValues;
    });
  }

  const gridItems = [];
  for (let i = 0; i < gridSize; i++) {
    const boxItems = [];
    for (let j = 0; j < itemsPerBox; j++) {
      const box = i + 1;
      const itemInBox = j + 1;
      const row = Math.floor(j / 3) + 3 * Math.floor(i / 3);
      const column = (i % 3) * 3 + (j % 3);
      const itemId = `Box ${box} ItemInBox ${itemInBox} Row ${row} Column ${column}`;

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
        
          style={{cursor: "pointer" ,
            background: 
            SudokuValues[row][column] === 1 ? "#FA9189":
            SudokuValues[row][column] === 2 ? "#FCAE7C":
            SudokuValues[row][column] === 3 ? "#FFE699":
            SudokuValues[row][column] === 4 ? "#D1FF99":
            SudokuValues[row][column] === 5 ? "#B3F5BC":
            SudokuValues[row][column] === 6 ? "#D6F6FF":
            SudokuValues[row][column] === 7 ? "#9FD1FF":
            SudokuValues[row][column] === 8 ? "#E2CBF7":
            SudokuValues[row][column] === 9 ? "#D1BDFF":
            
            
            
            theme === "light" ? "white" : "black",


            color: theme === "light" ? "black" : "white",
        }}
        >
          {SudokuValues[row][column]}
        </GridItem>
      );
    }

    const boxId = `Box ${i + 1}`;
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

  return (
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
  );
}

export default SudokuGrid;
