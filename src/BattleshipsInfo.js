import { useTheme } from "./ThemeContext"
import { Box, HStack } from "@chakra-ui/react";

// provide a default value of false to prevent errors.
function BattleshipsInfo({ showInfo = false }) {
    const { theme } = useTheme();
    if (showInfo) {
        return (

            <Box style={{
                background: theme === "light" ? "white" : "black",
                color: theme === "light" ? "black" : "white",
            }}>

                Battleships is a 10x10 grid based game in which it is your job to destroy the battleships of your oponent.
                To do this, you must destroy all the tiles which their battleships occupy by choosing a weapon type and then selecting a tile to target.

                <HStack>
                    Types of Tile:

                    <Box>Grey Tiles: These tiles have not yet been hit.</Box>
                    <Box>Purple Tiles: Hit these tiles for ammo.</Box>
                    <Box >Blue Tiles: These tiles show the empty ocean.  </Box>
                    <Box>Orange Tiles: These tiles show part of a boat on fire!</Box>


                </HStack>

                <HStack >Types of Weapon:
                    <Box>Normal: Hits only the selected tile. Infinite ammo.</Box>
                    <Box>Large: Hits the selected tile and all adjacent tiles. Finite ammo.</Box>
                    <Box>Scatter: Hits the selected tile, and some other tiles at random. Finite ammo.</Box>

                </HStack>

            </Box>
        )
    }

    return null
}

export default BattleshipsInfo;