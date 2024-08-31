import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";

export const CreatedBoard = () => {
  return (
    <>
    <div className="w-full h-screen bg-gradient-to-b to-blue-500 from-cyan-500 to-white">
      <div className="bg-blue-800">
        <header className="flex justify-between items-center">
          <div className="flex items-center ml-5 text-white">
            <img src="/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" alt="Logo_Tree-low" width={60} />
            <h1>Tree Low</h1>
          </div>
          <label className="bg-white px-3 rounded-sm">Tableaux</label>
          <div className="flex items-center">
            <CiSearch className="text-white mr-1" />
            <input type="text" placeholder="Rechercher" className="rounded-sm" />
          </div>
          <div className="text-xl flex space-x-4 mr-4 text-white">
            <button>
              <TbInfoSquareRoundedFilled />
            </button>
            <button>
              <IoIosNotifications />
            </button>
            <button>
              <MdAccountCircle />
            </button>
          </div>
        </header>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-1/4">
          <div className="flex flex-col space-y-6">
            <div className="flex  flex-col">
              <label className="text-sm outline outline-1 outline-slate-400 bg-white px-3 ml-2 rounded-sm mt-2">
                Vos Tableaux
              </label>
              <div className="flex space-x-4">
                <button className="w-60 h-32 m-4 relative">
                  <img src="https://picsum.photos/200/300?random=25" alt="Desert" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                    <p className="text-sm">Sunset Hike</p>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm outline outline-1 outline-slate-400 bg-white px-3 ml-2 rounded-sm mb-2">
                Autre Tableaux
              </label>
              <div className="flex space-x-4">
                
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex space-x-4">
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row ">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button className="w-60 h-32 mt-12 relative">
                    <img src="https://picsum.photos/200/300?random=28" alt="Desert" className="w-full h-full object-cover rounded-md" />
                    <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                      <p className="text-sm">Cityscape Night</p>
                    </div>
                  </button>
                  <button className="w-60 h-32 mt-12 relative">
                    <img src="https://picsum.photos/200/300?random=29" alt="Desert" className="w-full h-full object-cover rounded-md" />
                    <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                      <p className="text-sm"> Tropical Beach</p>
                    </div>
                  </button>
                  <button className="w-60 h-32 mt-12 relative">
                  <img src="https://picsum.photos/200/300?random=30" alt="Desert" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                    <p className="text-sm"> Wildflower Meadow</p>
                  </div>
                </button>
                <button className="w-60 h-32 mt-12 relative">
                  <img src="https://picsum.photos/200/300?random=31" alt="Desert" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                    <p className="text-sm"> Coffee Break </p>
                  </div>
                </button>
                <button className="w-60 h-32 mt-12 relative">
                  <img src="https://picsum.photos/200/300?random=32" alt="Desert" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                    <p className="text-sm">Urban Art</p>
                  </div>
                </button>
                <button className="w-60 h-32 mt-12 relative">
                  <img src="https://picsum.photos/200/300?random=33" alt="Desert" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                    <p className="text-sm"> Fur</p>
                  </div>
                </button>
                <button className="w-60 h-32 mt-12 relative">
                  <img src="https://picsum.photos/200/300?random=34" alt="Desert" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                    <p className="text-sm">Mountain Lake </p>
                  </div>
                </button>
                <button className="w-60 h-32 mt-12 relative">
                  <img src="https://picsum.photos/200/300?random=35" alt="Desert" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                    <p className="text-sm">Foodie Deligh</p>
                  </div>
                </button>
                <button className="w-60 h-32 mt-12 relative">
                  <img src="https://picsum.photos/200/300?random=36" alt="Desert" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                    <p className="text-sm"> Waterfall Wonder</p>
                  </div>
                </button>
                <button className="w-60 h-32 mt-12 relative">
                  <img src="https://picsum.photos/200/300?random=37" alt="Desert" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                    <p className="text-sm"> City Bike Ride</p>
                  </div>
                </button>
                <button className="w-60 h-32 mt-12 relative">
                  <img src="https://picsum.photos/200/300?random=38" alt="Desert" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                    <p className="text-sm">Snow Covered Mountain</p>
                  </div>
                </button>
                <button className="w-60 h-32 mt-12 relative">
                  <img src="https://picsum.photos/200/300?random=39" alt="Desert" className="w-full h-full object-cover rounded-md" />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded-sm">
                    <p className="text-sm">Sunrise Serenity</p>
                  </div>
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};