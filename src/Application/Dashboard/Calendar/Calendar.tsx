import {DatePicker} from '@mantine/dates';
import { useEffect, useState } from 'react';
import {Flex} from "@mantine/core";

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
<div style={{width: "100%", height: "100%"}} className="h-full flex flex-col">
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
  <Flex justify={"center"} align={"center"}>
    <DatePicker size={"xl"} style={{width: "15%", height: "50%"}}/>
  </Flex>
</div>
</div>
    </>
  );
};
