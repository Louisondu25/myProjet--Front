import React, { useState, useEffect } from 'react';
import { GiCardAceSpades } from "react-icons/gi";
import { RiArchiveStackFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { http } from '../../Infrastructure/Http/axios';  // Axios configuré

interface Task {
  id: number;
  text: string;
  status: string;  // Ajout du statut pour suivre l'état des tâches
}

export const Testdnd = () => {
  const [tasksToDo, setTasksToDo] = useState<Task[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]); // Stockage des tâches archivées
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [todoTasks,] = useState<Task[]>([]);


      useEffect(() => {
        // Fonction pour récupérer les tâches
        const fetchTasks = async () => {
          try {
            const response = await http.get('/task');
            //console.log('Response from server:', response);
            const tasks = Array.isArray(response.data) ? response.data : [];
            //console.log('Tasks fetched from server:', tasks); // Vérifiez les tâches récupérées
            setTasksToDo(tasks.filter(task => task.status === 'todo'));
            setFinishedTasks(tasks.filter(task => task.status === 'finished'));
            setArchivedTasks(tasks.filter(task => task.status === 'archived'));


        //console.log('Filtered Tasks to Do:', todoTasks); // Vérifiez les tâches filtrées pour 'todo'
        //console.log('Filtered Finished Tasks:', finishedTasks);
        //console.log('Filtered Archived Tasks:', archivedTasks);
        
        setTasksToDo(todoTasks);
        setFinishedTasks(finishedTasks);
        setArchivedTasks(archivedTasks);
          } catch (error) {
            if (error instanceof Error) {
              console.error('Erreur lors de la mise à jour de la tâche:', error.message);
            } else {
              console.error('Erreur inconnue lors de la mise à jour de la tâche:', error);
            }
          }
        };
        fetchTasks(); // Appel de la fonction pour récupérer les tâches
      }, []); // Dépendances vides pour que le useEffect se déclenche au montage du composant

  const handleDragStart = (task: Task, e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

    const handleDrop = async (tasks: Task[], task: Task) => {
  if (!finishedTasks.find((t) => t.id === task.id)) {
    setTasksToDo((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    setFinishedTasks((prevTasks) => [...prevTasks, task]);

    try {
      await http.put(`/task/${task.id}`, { status: 'finished' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de la mise à jour de la tâche:', error.message);
      } else {
        console.error('Erreur inconnue lors de la mise à jour de la tâche:', error);
      }
    }
  }
};

  const handleDropFinished = async (tasks: Task[], task: Task) => {
  if (!tasksToDo.find((t) => t.id === task.id)) {
    setFinishedTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    setTasksToDo((prevTasks) => [...prevTasks, task]);

    try {
      await http.put(`/task/${task.id}`, { status: 'todo' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de la mise à jour de la tâche:', error.message);
      } else {
        console.error('Erreur inconnue lors de la mise à jour de la tâche:', error);
      }
    }
  }
};

  const handleSelectTask = (task: Task) => {
    if (selectedTasks.find((t) => t.id === task.id)) {
      setSelectedTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } else {
      setSelectedTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  const handleArchiveTasks = async () => {
    try {
      await Promise.all(
        selectedTasks.map((task) =>
          http.put(`/task/${task.id}`, { status: 'archived' }) // Met à jour le statut à "archived"
        )
      );
      setFinishedTasks((prevTasks) =>
        prevTasks.filter((task) => !selectedTasks.includes(task))
      );
      setArchivedTasks((prevTasks) => [...prevTasks, ...selectedTasks]);
      setSelectedTasks([]);
    } catch (error) {
      console.error('Erreur lors de l\'archivage des tâches:', error);
    }
  };

  const handleArchiveAllTasks = async () => {
    try {
      await Promise.all(
        finishedTasks.map((task) =>
          http.put(`/task/${task.id}`, { status: 'archived' }) // Met à jour le statut à "archived"
        )
      );
      setArchivedTasks((prevTasks) => [...prevTasks, ...finishedTasks]);
      setFinishedTasks([]);
      setSelectedTasks([]);
    } catch (error) {
      console.error('Erreur lors de l\'archivage de toutes les tâches:', error);
    }
  };

  const handleRestoreTask = async (task: Task) => {
    try {
      await http.put(`/task/${task.id}`, { status: 'todo' });
      setArchivedTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      setTasksToDo((prevTasks) => [...prevTasks, task]);
    } catch (error) {
      console.error('Erreur lors de la restauration de la tâche:', error);
    }
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
          <RiArchiveStackFill /> Archiver
        </button>
        <button
          className="flex justify-center items-center bg-white rounded-sm px-2 font-medium shadow-md hover:shadow-lg mt-2"
          onClick={handleArchiveAllTasks}
        >
          <RiArchiveStackFill /> Archiver Toutes les tâches
        </button>
      </div>

      <div
        className="column bg-green-400"
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
          width: '200px',
          minHeight: '200px',
          marginLeft: '20px',
        }}
      >
        <h2 className="bg-white rounded-sm mb-2 flex justify-center">Archived Tasks</h2>
        {archivedTasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-200 border border-black p-2 rounded mt-1"
          >
            <button
              className="text-blue-500"
              onClick={() => handleRestoreTask(task)}
            >
              Restaurer
            </button>
            {task.text}
          </div>
        ))}
      </div>
    </div>
  );
};
