import { useTheme } from "./ThemeContext";

function DarkModeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (

        <label className="DarkModeSwitch">Dark Mode?
            <input
                type="checkbox"
                checked={theme === "light"}
                onChange={toggleTheme}
            />
        </label>
    )
}

export default DarkModeSwitch;