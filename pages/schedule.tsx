/* eslint-disable @next/next/no-img-element */
import Fade from 'react-reveal/Fade';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ScrollableBox from '../src/components/molecules/ScrollableBox';
import { Schedule } from '../src/types/University';
import Heading from '../src/components/molecules/Heading';
import formatDate from '../src/utils/dateFormatter';

const sortSchedules = (schedules: Schedule[]) => {
  return schedules.sort((a, b) => new Date(a.timeStartDate).getTime() - new Date(b.timeStartDate).getTime());
};

const serveSchedules = (schedules: Schedule[]) => {
  schedules = schedules.map(schedule => {
    const timeNow = new Date().getTime();
    const timeStart = new Date(schedule.timeStartDate).getTime() - 7 * 3600000;
    const timeEnd = new Date(schedule.timeEndDate).getTime() - 7 * 3600000;
    const isLive = timeNow > timeStart && timeNow < timeEnd;
    schedule.isLive = isLive;    

    return schedule;
  });

  return sortSchedules(schedules);
};


const SchedulePage: NextPage = () => {
  const [schedules, setSchedules] = useState<Schedule[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

    
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const schedulesFromLocalStorage = JSON.parse(localStorage.getItem('schedules') || '{}');
        setSchedules(schedulesFromLocalStorage.data);
        const isPassed12Hour = new Date().getTime() > new Date(schedulesFromLocalStorage?.updatedAt).getTime() + 3600000 * 12;
        if (!schedulesFromLocalStorage.data || isPassed12Hour) {
          const fetchedSchedule = await fetch('https://admin-smansaka-your-school-univday-2021.up.railway.app/api/v1/schedule');
          const {schedule : schedules} = await fetchedSchedule.json();
          const localStorageSchedules = {data: schedules, updatedAt: new Date()};
          localStorage.setItem('schedules', JSON.stringify(localStorageSchedules));
          setSchedules(serveSchedules(schedules));
        } else {
          setSchedules(serveSchedules(schedulesFromLocalStorage.data));
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrorMessage((error as any).message);
        const timeoutErrorMessage = setTimeout(() => {
          setErrorMessage('');
        }, 1000);
        return timeoutErrorMessage;
      }
    };
    fetchSchedule();
  }, []);
  return (
    <>
      <Head>
        <title>Univday | Jadwal dan Acara</title>
      </Head>
      <ScrollableBox>
        <Fade>
          <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold m-8 ml-4 px-6 py-2 text-gray-700 border-b-2 border-gray-700 bg-gradient-to-r from-white to-gray-50'>Jadwal dan Acara</h1>
        </Fade>
        { 
          schedules?.map((schedule) => (
            <Fade key={schedule._id}>
              <div className={`p-5 m-4 mb-7 flex min-h-[148px] cursor-default rounded ${schedule.isLive &&'bg-gradient-to-r from-white to-gray-50'}`}>
                {
                  schedule.universityId?.imageId.imageUrl ?
                    <img className='mr-4 h-[75px] w-[75px] sm:w-[108px] md:h-[108px] rounded' src={schedule.universityId?.imageId.imageUrl} alt="" />
                    :
                    <img className='mr-4 h-[75px] w-[75px] sm:w-[108px] md:h-[108px] rounded' src={schedule.universityId?.imageId.imageUrl} alt="" />
                }
                <div>
                  <p className='font-bold text-lg text-gray-700'>{schedule.name}</p>
                  <div className='lg:flex gap-4 items-center'>
                    <p className='text-base font-semibold text-gray-500'>{schedule.universityId?.name || 'Umum'}</p>
                  </div>
                  <div className='flex'>
                    <img className='mr-1' src="/images/place.svg" width='15px' alt="" />
                    <p className='text-sm text-gray-500'>{schedule.place}</p>
                  </div>
                  <div className='flex items-center mt-3'>
                    <img className='mr-1' src="/images/time.svg" width='15px' alt="" />
                    <p className='text-gray-700 text-sm font-bold'>{formatDate(schedule.timeStartDate).time} - {formatDate(schedule.timeEndDate).time}</p>
                  </div>
                  <p className='text-gray-700 text-sm'>{formatDate(schedule.timeStartDate).date}</p>
                </div>
              </div>
            </Fade>
          ))
        }
      </ScrollableBox>
      {
        loading && <Heading animation={true} title='sedang memuat data' />
      }
      {
        errorMessage && <Heading animation={true} title={'gagal mendapatkan data: ' + errorMessage} />
      }
    </>
  );
};

export default SchedulePage;
