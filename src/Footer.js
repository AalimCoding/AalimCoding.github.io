import { useTheme } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
    const { theme } = useTheme()

    return (
        <div style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
        }}>
            <Link to="/" className="nav-item">
                <FontAwesomeIcon icon={faHome} size="2x" style={{
                    background: theme === "light" ? "white" : "black",
                    color: theme === "light" ? "black" : "white",
                }} />
            </Link>
        </div>
    )
}

export default Footer