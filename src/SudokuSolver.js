import SudokuGrid from "./SudokuGrid";
import { useTheme } from "./ThemeContext"


function SudokuSolver() {
    const { theme } = useTheme();
    return (
        <div>This is the SudokuSolver


            <SudokuGrid />


        </div>
    )
}

export default SudokuSolver