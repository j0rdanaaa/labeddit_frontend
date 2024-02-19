import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import logo from '../assets/logos/logo-page-login.png'

const ErrorPage = () => {
  return (
    <>
    <Flex
      w="428px"
      h="120vh"
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        padding='50px'
      >
        <Image
          w="84px"
          h="84px"
          src={logo}
          alt='logo'
        />
        <Text
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize='36px'
          fontWeight='700'
        >
          LabEddit
        </Text>
        <Text
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize='24px'
          fontWeight='700'
        >
          Error Page
        </Text>
      </Flex>

    </Flex>
    </>
  )
}

export default ErrorPage