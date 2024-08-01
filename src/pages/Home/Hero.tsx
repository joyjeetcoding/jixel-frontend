import Image from "next/image";
import Idea from "../../assets/Idea.png";
import Idea2 from "../../assets/Idea2.png";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="h-screen md:max-w-3xl lg:max-w-4xl md:mx-auto">
      <div className="">
        <div className="absolute top-[-1%] right-0 md:right-auto">
          <Image src={Idea} alt="idea-png" />
        </div>
        <p className="absolute right-[25%] font-extrabold bottom-5 text-right w-[40%]  text-2xl font-btnfont hidden lg:block">
          Innovation is born from the willingness to take risks and the courage
          to dream big. Let your passion guide you to create something
          extraordinary.
        </p>
        <div className="absolute hidden right-0 bottom-0 md:block">
          <Image
            src={Idea2}
            height={300}
            width={300}
            className=""
            alt="idea-png"
          />
        </div>
        <div className="absolute top-[30%] left-4 text-5xl font-btnfont font-semibold">
          <p className="w-[40%] md:hidden">
            Unleashing Brilliant Ideas for a Better Tomorrow
          </p>
          <p className="hidden w-[60%] md:block">
            Empowering Your Journey with Innovative Ideas
          </p>
          <Button className=" font-extrabold hover:bg-yellow-400 hover:text-black">Click Here to Explore</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
