import { useTheme } from "./ThemeContext"


function SudokuSolver(){
    const { theme } = useTheme();
    return(
        <div>This is the SudokuSolver</div>
    )
}

export default SudokuSolver