import { useTheme } from "./ThemeContext"
import { Box, HStack } from "@chakra-ui/react";

// provide a default value of false to prevent errors.
function SudokuInfo({ showInfo = false }) {
    const { theme } = useTheme();
    if (showInfo) {
        return (

            <Box style={{
                background: theme === "light" ? "white" : "black",
                color: theme === "light" ? "black" : "white",
            }}>

                Sudoku Info Text
            </Box>
        )
    }

    return null
}

export default SudokuInfo;