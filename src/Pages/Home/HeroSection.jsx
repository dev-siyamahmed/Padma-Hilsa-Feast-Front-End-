export const HeroSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="text-black 
                 lg:text-4xl md:text-2xl text-xl font-extrabold 
                  text-center lg:text-left
                  leading-tight mb-6">
            Embark on a Culinary Journey
            <br />
            Where Every Bite is a Masterpiece
            <br />
            <span className="
                      text-rose-600">Flavorful
              Excellence</span>
          </h1>
          <p className="text-gray-700 
                  md:text-lg lg:text-xl text-sm font-medium text-center
                  lg:text-left leading-relaxed mb-6">
            Where Each Plate Weaves a
            Story of Culinary Mastery and
            Passionate
            Craftsmanship
          </p>
          <button className="bg-rose-600 
                  text-white md:text-lg text-sm  font-semibold 
                  md:py-3 py-2 lg:px-6 md:px-4 px-2 rounded-full shadow-md
                  hover:bg-rose-700 transition-colors">
            Order Now
          </button>
        </div>

        <div className=" lg:mt-0 lg:col-span-4 lg:flex">
          <img
            src="https://i.ibb.co.com/wZytfxwN/47517.jpg"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
};
