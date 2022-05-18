import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <div className={styles.background}>
      <Link href={'/'}>
        <h1 className={styles.title}>{t('time')}</h1>
      </Link>
    </div>
  );
};

export default Footer;
