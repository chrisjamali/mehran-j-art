import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
// import Link from 'next/link'
import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';
import Banner from '../../public/images/mehran-banner-cropped.jpg';
import { useRouter } from 'next/router';
// import images from '@data/images';
import { search, mapImageResources, getFolders } from '../lib/cloudinary';
import styles from '@styles/Home.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Spinner, Center, Box, Text } from '@chakra-ui/react';
// import { images } from 'next.config';
import ImageCarousel from '@components/ImageCarousel';
export default function Home({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  totalCount: defaultTotalCount,
  folders,
}) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [activeFolder, setActiveFolder] = useState('Mehran_Jamali_Art');
  console.log(activeFolder);
  async function handleLoadMore(event) {
    event.preventDefault();
    const results = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        expression: `folder="${activeFolder}"`,
        nextCursor,
      }),
    }).then((r) => r.json());
    const { resources, next_cursor: updatedNextCursor } = results;

    const images = mapImageResources(resources);

    setImages((prevImages) => [...prevImages, ...images]);
    setNextCursor(updatedNextCursor);
  }

  // function handleOnFolderClick(event) {
  //   event.preventDefault();
  //   const folderPath = event.target.dataset.folderPath;
  //   setActiveFolder(folderPath);
  //   setNextCursor(null);
  //   setImages([]);
  // }

  // useEffect(() => {
  //   (async function run() {
  //     const results = await fetch('/api/search', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         expression: `folder="${activeFolder}"`,
  //         nextCursor,
  //       }),
  //     }).then((r) => r.json());
  //     const { resources, next_cursor: updatedNextCursor } = results;

  //     const images = mapImageResources(resources);

  //     setImages((prevImages) => [...prevImages, ...images]);
  //     setNextCursor(updatedNextCursor);
  //   })();
  // }, [activeFolder, nextCursor]);
// console.log(images);
  return (
    <Layout>
      <Head>
        <title>Mehran Jamali Art</title>
        <meta name='description' content='Mehran Jamali Art' />
      </Head>

      <motion.div
        animate={{ x: 0 }}
        initial={{ x: 300 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={Banner}
          height={650}
          style={{
            minHeight: '30vh',
            maxHeight: '700px',
            width: '100%',
          }}
        />
      </motion.div>
      <Container>
        <h1 className='sr-only' fontSize='6xl'>
          Mehran Jamali Art
        </h1>

        <motion.div
          animate={{ x: 0 }}
          initial={{ x: -200 }}
          transition={{ duration: 1 }}
        >
          <Box>
            {/* <div className={styles.wave2}>
              <svg
                data-name='Layer 1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 1200 120'
                preserveAspectRatio='none'
              >
                <path
                  d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
                  className={styles.shapefill}
                ></path>
              </svg>
            </div> */}
            <Center>
              <Text
                textAlign={'center'}
                bgGradient='linear(to-l, #252533, #8a8ae3)'
                bgClip='text'
                fontSize='6xl'
                fontWeight='extrabold'
              >
                Mehran Jamali
              </Text>
            </Center>

            <Center>
              <Text fontSize={'2xl'} as = 'i'>Multi-media artist based in Los Angeles.</Text>
            </Center>
          </Box>
        </motion.div>
        <Link href='/gallery'>
          <ImageCarousel images={images} />
        </Link>
      </Container>
    </Layout>
  );
}

// get images from cloudinary admin api using authentication headers with the api key and secret
/**
 * GetStaticPaths() is a function that returns an object with a paths property and a fallback property.
 * The paths property is an array of objects that have a params property. The params property is an
 * object that has a property for each parameter in the page's dynamic route. The fallback property is
 * a boolean that tells Next.js whether or not to statically generate the page
 * @returns An object with two properties:
 *   paths: An array of objects with a params property.
 *   fallback: A boolean or string.
 */
// export async function getStaticPaths() {
//   const { folders } = await getFolders();
//   const paths = folders.map((folder) => {
//     params: {
//       art: folder.path;
//     }
//   });
//   return {
//     paths,
//     fallback: false, // can also be true or 'blocking'
//   };
// }
export async function getStaticProps() {
  // const results = await fetch('/api/search', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     expression: `folder="${activeFolder}"`,
  //     nextCursor,
  //   }),
  // }).then((r) => r.json());
  const results = await search({ expression: 'folder="Mehran_Jamali_Art/Oil Paintings"' });

  const {
    resources,
    next_cursor: nextCursor,
    total_count: totalCount,
  } = results;
  const images = mapImageResources(resources);
  const { folders } = await getFolders();

  console.log('resources', resources);

  return {
    props: {
      images,
      nextCursor: nextCursor || null,
      folders,
      totalCount,
    },
  };
}



