// import React from 'react'

// const Contact = () => {
//   return (
//     <div>contact</div>
//   )
// }

// export default Contact

import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Textarea,
  VStack,
  Link,
  Text,
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import Layout from '@components/Layout';
import Container from '@components/Container';
import {
  FaInstagram,
  FaFacebookF,
  FaRegEnvelope,
  FaPhoneAlt,
} from 'react-icons/fa';
function ContactMe() {
  return (
    <Layout>
      <Container>
        {/* <Flex minH={'100vh'}  align={'center'} justify={'center'} bg={'gray.50'}>
          <Stack
            spacing={8}
            mx={'auto'}
            maxW={'lg'}
            py={12}
            px={35}
            bg={'white'}
            boxShadow={'lg'}
            rounded={'xl'}
          >
            <Heading fontSize={'3xl'}>Contact Me</Heading>
            <Box>
              <form>
                <Stack spacing={4}>
                  <FormControl id='name'>
                    <FormLabel>Name</FormLabel>
                    <Input type='text' />
                  </FormControl>
                  <FormControl id='email'>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' />
                  </FormControl>
                  <FormControl id='message'>
                    <FormLabel>Message</FormLabel>
                    <Textarea />
                  </FormControl>
                  <Stack spacing={10}>
                    <Button
                      type='submit'
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex> */}
        <Box minH='60vh'>
          <Card mt='2em' align='center' padding='3rem'>
            <Center mt='2em'>
              <Heading as='h1' size='xl'>
                Contact Me
              </Heading>
            </Center>
            <Center mb='2em'>
              <Text fontSize='l'>
                If you would like to contact me about art, please feel reach out
                to me through these platforms{' '}
              </Text>
            </Center>

            <Center>
              <VStack spacing={10} >
                <Link
                  href='https://www.instagram.com/your_username'
                  target='_blank'
                  rel='noopener noreferrer'
                  mx={2}
                >
                  <Box as={FaInstagram} boxSize='2.5rem' />
                </Link>
                <Link
                  href='https://www.facebook.com/MehranJamaliArt/'
                  target='_blank'
                  rel='noopener noreferrer'
                  mx={2}
                >
                  <Box as={FaFacebookF} boxSize='2.5rem' />
                </Link>
                <Flex>
                  <Box as={FaRegEnvelope} boxSize='2.5rem' />
                </Flex>
                <Flex>
                  <Box as={FaPhoneAlt} boxSize='2.5rem' />
                </Flex>
              </VStack>
              <VStack spacing = '14' align = {'left'} position = 'relative' top = '.7rem' left = '1rem'>
                <Text>@ron_jamali</Text>
                <Text>Mehran Jamali Art</Text>
              <Text> jamaliron@gmail.com</Text>
              <Text>818-802-9362</Text>
              </VStack>
            </Center>
          </Card>
        </Box>
      </Container>
    </Layout>
  );
}

export default ContactMe;
