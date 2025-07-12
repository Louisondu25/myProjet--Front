import { CiImageOn } from "react-icons/ci";
import { BsListTask } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineVideoLabel } from "react-icons/md";
import { VscChecklist } from "react-icons/vsc";
import { MdOutlineUpdate } from "react-icons/md";
import { FiPaperclip } from "react-icons/fi";
import { useState } from 'react';
import { http } from '../../Infrastructure/Http/axios'; // Assurez-vous que http est bien configuré
import { useNavigate } from "react-router-dom";


export const Card = () => {
  // Gestion des états pour les inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [, setTasksToDo] = useState<string[]>([]);  // Gestion des tâches à faire

     const navigate = useNavigate();

  // Fonction pour gérer l'ajout de la tâche
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // Vérification que tous les champs sont remplis
  if (!title || !content || !comment || !dueDate) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  try {
    // Envoi d'une requête POST vers l'API pour ajouter la tâche
    const requestBody = { title, content, comment, dueDate, category_id: '67fad707c68de4587fc4b4e0', archive: false};  //possibilité d'ajouter d'autre champs (Commentaire par exemple ou autre)
    console.log('Request Body:', requestBody);
    const response = await http.post('/task', requestBody);

    console.log(response); // Affiche toute la réponse pour diagnostic

    // Si le statut est 201, la ressource a été créée avec succès
    if (response.status === 201) {
      console.log('Tâche ajoutée avec succès', response.data);
      setTasksToDo((prevTasks) => [...prevTasks, title]);
      navigate('/dashboard'); // Redirection vers /dashboard
    } else {
      // Si le statut n'est pas celui attendu pour un succès
      console.error('Erreur lors de l\'ajout de la tâche: Statut non réussi', response.status);
      console.error('Détails de la réponse:', response.data);
    }
  } catch (error: unknown) {
      console.error(error);
  }
};

  return (
    <>
      <header className="h-[50vh] bg-gradient-to-r to-blue-500 from-cyan-500 to-white relative">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("/banner-image.jpg")' }}>
          <button className="absolute bottom-0 right-0 bg-gray-700 text-white mr-2 px-6 py-1 rounded-sm flex items-center">
            <CiImageOn className="mr-2" /> Banniere
          </button>
        </div>
      </header>

      <div className="flex gap-2">
        <div className="flex flex-col space-y-10 ml-2 font-medium">
          <h1 className="text-2xl">Title</h1>
          {/* Formulaire pour ajouter une nouvelle tâche */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Saisissez votre titre..."
              className="w-60 p-1 mb-4 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-3"
            />
              <button type="submit" className="bg-blue-400 text-white ml-2 px-3 rounded-sm">Ajouter</button>

            <h2 className="flex items-center font-bold mt-14"><BsListTask className="mr-2"/>Content</h2>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Description de votre carte..."
              className="w-60 p-1 mb-4 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-3"
            />
            <h2 className="flex items-center font-bold mt-14"><FaCommentAlt className=" mr-2" />Commentaires</h2>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ecrivez votre commentaire..."
              className="w-60 p-1 mb-4 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-3"
            />
          </form>
        </div>

        <div className="text-center lg:w-7/12">
          <h2 className="text-center font-bold">Date échéance</h2>
          <div className="flex items-center rounded-md p-2">
            <input
              type="checkbox"
              className="mr-2"
            />
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="absolute right-0">
          <h2 className="font-bold mr-5">Ajouter des cartes</h2>
          <div className="flex flex-col justify-end p-2 space-y-3">
            <button className="flex items-center bg-gray-300 rounded-sm mr-2"><IoPeopleSharp className="mr-2" />Membres</button>
            <button className="flex items-center bg-gray-300 rounded-sm mr-2"><MdOutlineVideoLabel className="mr-2" />Etiquettes</button>
            <button className="flex items-center bg-gray-300 rounded-sm mr-2"><VscChecklist className="mr-2" />Checklist</button>
            <button className="flex items-center bg-gray-300 rounded-sm mr-2"><MdOutlineUpdate className="mr-2" />Date Limite</button>
            <button className="flex items-center bg-gray-300 rounded-sm mr-2"><FiPaperclip className="mr-2" />Pièce Jointe</button>
          </div>
        </div>
      </div>
    </>
  );
};
