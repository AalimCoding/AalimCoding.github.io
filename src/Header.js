import Nav from "./Nav";
import DarkModeSwitch from "./DarkModeSwitch";
import { useTheme } from "./ThemeContext";
import { Box, Center, HStack } from "@chakra-ui/react";

function Header() {
    const { theme } = useTheme();
    return (
        <div style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
        }}>This is the header element contianing Nav and DarkModeSwitch
            <HStack spacing={20} alignItems="center">
                <Nav />
                <DarkModeSwitch />
            </HStack>
        </div>


    )
}

export default Header;