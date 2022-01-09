/* eslint-disable @next/next/no-img-element */
import Fade from 'react-reveal/Fade';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ScrollableBox from '../src/components/molecules/ScrollableBox';
import { Schedule } from '../src/types/UniversityTable';
import Heading from '../src/components/molecules/Heading';


const dayList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const monthList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const getDate = (strDate : string) => {
  const dateSplitTime = strDate.split('T');
  const YYYYMMDD = dateSplitTime[0].split('-');
  const year = YYYYMMDD[0];
  const monthIndex = parseInt(YYYYMMDD[1]) - 1;
  const month = monthList[monthIndex];
  const dayInMonth = YYYYMMDD[2];
  const time = dateSplitTime[1].split('.')[0].split(':')[0] + ':' + dateSplitTime[1].split('.')[0].split(':')[1];
  const dayIndex = new Date(strDate).getDay();
  const day = dayList[dayIndex];

  return { date: {year, month, dayInMonth}, time, day };
};

const formatDate = (strDate: string) => {
  const {date, time, day} = getDate(strDate);
  return `${time} - ${day}, ${date.dayInMonth} ${date.month} ${date.year}`;
};

const SchedulePage: NextPage = () => {
  const [schedules, setSchedules] = useState<Schedule[] | null>([]);
    
  useEffect(() => {
    const fetchSchedule = async () => {
      const fetchedSchedule = await fetch('https://admin-your-school-univday.herokuapp.com/api/v1/schedule');
      const {schedule : schedules} = await fetchedSchedule.json();
      setSchedules(schedules);
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
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold m-8 ml-4 p-6 w-max text-purple-600 border-b-2 border-purple-600 bg-purple-200 rounded'>Jadwal dan Acara</h1>
        </Fade>
        { 
          schedules?.map((schedule, i) => (
            <Fade key={schedule._id} delay={250*i}>
              <div className='p-5 m-4 max-w-max flex min-h-[148px] cursor-default hover:text-purple-600 text-purple-50 border-b-2 hover:border-purple-600 bg-purple-200 rounded bg-opacity-30 hover:bg-opacity-100 text-2xl transition duration-500 ease-in-out shadow-inner'>
                {
                  schedule.universityId?.imageId.imageUrl ?
                    <img className='mr-4 h-[75px] w-[75px] sm:w-[108px] md:h-[108px] rounded' src={schedule.universityId?.imageId.imageUrl} alt="" />
                    :
                    <img className='mr-4 h-[75px] w-[75px] sm:w-[108px] md:h-[108px] rounded' src={schedule.universityId?.imageId.imageUrl} alt="" />
                }
                <div>
                  <p className='font-bold text-lg'>{schedule.universityId?.name || 'Umum'}</p>
                  <p className='text-base'>{schedule.name}</p>
                  <p className='font-extralight text-sm mt-3'>{formatDate(schedule.timeStartDate)}</p>
                  <p className='font-extralight text-sm'>{formatDate(schedule.timeEndDate)}</p>
                </div>
              </div>
            </Fade>
          ))
        }
      </ScrollableBox>
      {
        !schedules?.length && <Heading animation={true} title='sedang me-load data' />
      }
    </>
  );
};

export default SchedulePage;
