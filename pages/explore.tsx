import type { NextPage } from 'next';
import Images from 'next/image';
import { useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';
import HTMLReactParser from 'html-react-parser';

const Explore: NextPage = (props : any) => {
  const {dataUniversity} = props;
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
            {dataUniversity.university.map((data :any, key : any) => (
              <Fade right delay={50*key} key={data._id}>
                <div className="inline-block bg-white m-2 sm:m-3 md:m-4 rounded cursor-pointer p-1 bg-opacity-90" style={{height: '10vh', width: '10vh'}} >
                  <Images
                    src={`/api/imageproxy?url=${encodeURIComponent(data.imageId.imageUrl)}`}
                    width="100%" height="100%" onClick={()=> setDetailUniversityIndex(key)}/>
                </div>
              </Fade>
            ))}
          </div>
          <div style={{height: '83vh', position: 'relative'}}>
            <div className="flex flex-wrap justify-evenly scrollup" style={{maxHeight:'100%', overflowY:'auto', overflowX: 'hidden'}}>
              {
                dataUniversity.university[DetailUniversityIndex].contentId.map((konten : any, key : any) => (
                  <div key={konten._id} className="max-w-sm md:max-h-96 overflow-auto bg-white bg-opacity-90 my-4 mx-1 p-3 rounded scrollup">
                    <h1 className="text-xl text-center font-bold mb-3">{konten.name}</h1>
                    <div>
                      {HTMLReactParser(konten.jeroanKonten)}
                    </div>
                  </div> 
                ))
              }
            </div>
          </div>
          <h1 className="text-lg text-center bg-white bg-opacity-50 text-black font-semibold mx-1 md:mx-0">{dataUniversity.university[DetailUniversityIndex].name}</h1>
        </div>
      </Fade> 
      
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch('https://admin-your-school-univday.herokuapp.com/api/v1/university/all');
  const dataUniversity = await res.json();
  return {
    props : {
      dataUniversity,
    }
  };
}

export default Explore;
