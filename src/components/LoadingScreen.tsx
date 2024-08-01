import React from "react";

const LoadingScreen = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col">
      <div className="loading loading-bars loading-lg"></div>
      <p className="font-extrabold font-btnfont">Please Wait</p>
    </div>
  );
};

export default LoadingScreen;
