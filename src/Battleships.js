import { useTheme } from "./ThemeContext"
import { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

function Battleships() {
    const { theme } = useTheme();
    const numGridItems = 100;
    const numRows = Math.sqrt(numGridItems);
    const numColumns = Math.sqrt(numGridItems);
    const gridItems = [];

    // Set up an array to check if each co-ordinate has been hit. Initally fill the array with eroes.

    const [hit, setHit] = useState(() => {
        const initialHitState = [];
        for (let i = 0; i < numColumns; i++) {
            initialHitState.push(Array(numRows).fill(0));
        }
        return initialHitState;
    });

    // Set up useState for the ships locations to be stored in an arry

    const [ship, setShip] = useState(() => {
        const initialShipState = [];
        for (let i = 0; i < numColumns; i++) {
            initialShipState.push(Array(numRows).fill(0));
        }


        // For now lets model the battleships as being fixed.

        initialShipState[1][1] = 1;
        initialShipState[2][1] = 1;
        initialShipState[3][1] = 1;
        initialShipState[4][1] = 1;
        initialShipState[5][1] = 1;
        return initialShipState;
    });



    // Define a handleClick function
    function handleClick(i, j) {
        const updatedHit = hit.map(row => [...row]);
        updatedHit[i][j] = updatedHit[i][j] === 0 ? 1 : 0;
        setHit(updatedHit);
    }

    // Create a grid of items to populate the grid.
    for (let i = 0; i < numColumns; i++) {
        for (let j = 0; j < numRows; j++) {
            gridItems.push(
                <GridItem key={`${i}-${j}`}
                    w='100%'
                    aspectRatio='1/1'
                    // Set the background to green if it is hit and theres a boat, set it to red if its ben hit but no boat is present, or otherwise set it to grey.
                    bg={ship[i][j] && hit[i][j] ? 'green' : (hit[i][j] ? 'red' : 'grey')}

                    borderRadius={3}
                    onClick={() => handleClick(i, j)} />
            );
        }
    }

    return (
        <div style={{
            color: theme === "light" ? "black" : "white",
            background: theme === "light" ? "white" : "black"
        }}>
            This is the Battleships

            <Grid maxWidth={80}
                templateColumns='repeat(10, 1fr)'
                templateRows='repeat(10, 1fr)'
                gap={3}
                background={"blue"}
                padding={5}>
                {gridItems}
            </Grid>
            <Box>Use this box to display stats about the game</Box>
        </div>
    )
}

export default Battleships