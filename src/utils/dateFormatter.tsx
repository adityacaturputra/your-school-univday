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
  
  return {
    time: `${time}`,
    date: `${day}, ${date.dayInMonth} ${date.month} ${date.year}`
  };
};

export default formatDate;