import { ThemeProvider, useTheme } from "./ThemeContext";
import DarkModeSwitch from "./DarkModeSwitch";

function Body() {
    const { theme } = useTheme();
    return (
        <div       style={{
            color: theme === "light" ? "black" : "white",
          }}>This is the body element</div>
    )
}

export default Body