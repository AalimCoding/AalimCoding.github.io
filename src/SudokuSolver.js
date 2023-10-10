import { useTheme } from "./ThemeContext"
import { Box, grid } from "@chakra-ui/react";

function SudokuSolver(){
    const { theme } = useTheme();
    return(
        <div>This is the SudokuSolver</div>
    )
}

export default SudokuSolver