import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import styles from '../styles/da.module.scss';
import style from '../styles/button.module.scss';
import MainLayout from '../layouts/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <MainLayout>
      Start
      <Button className={style.button1}>DA</Button>
      <PersonIcon style={{ color: '685248' }} />
      <h1 className={styles.trirong1}>TIME</h1>
      <h1 className={styles.trirong2}>TIME</h1>
      <h1 className={styles.noto}>{t('about-us')}</h1>
      <h1 className={styles.roboto1}>
        Almost before we knew it, we had left the ground.
      </h1>
      <h1 className={styles.roboto2}>
        Almost before we knew it, we had left the ground.
      </h1>
      <h1>Almost before we knew it, we had left the ground.</h1>
      <h1 className={styles.roboto3}>
        Almost before we knew it, we had left the ground.
      </h1>
      <h1 className={styles.roboto4}>
        Almost before we knew it, we had left the ground.
      </h1>
      <h1 className={styles.roboto5}>
        Almost before we knew it, we had left the ground.
      </h1>
      <h1 className={styles.roboto6}>
        Almost before we knew it, we had left the ground.
      </h1>
      <h1 className={styles.roboto7}>
        Almost before we knew it, we had left the ground.
      </h1>
    </MainLayout>
  );
};

export default Index;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
