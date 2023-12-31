import { useTheme } from "./ThemeContext"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faGear } from "@fortawesome/free-solid-svg-icons";
import { Box, GridItem, HStack } from "@chakra-ui/react";
import BattleshipsInfo from "./BattleshipsInfo";
import TargetGrid from "./BattleshipsTargetGrid";
import BattleshipsSettings from "./BattleshipsSettings";

// Define the main functional component Battleships
function Battleships() {
    // Retrieve theme from ThemeContext using useTheme hook
    const { theme } = useTheme();

    // Initialize various state variables using useState hook
    // (showInfo, showSettings, message, turnCount, weaponType, etc.)
    var [showInfo, setShowInfo] = useState(false);
    var [showSettings, setShowSettings] = useState(false);

    const numGridItems = 100;
    const numRows = Math.sqrt(numGridItems);
    const numColumns = Math.sqrt(numGridItems);
    const gridItems = [[], []];
    var [message, setMessage] = useState('');
    var areShipsLeft = 1;
    var [turnCount, setTurnCount] = useState(0);
    const [weaponType, setWeaponType] = useState({ 0: 'Normal ∞', 1: 'Normal ∞' });
    var [Gamemode, setGamemode] = useState('CPU')
    var [Ammo, setAmmo] = useState([[1, 1], [1, 1]])
    var [winner, setWinner] = useState([0, 0])
    var [whoseTurnIsIt, setWhoseTurnIsIt] = useState(0)

    // Function to update the state of whoseTurnIsIt
    function updateWhoseTurn(callback) {
        // Update whoseTurnIsIt state based on the current value
        whoseTurnIsIt = whoseTurnIsIt === 0 ? 1 : 0;
        callback(whoseTurnIsIt);
    }

    // Function to check a mystery tile and update the state accordingly
    function checkMysteryTile(noOfGrid, i, j) {
        const updatedMysteryTile = [...mysteryTile]
        if (updatedMysteryTile[noOfGrid][i][j] === 1) {
            updatedMysteryTile[noOfGrid][i][j] = 0

            setAmmo(prevAmmo => {
                const updatedAmmo = [...prevAmmo];
                console.log('ammo updates')
                updatedAmmo[noOfGrid][Math.floor(Math.random() * 2)] += 1;
                return updatedAmmo;
            });

            setMysteryTile(updatedMysteryTile)

            placeMysteryTiles();
        }
    }



    // Function to update the winner state
    const updateWinner = (noOfGrid) => {
        // Create a copy of the original array
        const updatedWinner = [...winner];
        // Update the specific index with 1
        updatedWinner[noOfGrid] = 1;
        // Update the state with the new array
        setWinner(updatedWinner);
    };

    // Initialize state variables for hit, ship, mysteryTile using useState with initial values

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



    // Function to place mystery tiles on the grid
    const placeMysteryTiles = () => {
        // Create a new mystery tile state without modifying the existing state to prevent two re-renders occuring, and thus the erroneous creation of two rather than one, mystery tile.
        const updatedMysteryTile = mysteryTile.map(grid => grid.map(row => [...row]));

        const mysteryTilesToPlace = 1; // Number of mystery tiles to be placed on each grid
        const updatedHit = hit.map(row => [...row]);
        for (let noOfGrid = 0; noOfGrid < 2; noOfGrid++) {
            let tilesPlaced = 0;

            while (tilesPlaced < mysteryTilesToPlace) {
                let row = Math.floor(Math.random() * numRows);
                let column = Math.floor(Math.random() * numColumns);

                if (updatedMysteryTile[noOfGrid][row][column] === 0 && updatedHit[noOfGrid][row][column] === 0) {
                    updatedMysteryTile[noOfGrid][row][column] = 1;
                    tilesPlaced++;
                }
            }
        }

        setMysteryTile(updatedMysteryTile);
    };

    // UseEffect to place mystery tiles when the component mounts
    useEffect(() => {
        placeMysteryTiles();
    }, []);







    // Define handleClick function to handle grid cell clicks

    function handleClick(noOfGrid, i, j) {
        console.log(winner)
        if (whoseTurnIsIt === noOfGrid) {

            //FIX THIS LINE
            if (Gamemode === 'Player' || whoseTurnIsIt === 0) {

                const updatedHit = hit.map(row => [...row]);

                // By checking that updatedHit[i][j] === 0 , we prevent already hit spots to be hit again.
                if (updatedHit[noOfGrid][i][j] === 0) {

                    if (weaponType[noOfGrid] === `Normal ∞`) {
                        updatedHit[noOfGrid][i][j] = 1;
                        setHit(updatedHit);
                        checkMysteryTile(noOfGrid, i, j)
                    }

                    if (weaponType[noOfGrid] === `Large ${Ammo[noOfGrid][0]}` && Ammo[noOfGrid][0] > 0) {//Hit everything within a one tile radius.
                        setAmmo(prevAmmo => {
                            const updatedAmmo = [...prevAmmo];
                            updatedAmmo[noOfGrid][0] -= 1;
                            return updatedAmmo;
                        });
                        for (var row = -1; row <= 1; row++) {
                            for (var column = -1; column <= 1; column++) {
                                //Check that the hit tiles can't be outside the grid.
                                if (i + row >= 0 && i + row < numRows) {
                                    if (j + column >= 0 && j + column < numColumns) {
                                        (updatedHit[noOfGrid][i + row][j + column] = 1)
                                        setHit(updatedHit);
                                        checkMysteryTile(noOfGrid, i + row, j + column)
                                    }
                                }
                            }
                        }

                    }

                    if (weaponType[noOfGrid] === `Scatter ${Ammo[noOfGrid][1]}` && Ammo[noOfGrid][1] > 0) {  //Hit the original target and another numRows/2 - 1 targets.              
                        setAmmo(prevAmmo => {
                            const updatedAmmo = [...prevAmmo];
                            updatedAmmo[noOfGrid][1] -= 1;
                            return updatedAmmo;
                        });
                        updatedHit[noOfGrid][i][j] = 1
                        setHit(updatedHit);
                        checkMysteryTile(noOfGrid, i, j)
                        for (var targetsToHit = 0; targetsToHit < numRows / 2 - 1; targetsToHit++) {
                            var randomTargetX = Math.floor(Math.random() * numColumns)
                            var randomTargetY = Math.floor(Math.random() * numRows)
                            updatedHit[noOfGrid][randomTargetX][randomTargetY] = 1
                            setHit(updatedHit);
                            checkMysteryTile(noOfGrid, randomTargetX, randomTargetY)
                        }




                    }

                    // If there is no ammo for the selected weapon, we only hit the one slected tile.
                    else {
                        updatedHit[noOfGrid][i][j] = 1
                        setHit(updatedHit);
                        checkMysteryTile(noOfGrid, i, j);
                    }

                    setTurnCount(turnCount + 1);




                    /*New mystery tiles now created when current tile is
hit. The other grid also generates an extra mystery tile.
This should help ensure the game is fair.*/



                    // We want to set the value of the other players weapon type to normal

                    setWeaponType((prevTypes) => ({ ...prevTypes, [noOfGrid === 0 ? 1 : 0]: `Normal ∞` }))

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

                    if (areShipsLeft === 0) {
                        setMessage(areShipsLeft > 0 ? message : 'Well done, all battleships destroyed!')




                        updateWinner(noOfGrid)
                    }


                    //This segement of code makes sure that whoseTurnIsIt updates before we check its value below.
                    //It uses the function decalred at the top of the code.
                    updateWhoseTurn(function (updatedValue) {
                        setWhoseTurnIsIt(updatedValue);
                    });
                }





                // If this makes it the CPU's turn, this code should run  to take the CPU's shot.


                if (Gamemode === 'CPU' && whoseTurnIsIt === 1) {
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
                        data-testid={`grid-cell-${noOfGrid}-${i}-${j}`} // Add a data-testid attribute
                        onClick={() => handleClick(noOfGrid, i, j)}
                    />

                );
            }
        }
    }









    // Return the elements
    // IF ON MOBILE RENDER EVERYTHING IN A VERTICAL STACK NOT HORIZONTAL STACK
    return (
        <div style={{
            color: theme === "light" ? "black" : "white",
            background: theme === "light" ? "white" : "black"
        }}>
            <HStack height={200}>
                <Box width={200}>{message}</Box>
                <Box width={200}>{'\n Turns Taken: ' + turnCount}</Box>
                It's turn of player {whoseTurnIsIt ? "->" : "<-"}
                To do:
                Add unit tests.
                render vertically if on phone, horizontally if on laptop.

                <Box onClick={() => { setShowSettings(!showSettings) }}>

                    <FontAwesomeIcon icon={faGear} size="2x"
                        style={{
                            background: theme === "light" ? "white" : "black",
                            color: theme === "light" ? "black" : "white",
                        }} />
                </Box>

                <Box onClick={() => {
                    setShowInfo(!showInfo)
                }}>
                    <FontAwesomeIcon icon={faCircleInfo} size="2x"
                        style={{
                            background: theme === "light" ? "white" : "black",
                            color: theme === "light" ? "black" : "white",
                        }} />
                </Box>
            </HStack>



            <BattleshipsInfo showInfo={showInfo} />

            <BattleshipsSettings showSettings={showSettings} Gamemode={Gamemode} setGamemode={setGamemode} />

            <HStack height={500}>
                <TargetGrid noOfGrid={0} theme={theme} whoseTurnIsIt={whoseTurnIsIt} winner={winner} gridItems={gridItems} Ammo={Ammo} setWeaponType={setWeaponType} weaponType={weaponType} />
                <TargetGrid noOfGrid={1} theme={theme} whoseTurnIsIt={whoseTurnIsIt} winner={winner} gridItems={gridItems} Ammo={Ammo} setWeaponType={setWeaponType} weaponType={weaponType} />

            </HStack>

        </div>
    )
}

// Export the Battleships component
export default Battleships