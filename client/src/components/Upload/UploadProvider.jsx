import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { flushSync } from "react-dom";

const UploadProvider = ({ fileList, setFileList }) => {
  const props = {
    name: "files",
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      flushSync(() => setFileList([...fileList, file]));
      return false;
    },
    fileList,
  };
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Выбрать файлы</Button>
    </Upload>
  );
};

export default UploadProvider;
