import { useTheme } from "./ThemeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

function DarkModeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (

        <label className="DarkModeSwitch">
        <Box onClick={toggleTheme}  >
            <FontAwesomeIcon icon={faMoon} size="2x"  style={{
                            background: theme === "light" ? "white" : "black",
                            color: theme === "light" ? "black" : "lime",
                        }} />
                        </Box>
        </label>
    )
}

export default DarkModeSwitch;