import type { NextPage } from 'next';
import { useState, useEffect, useRef, RefObject } from 'react';
import Fade from 'react-reveal/Fade';
import universities from './api/dataBoongBoongan';

const Explore: NextPage = () => {
  const [DetailUniversityIndex, setDetailUniversityIndex] = useState(0);
  const content : RefObject<HTMLDivElement> = useRef(null);
  useEffect(() => {
    content.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [DetailUniversityIndex]);

  return (
    <div className="min-h-screen bg-hero bg-center bg-cover bg-fixed">
      <Fade>
        <div className="h-screen md:bg-gradient-to-b bg-gradient-to-t from-black via-transparent to-transparent flex md:flex-col flex-col-reverse">
          <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap">
            {universities.map((data, key) => (
              <Fade right delay={50*key} key={key}>
                <a className="inline-block bg-white m-2 sm:m-3 md:4 rounded cursor-pointer" style={{height: '10vh', width: '10vh'}} onClick={()=> setDetailUniversityIndex(key)}>logo: {key + 1}</a>
              </Fade>
            ))}
          </div>
          <div style={{height: '85vh', position: 'relative'}}>
            <div className="flex flex-wrap justify-evenly" style={{maxHeight:'100%', overflowY:'auto', overflowX: 'hidden'}} ref={content}>
              {
                universities[DetailUniversityIndex].content.map((konten, key) => (
                  <div key={key} className="max-w-sm sm:max-h-96 overflow-auto bg-white my-4 mx-2 p-3 rounded">
                    <h1 className="text-xl">{konten.name}: {key+1}</h1>
                    <p className="text-lg">{konten.jeroanKonten}: {key+1}, universitas ke: {DetailUniversityIndex + 1} </p>
                    <p className="text-base">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut eum beatae veritatis amet, qui consequatur fugiat minus quas maiores vel laborum cum iusto. Sunt, voluptatibus, illo ratione consectetur ad adipisci vel doloribus harum inventore eum vitae veniam quae dolorem ut sed hic dolores assumenda nulla iste voluptates officia reprehenderit! Corporis dolore cumque inventore sit nulla praesentium provident, at facere, animi eaque, porro dolorem iure? Temporibus labore assumenda praesentium, quaerat perferendis minima, amet suscipit distinctio voluptate repellendus veniam nam. Porro ut est commodi! Numquam, eos a et molestias dolore omnis recusandae sunt quos esse perspiciatis. Facere, aperiam. Alias nisi minima sed.
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </Fade> 
      
    </div>
  );
};

export default Explore;
