import React, { useState } from "react";
import UploadButton from "./UploadButton";
import UploadProvider from "./UploadProvider";

const Upload = () => {
  const [fileList, setFileList] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <UploadProvider fileList={fileList} setFileList={setFileList} />
      <UploadButton fileList={fileList} setFileList={setFileList} />
    </div>
  );
};

export default Upload;
