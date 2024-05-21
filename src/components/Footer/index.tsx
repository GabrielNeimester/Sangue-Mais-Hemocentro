'use client'

import {
  Box,

  Container,
  Stack,


} from '@chakra-ui/react'



export default function Footer() {
  return (
    <Box
      bg={'#E31515'}
      color={'#FFF4F4'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'row', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'flex-start' }}
        align={{ base: 'center', md: 'center' }}>
            <svg width="16" height="30" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 0L25.1913 21.1268H1.80866L13.5 0Z" fill="#FFF4F4" />
            <ellipse cx="13.5" cy="27.5" rx="13.5" ry="12.5" fill="#FFF4F4" />
            <path d="M12.64 30.3764V19.2884H15.736V30.3764H12.64ZM8.488 26.2964V23.3684H19.912V26.2964H8.488Z" fill="#F62424" />
          </svg>
             <h1>Sangue Mais (2024)</h1>
      </Container>
 
    </Box>
  )
}