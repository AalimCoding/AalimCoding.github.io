import { Grid, GridItem } from "@chakra-ui/react";
import { useTheme } from "./ThemeContext"
import { useState, useEffect } from "react";

function SudokuGrid() {
  const gridSize = 9; // Number of boxes in the grid
  const itemsPerBox = 9; // Number of items per box

  var [SudokuValues, setSudokuValues] = useState(() => {
    const initialSudokuValues = []
    for (let i = 0; i < gridSize; i++) {
      initialSudokuValues.push([])
      for (let j = 0; j < gridSize; j++) {
        initialSudokuValues[i].push([])
        initialSudokuValues[i][j] = 0
      }
    }
    return initialSudokuValues
  })

  function handleClick(row, column) {
    console.log('this works')
    var gridState = [...SudokuValues]
    gridState[row - 1][column - 1] = 1
    setSudokuValues(gridState)
  
  }

  var [initialGrid, setInitialGrid] = useState(() => {
    const gridItems = [];
    for (let i = 0; i < gridSize; i++) {
      const boxItems = [];
      for (let j = 0; j < itemsPerBox; j++) {
        const itemId = `Box ${i + 1} ItemInBox ${j + 1} Row ${Math.floor(j / 3) + 3 * (i % 3)} Column${(j % 3) + Math.floor(3 * i) + 1}`;
        const box = i + 1
        const itemInBox = j + 1
        const row = Math.floor((itemInBox - 1) / 3) + 3 * (Math.floor((box - 1) / 3)) + 1
        const column = Math.floor((itemInBox - 1) % 3) + 3 * ((box - 1) % 3) + 1//(itemInBox % 3) + Math.floor(3 * box);



        boxItems.push(
          <GridItem
            row={row}
            column={column}
            box={box}
            itemInBox={itemInBox}
            aspectRatio='1/1'
            key={itemId}
            id={itemId}
            onClick={() => handleClick(row, column)}
            style={{ cursor: 'pointer' }}
            >
            {row}.{column}.{SudokuValues[i][j]}
          </GridItem>
        );

      }
      const boxId = `Box ${i + 1}`;

      gridItems.push(
        <Grid aspectRatio='1/1' key={boxId} id={boxId} templateColumns="repeat(3, 1fr)" templateRows="repeat(3, 1fr)" gap={5} bg="yellow">
          {boxItems}
        </Grid>
      );
    }
    return gridItems;
  });

  return <Grid id="Main Grid" templateColumns="repeat(3, 1fr)" templateRows="repeat(3, 1fr)" gap={10} bg="green">{initialGrid}</Grid>;







}



export default SudokuGrid;
