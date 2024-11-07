export const Theme = () => {
  return (
    <>
      <div className="flex justify-center w-full h-screen bg-gradient-to-b to-blue-500 from-cyan-500 to-white">
        <div className="text-center h-screen flex flex-col justify-center">
          <h1 className="font-medium text-4xl mb-14  mt-2">Themes</h1>
          <ul className="space-y-4 flex-grow">
            <li className="py-8">
              <strong>Dark</strong>
              <p>A dark and sleek theme, perfect for those who prefer a minimalist approach.</p>
            </li>
            <li className="py-8">
              <strong>Light</strong>
              <p>A bright and airy theme, ideal for those who want a clean and simple look.</p>
            </li>
            <li className="py-8">
              <strong>Nature</strong>
              <p>A calming theme inspired by the great outdoors, featuring earthy tones and natural textures.</p>
            </li>
            <li className="py-8">
              <strong>Minimalist</strong>
              <p>A stripped-back theme that focuses on simplicity and ease of use, perfect for those who want a distraction-free experience.</p>
            </li>
            <li className="py-8">
              <strong>Vibrant</strong>
              <p>A bold and colorful theme that's sure to brighten up your day, featuring a palette of vibrant hues and playful patterns.</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}