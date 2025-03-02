export const HeroSection = () => {
  return (
    <section className="">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 items-center">
        {/* Text Section */}
        <div className="lg:col-span-7 mb-8 lg:mb-0">
          <h1 className="text-rose-600 lg:text-5xl  md:text-3xl text-2xl font-extrabold text-center lg:text-left leading-tight mb-6">
            <p className="mb-2">Fast, Fresh</p>
           
            & Right  <span className="text-gray-500"> To Your Door </span>
            <br />

          </h1>
          <p className="text-gray-700 md:text-lg lg:text-lg text-sm font-medium text-center lg:text-left leading-relaxed mb-6">
            Where Each Plate Weaves a Story of Culinary Mastery 
          </p>

          {/* Search Bar */}
          <div className="w-full md:w-10/12 xl:w-8/12 mx-auto lg:mx-0">
            <div className="flex rounded-md w-full">
              <input
                type="text"
                name="q"
                className="w-full p-3 rounded-md rounded-r-none border-2 border-gray-300 placeholder-current dark:bg-gray-500 dark:text-gray-300 dark:border-none"
                placeholder="keyword"
              />
              <button className="inline-flex items-center gap-2 bg-red-500 text-white text-lg font-semibold py-3 px-6 rounded-r-md">
                <span>Find</span>
              </button>
            </div>
          </div>
        </div>

        {/* Image Section - Right Aligned */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end h-auto">
          <img
            className="h-[80vh] object-contain"
            src="https://i.ibb.co/wZytfxwN/47517.jpg"
            alt="mockup"
          />
        </div>

      </div>
    </section>
  );
};
