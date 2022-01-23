import Fade from 'react-reveal/Fade';

interface Props {
    title : string,
    animation : boolean
}

const Heading : React.FC<Props> = ({title, animation}) => {
  
  return (
    <h1 className="text-2xl font-bold text-center backdrop-blur-sm p-2 text-gray-700 min-w-full fixed top-[46px]">
      <Fade when={animation}>
        {title}
      </Fade>
    </h1>
  );
};

export default Heading;
