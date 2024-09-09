import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import React from "react";

export const Password: React.FC<{
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleRegister: () => void;
}> = ({ password, setPassword, handleRegister }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-4xl font-bold flex items-center justify-center mb-4">
        <img
          src="/public/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg"
          width={140}
          alt="Logo"
        />
        <h1>Tree low</h1>
      </div>
      <p className="text-center">Mot de Passe pour Continuer:</p>
      <input
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        type="password"
        placeholder="Saisissez votre Mot de passe"
        className="w-60 p-1 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-6"
      />
      <div className="flex items-center mt-3"></div>
      <button
        onClick={handleRegister}
        className="w-60 p-2 mb-4 bg-blue-600 rounded-md px-6 py-2 text-white"
      >
        Continuer
      </button>
      <p className="text-center">Ou continuer avec:</p>
      <div className="flex  flex-col justify-center mb-4 mt-6">
        <button className="w-60 flex items-center justify-center gap-2 outline outline-1 rounded-md px-6 py-2">
          <FcGoogle /> Google
        </button>
        <button className="w-60 flex items-center justify-center gap-2 outline outline-1 rounded-md mt-3 px-6 py-2">
          <FaMicrosoft /> Microsoft
        </button>
      </div>
      <hr className="w-80 border-1 border-black mt-6" />
    </div>
  );
};
