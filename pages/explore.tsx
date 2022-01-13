import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, useRef} from 'react';
import Fade from 'react-reveal/Fade';
import { University} from '../src/types/University';
import Logos from '../src/components/molecules/Logos';
import Contents from '../src/components/molecules/Contents';
import Heading from '../src/components/molecules/Heading';

interface Props {
  university: University[],
  errorMessage: string
}

const Explore: NextPage<Props> = (props) => {
  const [university, setuniversity] = useState<University[]>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [DetailUniversityIndex, setDetailUniversityIndex] = useState<number>(0);
  const [fadeAnimation, setFadeAnimation] = useState(true);
  const handleDetailUniversityIndex = (index : number) => {
    if (index === DetailUniversityIndex) return;
    setFadeAnimation(false);
    setDetailUniversityIndex(index);
  };
  const scrollup = (scrollableElements: HTMLCollectionOf<Element>) => {
    if (process.browser) {
      Array.from(scrollableElements)
        .forEach(element => element.scrollTo({top: 0}));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFadeAnimation(true);
      scrollup(document.getElementsByClassName('scrollup'));
    }, 240);
  }, [DetailUniversityIndex]);

  const getData = async () => {
    try {
      const res = await fetch(
        'https://admin-your-school-univday.herokuapp.com/api/v1/university'
      );
      const dataUniversity = await res.json();
      const university : University[] = dataUniversity.university;
      setuniversity(university);
    } catch (error) {
      setErrorMessage((error as any).message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Univday | Explore</title>
      </Head>
      {
        university ?
          <>
            <Logos data={university} currentIndex={DetailUniversityIndex} onClick={handleDetailUniversityIndex} />
            <Fade>
              <Fade when={fadeAnimation}>
                <Contents data={university} currentIndex={DetailUniversityIndex} />
              </Fade>
            </Fade>
            <Heading animation={fadeAnimation} title={university[DetailUniversityIndex].name} />
          </>
          : 
          errorMessage ? 
            <Heading animation={fadeAnimation} title={'Gagal mendapatkan data: ' + errorMessage} />
            :
            <Heading animation={fadeAnimation} title={'Sedang me-load data'} />
      }
    </>
  );
};

// export async function getServerSideProps() {
//   try {
//     const res = await fetch(
//       'https://admin-your-school-univday.herokuapp.com/api/v1/university/all'
//     );
//     const dataUniversity = await res.json();
//     return {
//       props : {
//         university: dataUniversity.university,
//       }
//     };
//   } catch (error) {
//     return {
//       props : {
//         university: null,
//         errorMessage: (error as any).message
//       }
//     };
//   }
// }

export default Explore;
