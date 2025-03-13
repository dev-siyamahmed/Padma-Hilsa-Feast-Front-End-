import useCurrentUser from "../../Hooks/useCurrentUser";
import heroImg from "../../assets/hero.webp";
import { MdOutlineMyLocation } from "react-icons/md";

export const HeroSection = ({ setSearchQuery }) => {

  const {currentUser} = useCurrentUser()
  console.log("curren" , currentUser);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query in the parent component
  };
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2  max-w-screen-2xl mx-auto px-3 mb-10 mt-6 ">
      <div className="flex flex-col justify-center space-y-5">
        {/* headings  */}
        <h1 className=" text-4xl sm:text-5xl  md:text-6xl xl:text-7xl font-bold text-[#e10101] ">Fast, Fresh</h1>
        <h1 className="text-3xl sm:text-5xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold">
          <span className=" text-[#e10101] ">& Right</span>{" "}
          <span className="text-[#616161] ">To Your Door</span>
        </h1>
        <h3 className=" text-xl sm:text-2xl text-[#616161]  ">
          Order dishes from favorite restaurants near you.
        </h3>
        {/* search / find food  */}
        <div className="flex items-center justify-center border-2 border-[#e10101] rounded-md relative">
          <div className="w-full md:p-2 p-1 ">
            {" "}
            <input
              className="w-full md:py-3  py-2 px-2 focus:outline-none"
              type="text"
              name="search"
              id="search"
              placeholder="Enter the location"
              onChange={handleSearchChange}
            />{" "}
          </div>
          <div className="bg-[#e10101] w-40 h-full flex justify-center items-center">
            {" "}
            <button className="text-lg sm:text-2xl font-bold text-white">Find Food</button>
          </div>
          <div className="absolute right-28 sm:right-36 text-[#e10101] font-semibold ">
            <button className=" hidden md:block  justify-center items-center gap-1">
              <MdOutlineMyLocation />
              {/* Locate me */}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img className="w-3/4" src={heroImg} alt="hero section image" />
      </div>
    </div>
  );
};
