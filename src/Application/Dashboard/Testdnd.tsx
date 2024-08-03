// import { Column } from "./Colonnes";

// export const Testdnd = () => {

//   return (
//     <>
//         <Column/>
//     </>
//   );
// };


// import React, { useState } from 'react';

// interface Item {
//   id: number;
//   text: string;
// }

// interface ColumnProps {
//   items: Item[];
//   onDrop: (item: Item) => void;
// }

// const Column: React.FC<ColumnProps> = ({ items, onDrop }) => {
//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     const item = JSON.parse(e.dataTransfer.getData('item'));
//     onDrop(item);
//   };

//   return (
//     <div
//       className="column  outline outline-1"
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       {items.map((item) => (
//         <div
//           key={item.id}
//           draggable={true}
//           onDragStart={(e) => {
//             e.dataTransfer.setData('item', JSON.stringify(item));
//           }}
//         >
//           {item.text}
//         </div>
//       ))}
//     </div>
//   );
// };

// export const Testdnd  = () => {
//   const [column1Items, setColumn1Items] = useState<Item[]>([
//     { id: 1, text: 'Item 1' },
//     { id: 2, text: 'Item 2' },
//     { id: 3, text: 'Item 3' },
//   ]);

//   const [column2Items, setColumn2Items] = useState<Item[]>([]);

//   const handleDrop = (item: Item) => {
//     setColumn1Items((prevItems) => prevItems.filter((i) => i.id !== item.id));
//     setColumn2Items((prevItems) => [...prevItems, item]);
//   };

//   return (
//     <div className="Testdnd">
//       <Column items={column1Items} onDrop={handleDrop} />
//       <Column items={column2Items} onDrop={() => {}} />
//     </div>
//   );
// };

// import React, { useState } from 'react';

// interface Item {
//   id: number;
//   text: string;
// }

// interface ColumnProps {
//   items: Item[];
//   onDrop: (item: Item) => void;
// }

// const Column: React.FC<ColumnProps> = ({ items, onDrop }) => {
//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     const item = JSON.parse(e.dataTransfer.getData('item'));
//     onDrop(item);
//   };

//   return (
//     <div
//       className="column outline outline-1"
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       {items.map((item) => (
//         <div
//           key={item.id}
//           draggable={true}
//           onDragStart={(e) => {
//             e.dataTransfer.setData('item', JSON.stringify(item));
//           }}
//         >
//           {item.text}
//         </div>
//       ))}
//     </div>
//   );
// };

// export const Testdnd = () => {
//   const [column1Items, setColumn1Items] = useState<Item[]>([
//     { id: 1, text: 'Item 1' },
//     { id: 2, text: 'Item 2' },
//     { id: 3, text: 'Item 3' },
//   ]);

//   const [column2Items, setColumn2Items] = useState<Item[]>([]);

//   const handleDropColumn1 = (item: Item) => {
//     setColumn2Items((prevItems) => [...prevItems, item]);
//     setColumn1Items((prevItems) => prevItems.filter((i) => i.id !== item.id));
//   };

//   const handleDropColumn2 = (item: Item) => {
//     setColumn1Items((prevItems) => [...prevItems, item]);
//     setColumn2Items((prevItems) => prevItems.filter((i) => i.id !== item.id));
//   };

//   return (
//     <div className="app">
//       <Column items={column1Items} onDrop={handleDropColumn2} />
//       <Column items={column2Items} onDrop={handleDropColumn1} />
//     </div>
//   );
// };

import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
}

export const Testdnd = () => {
  const [tasksToDo, setTasksToDo] = useState<Task[]>([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' },
    { id: 4, text: 'Task 4' },
    { id: 5, text: 'Task 5' },
  ]);

  const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);

  const handleDragStart = (task: Task, e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const handleDrop = (tasks: Task[], task: Task) => {
    if (!finishedTasks.find((t) => t.id === task.id)) {
      setTasksToDo((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      setFinishedTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  const handleDropFinished = (tasks: Task[], task: Task) => {
    if (!tasksToDo.find((t) => t.id === task.id)) {
      setFinishedTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      setTasksToDo((prevTasks) => [...prevTasks, task]);
    }
  };

  return (
    <div className=" flex justify-center items-center">
      <div
        className="column bg-gray-400 mt-2"
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
          width: '200px',
          minHeight: '200px',
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const task = JSON.parse(e.dataTransfer.getData('task'));
          handleDropFinished(finishedTasks, task);
        }}
      >
        <h2 className='bg-white rounded-sm mb-2 flex justify-center'>Tasks to Do</h2>
        {tasksToDo.map((task) => (
          <div
            key={task.id}
            draggable={true}
            onDragStart={(e) => handleDragStart(task, e)}
            className='bg-gray-200 border border-black p-2 rounded mt-1'
          >
            {task.text}
          </div>
        ))}
      </div>
      <div
        className="column bg-purple-400"
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
          width: '200px',
          minHeight: '200px',
          marginLeft: '20px',
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const task = JSON.parse(e.dataTransfer.getData('task'));
          handleDrop(tasksToDo, task);
        }}
      >
        <h2 className='bg-white rounded-sm mb-2 '>Finished Tasks</h2>
        {finishedTasks.map((task) => (
          <div
            key={task.id}
            draggable={true}
            onDragStart={(e) => handleDragStart(task, e)}
            className='bg-purple-200 border border-black p-2 rounded mt-1'
          >
            {task.text}
          </div>
        ))}
      </div>
    </div>
  );
};