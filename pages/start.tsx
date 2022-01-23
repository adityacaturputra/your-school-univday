import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Button from '../src/components/atoms/Button';
import { BallBeat } from 'react-pure-loaders';
import Fade from 'react-reveal/Fade';


const Start: NextPage = () => {
  const router = useRouter();
  const handleButtonClicked = () => {
    router.push('/explore');
  };

  return (
    <>
      <Head>
        <title>Univday | Index</title>
      </Head>
      <Fade>
        <p className="text-center text-gray-800 text-4xl pb-10">Selamat Datang di <span className="text-purple-400">your-school-univday</span></p>
        <p className="text-gray-800 text-xl lg:px-48 md:px-20 px-5">
            Kami para alumni sangat peduli dengan masa depan adik adik kami, maka dengan itu kami membuat web ini sebagai sarana untuk berbagi kepada adek adek kami mengenai pengalaman kami yang sudah terjun di kampus. Semoga dengan dibuatnya web ini harapan besarnya adalah adik adik tidak kebingungan lagi akan memilih universitas mana dan akan mempertimbangkan hal tersebut secara baik baik.
        </p>
        <Button title="Explore your University now" className="text-center mt-10 mx-10 flex justify-center" onClick={ () => handleButtonClicked()} />
      </Fade>
    </>
  );
};

export default Start;
