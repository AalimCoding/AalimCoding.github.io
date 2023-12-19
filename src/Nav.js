import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {  HStack } from "@chakra-ui/react";
import { useTheme } from "./ThemeContext";


const socials = [
    {
        icon: faGithub,
        url: "https://github.com/AalimCoding/ProjectsWebsite"
    },
    {
        icon: faLinkedin,
        url: "https://www.linkedin.com/in/aalim-khan/"
    },
    {
        icon: faLaptopCode,
        url: "https://leetcode.com/AalimKhan/"
    },
]

function Nav() {
        const { theme } = useTheme();
    return (
        <div>

            <HStack>
                {socials.map(({ icon, url }) => (
                    <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer">
                        <FontAwesomeIcon icon={icon} size="2x"  data-testid="moon-svg" // Add data-testid for testing
                        key={url} style={{
                            background: theme === "light" ? "white" : "black",
                            color: theme === "light" ? "black" : "white",
                        }} />
                    </a>
                ))}
            </HStack>
        </div>
    )
}

export default Nav;