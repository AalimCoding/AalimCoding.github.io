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

            }}><h1>Welcome To My Project Page! Click Below To See My Portfolio!</h1>

            <Link to="/WordleStyleGame">
                <Box style={{
                    color: theme === "light" ? "black" : "white",
                    background: theme === "light" ? "white" : "black",
                    border: "3px solid",
                    borderRadius: 20,
                    padding: 40,
                    margin: 20
                }}><h2>New Song Everyday - hows much of the lyrics can you fill in ? or guess the book by the quotes</h2></Box>
            </Link>

            <Link to="/Battleships">
                <Box style={{
                    color: theme === "light" ? "black" : "white",
                    background: theme === "light" ? "white" : "black",
                    border: "3px solid",
                    borderRadius: 20,
                    padding: 40,
                    margin: 20
                }}><h2>Battleships</h2></Box>
            </Link>

            <Link to="/SudokuSolver">
                <Box style={{
                    color: theme === "light" ? "black" : "white",
                    background: theme === "light" ? "white" : "black",
                    border: "3px solid",
                    borderRadius: 20,
                    padding: 40,
                    margin: 20
                }}><h2>The Sudoku Solver</h2></Box>
            </Link>

            <Link to="/ProjectTBC">
                <Box style={{
                    color: theme === "light" ? "black" : "white",
                    background: theme === "light" ? "white" : "black",
                    border: "3px solid",
                    borderRadius: 20,
                    padding: 40,
                    margin: 20
                }}><h2>Economics Related Project</h2></Box>
            </Link>

        </div>
    )
}

export default Homepage