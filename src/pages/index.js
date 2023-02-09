import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

// import images from '@data/images';
import { search, mapImageResources, getFolders } from '../lib/cloudinary';
import styles from '@styles/Home.module.scss';

export default function Home({ images : defaultImages, nextCursor: defaultNextCursor, folders }) {

  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [activeFolder, setActiveFolder] = useState('');
  async function handleLoadMore(event) {
    event.preventDefault();
    const results = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        // expression: `folder=""`,
        nextCursor,
      }),
    }).then((r) => r.json());
    const { resources, next_cursor: updatedNextCursor } = results;

    const images = mapImageResources(resources);

    setImages((prevImages) => [...prevImages, ...images]);
    setNextCursor(updatedNextCursor);
  }

  function handleOnFolderClick(event) {
    event.preventDefault();
    const folderPath = event.target.dataset.folderPath;
    setActiveFolder(folderPath);
    setNextCursor(null);
    setImages([]);
  }

  return (
    <Layout>
      <Head>
        <title>My Images</title>
        <meta name='description' content='All of my cool images.' />
      </Head>

      <Container>
        <h1 className='sr-only'>My Images</h1>

        <h2 className={styles.header}>Images</h2>

        <ul className={styles.folders} onClick ={handleOnFolderClick}>
          {folders.map((folder) => {
            return (
              <li key={folder.path}>
                <button data-folder-path={folder.path } >{folder.name}</button>
                
              </li>
            );
          })}
        </ul>
        <p>
          <Button onClick={handleLoadMore}>Load More</Button>
        </p>
      </Container>
    </Layout>
  );
}

// get images from cloudinary admin api using authentication headers with the api key and secret

export async function getStaticProps() {
  const results = await search(
  {  expression: 'folder=""'}
  );

  const { resources, next_cursor: nextCursor } = results;
  const images = mapImageResources(resources);
  const {folders} = await getFolders();

    console.log('folders', folders);

  return {
    props: {
      images,
      nextCursor : nextCursor || null,
      folders,
    },
  };
}
