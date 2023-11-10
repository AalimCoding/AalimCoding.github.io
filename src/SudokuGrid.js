import { Grid, GridItem } from "@chakra-ui/react";

function SudokuGrid() {
  const gridSize = 9; // Number of boxes in the grid
  const itemsPerBox = 9; // Number of items per box

  var SudokuValues = []
  for (let i = 0; i < gridSize; i++) {
    SudokuValues.push([])
    for (let j = 0; j < gridSize; j++) {
      SudokuValues[i].push([0])
    }
  }
  function handleClick(row, column) {

    SudokuValues[row][column] = 1
  }


  const renderGridItems = () => {
    const gridItems = [];
    for (let i = 0; i < gridSize; i++) {
      const boxItems = [];
      for (let j = 0; j < itemsPerBox; j++) {
        const itemId = `Box ${i + 1} ItemInBox ${j + 1} Row ${Math.floor(j / 3) + 3 * (i % 3)} Column${(j % 3) + Math.floor(3 * i) + 1}`;
        const box = i + 1
        const itemInBox = j+ 1
        const row = Math.floor((itemInBox-1)/3) + 3*(Math.floor((box-1)/3)) + 1
        const column = Math.floor((itemInBox-1)%3) + 3*((box-1)%3) + 1//(itemInBox % 3) + Math.floor(3 * box);
        


        boxItems.push(
          <GridItem
            row={row}
            column={column}
            box={box}
            itemInBox = {itemInBox}
            aspectRatio='1/1'
            key={itemId}
            id={itemId}
            onClick={() => handleClick(row, column)}>
            {row}.{column}
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
  };

  return <Grid id="Main Grid" templateColumns="repeat(3, 1fr)" templateRows="repeat(3, 1fr)" gap={10} bg="green">{renderGridItems()}</Grid>;







}



export default SudokuGrid;
