import { University} from '../../types/University';
import Fade from 'react-reveal/Fade';


interface Props {
    data : University[],
    onClick : Function,
    currentIndex : number,
}

const Logos : React.FC<Props> = ({data, currentIndex, onClick}) => {
  
  return (
    <div className="fixed w-full backdrop-blur-sm bottom-0 z-10">
      <div className='overflow-x-scroll overflow-y-hidden whitespace-nowrap bg-opacity-30 bg-gray-300'>
        {data.map((university: University, index: number) => (
          <>
            <Fade bottom key={university._id} when={index !== currentIndex}>
              <div className="inline-block bg-white m-2 sm:m-3 md:m-4 rounded cursor-pointer p-1 bg-opacity-90 h-[8vh] w-[8vh]" >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={university.imageId.imageUrl}
                  onClick={() => onClick(index)}
                  alt="logo-universitas"
                  style={{width: '7vh', height: '7vh'}}
                />
              </div>
            </Fade>
          </>
        ))}
      </div>

    </div>
  );
};

export default Logos;
