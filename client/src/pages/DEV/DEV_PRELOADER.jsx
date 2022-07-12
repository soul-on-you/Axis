import React from "react";
import Preloader from "../../components/UI/preloader/Preloader";

function DEV_PRELOADER() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Preloader />
    </div>
  );
}

export default DEV_PRELOADER;
