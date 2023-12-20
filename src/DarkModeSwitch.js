import { useTheme } from "./ThemeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@chakra-ui/react";

function DarkModeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (

        <label className="DarkModeSwitch">Dark Mode Switch
        <Box onClick={toggleTheme}  id="darkModeSwitch" data-testid="darkModeSwitch">
            <FontAwesomeIcon icon={faMoon} size="2x"  style={{
                            background: theme === "light" ? "white" : "black",
                            color: theme === "light" ? "black" : "chartreuse",
                        }} />
                        </Box>
        </label>
    )
}

export default DarkModeSwitch;