import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Button from '../src/components/atoms/Button';
import Fade from 'react-reveal/Fade';
import { BallBeat } from 'react-pure-loaders';

const Home: NextPage = () => {
  const [QtaClicked, setQtaClicked] = useState(false);
  const [AnotherWebClick, setAnotherWebClick] = useState(false);
  const router = useRouter(); 
  const handleButtonClicked = (url : string, isSoft = true) => {
    setQtaClicked(true);
    if (isSoft){ 
      setTimeout(
        () => {
          router.push(`${url}`);
        }, 400);
    }
    else {
      setAnotherWebClick(true);
      window.location.assign(url);
    }
    
  };

  return (
    <>
      <Head>
        <title>Univday | Tree</title>
      </Head>
      <div className="h-screen bg-hero bg-center bg-cover">
        <div className={`h-screen ${AnotherWebClick ? 'bg-opacity-100 bg-white' : 'bg-opacity-80 bg-black'} flex flex-col justify-center`}>
          <Fade bottom when={!QtaClicked}>
            <Button title="Web Utama" className="text-center flex justify-center mt-5 mx-[10vw]" onClick={() => handleButtonClicked('/start')} />
            <Button title="Rasionalisasi" className="text-center flex justify-center mt-5 mx-[10vw]" onClick={() => handleButtonClicked('https://upsnm-smansaka.web.app/', false)} />
            <Button title="Pengenalan Panitia" className="text-center flex justify-center mt-5 mx-[10vw]" onClick={() => handleButtonClicked('/intro')} />
            <Button title="Jadwal dan Acara" className="text-center flex justify-center mt-5 mx-[10vw]" onClick={() => handleButtonClicked('/schedule')} />
            <Button title="Contact Person" className="text-center flex justify-center mt-5 mx-[10vw]" onClick={() => handleButtonClicked('/contact')} />
          </Fade>
          <Fade bottom when={QtaClicked}>
            <div className="text-center">
              <BallBeat color={`${AnotherWebClick ? 'black' : 'white'}`} loading/>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default Home;
