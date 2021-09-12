import type { NextPage } from 'next';
import { useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';
import { University} from '../src/types/UniversityTable';
import Logos from '../src/components/molecules/Logos';
import Contents from '../src/components/molecules/Contents';
import Heading from '../src/components/molecules/Heading';

interface Props {
  university: University[],
  errorMessage: string
}

const Explore: NextPage<Props> = (props) => {
  const {university} = props;
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
    }, 600);
  }, [DetailUniversityIndex]);

  return (
    <div className="min-h-screen bg-hero bg-center bg-cover bg-fixed">
      <Fade>
        {
          university ? 
            <div className="h-screen md:bg-gradient-to-b bg-gradient-to-t from-black via-transparent to-transparent flex md:flex-col flex-col-reverse">
              <Logos data={university} currentIndex={DetailUniversityIndex} onClick={handleDetailUniversityIndex} />
              <Fade bottom when={fadeAnimation}>
                <Contents data={university} currentIndex={DetailUniversityIndex} />
              </Fade>
              <Heading animation={fadeAnimation} title={university[DetailUniversityIndex].name} />
            </div>
            : 
            <div>
              <Heading animation={fadeAnimation} title={'Gagal mendapatkan data'} />
              <Heading animation={fadeAnimation} title={props.errorMessage} />
            </div>
        }
      </Fade> 
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch(
      'https://admin-your-school-univday.herokuapp.com/api/v1/university/all'
    );
    const dataUniversity = await res.json();
    return {
      props : {
        university: dataUniversity.university,
      }
    };
  } catch (error) {
    return {
      props : {
        university: null,
        errorMessage: error.message
      }
    };
  }
}

export default Explore;
