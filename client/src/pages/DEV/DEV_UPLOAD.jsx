import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useUploadDetailMutation } from "../../api/FileApi";

const AliyunOSSUpload = ({ value, onChange }) => {
  const [post_detail, { isLoading, status, isSuccess, isError, error }] =
    useUploadDetailMutation();

  const onRemove = (file) => {
    const files = (value || []).filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  const beforeUpload = async (file) => {
    const suffix = file.name.slice(file.name.lastIndexOf("."));
    const filename = Date.now() + suffix; // @ts-ignore

    file.url = "details/" + filename;
    return file;
  };

  const customRequest = async ({ file, onSuccess, onError, onProgress }) => {
    const formData = new FormData();
    formData.append("detail", file);
    formData.append("detailId", "devDetail");

    const response = await post_detail(formData)
      .unwrap()
      .then((e) => {
        console.log(e);
        flushSync(() => onSuccess());
      })
      .catch((e) => {
        console.log(e);
        flushSync(() => onError());
      });
  };

  const uploadProps = {
    name: "detail",
    multiple: true,
    fileList: value,
    onRemove,
    customRequest: customRequest,
    beforeUpload,
    onChange(info) {
        console.log(info.fileList);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default AliyunOSSUpload;
