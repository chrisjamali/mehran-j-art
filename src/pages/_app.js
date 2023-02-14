import '@styles/globals.scss';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    gray: '#BFBFBF',
    darkBlue: '#030140',
    medBlue: '#1A1C40',
    brown: '#8C7C6D',
    white: '#F2F2F2',
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
