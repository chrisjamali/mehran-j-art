import { search, mapImageResources, getFolders } from '../../lib/cloudinary';
import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';
import Head from 'next/head';
import Image from 'next/image';

import styles from '@styles/Home.module.scss';
import { useState, useEffect } from 'react';
import { Spinner, Center, Box , Heading, Text, Card} from '@chakra-ui/react';

export const getStaticPaths = async () => {
  const { folders } = await getFolders();
  const paths = folders.map((folder) => {
    return {
      params: { medium: folder.path.toString() },
    };
  });
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps = async (context) => {
  const { medium } = context.params;
  const apiUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/search`
    : 'http://localhost:3000/api/search';

  const results = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      expression: `folder="${medium}"`,
    }),
  }).then((r) => r.json());
  const {
    resources,
    total_count: totalCount,
    next_cursor: nextCursor,
  } = results;

  const images = mapImageResources(resources);


  return {
    props: {
      medium,
      nextCursor: nextCursor || null,
      images,
      totalCount,
    },
  };
};

const Medium = ({
  medium,
  nextCursor: defaultNextCursor,
  images: defaultImages,
  totalCount : defaultTotalCount
}) => {
  const [images, setImages] = useState([]);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
    const [totalCount, setTotalCount] = useState(defaultTotalCount);
  useEffect(() => {
    (async function run() {
  const apiUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/search`
    : 'http://localhost:3000/api/search';

    const results = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        expression: `folder="${medium}"`,
        nextCursor,
      }),
    }).then((r) => r.json());
      const { resources, next_cursor: updatedNextCursor } = results;
      const images = mapImageResources(resources);
   
      setImages((prevImages) => [ ...images]);
      setNextCursor(updatedNextCursor);
    
    })();
  }, []);


async function handleLoadMore(event) {
  event.preventDefault();
  const results = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify({
      expression: `folder="${medium}"`,
      nextCursor,
    }),
  }).then((r) => r.json());
  const { resources, next_cursor: updatedNextCursor } = results;

  const images = mapImageResources(resources);

  setImages((prevImages) => [...prevImages, ...images]);
  setNextCursor(updatedNextCursor);
}

  return (
    <Layout>
      <Container>
        <Center mb='3em' mt='2em'>
          {/* <div style={{ textAlign: 'center' }}> */}

          <Heading fontSize='5xl' as='u'>
            {medium.replace('Mehran_Jamali_Art/', ' ')}
          </Heading>

          {/* </div> */}
        </Center>

        <Card mb='3em' p='3em'>
          <ul className={styles.images}>
            {images.map((image) => {
              // console.log(image);
              return (
                <li key={image.id}>
                  <Card p='0.5em'>
                    <a href={image.link} rel='noreferrer'>
                      {/* <div className={styles.imageImage}> */}
                      <Image
                        width={image.width + 200}
                        height={image.height + 100}
                        src={image.image}
                        alt={image.title}
                      />
                      {/* </div> */}
                      {/* <h3 className={styles.imageTitle}>{image.title}</h3> */}
                    </a>
                  </Card>
                </li>
              );
            })}
          </ul>
        </Card>
        {totalCount > images.length ? (
          <>
            <Center>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Center>
          </>
        ) : null}
      </Container>
    </Layout>
  );
};

export default Medium;
