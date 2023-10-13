import { useTheme } from "./ThemeContext"
import { useState } from "react";
import { Box, Grid, GridItem, HStack, Radio, RadioGroup } from "@chakra-ui/react";

function Battleships() {
    const { theme } = useTheme();
    const numGridItems = 100;
    const numRows = Math.sqrt(numGridItems);
    const numColumns = Math.sqrt(numGridItems);
    const gridItems = [];
    var [message, setMessage] = useState('Display info here');
    var boatsToPlace = 7;
    var areShipsLeft = 1;
    var [turnCount, setTurnCount] = useState(0);
    var [weaponType, setWeaponType] = useState('1')





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
















        // Create random boat placement.

        while (boatsToPlace > 0) {
            //Math.Random generates a number between 0 and 1.
            // We multiply it and then use Math.Floor to get an integer between 0 and what we multiplied by.
            let direction = Math.floor(Math.random() * 2)
            let rowOrColumn = Math.floor(Math.random() * 10)
            let boatLength = Math.floor(Math.random() * 4) + 2
            let startOfPlacement = Math.floor(Math.random() * boatLength)

            for (var z = 0; z < boatLength; z++) {
                if (direction === 1) { initialShipState[rowOrColumn][startOfPlacement + z] = 1 }
                else { initialShipState[startOfPlacement + z][rowOrColumn] = 1 }
            }
            boatsToPlace -= 1
        }
        return initialShipState;
    });




















    // Define a handleClick function

    function handleClick(i, j) {
        const updatedHit = hit.map(row => [...row]);

        // By checking that updatedHit[i][j] === 0 , we prevent already hit spots to be hit again.
        if (updatedHit[i][j] === 0) {

            if (weaponType === '1') { updatedHit[i][j] = 1 }

            if (weaponType === '2') {//Hit everything within a one tile radius.
                for (var l = -1; l <= 1; l++) {
                    for (var m = -1; m <= 1; m++) {
                        //Check that the hit tiles can't be outside the grid.
                        if (i + l >= 0 && i + l < numRows) {
                            if (j + m >= 0 && j + m < numColumns) {
                                (updatedHit[i + l][j + m] = 1)
                            }
                        }
                    }
                }
            }

            if (weaponType === '3') {  //Hit the original target and another numRows/2 - 1 targets.              
                updatedHit[i][j] = 1
                for (var targetsToHit = 0; targetsToHit < numRows / 2 - 1; targetsToHit++) {
                    var randomTargetX = Math.floor(Math.random() * numColumns)
                    var randomTargetY = Math.floor(Math.random() * numRows)
                    updatedHit[randomTargetX][randomTargetY] = 1
                }
            }





            setTurnCount(turnCount + 1);
            setHit(updatedHit);



            // check if there are any ships left
            if (areShipsLeft === 1) {
                // set areShipsLeft to 0 and then check if there are any ships.
                areShipsLeft = 0
                for (let q = 0; q < numColumns; q++) {
                    for (let r = 0; r < numRows; r++) {
                        if (ship[q][r] === 1 && hit[q][r] === 0) { areShipsLeft = 1 }
                    }
                }
            }
            // Check if any battleships are left, and otherwise display victory message.
            setMessage(areShipsLeft > 0 ? 'Keep going, there are still ships left!' : 'Well done, all battleships destroyed!')
        }
    }



    // Create a grid of items to populate the grid.

    for (let i = 0; i < numColumns; i++) {
        for (let j = 0; j < numRows; j++) {
            gridItems.push(
                <GridItem key={`${i}-${j}`}
                    w='100%'
                    aspectRatio='1/1'
                    // Set the background to orange if it is hit and theres a boat, set it to blue if its ben hit but no boat is present, or otherwise set it to grey.
                    bg={ship[i][j] && hit[i][j] ? 'orange' : (hit[i][j] ? 'blue' : 'grey')}
                    borderRadius={3}
                    onClick={() => handleClick(i, j)} />
            );
        }
    }






















    // Return the elements

    return (
        <div style={{
            color: theme === "light" ? "black" : "white",
            background: theme === "light" ? "white" : "black"
        }}>
            This is the Battleships Practice Project In React
            <HStack height={300}>
                <Grid width={300}
                    height={300}
                    templateColumns='repeat(10, 1fr)'
                    templateRows='repeat(10, 1fr)'
                    gap={2}
                    background={"blue"}
                    padding={5}>
                    {gridItems}
                </Grid>


                <Box>
                    <RadioGroup display onChange={setWeaponType} value={weaponType}>
                        <Radio value='1'>Normal Shot</Radio>
                        <Radio value='2'>Big Shot</Radio>
                        <Radio value='3'>Scatter Shot</Radio>
                    </RadioGroup>
                </Box>


                <Box width={200}>{message + '\n Turns Taken: ' + turnCount + '\n Weapon Type is currently: ' + weaponType}</Box>
            </HStack>

        </div>
    )
}

export default Battleships