import { http } from '../../../Infrastructure/Http/axios'; // Assurez-vous que http est bien configuré
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



export const FirstCreateBoard = () => {
  // Gestion des états pour les inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  // Fonction pour gérer la création du tableau
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Vérification que tous les champs sont remplis
    if (!title || !content || !status) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      // Envoi d'une requête POST vers l'API pour créer le tableau
      const requestBody = { title, content, status };
      console.log('Request Body:', requestBody);
      const response = await http.post('/board', requestBody);

      console.log(response); // Affiche toute la réponse pour diagnostic

      // Si le statut est 201, la ressource a été créée avec succès
      if (response.status === 201) {
        console.log('Tableau créé avec succès', response.data);
        navigate('/giversdashboard'); // Redirection vers /dashboard
      } else {
        // Si le statut n'est pas celui attendu pour un succès
        console.error('Erreur lors de la création du tableau: Statut non réussi', response.status);
        console.error('Détails de la réponse:', response.data);
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='py-5'>
        <h1 className="text-center text-3xl font-bold">Création de Tableaux</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 py-14">
          <label className="flex flex-col items-center py-10">
            <h2 className="text-left font-medium text-lg">Titre</h2>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Saisissez le titre..."
              className="text-center px-4 py-2 w-64"
            />
          </label>
          <label className="flex flex-col items-center py-10">
            <h2 className="text-left font-medium text-lg">Contenu</h2>
            <input
              type="text"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Saisissez le contenu..."
              className="text-center px-4 py-2 w-64"
            />
          </label>
          <label className="flex flex-col items-center py-10">
            <h2 className="text-left font-medium text-lg">Status</h2>
            <input
              type="text"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              placeholder="Saisissez Private/Public..."
              className="text-center px-4 py-2 w-64"
            />
          </label>
          <button className="bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg mx-auto">
            Crée un Tableau
          </button>
        </form>
      </div>
    </>
  );
};