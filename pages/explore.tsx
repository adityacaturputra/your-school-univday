import type { NextPage } from 'next';
import Fade from 'react-reveal/Fade';

const Explore: NextPage = () => {

  const datas = ['','','','','','','','','','','','','','','','','','','','','','','',''];

  return (
    <div className="min-h-screen bg-hero bg-center bg-cover bg-fixed">
      <Fade>
        <div className="h-screen bg-gradient-to-b from-black via-transparent to-transparent">
          <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap">
            {datas.map((data, key) => (
              // eslint-disable-next-line react/jsx-key
              <Fade right delay={50*key} key={key}>
                <div className="inline-block bg-white m-6 rounded" style={{height: '10vh', width: '10vh'}}></div>
              </Fade>
            ))}
          </div>
          <div className="" style={{height: '80vh', position: 'relative'}}>
            <div style={{maxHeight:'100%', overflowY:'auto', overflowX: 'hidden'}}>
              {datas.map((data, key) => (
                // eslint-disable-next-line react/jsx-key
                <Fade bottom key={key}>
                  <div className="w-auto bg-white my-6 mx-6 mb-96 rounded" style={{height:900}}>{key}{datas.length}</div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </Fade> 
      
    </div>
  );
};

export default Explore;
