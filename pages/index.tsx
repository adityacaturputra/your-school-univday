import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';

const Home: NextPage = () => {
  const [QtaClicked, setQtaClicked] = useState(false);
  const router = useRouter(); 

  return (
    <div className="h-screen bg-hero bg-center bg-cover ">
      <div className={`h-screen ${!QtaClicked && 'bg-opacity-80 bg-black'} flex flex-col lg:justify-center md:justify-center justify-evenly transition duration-500`}>
        { !QtaClicked && 
        <>
          <p className="text-center text-white text-4xl pb-10 ">Selamat Datang di <span className="text-purple-400">your-school-univday</span></p>
          <p className="text-white text-2xl lg:px-48 md:px-20 px-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, natus, eius vitae iure rerum nemo numquam tenetur esse corrupti ipsam sapiente similique. Quia nemo voluptatum, et distinctio, dolor minima sunt, placeat mollitia repellat explicabo nesciunt. Totam exercitationem inventore veritatis quia id necessitatibus.</p>
          <div className="text-center mt-10">
            <button className="w-auto hover:text-purple-600 text-purple-300 p-2 border-b-2 hover:border-purple-600 bg-purple-200 rounded bg-opacity-30 hover:bg-opacity-100 text-2xl transition duration-500 ease-in-out shadow-inner" onClick={ () => {setQtaClicked(true); setTimeout(() => router.replace('/explore'), 400);} }>Explore your favorite now</button>
          </div>
        </>
        }
      </div>
    </div>
  );
};

export default Home;
