import Nav from "./Nav";
import DarkModeSwitch from "./DarkModeSwitch";
import { useTheme } from "./ThemeContext";
import { Flex ,Spacer} from "@chakra-ui/react";

function Header() {
    const { theme } = useTheme();
    return (
        <div style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
        }}>
            <Flex spacing={20} alignItems="center" padding={10}>
                <Nav />
                <Spacer/>
                <DarkModeSwitch />
            </Flex>
        </div>


    )
}

export default Header;