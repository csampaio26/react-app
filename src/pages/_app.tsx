import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../store';
import ThemeCustomization from '../themes';
import NavigationScroll from '../layout/NavigationScroll';
import { PersistGate } from 'redux-persist/integration/react';
import { persister } from '../store';
import Locales from 'ui-component/Locales';
import { ConfigProvider } from '../contexts/ConfigContext';
import '../scss/style.scss';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import Snackbar from 'ui-component/extended/Snackbar';
import MainLayout from 'layout/MainLayout';
import GuestGuard from 'layout/GuestGuard';
import { LayoutType } from 'types';
const Noop: React.FC = ({ children }) => {
  return <> {children} </>;
};

function MyApp({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: LayoutType } }) {
  let Layout;
  switch (Component.Layout) {
    case 'authGuard':
      Layout = MainLayout;
      break;
    case 'guestGuard':
      Layout = GuestGuard;
      break;
    default:
      Layout = Noop;
  }

  return (
    <>
      <Head>
        <title>StoreAuto | Control</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <ConfigProvider>
            <ThemeCustomization>
              <Locales>
                <NavigationScroll>
                  <AuthProvider>
                    <Layout>
                      <Component {...pageProps} />
                      <Snackbar />
                    </Layout>
                  </AuthProvider>
                </NavigationScroll>
              </Locales>
            </ThemeCustomization>
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
