import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';
import Banner from '../../public/images/mehran-banner-cropped.jpg';
// import images from '@data/images';
import { search, mapImageResources, getFolders } from '../lib/cloudinary';
import styles from '@styles/Home.module.scss';

export default function Gallery({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  totalCount: defaultTotalCount,
  folders,
}) {
  const [images, setImages] = useState(defaultImages);
  const [sketches, setSketches] = useState([])
  const [acrylic, setAcrylic] = useState([])
  const [oil, setOil] = useState([])
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

    const sketchResults = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        expression: `folder="${activeFolder}"`,
        nextCursor,
      }),
    }).then((r) => r.json());
    const {  resources :sketchResources, next_cursor: updatedSketchNextCursor } = sketchResults;

    const images = mapImageResources(resources);
    console.log("IMAGES",images);
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

  useEffect(() => {
    (async function run() {
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
      console.log('line62', images);
      setNextCursor(updatedNextCursor);
    })();
  }, [activeFolder, nextCursor]);

  return (
    <Layout>
      <Head>
        <title>Mehran Jamali Art</title>
        <meta name='description' content='Mehran Jamali Art' />
      </Head>
      <Image src={Banner} height={800} />
      <Container>
        <h1 className='sr-only'>Mehran Jamali Art</h1>

        <h2 className={styles.header}>GALLERY</h2>

        <ul className={styles.folders} onClick={handleOnFolderClick}>
          {folders.map((folder) => {
            // console.log(folder);
            return (
              <li key={folder.path}>
                <button data-folder-path={folder.path}>{folder.name}</button>
              </li>
            );
          })}
        </ul>
        
        <ul className={styles.images}>
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
                  {/* <h3 className={styles.imageTitle}>{image.title}</h3> */}
                </a>
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
  // const results = await fetch('/api/search', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     expression: `folder="${activeFolder}"`,
  //     nextCursor,
  //   }),
  // }).then((r) => r.json());
  const results = await search({ expression: 'folder="Mehran_Jamali_Art"' });

  const {
    resources,
    next_cursor: nextCursor,
    total_count: totalCount,
  } = results;
  const images = mapImageResources(resources);
  const { folders } = await getFolders();

  console.log('resources', resources);
  console.log('FOLDERS', folders);

  return {
    props: {
      images,
      nextCursor: nextCursor || null,
      folders,
      totalCount,
    },
  };
}
