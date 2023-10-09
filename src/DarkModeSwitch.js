import { useTheme } from "./ThemeContext";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

function DarkModeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (

        <label className="DarkModeSwitch">Dark Mode? (Make This Button A Moon That Turns Green In A Box)
            <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
            />
        </label>
    )
}

export default DarkModeSwitch;