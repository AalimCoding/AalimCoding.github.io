import { useTheme } from "./ThemeContext"
import { useState } from "react";
import { Box, Grid, GridItem, HStack, Radio, RadioGroup } from "@chakra-ui/react";

function Battleships() {
    const { theme } = useTheme();
    const numGridItems = 100;
    const numRows = Math.sqrt(numGridItems);
    const numColumns = Math.sqrt(numGridItems);
    const gridItems = [[], []];
    var [message, setMessage] = useState('');

    var areShipsLeft = 1;
    var [turnCount, setTurnCount] = useState(0);
    var [weaponType, setWeaponType] = useState('1')
    var [w2Ammo, setW2Ammo] = useState(99)
    var [w3Ammo, setW3Ammo] = useState(99)



    // Set up an array to check if each co-ordinate has been hit. Initially fill the array with zeroes.

    const [hit, setHit] = useState(() => {
        const initialHitState = [];
        for (let noOfGrid = 0; noOfGrid < 2; noOfGrid++) {
            initialHitState.push([]); // Push an empty array for each grid.
            for (let i = 0; i < numColumns; i++) {
                initialHitState[noOfGrid].push(Array(numRows).fill(0));
            }
        }
        return initialHitState;

    });


    // Set up useState for the ships locations to be stored in an arry
    const [ship, setShip] = useState(() => {
        const initialShipState = [[], []];
        const boatsToPlace = [7, 7];
        for (let noOfGrid = 0; noOfGrid < 2; noOfGrid++) {
            for (let i = 0; i < numColumns; i++) {
                initialShipState[noOfGrid].push(Array(numRows).fill(0));
            }

            // Create random boat placement.

            while (boatsToPlace[noOfGrid] > 0) {
                //Math.Random generates a number between 0 and 1.
                // We multiply it and then use Math.Floor to get an integer between 0 and what we multiplied by.
                let direction = Math.floor(Math.random() * 2)
                let rowOrColumn = Math.floor(Math.random() * 10)
                let boatLength = Math.floor(Math.random() * 4) + 2
                let startOfPlacement = Math.floor(Math.random() * boatLength)

                for (var z = 0; z < boatLength; z++) {
                    if (direction === 1) { initialShipState[noOfGrid][rowOrColumn][startOfPlacement + z] = 1 }
                    else { initialShipState[noOfGrid][startOfPlacement + z][rowOrColumn] = 1 }
                }
                boatsToPlace[noOfGrid] -= 1
            }
        }
        return initialShipState;

    });




    // Define a handleClick function

    function handleClick(noOfGrid, i, j) {
        const updatedHit = hit.map(row => [...row]);

        // By checking that updatedHit[i][j] === 0 , we prevent already hit spots to be hit again.
        if (updatedHit[noOfGrid][i][j] === 0) {

            if (weaponType === '1') { updatedHit[noOfGrid][i][j] = 1 }

            if (weaponType === '2' && w2Ammo > 0) {//Hit everything within a one tile radius.
                for (var l = -1; l <= 1; l++) {
                    for (var m = -1; m <= 1; m++) {
                        //Check that the hit tiles can't be outside the grid.
                        if (i + l >= 0 && i + l < numRows) {
                            if (j + m >= 0 && j + m < numColumns) {
                                (updatedHit[noOfGrid][i + l][j + m] = 1)
                            }
                        }
                    }
                }
                setW2Ammo(w2Ammo - 1)
            }

            if (weaponType === '3' && w3Ammo > 0) {  //Hit the original target and another numRows/2 - 1 targets.              
                updatedHit[noOfGrid][i][j] = 1
                for (var targetsToHit = 0; targetsToHit < numRows / 2 - 1; targetsToHit++) {
                    var randomTargetX = Math.floor(Math.random() * numColumns)
                    var randomTargetY = Math.floor(Math.random() * numRows)
                    updatedHit[noOfGrid][randomTargetX][randomTargetY] = 1
                }
                setW3Ammo(w3Ammo - 1)
            }

            // If there is no ammo for the selected weapon, we only hit the one slected tile.
            else {
                updatedHit[noOfGrid][i][j] = 1
            }

            setTurnCount(turnCount + 1);
            setHit(updatedHit);

            // check if there are any ships left
            if (areShipsLeft === 1) {
                // set areShipsLeft to 0 and then check if there are any ships.
                areShipsLeft = 0
                for (let q = 0; q < numColumns; q++) {
                    for (let r = 0; r < numRows; r++) {
                        if (ship[noOfGrid][q][r] === 1 && hit[noOfGrid][q][r] === 0) { areShipsLeft = 1 }
                    }
                }
            }
            // Check if any battleships are left, and otherwise display victory message.
            setMessage(areShipsLeft > 0 ? message : 'Well done, all battleships destroyed!')
        }
    }


    // Create a grid of items to populate the grid.
    for (let noOfGrid = 0; noOfGrid < 2; noOfGrid++) {
        for (let i = 0; i < numColumns; i++) {
            for (let j = 0; j < numRows; j++) {
                gridItems[noOfGrid].push(
                    <GridItem key={`${i}-${j}`}
                        w='100%'
                        aspectRatio='1/1'
                        // Set the background to orange if it is hit and theres a boat, set it to blue if its ben hit but no boat is present, or otherwise set it to grey.
                        bg={ship[noOfGrid][i][j] && hit[noOfGrid][i][j] ? 'orange' : (hit[noOfGrid][i][j] ? 'blue' : 'grey')}
                        borderRadius={3}
                        onClick={() => handleClick(noOfGrid, i, j)}
                    />

                );
            }
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
                    {gridItems[0]}
                </Grid>


                <Box>
                    <RadioGroup display onChange={setWeaponType} value={weaponType}>
                        <Radio value='1'>Normal Shot</Radio>
                        <Radio value='2'>Big Shot: Ammo = {w2Ammo}</Radio>
                        <Radio value='3'>Scatter Shot: Ammo = {w3Ammo}</Radio>
                    </RadioGroup>
                    <Box width={200}>{message + '\n Turns Taken: ' + turnCount + '\n Weapon Type is currently: ' + weaponType}</Box>
                </Box>

                <Grid width={300}
                    height={300}
                    templateColumns='repeat(10, 1fr)'
                    templateRows='repeat(10, 1fr)'
                    gap={2}
                    background={"blue"}
                    padding={5}>
                    {gridItems[1]}
                </Grid>
            </HStack>

        </div>
    )
}

export default Battleships