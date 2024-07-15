
import { Button } from "@/components/ui/button";
import Hero from "./Hero";
import Image from "next/image";
import Idea from "../../assets/Idea.png"
import Outofthebox from "../../assets/Outofthebox.png"

const HomePage = () => {
  return (
    <div className="md:max-w-3xl lg:max-w-6xl md:mx-auto ">
      <div className="relative ">
        {/* logo */}
        <div className="absolute top-4 left-4 translate-y-2">
          <h1 className="font-logo font-extrabold text-2xl">Jixel</h1>
        </div>
        {/* Login/logout button */}
        <div className="absolute right-4 top-4 md:flex font-btnfont">
          <Button variant="outline">Login</Button>
          <Button className="hidden md:block ml-2">Register</Button>
        </div>
      </div>
      <div className="absolute top-[-1%] right-0 md:right-auto">
        <Image src={Idea} alt="idea-png" />
      </div>
      <div className="absolute right-0 hidden bottom-0 md:block">
        <Image src={Outofthebox} height={500} width={500} className="" alt="idea-png" />
      </div>
      <div className="relative">
        {/* Hero Component */}
        <Hero />
      </div>
    </div>
  );
};

export default HomePage;
