import { University} from '../../types/UniversityTable';
import Fade from 'react-reveal/Fade';


interface Props {
    data : University[],
    onClick : Function,
    currentIndex : number,
}

const Logos : React.FC<Props> = ({data, currentIndex, onClick}) => {
  
  return (
    <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap z-10 fixed w-full bottom-0 md:bottom-auto md:top-0">
      {data.map((university: University, index: number) => (
        <>
          <Fade right delay={50*index} key={university._id} when={index !== currentIndex}>
            <div className="inline-block bg-white m-2 sm:m-3 md:m-4 rounded cursor-pointer p-1 bg-opacity-90 h-[8vh] w-[8vh]" >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={university.imageId.imageUrl}
                onClick={() => onClick(index)}
                alt="logo-universitas"
              />
            </div>
          </Fade>
        </>
      ))}
    </div>
  );
};

export default Logos;
