import { search, mapImageResources, getFolders } from '../../lib/cloudinary';
import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@styles/Home.module.scss';
import { useState, useEffect } from 'react';
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
  const results = await fetch('http://localhost:3000/api/search', {
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
  console.log(images.length, totalCount);

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
      const results = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        body: JSON.stringify({
          expression: `folder="${medium}"`,
          nextCursor,
        }),
      }).then((r) => r.json());
      const { resources, next_cursor: updatedNextCursor } = results;
      const images = mapImageResources(resources);
      console.log('length', images.length);
      const uniqueImages = images.reduce((accumulator, currentImage) => {
        const isDuplicate = accumulator.find(
          (image) => image.id === currentImage.id
        );

        if (!isDuplicate) {
          accumulator.push(currentImage);
        }

        return accumulator;
      }, []);
      setImages((prevImages) => [ ...uniqueImages]);
      setNextCursor(updatedNextCursor);
      console.log('USEEFFECCTS', images);
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
       
        <div style = {{textAlign: 'center'}}>
          <h1 className={styles.header}>{medium.replace('Mehran_Jamali_Art/', ' ')}</h1>
        </div>

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
        { totalCount > images.length ?
        <p>
            <button onClick ={handleLoadMore} > MORE </button>
        </p>
     : null   
    }
      </Container>
    </Layout>
  );
};

export default Medium;
