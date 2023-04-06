import React from 'react';
import Image from 'next/image';
import Container from '../components/Container/Container';
import Layout from '../components/Layout/Layout';
import Banner from '../../public/images/mehran-banner-cropped.jpg';
import { Box, Center, Heading, Text, VStack, Link } from '@chakra-ui/react';
const bio = () => {
  return (
    <Layout>
      <Container>
        <Image
          height={650}
          // style={{
          //   minHeight: '30vh',
          //   maxHeight: '700px',
          // }}
          src={Banner}
          alt='Artist'
        />
        <Center mb='3em'>
          <VStack spacing={6}>
            <Center>
            <Heading as='h1' fontSize='5xl'>
              Mehran Jamali Biography
            </Heading>
            </Center>
            <Text>
              Meet Mehran Jamali, a talented artist who has captured the hearts
              of many with his vibrant and colorful artwork. Born and raised in
              Abadan, a small town in Iran, He became Fascinated from a young
              age by the artistic elements of human faces. Mehran began
              sketching with pencil on paper from the age of seven. When
              Mehran’s teachers discovered his elite talent for pencil realism,
              they encouraged him to pursue a career in art, even going so far
              as to insist on hanging his drawings on the walls. As he continued
              his realism work, he began to pursue mixed medium projects on
              canvas in early adulthood.{' '}
            </Text>
            <Text>
              In 2005, Mehran met one of his inspirations in renowned Iranian
              architect, sculpture and painter Houshang Seyhoun, initiating an
              apprenticeship which spanned 5 years to 2010. Mr. Seyhoun served
              to embolden him to adopt a more brave and fearless style in his
              work, elevating his creativity to the next level. He began
              incorporating more contrast and textures, creating a unique depth
              and dimensionality that captivates viewers.
            </Text>
            <Text>
              Mehran’s work often explores the interplay between light and
              shadow, with textures that appear to shift and change depending on
              the angle and intensity of the light. His abstract pieces often
              evoke a sense of movement and energy, with layers of color and
              texture that seem to dance and swirl across the canvas. Today,
              Mehran continues to create stunning works of art that push the
              boundaries of traditional painting. His use of textures has become
              his signature style, and his pieces continue to captivate and
              inspire viewers around the world. He hopes to inspire others to
              pursue their own creative passions and to never be afraid to
              embrace the beauty and power of color.
            </Text>
          </VStack>
        </Center>
      </Container>
    </Layout>
  );
};

export default bio;
