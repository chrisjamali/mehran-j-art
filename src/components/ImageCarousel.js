import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

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
    <Box>
      <Flex justifyContent='center' alignItems='center'>
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label='Previous Image'
          onClick={prevImage}
        />
        <Image
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex}`}
          boxSize='500px'
          objectFit='cover'
        />
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label='Next Image'
          onClick={nextImage}
        />
      </Flex>
    </Box>
  );
};

export default ImageCarousel;
