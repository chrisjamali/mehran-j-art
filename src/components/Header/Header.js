import Link from 'next/link';

import Container from '@components/Container';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        
        <p className={styles.headerTitle}>
          <Link href='/'>
            <a>Mehran Jamali Art</a>
          </Link>
        </p>
       
      
        <Link href='/gallery'>
          <a>Gallery</a>
        </Link>
        

        <Link href='/bio'>
          <a>Biography</a>
        </Link>
        <Link href='/contact'>
          <a>Contact me</a>
        </Link>
       
      </Container>
    </header>
  );
}

export default Header;