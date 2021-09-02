import type { NextPage } from 'next';
import Images from 'next/image';
import { useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';
import universities from './api/dataBoongBoongan';

const Explore: NextPage = () => {
  const [DetailUniversityIndex, setDetailUniversityIndex] = useState(0);

  useEffect(() => {
    if (process.browser) {
      const scrollableElements = document.getElementsByClassName('scrollup');
      for (let i = 0; i < scrollableElements.length; i++) {
        scrollableElements[i].scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [DetailUniversityIndex]);

  return (
    <div className="min-h-screen bg-hero bg-center bg-cover bg-fixed">
      <Fade>
        <div className="h-screen md:bg-gradient-to-b bg-gradient-to-t from-black via-transparent to-transparent flex md:flex-col flex-col-reverse">
          <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap">
            {universities.map((data, key) => (
              <Fade right delay={50*key} key={key}>
                <div className="inline-block bg-white m-2 sm:m-3 md:m-4 rounded cursor-pointer p-1 bg-opacity-90" style={{height: '10vh', width: '10vh'}} >
                  <Images src="/images/logo.png" width="100%" height="100%" onClick={()=> setDetailUniversityIndex(key)}/>
                </div>
              </Fade>
            ))}
          </div>
          <div style={{height: '83vh', position: 'relative'}}>
            <div className="flex flex-wrap justify-evenly scrollup" style={{maxHeight:'100%', overflowY:'auto', overflowX: 'hidden'}}>
              {
                universities[DetailUniversityIndex].content.map((konten, key) => (
                  <div key={key} className="max-w-sm md:max-h-96 overflow-auto bg-white bg-opacity-90 my-4 mx-1 p-3 rounded scrollup">
                    <h1 className="text-xl text-center font-semibold">{konten.name}: {key+1}</h1>
                    <p className="text-lg">{konten.jeroanKonten}: {key+1}, universitas ke: {DetailUniversityIndex + 1} </p>
                    <p className="text-base">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut eum beatae veritatis amet, qui consequatur fugiat minus quas maiores vel laborum cum iusto. Sunt, voluptatibus, illo ratione consectetur ad adipisci vel doloribus harum inventore eum vitae veniam quae dolorem ut sed hic dolores assumenda nulla iste voluptates officia reprehenderit! Corporis dolore cumque inventore sit nulla praesentium provident, at facere, animi eaque, porro dolorem iure? Temporibus labore assumenda praesentium, quaerat perferendis minima, amet suscipit distinctio voluptate repellendus veniam nam. Porro ut est commodi! Numquam, eos a et molestias dolore omnis recusandae sunt quos esse perspiciatis. Facere, aperiam. Alias nisi minima sed.
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
          <h1 className="text-lg text-center bg-white bg-opacity-50 text-black font-semibold mx-1 md:mx-0">Universitas ke - {universities[DetailUniversityIndex].logo}</h1>
        </div>
      </Fade> 
      
    </div>
  );
};

export default Explore;
