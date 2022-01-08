import Fade from 'react-reveal/Fade';

interface Props {
    title : string,
    animation : boolean
}

const Heading : React.FC<Props> = ({title, animation}) => {
  
  return (
    <h1 className="text-lg text-center bg-white bg-opacity-80 text-black font-semibold min-w-full fixed top-0 md:bottom-0 md:top-auto">
      <Fade when={animation}>
        {title}
      </Fade>
    </h1>
  );
};

export default Heading;
