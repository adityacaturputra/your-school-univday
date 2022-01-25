import Fade from 'react-reveal/Fade';

interface Props {
    title : string,
    animation : boolean
}

const Heading : React.FC<Props> = ({title, animation}) => {
  
  return (
    <>
      <div className='min-w-full fixed lg:top-[53px] top-[46.14px] bg-opacity-70 bg-white'>
        <h1 className="text-2xl font-bold text-center text-gray-700 p-2 backdrop-blur-sm">
          <Fade when={animation}>
            {title}
          </Fade>
        </h1>
      </div>
    </>
  );
};

export default Heading;
