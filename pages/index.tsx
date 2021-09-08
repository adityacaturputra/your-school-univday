import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Button from '../src/components/atom/Button';
import Fade from 'react-reveal/Fade';
import { BallBeat } from 'react-pure-loaders';

const Home: NextPage = () => {
  const [QtaClicked, setQtaClicked] = useState(false);
  const router = useRouter(); 
  const handleButtonClicked = (url : string) => {
    setQtaClicked(true);
    setTimeout(() => router.push(`${url}`), 400);
  };

  return (
    <div className="h-screen bg-hero bg-center bg-cover">
      <div className={'h-screen bg-opacity-80 bg-black flex flex-col justify-center'}>
        <Fade bottom when={!QtaClicked}>
          <Button title="Web Utama" className="text-center flex justify-center mt-5 mx-[10vw]" onClick={() => handleButtonClicked('/start')} />
          <Button title="Pengenalan Panitia" className="text-center flex justify-center mt-5 mx-[10vw]" onClick={() => handleButtonClicked('/intro')} />
          <Button title="Jadwal dan Acara" className="text-center flex justify-center mt-5 mx-[10vw]" onClick={() => handleButtonClicked('/schedule')} />
          <Button title="Contact Person" className="text-center flex justify-center mt-5 mx-[10vw]" onClick={() => handleButtonClicked('/contact')} />
        </Fade>
        <Fade bottom when={QtaClicked}>
          <div className="text-center">
            <BallBeat loading/>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Home;
