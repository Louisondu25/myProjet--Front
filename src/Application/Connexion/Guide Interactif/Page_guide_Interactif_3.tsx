import React, {Dispatch} from "react";

export const ThirdPageGI: React.FC<{setSkipVerrouillage: Dispatch<React.SetStateAction<boolean>>}> = ({setSkipVerrouillage}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
            <h1 className=" text-4xl  font-bold text-center mt-8">Qu'allez-Vous découvrir sur Tree Low?</h1>
          <div className="flex gap-16 mt-10">
            <div className="flex flex-row items-center mb-4">
            <p className="text-3xl font-bold mr-4">1</p>
            <div className="flex-col">
              <img src="/3rd page gi.svg" alt="Dessin D'Animation de Gestion de Projet" width={200} />
            <p className="text-center">Gestion de projet</p>
            </div>
          </div>
          <div className="flex flex-row items-center mb-4 mt-5">
          <p className="text-3xl font-bold mr-4">2</p>
          <div className="flex-col">
            <img src="/as-pique.svg" alt="As de Pique" width={150}/>
          <p className="text-center">Création de cartes</p>
          </div>
          </div>
          <div className="flex flex-row items-center mb-4 mt-5">
          <p className="text-3xl font-bold mr-4">3</p>
          <div className="flex-col">
            <img src="/3rds page gi.svg" alt="Dessin D'Animation pour Ajouter des membres" width={200} />
          <p className="text-center">Ajouter des membres</p>
          </div>
          </div>
        </div>
        <p className=" text-xl text-center mt-16">et plein d'autres choses à découvrir</p>
        <p className="text-lg text-center mt-16">À Vous de jouer</p>
          <button onClick={() => setSkipVerrouillage(true)} className="next-button mt-16 bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg">Terminée</button>
      </div>
    </>
  );
};

