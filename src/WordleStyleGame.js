import { useTheme } from "./ThemeContext"
import { Box, grid } from "@chakra-ui/react";

function WordleStyleGame(){
    const { theme } = useTheme();
    return(
        <div>This is the WordleStyleGame</div>
    )
}

export default WordleStyleGame