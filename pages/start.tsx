import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Button from '../src/components/atoms/Button';
import { BallBeat } from 'react-pure-loaders';
import Fade from 'react-reveal/Fade';


const Start: NextPage = () => {
  const [QtaClicked, setQtaClicked] = useState(false);
  const router = useRouter();
  const handleButtonClicked = () => {
    setQtaClicked(true);
    setTimeout(() => router.push('/explore'), 400);
  };

  return (
    <div className="h-screen bg-hero bg-center bg-cover">
      <div className={`h-screen ${!QtaClicked && 'bg-opacity-80 bg-black'} flex flex-col justify-center transition duration-500`}>
        <Fade bottom when={!QtaClicked}>
          <p className="text-center text-white text-4xl pb-10">Selamat Datang di <span className="text-purple-400">your-school-univday</span></p>
          <p className="text-white text-xl lg:px-48 md:px-20 px-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, natus, eius vitae iure rerum nemo numquam tenetur esse corrupti ipsam sapiente similique. Quia nemo voluptatum, et distinctio, dolor minima sunt, placeat mollitia repellat explicabo nesciunt. Totam exercitationem inventore veritatis quia id necessitatibus.</p>
          <Button title="Explore your favorite now" className="text-center mt-10 mx-10 flex justify-center" onClick={ () => handleButtonClicked()} />
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

export default Start;
