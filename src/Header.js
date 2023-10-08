import Nav from "./Nav";
import DarkModeSwitch from "./DarkModeSwitch";
import { useTheme } from "./ThemeContext";

function Header() {
    const { theme } = useTheme();
    return (
        <div style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
        }}>This is the header element contianing Nav and DarkModeSwitch
            <Nav />
            <DarkModeSwitch />
        </div>


    )
}

export default Header;