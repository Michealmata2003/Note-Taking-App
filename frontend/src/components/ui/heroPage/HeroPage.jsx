import heroimage from "../../../assets/images/heroimage.png";



const HeroPage = () => {
  return (
    <div className=" bg-gradient-to-r from-purple-100 to-pink-100 w-full h-[100%] py-[3rem]">
      <div className="container">
        <section id="hero" className="h-full align-center justify-center flex flex-col md:flex-row items-center">
          <div className="justify-center">
            <h2 className="text-[49px] font-bold mb-4 w-[90%]">
              Networking <span className="text-pink-500">solutions</span> for
              worldwide communication
            </h2>
            <p className="text-2xl mb-6 w-[90%]">
              We’re a company that focuses on establishing long-term
              relationships with customers.
            </p>
            <button className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition">
              Explore More
            </button>
          </div>
          <div className="mt-8 md:mt-0 md:w-full flex justify-center">
            <img
              src={heroimage}
              alt="Networking Illustration"
              className="w-[430px]"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroPage;
