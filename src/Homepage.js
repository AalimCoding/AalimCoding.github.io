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

            }}>Welcome To My Project Page! Click Below To See My Portfolio!

            <Link to="/WordleStyleGame">
                <Box style={{
                    color: theme === "light" ? "white" : "black",
                    background: theme === "light" ? "black" : "white",
                    borderRadius: 20,
                    padding: 40,
                    margin: 20
                }}>Wordle Style Game</Box>
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
                }}>Project 4</Box>
            </Link>

        </div>
    )
}

export default Homepage