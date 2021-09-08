import type { NextPage } from 'next';
import Images from 'next/image';
import { useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';
import HTMLReactParser from 'html-react-parser';

interface Content {
  _id: string,
  name: string,
  jeroanKonten: string,
}

interface Image {
  _id: string,
  imageUrl: string
}

interface University {
  _id: string,
  name: string,
  imageId: Image,
  contentId: Content[]
}

interface Props {
  university: University[]
}

const Explore: NextPage<Props> = ({university}) => {
  const [DetailUniversityIndex, setDetailUniversityIndex] = useState<number>(0);
  const [fadeAnimation, setFadeAnimation] = useState(true);
  const handleDetailUniversityIndex = (index : number) => {
    if (index === DetailUniversityIndex) return;
    setFadeAnimation(false);
    setDetailUniversityIndex(index);
  };
  const scrollup = (scrollableElements: HTMLCollectionOf<Element>) => {
    if (process.browser) Array.from(scrollableElements).forEach(element => element.scrollTo({top: 0}));
  };

  useEffect(() => {
    setTimeout(() => {
      setFadeAnimation(true);
      scrollup(document.getElementsByClassName('scrollup'));
    }, 600);
  }, [DetailUniversityIndex]);

  return (
    <div className="min-h-screen bg-hero bg-center bg-cover bg-fixed">
      <Fade>
        <div className="h-screen md:bg-gradient-to-b bg-gradient-to-t from-black via-transparent to-transparent flex md:flex-col flex-col-reverse">
          <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap">

            {university.map((data: University, index: number) => (
              <Fade right delay={50*index} key={data._id} when={index !== DetailUniversityIndex}>
                <div className="inline-block bg-white m-2 sm:m-3 md:m-4 rounded cursor-pointer p-1 bg-opacity-90 h-[10vh] w-[10vh]" >
                  <Images
                    src={`/api/imageproxy?url=${encodeURIComponent(data.imageId.imageUrl)}`}
                    width="100%" height="100%" onClick={()=> handleDetailUniversityIndex(index)}
                  />
                </div>
              </Fade>
            ))}

          </div>
          <Fade bottom when={fadeAnimation}>
            <div style={{height: '83vh', position: 'relative'}}>
              <div className="flex flex-wrap justify-evenly scrollup max-h-[100%] overflow-y-auto overflow-x-hidden">

                {
                  university[DetailUniversityIndex].contentId.map((konten: Content) => (
                    <div key={konten._id} className="max-w-lg md:max-h-96 overflow-auto bg-white bg-opacity-90 my-4 mx-1 p-3 rounded scrollup">
                      <h1 className="text-xl text-center font-bold mb-3">{konten.name}</h1>
                      <div>
                        {HTMLReactParser(konten.jeroanKonten)}
                      </div>
                    </div> 
                  ))
                }

              </div>
            </div>
          </Fade>
          <h1 className="text-lg text-center bg-white bg-opacity-50 text-black font-semibold mx-1 md:mx-0">
            <Fade when={fadeAnimation}>
              {university[DetailUniversityIndex].name}
            </Fade>
          </h1>
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
      university: dataUniversity.university,
    }
  };
}

export default Explore;
