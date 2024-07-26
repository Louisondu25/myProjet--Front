import { NavLink } from "react-router-dom";

export const PageVerouillage = () => {
  return (
    <div>
      <NavLink to="/firstpagegi">
        <button className="bg-home w-full h-screen bg-no-repeat bg-cover flex justify-center items-center">
          <img src="/public/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" width="200px" alt="Logo Tree Low"/>
        </button>
      </NavLink>
    </div>
  );
}