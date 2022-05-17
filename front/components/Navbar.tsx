import Link from 'next/link';
import styles from '../styles/Navbar.module.scss';

const Navbar = ({ title }) => {
  return (
    <div className={styles.background}>
      <Link href={'/'}>
        <h1 className={styles.title}>TIME</h1>
      </Link>
    </div>
  );
};

export default Navbar;
