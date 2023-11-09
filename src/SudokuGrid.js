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
  function handleClick(Box, Item) {

    SudokuValues[Box][Item] = 1
  }


  const renderGridItems = () => {
    const gridItems = [];
    for (let i = 0; i < gridSize; i++) {
      const boxItems = [];
      for (let j = 0; j < itemsPerBox; j++) {
        const itemId = `Box ${i + 1} Item ${j + 1}`;
        boxItems.push(<GridItem aspectRatio='1/1' key={itemId} id={itemId} onClick={() => handleClick(i, j)}>{SudokuValues[i][j]}</GridItem>); // Use id instead of ID
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
