import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Password } from './MotDePasse';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [terms, setTerms] = useState(false);
  const [showPasswordComponent, setShowPasswordComponent] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerms(e.target.checked);
  };

  const handleSubmit = () => {
    if (!email || !terms) {
      alert('Veuillez remplir tous les champs obligatoires');
    } else {
      setShowPasswordComponent(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {showPasswordComponent ? (
        <NavLink to={"/register"}>
          <Password />
        </NavLink>
      ) : (
        <>
          <div className="text-4xl font-bold flex items-center justify-center mb-4">
            <img src="/public/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" width={140} alt="Logo" />
            <h1>Tree low</h1>
          </div>
          <p className="text-center">Inscrivez-vous pour Continuer:</p>
          <input
            type="email"
            placeholder="Saisissez votre Pseudo"
            value={email}
            onChange={handleEmailChange}
            className="w-60 p-1 mb-4 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-6"
          />
          <div className="flex items-center mb-4 mt-6">
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              onChange={handleTermsChange}
            />
            <label htmlFor="terms" className="ml-2">
              En m'inscrivant, j'accepte  les conditions d'utilisation de Tree low et je confirme avoir pris connaissance de sa politique de confidentialité
            </label>
          </div>
          <button
            className="w-60 p-2 mb-4 mt-6 bg-blue-600 rounded-md px-6 py-2 text-white"
            onClick={handleSubmit}
          >
            Continuer
          </button>
          <p className="text-center">Ou continuer avec:</p>
          <div className="flex  flex-col justify-center mb-4 mt-6">
            <button className="w-60 flex items-center justify-center gap-2 outline outline-1 rounded-md px-6 py-2"><FcGoogle/> Google</button>
            <button className="w-60 flex items-center justify-center gap-2 outline outline-1 rounded-md mt-3 px-6 py-2"><FaMicrosoft /> Microsoft</button>
          </div>
          <hr className="w-2/3 border-1 border-black mt-6" />
        </>
      )}
    </div>
  );
};