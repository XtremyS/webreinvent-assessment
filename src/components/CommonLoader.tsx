import React from "react";
import { CommonLoaderProps } from "../utils/types";

const CommonLoader: React.FC<CommonLoaderProps> = ({ imgStyle }) => {
  return (
    <div className="flex justify-center items-center">
      <img
        src="./loading.png"
        className={`animate-spin ${imgStyle}`}
        alt="loading"
      />
    </div>
  );
};

export default CommonLoader;
