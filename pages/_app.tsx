import '../styles/globals.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../src/components/molecules/NavBar';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
const NProgress = require('nprogress');
import 'nprogress/nprogress.css';
import '../styles/nprogress.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeOnStart = (url:any, { shallow }:any) => {
      NProgress.start();
    };
    const handleRouteChangeOnComplete = (url:any, { shallow }:any) => {
      NProgress.done();
    };
    const handleRouteChangeOnError = (url:any, { shallow }:any) => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleRouteChangeOnStart);
    router.events.on('routeChangeComplete', handleRouteChangeOnComplete);
    router.events.on('routeChangeError', handleRouteChangeOnError);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeOnStart);
      router.events.off('routeChangeComplete', handleRouteChangeOnComplete);
      router.events.off('routeChangeError', handleRouteChangeOnError);
    };
  }, []);

  return (    
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="h-screen bg-gradient-to-r from-gray-100 to-gray-50 bg-center bg-cover">
        <div className={'h-screen flex flex-col justify-center'}>
          {
            router.route !== '/' &&
          <Navbar/>
          }
          <Component {...pageProps} />;
        </div>
      </div>
    </>
  );
}
export default MyApp;
