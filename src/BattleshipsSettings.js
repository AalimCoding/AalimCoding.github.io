import { useTheme } from "./ThemeContext"
import { Box, Radio, RadioGroup, } from "@chakra-ui/react";

// provide a default value of false to prevent errors.
function BattleshipsSettings({ showSettings = false, Gamemode, setGamemode }) {
    const { theme } = useTheme();
    if (showSettings) {
        return (

            <Box style={{
                background: theme === "light" ? "white" : "black",
                color: theme === "light" ? "black" : "white",
            }}>

                Placeholder for settings.
                <Box >Opponent:

                    <RadioGroup display onChange={setGamemode} value={Gamemode}>
                        <Radio value='CPU'>CPU</Radio>
                        <Radio value='Player'>Player</Radio>

                    </RadioGroup>
                </Box>

            </Box>
        )
    }

    return null
}

export default BattleshipsSettings;