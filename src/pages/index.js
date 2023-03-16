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

        <h2 className={styles.header}>Images</h2>

        {/* <ul className={styles.folders} onClick={handleOnFolderClick}>
          {folders.map((folder) => {
            // console.log(folder);
            return (
              <li key={folder.path}>
                <button data-folder-path={folder.path}>{folder.name}</button>
              </li>
            );
          })}
        </ul> */}
        <h2>IMAGES</h2>
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
          {/* <ul className={styles.folders}>
            {folders.map((folder, i) => {
              console.log(folder);
              return (
                
                  <li key={`${folder.path} ${i} `}
                  
                    <button data-folder-path={folder.path}>
                      <Link  href = {{
                pathname: `/gallery/${encodeURIComponent(folder.name)}`
                 }}>
                      {folder.name}
                      </Link>
                    </button>
                  </li>
               
              );
            })}
          </ul> */}

          <ul className={styles.folders}>
            {folders.map((folder, i) => {
              console.log(folder);
              return (
                <li key={`${folder.path} ${i} `}>
                  <Link
                    href={{
                      pathname: `/art/${encodeURIComponent(folder.path)}`,
                    }}
                    key = {`link-${i}`}
                  >
                    <a
                      data-folder-path={folder.path}
                      
                    >
                      {folder.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </p>
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


