import SudokuGrid from "./SudokuGrid";
import { useTheme } from "./ThemeContext"


function SudokuSolver() {
    const { theme } = useTheme();
    return (
        <div

            style={{
                background: theme === "light" ? "white" : "black",
                color: theme === "light" ? "black" : "white",
            }}>
                <h1>This is the SudokuSolver.</h1>
            <p>Enter a Sudoku to be solved. It will complete the Sudoku, with bold numbers denoting the initial entries.
            It will fill in as much as possible and then stop. This indicates there are no further definite steps that cna be taken, i.e. there is not wenough information to get to a UNIQUE solution,
            which may sometimes mean there is not enough information to get any solution.</p>

          {/*   TODO - Select number to click and input this number.
            Select number to see only cells with that vlue highlighted.
            Add messages for each step of solution.
            Add ability to add thermo sudoku or cages. */}
        
            
            <SudokuGrid />



        </div>
    )
}

export default SudokuSolver