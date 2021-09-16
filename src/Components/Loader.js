import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/loader.json";

function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="d-flex justify-content-center">
      <Lottie options={defaultOptions} width={400} height={400} />
    </div>
  );
}

export default Loader;
