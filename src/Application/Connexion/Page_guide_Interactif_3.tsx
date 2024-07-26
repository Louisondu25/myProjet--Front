import React, {Dispatch} from "react";

export const ThirdPageGI: React.FC<{setSkipVerrouillage: Dispatch<React.SetStateAction<boolean>>}> = ({setSkipVerrouillage}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center mt-8">Qu'allez-Vous découvrir sur Tree Low?</h1>
        <div className="flex flex-row items-center mb-4">
          <p className="text-3xl font-bold mr-4">1</p>
          <img src="/3rd page gi.svg" alt="Dessin D'Animation de Gestion de Projet" width={200} />
        </div>
        <p className="text-center">Gestion de projet</p>
        <div className="flex flex-row items-center mb-4 mt-5">
          <p className="text-3xl font-bold mr-4">2</p>
          <img src="/as-pique.svg" alt="As de Pique" width={150}/>
        </div>
        <p className="text-center">Création de cartes</p>
        <div className="flex flex-row items-center mb-4 mt-5">
          <p className="text-3xl font-bold mr-4">3</p>
          <img src="/3rds page gi.svg" alt="Dessin D'Animation pour Ajouter des membres" width={200} />
        </div>
        <p className="text-center">Ajouter des membres</p>
        <p className="text-center mt-8">et plein d'autres choses à découvrir</p>
        <p className="text-center mt-8">À Vous de jouer</p>
          <button onClick={() => setSkipVerrouillage(true)} className="next-button absolute bottom right-2 mt-2">Terminée</button>
      </div>
    </>
  );
};

