import Fade from 'react-reveal/Fade';

interface Props {
    title : string,
    animation : boolean
}

const Heading : React.FC<Props> = ({title, animation}) => {
  
  return (
    <h1 className="text-lg text-center bg-white bg-opacity-50 text-black font-semibold mx-1 md:mx-0">
      <Fade when={animation}>
        {title}
      </Fade>
    </h1>
  );
};

export default Heading;
