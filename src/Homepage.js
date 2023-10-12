import { useTheme } from "./ThemeContext"
import { Box, grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Homepage() {
    const { theme } = useTheme();
    return (
        <div
            style={{
                background: theme === "light" ? "white" : "black",
                color: theme === "light" ? "black" : "white",
                display: grid,
                paddingBottom: 20

            }}>Welcome To My Project Page! Click Below To See My Portfolio!

            <Link to="/WordleStyleGame">
                <Box style={{
                    color: theme === "light" ? "white" : "black",
                    background: theme === "light" ? "black" : "white",
                    borderRadius: 20,
                    padding: 40,
                    margin: 20
                }}>New Song Everyday - hows much of the lyrics can you fill in ?</Box>
            </Link>

            <Link to="/Battleships">
                <Box style={{
                    color: theme === "light" ? "white" : "black",
                    background: theme === "light" ? "black" : "white",
                    borderRadius: 20,
                    padding: 40,
                    margin: 20
                }}>Battleships</Box>
            </Link>

            <Link to="/SudokuSolver">
                <Box style={{
                    color: theme === "light" ? "white" : "black",
                    background: theme === "light" ? "black" : "white",
                    borderRadius: 20,
                    padding: 40,
                    margin: 20
                }}>The Sudoku Solver</Box>
            </Link>

            <Link to="/ProjectTBC">
                <Box style={{
                    color: theme === "light" ? "white" : "black",
                    background: theme === "light" ? "black" : "white",
                    borderRadius: 20,
                    padding: 40,
                    margin: 20
                }}>Economics Related Project</Box>
            </Link>

        </div>
    )
}

export default Homepage