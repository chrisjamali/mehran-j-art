import styles from './Footer.module.scss';

const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      &copy;&nbsp;
      <a href='https://www.linkedin.com/in/chris-jamali/'> Website made by Chris Jamali</a>,{' '}
      {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;