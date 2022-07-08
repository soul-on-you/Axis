import { UploadOutlined } from "@ant-design/icons";
// import { combineReducers } from "@reduxjs/toolkit";
import { Button, message, Upload } from "antd";
import React, { useState } from "react";
import { flushSync } from "react-dom";
import { useUploadDetailMutation } from "../../api/FileApi";

const DEV_UPLOAD_V2 = ({ fileList, setFileList }) => {
  //
  // const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [post_detail, { error }] = useUploadDetailMutation();

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file);
    });

    setUploading(true);

    post_detail(formData)
      .unwrap()
      .then((e) => {
        console.log(e);

        setFileList([]);
        message.success("upload successfully.");
      })
      .catch((e) => {
        console.log(e);
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  // const beforeUpload = async (file) => {
  //   const suffix = file.name.slice(file.name.lastIndexOf("."));
  //   const filename = Date.now() + suffix;

  //   file.url = "details/" + filename;
  //   return file;
  // };

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
      // console.log(file);
      // flushSync(() =>
      //   setFileList([
      //     ...fileList,
      //     {
      //       url: file.url,
      //       name: file.name,
      //       percent: 100,
      //       response: undefined,
      //       size: file.size,
      //       status: "done",
      //       type: file.type,
      //       originFileObj: file,
      //     },
      //   ])
      // );
      // file.url = "dev";
      flushSync(() => setFileList([...fileList, file]));

      // flushSync(() =>
      //   setFileList([
      //     ...fileList,
      //     {
      //       ...file,
      //       percent: 100,
      //       response: null,
      //       status: "done",
      //       originFileObj: file,
      //     },
      //   ])
      // );
      // console.log(fileList);

      //   return false;
      return file;
    },
    // beforeUpload,
    customRequest: ({ onSuccess }) => {
      onSuccess();
    },
    fileList,
  };
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
};

export default DEV_UPLOAD_V2;
