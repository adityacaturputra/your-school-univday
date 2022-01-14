import HTMLReactParser from 'html-react-parser';
import { University, Content} from '../../types/University';


interface Props {
    data : University[],
    currentIndex : number
}

const Contents : React.FC<Props> = ({data, currentIndex}) => {
  
  return (
    <div className="h-[110vh] mt-[16vh] relative container mx-auto">
      <div className="scrollup max-h-[100%] overflow-y-auto overflow-x-hidden pt-[16vh] pb-[14vh] md:pb-[6vh]">
        {
          data[currentIndex].contentId.map((konten: Content) => (
            <div key={konten._id} className=" overflow-auto bg-gradient-to-r from-purple-50 to-pink-50 my-4 mb-36 mx-3 p-3 rounded scrollup">
              <h1 className="text-xl font-bold mb-3 text-gray-700">{konten.name}</h1>
              <div className='ck-content'>
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
