import { useState } from 'react';
import { FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import {http} from '../../../Infrastructure/Http/axios';

export const Connect = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        handleSubmit(event); // Pass the event to handleSubmit
    }
};

const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent default form submission
    event.preventDefault?.();

    if (!username || !password) {
        alert('Veuillez remplir tous les champs requis');
        return;
    }

    try {
        const response = await http.post('/login', { email: username, password });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            window.location.href = '/giversdashboard';
        } else {
            alert('Erreur de connexion');
        }
    } catch (error) {
        console.error(error);
        alert('Erreur de connexion');
    }
};

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-4xl font-bold flex items-center justify-center mb-4">
        <img src="/public/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" width={140} alt="Logo" />
        <h1>Tree low</h1>
      </div>
      <p className="text-center">Connectez-vous pour Continuer:</p>
      <input
          type="email"
          placeholder="Saisissez votre Email"
          value={username}
          onChange={handleUserNameChange}
          onKeyPress={handleKeyPress}
          className="w-60 p-1 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-6"
        />
      <div className="flex items-center">
        <input
          type="password"
          placeholder="Saisissez votre mot de passe"
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={handleKeyPress}
          className="w-60 p-1 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-3"
        />
      </div>
      <button
        className="w-60 p-2 mb-4 mt-3 bg-blue-600 shadow-md hover:shadow-lg rounded-md px-6 py-2 text-white"
        onClick={handleSubmit}
      >
        Connexion
      </button>
      <p className="text-center">Ou continuer avec:</p>
      <div className="flex  flex-col justify-center mb-4 mt-6">
        <button className="w-60 flex items-center justify-center gap-2 outline outline-1 rounded-md px-6 py-2"><FcGoogle/> Google</button>
        <button className="w-60 flex items-center justify-center gap-2 outline outline-1 rounded-md mt-3 px-6 py-2"><FaMicrosoft /> Microsoft</button>
      </div>
      <div className="flex gap-16">
        <NavLink to={"/recoverylink"}>
          <button className="underline mt-4">Vous ne pouvez pas vous connecter ?</button>
        </NavLink>
        <NavLink to={"/register"}>
          <button className="underline mt-4">Création du compte</button>
        </NavLink>
      </div>
      <hr className="w-1/3 border-1 border-black mt-6" />
    </div>
  );
};