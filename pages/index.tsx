import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import Button from '../src/components/atoms/Button';
import Fade from 'react-reveal/Fade';

const Home: NextPage = () => {
  const links = [
    {
      name: 'Explore',
      href: '/start',
      isExternal: false, 
    },
    {
      name: 'Rasionalisasi',
      href: 'https://upsnm-smansaka.web.app/',
      isExternal: true, 
    },
    {
      name: 'Pengenalan Panitia',
      href: '/intro',
      isExternal: false, 
    },
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
  const router = useRouter(); 
  const handleButtonClicked = (url : string, isEksternal = false) => () => {
    if (!isEksternal){ 
      router.push(`${url}`);
    }
    else {
      window.location.assign(url);
    }
    
  };

  return (
    <>
      <Head>
        <title>Univday | Menu</title>
      </Head>
      {
        links.map((link, index) => (
          <Fade bottom key={link.href} delay={index*200}>
            <Button title={link.name} className="text-center flex justify-center mt-5 mx-[10vw]" onClick={handleButtonClicked(link.href, link.isExternal)} />
          </Fade>
        ))
      }
    </>
  );
};

export default Home;
