import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Button from '../src/components/atom/Button';
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
        { !QtaClicked ? 
          <>
            <Button title="Web Utama" className="text-center mt-10" onClick={() => handleButtonClicked('/start')} />
            <Button title="Pengenalan Panitia" className="text-center mt-10" onClick={() => handleButtonClicked('/intro')} />
            <Button title="Jadwal dan Acara" className="text-center mt-10" onClick={() => handleButtonClicked('/schedule')} />
            <Button title="Contact Person" className="text-center mt-10" onClick={() => handleButtonClicked('/contact')} />
          </>
          :
          <div className="text-center">
            <BallBeat loading/>
          </div>
        }
      </div>
    </div>
  );
};

export default Home;
