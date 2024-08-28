import Image from "next/image";
import Idea from "../../assets/Idea.png";
import Idea2 from "../../assets/Idea2.png";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const handleExplore = () => {
    router.push("/dashboard");
  }



  const text1 =
    "Innovation is born from the willingness to take risks and the courage to dream big. Let your passion guide you to create something extraordinary.".split(
      " "
    );

  const text2 = "Unleashing Brilliant Ideas for a Better Tomorrow".split(" ");

  const text3 = "Empowering Your Journey with Innovative Ideas".split(" ");

  return (
    <div className="h-screen md:max-w-3xl lg:max-w-4xl md:mx-auto">
      <div className="">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="absolute top-[-1%] right-0 md:right-auto"
        >
          <Image src={Idea} alt="idea-png" />
        </motion.div>
        <div className="absolute right-[25%] font-extrabold bottom-5 text-right w-[40%] font-merri text-2xl hidden lg:block">
          {text1.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
              key={i}
              className=""
            >
              {el}{" "}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="absolute hidden right-0 bottom-0 md:block"
        >
          <Image
            src={Idea2}
            height={300}
            width={300}
            className=""
            alt="idea-png"
          />
        </motion.div>
        <div className="absolute top-[30%] left-4 text-5xl font-merri font-semibold md:hidden">
          {text2.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
              key={i}
              className="w-[40%]"
            >
              {el}{" "}
            </motion.span>
          ))}
        </div>
        <div className="absolute top-[30%] left-4 text-5xl font-merri w-[55%] font-semibold hidden md:block">
          {text3.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
              key={i}
              className=" w-[40%]"
            >
              {el}{" "}
            </motion.span>
          ))}
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
          duration: 0.8,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute left-[10%] md:bottom-[10%] bottom-[2%]"
      >
        <Button onClick={handleExplore} className=" font-extrabold px-9 py-6 hover:bg-yellow-400 hover:text-black">
          Click Here to Explore
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;
