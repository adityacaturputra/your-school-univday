import Images from 'next/image';
import { University} from '../../types/UniversityTable';
import Fade from 'react-reveal/Fade';


interface Props {
    data : University[],
    onClick : Function,
    currentIndex : number
}

const Logos : React.FC<Props> = ({data, currentIndex, onClick,}) => {
  
  return (
    <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap">
      {data.map((university: University, index: number) => (
        <Fade right delay={50*index} key={university._id} when={index !== currentIndex}>
          <div className="inline-block bg-white m-2 sm:m-3 md:m-4 rounded cursor-pointer p-1 bg-opacity-90 h-[10vh] w-[10vh]" >
            <Images
              src={`/api/imageproxy?url=${encodeURIComponent(university.imageId.imageUrl)}`}
              width="100%" height="100%" 
              onClick={() => onClick(index)}
            />
          </div>
        </Fade>
      ))}
    </div>
  );
};

export default Logos;
