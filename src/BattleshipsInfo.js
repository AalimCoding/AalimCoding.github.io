import { useTheme } from "./ThemeContext"
import { useState, useEffect } from "react";
import RadioCardWeapons from "./RadioCardWeapons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Box, Grid, GridItem, HStack, Radio, RadioGroup, Stack, useRadioGroup } from "@chakra-ui/react";

// provide a default value of false to prevent errors.
function BattleshipsInfo({ showInfo = false }) {
    const { theme } = useTheme();
    if (showInfo) {
        return (

            <Box style={{
                background: theme === "light" ? "white" : "black",
                color: theme === "light" ? "black" : "white",
            }}>This box is a placeholder the info box explaining the rules of Battleships
                Battleships is a 10x10 grid based game in which it is your job to destroy the battleships of your oponent.
                To do this, you must destroy all the tiles which their battleships occupy by choosing a weapon type and then selecting a tile to target.



                <HStack >Types of Tile:
                    <Grid width={40}
                        height={40}
                        templateColumns='repeat(1, 1fr)'
                        templateRows='repeat(4, 1fr)'
                        gap={2}
                        background={"blue"}
                        padding={5}>
                        <GridItem
                            aspectRatio='1/1' bg={"purple"} borderRadius={3}
                        />
                        <GridItem
                            aspectRatio='1/1' bg={"grey"} borderRadius={3}
                        />
                        <GridItem
                            aspectRatio='1/1' bg={"blue"} borderRadius={3}
                        />
                        <GridItem
                            aspectRatio='1/1' bg={"orange"} borderRadius={3}
                        />

                    </Grid>
                    <Box>Grey Tiles: These tiles have not yet been hit.</Box>
                    <Box>Purple Tiles: These tiles have not yet been hit, and reward ammo when hit.</Box>
                    <Box>Blue Tiles: These tiles represent the empty ocean.</Box>
                    <Box>Orange Tiles: These tiles represent part of a boat on fire!</Box>
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