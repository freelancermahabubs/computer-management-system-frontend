import React from "react";
import "./Loader.css";

import {ThreeDots} from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
