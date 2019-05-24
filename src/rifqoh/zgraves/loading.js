import React from "react";
import Loader from "react-spinners/ClipLoader";

const Loading = () => (
  <div className="container center justify-content-center align-items-center">
    <Loader sizeUnit={"px"} size={150} />
  </div>
);

export default Loading;
