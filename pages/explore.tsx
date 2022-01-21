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
  const [university, setuniversity] = useState<University[]>([]);
  const [loading, setloading] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [DetailUniversityIndex, setDetailUniversityIndex] = useState<number>(0);
  const [lastFetched, setlastFetched] = useState<string>('');
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
      setloading(true);
      const universityFromLocalStorage = JSON.parse(localStorage.getItem('university') || '{}');
      // const isPassedOneHour = new Date().getTime() > new Date(universityFromLocalStorage?.updatedAt).getTime() + 3600000;
      if (!universityFromLocalStorage.data /* || isPassedOneHour */) {
        const fetchedUniversity = await fetch(
          'https://admin-your-school-univday.herokuapp.com/api/v1/university'
        );
        const dataUniversity = await fetchedUniversity.json();
        const university : University[] = dataUniversity.university;
        const localStorageUniversity = {data: university, updatedAt: new Date()};
        localStorage.setItem('university', JSON.stringify(localStorageUniversity));
        setuniversity(university);
        setlastFetched(localStorageUniversity.updatedAt.toLocaleString());
      } else {
        setlastFetched(new Date(universityFromLocalStorage.updatedAt).toLocaleString());
        setuniversity(universityFromLocalStorage.data);
      }
      setloading(false);
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
        university?.length > 0 &&
          <>
            <Logos data={university} currentIndex={DetailUniversityIndex} onClick={handleDetailUniversityIndex} />
            <Fade>
              <Fade when={fadeAnimation}>
                <Contents data={university} currentIndex={DetailUniversityIndex} globalLastFetched={lastFetched} setUniversity={setuniversity} />
              </Fade>
            </Fade>
            <Heading animation={fadeAnimation} title={university[DetailUniversityIndex].name} />
          </>
      }
      {
        errorMessage && 
        <Heading animation={fadeAnimation} title={'gagal mendapatkan data: ' + errorMessage} />
      }
      {
        loading &&
        <Heading animation={fadeAnimation} title={'sedang memuat data'} />
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
