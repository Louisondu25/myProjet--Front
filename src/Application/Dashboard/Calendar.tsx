import { Calendar } from '@mantine/dates';
import { useEffect, useState } from 'react';

export const CalendarDashboard = () => {
  const [today, setToday] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setToday(new Date());
    }, 86400000); // 86400000 is the number of milliseconds in a day
    return () => clearInterval(intervalId);
  }, []);

  const [isPublic, setIsPublic] = useState(true);
  const handleClick = () => {
    setIsPublic(!isPublic);
  };

   const currentMonth = today.toLocaleString('default', { month: 'long' });

  return (
    <>
<div className="w-full h-screen bg-gradient-to-b to-blue-500 from-cyan-500 to-white">
<div className="h-screen flex flex-col">
  <header className="flex justify-between p-4 bg-cyan-500">
    <p className="text-lg bg-black text-white rounded-md px-6 py-2 font font-medium ml-2">
      Aujourd'hui: {today.toLocaleDateString()}
    </p>
    <h1 className="text-3xl font-medium">{currentMonth}</h1>
    <div className="flex items-center">
      <button
        className="bg-black text-white rounded-md px-6 py-2 font font-medium"
        onClick={handleClick}>
        {isPublic ? 'Mois' : 'Semaine'}
      </button>
    </div>
  </header>
  <div >
    <Calendar className="flex-1 text-lg  justify-center items-center" />
  </div>
</div>
</div>
    </>
  );
};