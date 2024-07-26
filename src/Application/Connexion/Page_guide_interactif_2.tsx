import {NavLink} from "react-router-dom";
import React, {Dispatch} from "react";

export const SecondPageGI: React.FC<{onClick: Dispatch<React.SetStateAction<number>>}> = ({onClick}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center mt-8">Découvrir Tree Low de façon ludique</h1>
        <img src="/2ndpagegi.svg" alt="Dessin D'Animation Pour te connecté" width="400px" />
        <p className="text-center mt-8">Création de votre compte et Suivre les étapes du guide interactif</p>
        <p className="text-center mt-8">
          Créé votre compte et n’hésite pas à sauvegarder votre mot de passe et Suivez les étapes  suivantes  du guide interactif afin de pouvoir  terminer le guide
        </p>
        <button onClick={() => onClick(2)} className="next-button absolute bottom-4 right-4 mt-8">Suivant</button>
      </div>
    </>
  );
};