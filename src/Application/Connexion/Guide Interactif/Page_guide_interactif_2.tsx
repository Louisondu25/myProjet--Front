import React, {Dispatch} from "react";

export const SecondPageGI: React.FC<{onClick: Dispatch<React.SetStateAction<number>>}> = ({onClick}) => {
  return (
    <>
      <div className=" bg-home flex flex-col items-center justify-center">
        <h1 className=" text-4xl font-bold text-center mt-8 mb-6">Découvrir Tree Low de façon ludique</h1>
        <img src="/public/2ndpagegi.svg" alt="Dessin D'Animation Pour te connecté" width="400px"/>
        <p className="text-center mt-16">Création de votre compte et Suivre les étapes du guide interactif</p>
        <p className="text-center mt-16">
          Créé votre compte et n’hésite pas à sauvegarder votre mot de passe et Suivez les étapes  suivantes  du guide interactif afin de pouvoir  terminer le guide
        </p>
        <button onClick={() => onClick(2)} className="next-button mt-16 bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg">Suivant</button>
      </div>
    </>
  );
};
