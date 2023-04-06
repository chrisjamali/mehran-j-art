import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Image,
  IconButton,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Text,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import Link from 'next/link';
const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImageIndex((currentImageIndex + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  return (
    <Center mb='3em' mt='3em'>
      <Card width='80%' boxShadow='md'>
        <Center>
          <Link href='/gallery'>
            <CardHeader
              _hover={{ opacity: 0.7 }}
              cursor={'pointer'}
              transition='opacity 0.2s ease-in-out'
              bgGradient='linear(to-l, teal.400, teal.500)'
              bgClip='text'
              fontSize='4xl'
              size='lg'
              fontWeight='extrabold'
            >
              <Text
                // color='blue.900'
                as='u'
              >
                Check out my Gallery!
              </Text>
            </CardHeader>
          </Link>
        </Center>
        <CardBody>
          <Flex justifyContent='center' alignItems='center' mb='3em'>
            <IconButton
              icon={<ChevronLeftIcon />}
              aria-label='Previous Image'
              onClick={prevImage}
              margin='1em'
            />
            <Link href='/gallery'>
              <Image
                src={images[currentImageIndex].image}
                alt={`Image ${currentImageIndex}`}
                boxSize='370px'
                boxShadow='base'
                objectFit='cover'
                transition='opacity 0.2s ease-in-out'
                _hover={{ opacity: 0.8 }}
                opacity={1}
                cursor='pointer'
                onLoad={() => {
                  setCurrentImageIndex(currentImageIndex);
                }}
              />
            </Link>
            <IconButton
              icon={<ChevronRightIcon />}
              aria-label='Next Image'
              onClick={nextImage}
              margin='1em'
            />
          </Flex>
        </CardBody>
      </Card>
    </Center>
  );
};

export default ImageCarousel;
