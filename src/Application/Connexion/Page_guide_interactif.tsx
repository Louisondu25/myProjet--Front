import {NavLink} from "react-router-dom";

export const FirstPageGI = () => {

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center mt-8">Comment fonctionne Tree Low ?</h1>
        <img src="/public/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" alt="Logo Tree Low" width="400px" />
        <p className="text-center mt-8">Une Application de gestion de taches et de projet</p>
        <p className="text-center mt-8">
          L'application Tree low est un moyen de gérer ces rendez-vous projet ou encore des tâches à effectuer.
          Vous pouvez personnaliser votre propre tableau via plusieurs moyens.
        </p>
        <NavLink to="/secondpagegi">
        <button className="next-button absolute bottom-4 right-4 mt-8">Suivant</button>
      </NavLink>
      </div>
    </>
  );
};