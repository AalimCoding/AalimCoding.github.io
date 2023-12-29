import { Box, useRadio } from "@chakra-ui/react"
import { useTheme } from "./ThemeContext";


function RadioCardWeapons(props) {
  const { theme } = useTheme();
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='2px'
        borderRadius='md'
        boxShadow='md'


        _checked={{
          bg: 'orange',
          color: theme === 'light' ? 'black' : 'white',
          borderColor: theme === 'light' ? 'black' : 'white',
        }}

        _focus={{
          boxShadow: 'outline',
        }}

        px={5}
        py={3}

      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCardWeapons