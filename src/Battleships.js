import { useTheme } from "./ThemeContext"
import { Box, grid } from "@chakra-ui/react";

function Battleships(){
    const { theme } = useTheme();
    return(
        <div>This is the Battleships</div>
    )
}

export default Battleships