import { useTheme } from "./ThemeContext"
import { useState, useEffect } from "react";
import RadioCardWeapons from "./RadioCardWeapons";
import { Box, Grid, GridItem, HStack, Radio, RadioGroup, Stack, useRadioGroup } from "@chakra-ui/react";

function Battleships() {
    const { theme } = useTheme();
    const numGridItems = 100;
    const numRows = Math.sqrt(numGridItems);
    const numColumns = Math.sqrt(numGridItems);
    const gridItems = [[], []];
    var [message, setMessage] = useState('');
    var areShipsLeft = 1;
    var [turnCount, setTurnCount] = useState(0);
    const [weaponType, setWeaponType] = useState({ 0: 'Normal ∞', 1: 'Normal ∞' });

    var [Gamemode, setGamemode] = useState('CPU')
    var [Ammo, setAmmo] = useState([[50, 90], [50, 90]])
    var [whoseTurnIsIt, setWhoseTurnIsIt] = useState(0)

    function updateWhoseTurn(callback) {
        whoseTurnIsIt = whoseTurnIsIt === 0 ? 1 : 0;
        callback(whoseTurnIsIt);
    }

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

    }
    );


    const [mysteryTile, setMysteryTile] = useState(() => {
        const initialMysteryTile = [[], []];

        // Initialize mysteryTile with proper dimensions
        for (let noOfGrid = 0; noOfGrid < 2; noOfGrid++) {
            initialMysteryTile[noOfGrid] = [];
            for (let i = 0; i < numRows; i++) {
                initialMysteryTile[noOfGrid].push(Array(numColumns).fill(0));
            }
        }

        return initialMysteryTile;


    });

    useEffect(() => {
        const placeMysteryTiles = () => {
            const updatedMysteryTile = [...mysteryTile];

            const mysteryTileToPlace = [1, 1];
            for (let noOfGrid = 0; noOfGrid < 2; noOfGrid++) {
                while (mysteryTileToPlace[noOfGrid] > 0) {
                    let row = Math.floor(Math.random() * numRows);
                    let column = Math.floor(Math.random() * numColumns);

                    if (hit[noOfGrid][row][column] === 0) {
                        updatedMysteryTile[noOfGrid][row][column] = 1;
                    }

                    mysteryTileToPlace[noOfGrid] -= 1;
                    setMysteryTile(updatedMysteryTile);

                }
            }


        };

        placeMysteryTiles();
    }, []); // Empty dependency array ensures this effect runs once after the initial render








    // Define a handleClick function

    function handleClick(noOfGrid, i, j) {

        if (whoseTurnIsIt == noOfGrid) {

            //FIX THIS LINE
            if (Gamemode == 'Player' || whoseTurnIsIt == 0) {

                const updatedHit = hit.map(row => [...row]);

                // By checking that updatedHit[i][j] === 0 , we prevent already hit spots to be hit again.
                if (updatedHit[noOfGrid][i][j] === 0) {

                    if (weaponType[noOfGrid]== `Normal ∞`) { updatedHit[noOfGrid][i][j] = 1 }

                    if (weaponType[noOfGrid] == `Large ${Ammo[noOfGrid][0]}` && Ammo[noOfGrid][0] > 0) {//Hit everything within a one tile radius.
                        for (var row = -1; row <= 1; row++) {
                            for (var column = -1; column <= 1; column++) {
                                //Check that the hit tiles can't be outside the grid.
                                if (i + row >= 0 && i + row < numRows) {
                                    if (j + column >= 0 && j + column < numColumns) {
                                        (updatedHit[noOfGrid][i + row][j + column] = 1)
                                    }
                                }
                            }
                        }
                        setAmmo(prevAmmo => {
                            const updatedAmmo = [...prevAmmo];
                            updatedAmmo[noOfGrid][0] -= 1;
                            return updatedAmmo;
                        });
                    }

                    if (weaponType[noOfGrid] === `Scatter ${Ammo[noOfGrid][1]}` && Ammo[noOfGrid][1] > 0) {  //Hit the original target and another numRows/2 - 1 targets.              
                        updatedHit[noOfGrid][i][j] = 1
                        for (var targetsToHit = 0; targetsToHit < numRows / 2 - 1; targetsToHit++) {
                            var randomTargetX = Math.floor(Math.random() * numColumns)
                            var randomTargetY = Math.floor(Math.random() * numRows)
                            updatedHit[noOfGrid][randomTargetX][randomTargetY] = 1
                        }
                        setAmmo(prevAmmo => {
                            const updatedAmmo = [...prevAmmo];
                            updatedAmmo[noOfGrid][1] -= 1;
                            return updatedAmmo;
                        });
                    }

                    // If there is no ammo for the selected weapon, we only hit the one slected tile.
                    else {
                        updatedHit[noOfGrid][i][j] = 1
                    }

                    setTurnCount(turnCount + 1);
                    setHit(updatedHit);


                    const updatedMysteryTile = [...mysteryTile]
                    updatedMysteryTile[noOfGrid][i][j] = 0
                    setMysteryTile(updatedMysteryTile);


                    // We want to set the value of the other players weapon type to normal

                    setWeaponType((prevTypes) => ({ ...prevTypes, [noOfGrid == 0 ? 1 : 0]: `Normal ∞` }))

                    // check if there are any ships left
                    if (areShipsLeft === 1) {
                        // set areShipsLeft to 0 and then check if there are any ships.
                        areShipsLeft = 0
                        for (let column = 0; column < numColumns; column++) {
                            for (let row = 0; row < numRows; row++) {
                                if (ship[noOfGrid][column][row] === 1 && hit[noOfGrid][column][row] === 0) { areShipsLeft = 1 }
                            }
                        }
                    }
                    // Check if any battleships are left, and otherwise display victory message.
                    setMessage(areShipsLeft > 0 ? message : 'Well done, all battleships destroyed!')




                    //This segement of code makes sure that whoseTurnIsIt updates before we check its value below.
                    //It uses the function decalred at the top of the code.
                    updateWhoseTurn(function (updatedValue) {
                        setWhoseTurnIsIt(updatedValue);
                    });
                }











                // If this makes it the CPU's turn, this code should run  to take the CPU's shot.


                if (Gamemode == 'CPU' && whoseTurnIsIt == 1) {
                    let shotFired = false;
                    while (!shotFired) {
                        const updatedHit = hit.map(row => [...row]);
                        let xTarget = Math.floor(Math.random() * numColumns)
                        let yTarget = Math.floor(Math.random() * numRows)
                        if (updatedHit[1][xTarget][yTarget] === 0) {
                            updatedHit[1][xTarget][yTarget] = 1
                            setHit(updatedHit)
                            shotFired = true
                        }
                    }

                    // Use our earlier code to make sure the update happens.
                    updateWhoseTurn(function (updatedValue) {
                        setWhoseTurnIsIt(updatedValue);
                    });
                }
            }

            else {
                setMessage('Not Your Turn!')
            }
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
                        bg={mysteryTile[noOfGrid][i][j] ? 'purple' : (ship[noOfGrid][i][j] && hit[noOfGrid][i][j]) ? 'orange' : (hit[noOfGrid][i][j] ? 'blue' : 'grey')}
                        borderRadius={3}
                        onClick={() => handleClick(noOfGrid, i, j)}
                    />

                );
            }
        }
    }




    function ControlRadioButtons({ noOfGrid }) {

        // See https://chakra-ui.com/docs/components/radio for implementation details.
        const options = [`Normal ∞`, `Large ${Ammo[noOfGrid][0]}`, `Scatter ${Ammo[noOfGrid][1]}`]

        const { getRootProps, getRadioProps } = useRadioGroup({
            defaultValue: weaponType[noOfGrid],
            onChange: (value) => setWeaponType((prevTypes) => ({ ...prevTypes, [noOfGrid]: value })),
            value: weaponType[noOfGrid],
        });


        const group = getRootProps()

        return (
            <HStack {...group}>
                {options.map((value) => {
                    const radio = getRadioProps({ value })
                    return (
                        <RadioCardWeapons key={value} {...radio}>
                            {value}
                        </RadioCardWeapons>
                    )
                })}
            </HStack>
        )
    }







    // Return the elements
    // IF ON MOBILE RENDER EVERYTHING IN A VERTICAL STACK NOT HORIZONTAL STACK
    return (
        <div style={{
            color: theme === "light" ? "black" : "white",
            background: theme === "light" ? "white" : "black"
        }}>
            This is the Battleships Practice Project In React

            <HStack height={300}>
                <Box style={{
                    background: whoseTurnIsIt === 0 ? 'green' : (theme === "light" ? "black" : "white"),
                    color: theme === "light" ? "white" : "black"
                }}>Your Targets
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
                        <ControlRadioButtons noOfGrid={0} />
                    </Box>
                </Box>


                <Box >Opponent:
                    <RadioGroup display onChange={setGamemode} value={Gamemode}>
                        <Radio value='CPU'>CPU</Radio>
                        <Radio value='Player'>Player</Radio>

                    </RadioGroup>
                </Box>
                <Box>Weapons:

                    <Box width={200}>{message}</Box>
                    <Box width={200}>{'\n Turns Taken: ' + turnCount}</Box>
                    It's turn of player {whoseTurnIsIt ? "->" : "<-"}
                    To do:
                    
                    Add unit tests
                    
                    Add mystery tiles that give ammo when hit.
                    render vertically if on phone, horizontally if on laptop.
                    Add an info button that displays a pop up explaining the game.
                    Prevent radio buttons being selected if no ammo.
                    Create a separate function for the location to hit code for reusability.

                </Box>

                <Box style={{
                    background: whoseTurnIsIt === 1 ? 'green' : (theme === "light" ? "black" : "white"),
                    color: theme === "light" ? "white" : "black"
                }}>Your Opponent's Targets
                    <Grid width={300}
                        height={300}
                        templateColumns='repeat(10, 1fr)'
                        templateRows='repeat(10, 1fr)'
                        gap={2}
                        background={"blue"}
                        padding={5}>
                        {gridItems[1]}
                    </Grid>
                    <Box>
                        <ControlRadioButtons noOfGrid={1} />
                    </Box>
                </Box>
            </HStack>

        </div>
    )
}

export default Battleships