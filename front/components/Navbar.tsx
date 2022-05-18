// import useTranslation from 'next-translate/useTranslation';

import { useTranslation } from 'next-i18next';

import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.scss';

const Navbar = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <div className={styles.background}>
      <Link href={'/'}>
        <h1 className={styles.title}>{t('time')}</h1>
      </Link>
      <Link href={'/new'}>
        <h1 className={styles.title}>{t('new')}</h1>
      </Link>
      <Link href={router.asPath} locale={'en'}>
        <a>EN</a>
      </Link>
      <Link href={router.asPath} locale={'ua'}>
        <a>UA</a>
      </Link>
    </div>
  );
};

export default Navbar;
