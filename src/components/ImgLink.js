import Link from 'next/link';
import { Box } from '@chakra-ui/react';

const CustomLink = ({ href, imageUrl, children }) => {
  return (
    <Link href={href} passHref>
      <Box
        as='a'
        display='inline-block'
        backgroundImage={`url(${imageUrl})`}
        backgroundSize='cover'
        backgroundPosition='center'
        width='100%'
        height='100%'
        boxShadow={'lg'}
        textAlign = 'center'
        _hover={{
          opacity: 0.8,
        }}
      >
        {children}
      </Box>
    </Link>
  );
};

export default CustomLink;
