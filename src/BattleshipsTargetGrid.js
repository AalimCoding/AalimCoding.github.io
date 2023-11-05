import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { Grid, Box } from '@chakra-ui/react';



const TargetGrid = ({ noOfGrid, theme, whoseTurnIsIt, winner, gridItems, Ammo }) => {
  return (
    <Box
      style={{
        background: whoseTurnIsIt === noOfGrid ? 'green' : theme === 'light' ? 'black' : 'white',
        color: theme === 'light' ? 'white' : 'black',
      }}
    >
      {noOfGrid === 0 ? 'Your Targets' : "Your Opponent's Targets"}
      <FontAwesomeIcon
        icon={faCrown}
        size="2x"
        style={{
          background: whoseTurnIsIt === noOfGrid ? 'green' : theme === 'light' ? 'black' : 'white',
          color: winner[noOfGrid] === 1 ? 'yellow' : whoseTurnIsIt === noOfGrid ? 'green' : theme === 'light' ? 'black' : 'white',
        }}
      />
      <Grid width={300} height={300} templateColumns='repeat(10, 1fr)' templateRows='repeat(10, 1fr)' gap={2} background={'blue'} padding={4}>
        {gridItems[noOfGrid]}
      </Grid>
      <Box>
        <ControlRadioButtons noOfGrid={noOfGrid} Ammo={Ammo} />
      </Box>
    </Box>
  );
};

export default TargetGrid;
