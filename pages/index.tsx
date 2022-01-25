import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import Button from '../src/components/atoms/Button';
import Fade from 'react-reveal/Fade';
import openInNewTab from '../src/utils/openInNewTab';

const links = [
  {
    name: 'Explore',
    href: '/explore',
    isExternal: false, 
  },
  {
    name: 'Rasionalisasi',
    href: 'https://upsnm-smansaka.web.app/',
    isExternal: true, 
  },
  // {
  //   name: 'Pengenalan Panitia',
  //   href: '/intro',
  //   isExternal: false, 
  // },
  {
    name: 'Jadwal dan Acara',
    href: '/schedule',
    isExternal: false, 
  },
  {
    name: 'Contact Person',
    href: '/contact',
    isExternal: false, 
  },
];

const Home: NextPage = () => {
  const router = useRouter(); 
  const handleButtonClicked = (url : string, isEksternal = false) => () => {
    if (!isEksternal){ 
      router.push(`${url}`);
    }
    else {
      openInNewTab(url);
    }
    
  };

  return (
    <>
      <Head>
        <title>University Day SMANSAKA</title>
      </Head>
      <img className='relative left-1/2 translate-x-[-50%] mb-10' src="/images/univday-logo.png" height="100%" width="50%" alt="univday-logo" />
      <div className='lg:flex w-screen gap-2 justify-center'>
        {
          links.map((link, index) => (
            <Fade key={link.href} delay={index*200}>
              <Button title={link.name} className="text-center flex justify-center" onClick={handleButtonClicked(link.href, link.isExternal)} />
            </Fade>
          ))
        }
      </div>
    </>
  );
};

export default Home;
