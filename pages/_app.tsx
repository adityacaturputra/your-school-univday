import '../styles/globals.css';
import Navbar from '../src/components/molecules/NavBar';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  
  return (    
    <div className="h-screen bg-gradient-to-r from-gray-100 to-gray-50 bg-center bg-cover">
      <div className={'h-screen flex flex-col justify-center'}>
        <Navbar/>
        <Component {...pageProps} />;
      </div>
    </div>
  );



}
export default MyApp;
