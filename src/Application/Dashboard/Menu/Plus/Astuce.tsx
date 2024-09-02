export const Astuce = () => {
    return(
        <>
      <div className="flex justify-center w-full h-screen bg-gradient-to-b to-blue-500 from-cyan-500 to-white">
        <div className="text-center h-screen flex flex-col justify-center">
          <h1 className="font-medium text-4xl mb-10">Astuce</h1>
          <h2 className="font-medium text-xl mb-8">Themes: Nature</h2>
          <ul className="space-y-4 flex-grow text-lg font-medium">
            <li className="py-14 bg-slate-300 rounded-lg ">
              <h3 >Rentrer les plantes à l'intérieur</h3>
            </li>
            <li className="py-14 bg-slate-300 rounded-lg">
              <h3>Utiliser la lumière naturelle</h3>
            </li>
            <li className="py-14 bg-slate-300 rounded-lg">
              <h3>Faire des pauses dans la nature</h3>
            </li>
            <li className="py-14 bg-slate-300 rounded-lg">
              <h3>Réduire la consommation de papier</h3>
            </li>
            <li className="py-14 bg-slate-300 rounded-lg">
              <h3>Utiliser des produits écologiques</h3>
            </li>
          </ul>
        </div>
      </div>
    </>
    )
}