import Hero from "./Hero";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  

  return (
    <div className="md:max-w-3xl lg:max-w-6xl md:mx-auto ">
      <Navbar />

      <div className="relative">
        {/* Hero Component */}
        <Hero />
      </div>
    </div>
  );
};

export default HomePage;
