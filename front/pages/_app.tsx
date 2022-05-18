import '../styles/global.scss';
import { appWithTranslation } from 'next-i18next';

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
