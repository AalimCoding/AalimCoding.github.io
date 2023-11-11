import { useTheme } from "./ThemeContext"
import { Button, ButtonGroup } from '@chakra-ui/react'

/* I use Chakra UI Buttons. For docs go to:
https://chakra-ui.com/docs/components/button/usage */

function SudokuSubmitButton() {
    const { theme } = useTheme();
    return (
        <div>

            <Button
                colorScheme='teal'
                variant='outline'
            /*  isLoading
             loadingText='Submitting' */
            >
                This is the Sudoku submit button component
            </Button>
        </div>
    )
}

export default SudokuSubmitButton