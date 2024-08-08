export const ChangeColorBackground = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-gradient-to-b to-blue-500 from-cyan-500 to-white">
      <h1 className="text-2xl font-medium  text-white mt-3">Couleur</h1>
      <h2 className="text-xl font-medium mb-28 mt-20 text-white">Personnaliser</h2>
      <div className="flex flex-col mb-8">
        <p className="mb-4 font-medium mr-4">Couleurs:</p>
      <div className="flex justify-center">
        <button className="bg-green-500 w-20 h-20 rounded-md m-4" />
        <button className="bg-green-800 w-20 h-20 rounded-md m-4" />
        <button className="bg-orange-500 w-20 h-20 rounded-md m-4" />
        <button className="bg-pink-500 w-20 h-20 rounded-md m-4" />
        <button className="bg-purple-500 w-20 h-20 rounded-md m-4" />
      </div>
      <div className="flex justify-center mb-4">
        <button className="bg-black w-20 h-20 rounded-md m-4" />
        <button className="bg-red-500 w-20 h-20 rounded-md m-4" />
        <button className="bg-blue-800 w-20 h-20 rounded-md m-4" />
        <button className="bg-blue-400 w-20 h-20 rounded-md m-4" />
        <button className="bg-yellow-500 w-20 h-20 rounded-md m-4" />
      </div>
      </div>
      
    </div>
  )
}