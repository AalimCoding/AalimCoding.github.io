import { useTheme } from "./ThemeContext"
import { Button, ButtonGroup } from '@chakra-ui/react'

/* I use Chakra UI Buttons. For docs go to:
https://chakra-ui.com/docs/components/button/usage */



var possibleSudokuValues = []
for (var i = 0; i < 9; i++) {
    possibleSudokuValues.push([])
    for (var j = 0; j < 9; j++) {
        possibleSudokuValues[i].push([1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
}


function SudokuSubmitButton() {
    const { theme } = useTheme();

    function handleClick() {
        // add props

// THIS IS THE FUNCTION THAT CHECKS IF AN ANSWER IS VALID FOR A CELL


        console.log(possibleSudokuValues)
    }


    return (
        <div>

            <Button
                // colorScheme='teal'
                variant='outline'
                style={{
                    background: theme === "light" ? "white" : "black",
                    color: theme === "light" ? "black" : "white",
                }}
                onClick={handleClick}
            /*  isLoading
             loadingText='Submitting' */
            >
                This is the Sudoku submit button component
            </Button>
        </div>
    )
}

export default SudokuSubmitButton