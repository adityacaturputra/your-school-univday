import HTMLReactParser from 'html-react-parser';
import { Dispatch, SetStateAction, useState } from 'react';
import { University, Content} from '../../types/University';
import formatDate from '../../utils/dateFormatter';


interface Props {
    data : University[],
    currentIndex : number,
    globalLastFetched : string,
    setUniversity: Dispatch<SetStateAction<University[]>>
}

const Contents : React.FC<Props> = ({data, currentIndex, globalLastFetched, setUniversity}) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleRefreshUnivContent = (id : string) => async () => {
    setIsLoading(true);
    try {
      const fetchedUniversity = await fetch(
        `https://admin-your-school-univday.herokuapp.com/api/v1/university/${id}`
      );
      const {university} = await fetchedUniversity.json();
      const universityLocalStorage = JSON.parse(localStorage.getItem('university') || '{}');
      universityLocalStorage.data[currentIndex] = {...university, lastFetched: new Date().toLocaleString()};
      localStorage.setItem('university', JSON.stringify(universityLocalStorage));
      setUniversity(universityLocalStorage.data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="h-[105vh] mt-[16vh] relative container mx-auto">
        <div className="scrollup max-h-[100%] overflow-y-auto overflow-x-hidden pt-[16vh] pb-[20vh]">
          <div className='flex justify-between bg-gradient-to-r text-gray-400 from-purple-50 to-pink-50 my-4 mx-3 p-3 rounded'>
            {
              !isLoading ?
                <>
                  <p>Terakhir diperbarui pada {(data[currentIndex]?.lastFetched) || globalLastFetched}</p>
                  <img onClick={handleRefreshUnivContent(data[currentIndex]._id)} className='h-5 w-5 cursor-pointer' src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-refresh-mintab-for-ios-becris-lineal-becris.png"/>
                </>
                :
                <p>sedang memperbarui data</p>
            }
            {
              isError && <p>Gagal memperbarui data</p>
            }
          </div>
          {
            data[currentIndex].contentId.map((konten: Content) => (
              <div key={konten._id} className=" overflow-auto bg-gradient-to-r from-purple-50 to-pink-50 my-4 mb-16 mx-3 p-3 rounded scrollup">
                <h1 className="text-xl font-bold mb-3 text-gray-700">{konten.name}</h1>
                <div className='ck-content'>
                  {HTMLReactParser(konten.jeroanKonten)}
                </div>
              </div> 
            ))
          }
        </div>
      </div>
    
    </>
  );
};

export default Contents;
