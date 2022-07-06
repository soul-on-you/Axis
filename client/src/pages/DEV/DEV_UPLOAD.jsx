import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useUploadDetailMutation } from "../../api/FileApi";

const AliyunOSSUpload = ({ value, onChange }) => {
  const [post_detail, { isLoading, status, isSuccess, isError, error }] =
    useUploadDetailMutation();

  const handleChange = ({ fileList }) => {
    console.log("Aliyun OSS:", fileList);
    onChange?.([...fileList]);
  };

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
        onSuccess();
      })
      .catch((e) => {
        console.log(e);
        onError();
      });

    console.log(response);
    console.log(status);

    // if (isSuccess) {
    //   console.log("success");
    //   onSuccess(response);
    // }

    // if (isError) {
    //   console.log("success");
    //   onError(error);
    // }

    // info.onProgress("noURL", 1000, file.size);

    // info.onProgress = (e) => {
    //   progressEvent.lengthComputable
    //     ? progressEvent.total
    //     : progressEvent.target.getResponseHeader("content-length") ||
    //       progressEvent.target.getResponseHeader(
    //         "x-decompressed-content-length"
    //       );
    // };
    // if (status === 200) {
    //   message.success(`${file.name}上传成功`);
    // }
    // if (status === 500) {
    //   message.error(`${file.name}上传失败`);
    // }
    // if (status === 400) {
    //   message.error(`${file.name}上传失败`);
    // }
    // if (status === 401) {
    //   message.error(`${file.name}上传失败`);
    // }
    // if (status === 403) {
    //   message.error(`${file.name}上传失败`);
    // }
    // if (status === 404) {
    //   message.error(`${file.name}上传失败`);
    // }
    // if (status === 405) {
    //   message.error(`${file.name}上传失败`);
  };

  const uploadProps = {
    name: "detail",
    multiple: true,
    fileList: value,
    onRemove,
    customRequest: customRequest,
    beforeUpload,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    // progress: {
    //   strokeColor: {
    //     "0%": "#108ee9",
    //     "100%": "#87d068",
    //   },
    //   strokeWidth: 3,
    //   format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    // },
  };
  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default AliyunOSSUpload;
