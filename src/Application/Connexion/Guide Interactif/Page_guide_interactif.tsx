import React, {Dispatch} from "react";

export const FirstPageGI: React.FC<{onClick: Dispatch<React.SetStateAction<number>>}> = ({onClick}) => {

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className=" text-4xl text-center font-bold mt-8">Comment fonctionne Tree Low ?</h1>
        <img src="/public/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" alt="Logo Tree Low" width="400px" />
        <p className="text-xl text-center mt-8">Une Application de gestion de taches et de projet</p>
        <p className=" text-xl text-center mt-24">
          L'application Tree low est un moyen de gérer ces rendez-vous projet ou encore des tâches à effectuer.
          Vous pouvez personnaliser votre propre tableau via plusieurs moyens.
        </p>
        <button onClick={() => onClick(1)} className="next-button mt-28 bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg">Suivant</button>
      </div>
    </>
  );
};
