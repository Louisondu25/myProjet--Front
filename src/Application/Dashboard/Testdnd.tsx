import React, { useState } from 'react';
import { GiCardAceSpades } from "react-icons/gi";
import { RiArchiveStackFill } from "react-icons/ri";
import { NavLink } from "react-router-dom"



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
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

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

  const handleSelectTask = (task: Task) => {
    if (selectedTasks.find((t) => t.id === task.id)) {
      setSelectedTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } else {
      setSelectedTasks((prevTasks) => [...prevTasks, task]);
    }
  };

const handleArchiveTasks = () => {
  setFinishedTasks((prevTasks) => prevTasks.filter((task) => !selectedTasks.includes(task)));
  setSelectedTasks([]);
};

const handleArchiveAllTasks = () => {
  setFinishedTasks([]);
  setSelectedTasks([]);
};

  return (
    <div className="flex justify-center items-center">
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
        <h2 className="bg-white rounded-sm mb-2 flex justify-center">Tasks to Do</h2>
        {tasksToDo.map((task) => (
          <div
            key={task.id}
            draggable={true}
            onDragStart={(e) => handleDragStart(task, e)}
            className="bg-gray-200 border border-black p-2 rounded mt-1"
          >
            {task.text}
          </div>
        ))}
        <NavLink to={"/carte"}>
          <button className="flex justify-center items-center bg-white rounded-sm  px-2 font-medium shadow-md hover:shadow-lg mt-2">
          <GiCardAceSpades /> Ajouter une carte
        </button>
        </NavLink>
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
        <h2 className="bg-white rounded-sm mb-2 flex justify-center">Finished Tasks</h2>
        {finishedTasks.map((task) => (
          <div
            key={task.id}
            draggable={true}
            onDragStart={(e) => handleDragStart(task, e)}
            className="bg-gray-200 border border-black p-2 rounded mt-1"
          >
            <input
              type="checkbox"
              checked={selectedTasks.includes(task)}
              onChange={() => handleSelectTask(task)}
            />
            {task.text}
          </div>
        ))}
          <button
          className="flex justify-center items-center bg-white rounded-sm  px-2 font-medium shadow-md hover:shadow-lg mt-2 "
          onClick={handleArchiveTasks}
        >
          <RiArchiveStackFill/> Archiver
               </button>
               <button
                  className="flex justify-center items-center bg-white rounded-sm px-2 font-medium shadow-md hover:shadow-lg mt-2"
                  onClick={handleArchiveAllTasks}
                >
                  <RiArchiveStackFill /> Archiver Toutes les tâches
              </button>
        </div>
      </div>
  );
};