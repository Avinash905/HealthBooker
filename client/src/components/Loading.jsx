import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

function Loading() {
  return (
    <BeatLoader className="flex-center loader" color="#00abe4" size={18} />
  );
}

export default Loading;
