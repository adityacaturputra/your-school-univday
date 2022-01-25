import HTMLReactParser from 'html-react-parser';
import { Dispatch, SetStateAction, useState } from 'react';
import { University, Content} from '../../types/University';


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
  data[currentIndex].contentId = data[currentIndex].contentId.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  return (
    <>
      <div className="h-[105vh] mt-[16vh] relative container mx-auto">
        <div className="scrollup max-h-[100%] overflow-y-auto overflow-x-hidden pt-[16vh] pb-[20vh]">
          <div className='flex justify-between bg-gradient-to-r from-white to-gray-50  my-4 mx-3 p-3 rounded'>
            {
              !isLoading ?
                <>
                  <p className='text-gray-400 text-xs sm:text-sm'>Terakhir diperbarui pada {(data[currentIndex]?.lastFetched) || globalLastFetched}</p>
                  <img onClick={handleRefreshUnivContent(data[currentIndex]._id)} className='w-5 h-5 cursor-pointer' width="20px" height="20px" src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-refresh-mintab-for-ios-becris-lineal-becris.png" alt='refresh-content'/>
                </>
                :
                <p className='text-gray-400 text-xs sm:text-sm'>Sedang memperbarui data</p>
            }
            {
              isError && <p>Gagal memperbarui data</p>
            }
          </div>
          {
            data[currentIndex].contentId.map((konten: Content) => (
              <div key={konten._id} className=" overflow-auto bg-gradient-to-r from-white to-gray-50 my-4 mb-16 mx-3 p-3 md:p-8 lg:p-16 rounded scrollup">
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
