import React, { useState } from "react";
import { Button, message } from "antd";
import { useUploadDetailMutation } from "../../api/FileApi";

function UploadButton({ fileList, setFileList, detailId }) {
  const [uploading, setUploading] = useState(false);

  const [post_detail, { error }] = useUploadDetailMutation();

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("detailId", detailId);

    setUploading(true);

    post_detail(formData)
      .unwrap()
      .then((e) => {
        setFileList([]);
        message.success("Успешная загрузка файлов.");
      })
      .catch((e) => {
        console.log(error);
        message.error("Ошибка загрузки файлов.");
      })
      .finally(() => {
        setUploading(false);
      });
  };
  return (
    <Button
      type="primary"
      onClick={handleUpload}
      disabled={fileList.length === 0}
      loading={uploading}
      style={{
        // marginTop: 16,
      }}
    >
      {uploading ? "Сдать задание" : "Идет загрузка"}
    </Button>
  );
}

export default UploadButton;
