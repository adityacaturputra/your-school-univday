import HTMLReactParser from 'html-react-parser';
import { University, Content} from '../../types/UniversityTable';


interface Props {
    data : University[],
    currentIndex : number
}

const Contents : React.FC<Props> = ({data, currentIndex}) => {
  
  return (
    <div className="h-[94vh] md:h-[96vh] relative">
      <div className="flex flex-wrap justify-evenly scrollup max-h-[100%] overflow-y-auto overflow-x-hidden md:pt-[20vh] md:pb-0 pt-0 pb-[20vh]">
        {
          data[currentIndex].contentId.map((konten: Content) => (
            <div key={konten._id} className="max-w-lg md:max-h-96 overflow-auto bg-white bg-opacity-90 my-4 mx-1 p-3 rounded scrollup">
              <h1 className="text-xl text-center font-bold mb-3">{konten.name}</h1>
              <div>
                {HTMLReactParser(konten.jeroanKonten)}
              </div>
            </div> 
          ))
        }
      </div>
    </div>
  );
};

export default Contents;
