import { useTheme } from "./ThemeContext";
function Footer() {
    const { theme } = useTheme()

    return (
        <div style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
        }}>This is the footer element</div>
    )
}

export default Footer