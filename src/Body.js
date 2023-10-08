import { useTheme } from "./ThemeContext";

function Body() {
    const { theme } = useTheme();
    return (
        <div
            style={{
                background: theme === "light" ? "white" : "black",
                color: theme === "light" ? "black" : "white",
            }}>This is the body element</div>
    )
}

export default Body