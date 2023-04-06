
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
// import Link from 'next/link'
import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';
import Banner from '../../public/images/mehran-banner-cropped.jpg';
import Acrylic from '../../public/images/Acrylic.jpg';
import OilPainting from '../../public/images/Oil_painting.jpg';
import Sketch from '../../public/images/Sketch.jpg';
import { useRouter } from 'next/router';
// import images from '@data/images';
import { search, mapImageResources, getFolders } from '../lib/cloudinary';
import styles from '@styles/Gallery.module.scss';
import Link from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Center,
  Text,
  SimpleGrid,
  Highlight,
} from '@chakra-ui/react';
import ImgLink from '../components/ImgLink';
export default function Gallery({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  totalCount: defaultTotalCount,
  folders,
}) {
  const mediums = [
    {
      name: 'Acrylic Paintings',
      path: 'Mehran_Jamali_Art/Acrylic Paintings',
      img: Acrylic,
    },
    {
      name: 'Oil Paintings',
      path: 'Mehran_Jamali_Art/Oil Paintings',
      img: OilPainting,
    },
    { name: 'Sketches', path: 'Mehran_Jamali_Art/Sketches', img: Sketch },
  ];
  return (
    <Layout>
      <Head>
        <title>Mehran Jamali Art</title>
        <meta name='description' content='Mehran Jamali Art' />
      </Head>

      <Container>
        <h1 className='sr-only'>Mehran Jamali Art</h1>

        <Center>
          <Heading fontSize={'60px'} mb={'1em'}>
            Gallery
          </Heading>
        </Center>
        <Center mb={'2em'}>
          {/* <ul className={styles.mediums}> */}
          <SimpleGrid minChildWidth='250px' columns={'3'} spacing='3em'>
            {mediums.map((folder, i) => {
              // console.log(folder);
              return (
                <>
                  <Center>
                    <Box height={'250px'} width='250px'>
                      <ImgLink
                        href={{
                          pathname: `/art/${encodeURIComponent(folder.path)}`,
                        }}
                        imageUrl={folder.img.src}
                        // children = {folder.name}
                        key={`link-${i}`}
                      >
                        <Center style={{ display: 'flex' }}>
                          <Text
                            color='white'
                            fontSize='xl'
                            textShadow='5px 1px gray.600'
                            
                          >
                            <Highlight
                              query={folder.name}
                              styles={{
                                px: '2',
                                py: '1',
                                rounded: 'full',
                                bg: 'gray.900',
                                opacity: '0.7',
                                color: 'white',
                              }}
                              style={{ margin: 'auto' }}
                            >
                              {folder.name}
                            </Highlight>
                          </Text>
                        </Center>
                      </ImgLink>
                    </Box>
                  </Center>
                </>
              );
            })}
          </SimpleGrid>
          {/* </ul> */}
        </Center>
        {/* <ul className={styles.images}>
          {images.map((image) => {
            // console.log(image);
            return (
              <li key={image.id}>
                <a href={image.link} rel='noreferrer'>
                  <div className={styles.imageImage}>
                    <Image
                      width={image.width}
                      height={image.height}
                      src={image.image}
                      alt=''
                    />
                  </div>
               
                </a>
              </li>
            );
          })}
        </ul>
        <p>
          <Button onClick={handleLoadMore}>Load More</Button>
      // const [images, setImages] = useState(defaultImages);
  // const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  // const [activeFolder, setActiveFolder] = useState('Mehran_Jamali_Art');
  // console.log(activeFolder);
  // async function handleLoadMore(event) {
  //   event.preventDefault();
  //   const results = await fetch('/api/search', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       expression: `folder="${activeFolder}"`,
  //       nextCursor,
  //     }),
  //   }).then((r) => r.json());
  //   const { resources, next_cursor: updatedNextCursor } = results;

  //   const images = mapImageResources(resources);

  //   setImages((prevImages) => [...prevImages, ...images]);
  //   setNextCursor(updatedNextCursor);
  // }

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

          <ul className={styles.folders}>
            {folders.map((folder, i) => {
              console.log(folder);
              return (
                <li key={`${folder.path} ${i} `}>
                  <Link
                    href={{
                      pathname: `/art/${encodeURIComponent(folder.path)}`,
                    }}
                    key={`link-${i}`}
                  >
                    <a data-folder-path={folder.path}>{folder.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </p> */}
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

  const results = await search({ expression: 'folder="Mehran_Jamali_Art"' });

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
