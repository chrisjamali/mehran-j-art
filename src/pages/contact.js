// import React from 'react'

// const Contact = () => {
//   return (
//     <div>contact</div>
//   )
// }

// export default Contact

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Textarea,
} from '@chakra-ui/react';
import Layout from '@components/Layout';
import Container from '@components/Container';
function ContactMe() {
  return (
    <Layout>
      <Container>
        <Flex minH={'100vh'}  align={'center'} justify={'center'} bg={'gray.50'}>
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
        </Flex>
      </Container>
    </Layout>
  );
}

export default ContactMe;