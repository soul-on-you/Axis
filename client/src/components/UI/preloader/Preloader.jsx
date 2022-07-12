import React from "react";
import styles from "./Preloader.module.css";

function Preloader({ className }) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        className={styles.preloader}
        style={{
            scale: "2",
          position: "unset",
          width: "50px",
          margin: "auto",
          opacity: 1,
          visibility: "visible",
        }}
      >
        <span />
      </div>
    </div>
  );
}

export default Preloader;
