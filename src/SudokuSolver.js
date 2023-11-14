import SudokuGrid from "./SudokuGrid";
import SudokuSubmitButton from "./SudokuSubmitButton";
import { useTheme } from "./ThemeContext"


function SudokuSolver() {
    const { theme } = useTheme();
    return (
        <div
        
        style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
        }}>This is the SudokuSolver.
            Enter a Sudoku to be solved. It will complete the Sudoku, with black numbers denoting the initial entries and green showing the new entries.
            It will fill in as much as possible and then stop. This indicates there are no further definite steps that cna be taken, i.e. there is not wenough information to get to a UNIQUE solution,
            which may sometimes mean there is not enough information to get any solution.


            <SudokuGrid />

            <SudokuSubmitButton/>


        </div>
    )
}

export default SudokuSolver