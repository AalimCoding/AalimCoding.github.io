import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { Grid, Box } from '@chakra-ui/react';
import { ControlRadioButtons } from "./ControlRadioButtons";



const TargetGrid = ({ noOfGrid, theme, whoseTurnIsIt, winner, gridItems, Ammo, setWeaponType, weaponType }) => {
  return (
    <Box
      style={{
        background: whoseTurnIsIt === noOfGrid ? 'green' : theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
        border: "3px solid",
        borderRadius: "10px"

      }}
    >
      <h2>{noOfGrid === 0 ? 'Your Targets' : "Your Opponent's Targets"}</h2>
      <FontAwesomeIcon
        icon={faCrown}
        size="2x"
        style={{
          background: whoseTurnIsIt === noOfGrid ? 'green' : theme === 'light' ? 'white' : 'black',
          color: winner[noOfGrid] === 1 ? 'yellow' : whoseTurnIsIt === noOfGrid ? 'green' : theme === 'light' ? 'black' : 'white',

        }}
      />
      <Grid width={300} height={300} templateColumns='repeat(10, 1fr)' templateRows='repeat(10, 1fr)' gap={2} background={'blue'} padding={4}
        style={{
          border: "3px solid",
          borderRadius: "10px",
          margin: "auto"

        }}>
        {gridItems[noOfGrid]}

      </Grid>
      <Box>
        <ControlRadioButtons noOfGrid={noOfGrid} Ammo={Ammo} setWeaponType={setWeaponType} weaponType={weaponType[noOfGrid]} whoseTurnIsIt={whoseTurnIsIt}
        />
      </Box>
    </Box>
  );
};

export default TargetGrid;
