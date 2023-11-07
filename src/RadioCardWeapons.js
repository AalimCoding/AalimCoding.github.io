import { Box,useRadio } from "@chakra-ui/react"


function RadioCardWeapons(props) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'

        _checked={{
          bg: 'orange',
          color: 'white',
          borderColor: 'white',
        }}

        _focus={{
          boxShadow: 'outline',
        }}

        px={5}
        py={3}
        colorScheme="orange"
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCardWeapons