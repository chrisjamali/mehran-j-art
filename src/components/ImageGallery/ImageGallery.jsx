import React from 'react'
import Image from 'next/image'
import styles from './ImageGallery.module.css'
import Button from '../Button/Button'

const ImageGallery = () => {
  return ( 
    <div>
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
        
        </div>
  )
}

export default ImageGallery