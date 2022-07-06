import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useUploadDetailMutation } from "../../api/FileApi";

const AliyunOSSUpload = ({ value, onChange }) => {
  const [OSSData, setOSSData] = useState(); // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html

  const [post_detail, { isLoading }] = useUploadDetailMutation();
  //   const [fetch_login, { /*data,*/ isLoading /*, error*/ }] = useLoginMutation();

  const mockGetOSSData = () => ({
    dir: "user-dir/",
    expire: "1577811661",
    host: "//www.mocky.io/v2/5cc8019d300000980a055e76",
    accessId: "c2hhb2RhaG9uZw==",
    policy: "eGl4aWhhaGFrdWt1ZGFkYQ==",
    signature: "ZGFob25nc2hhbw==",
  });

  const init = async () => {
    try {
      const result = await mockGetOSSData();
      setOSSData(result);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

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

  const getExtraData = (file) => ({
    key: file.url,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  const beforeUpload = async (file) => {
    if (!OSSData) return false;
    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await init();
    }

    const suffix = file.name.slice(file.name.lastIndexOf("."));
    const filename = Date.now() + suffix; // @ts-ignore

    file.url = OSSData.dir + filename;
    return file;
  };
  const customRequest = async (info) => {
    const { file } = info;
    console.log(file);
    const formData = new FormData();
    formData.append("detail", file);
    formData.append("detailId", "devDetail");

    console.log(formData);
    const response = await post_detail(formData).unwrap();
    console.log(response);

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
    fileList: value,
    // action: OSSData?.host,
    onChange: handleChange,
    onRemove,
    // data: getExtraData,
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
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default AliyunOSSUpload;

// import { Button, Tooltip, Upload } from 'antd';
// import update from 'immutability-helper';
// import React, { useCallback, useRef, useState } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// const type = 'DragableUploadList';

// const DragableUploadListItem = ({ originNode, moveRow, file, fileList }) => {
//   const ref = useRef(null);
//   const index = fileList.indexOf(file);
//   const [{ isOver, dropClassName }, drop] = useDrop({
//     accept: type,
//     collect: (monitor) => {
//       const { index: dragIndex } = monitor.getItem() || {};

//       if (dragIndex === index) {
//         return {};
//       }

//       return {
//         isOver: monitor.isOver(),
//         dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
//       };
//     },
//     drop: (item) => {
//       moveRow(item.index, index);
//     },
//   });
//   const [, drag] = useDrag({
//     type,
//     item: {
//       index,
//     },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });
//   drop(drag(ref));
//   const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;
//   return (
//     <div
//       ref={ref}
//       className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
//       style={{
//         cursor: 'move',
//       }}
//     >
//       {file.status === 'error' ? errorNode : originNode}
//     </div>
//   );
// };

// const App = () => {
//   const [fileList, setFileList] = useState([
//     {
//       uid: '-1',
//       name: 'image1.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-2',
//       name: 'image2.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-3',
//       name: 'image3.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-4',
//       name: 'image4.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-5',
//       name: 'image.png',
//       status: 'error',
//     },
//   ]);
//   const moveRow = useCallback(
//     (dragIndex, hoverIndex) => {
//       const dragRow = fileList[dragIndex];
//       setFileList(
//         update(fileList, {
//           $splice: [
//             [dragIndex, 1],
//             [hoverIndex, 0, dragRow],
//           ],
//         }),
//       );
//     },
//     [fileList],
//   );

//   const onChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Upload
//         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//         fileList={fileList}
//         onChange={onChange}
//         itemRender={(originNode, file, currFileList) => (
//           <DragableUploadListItem
//             originNode={originNode}
//             file={file}
//             fileList={currFileList}
//             moveRow={moveRow}
//           />
//         )}
//       >
//         <Button icon={<UploadOutlined />}>Click to Upload</Button>
//       </Upload>
//     </DndProvider>
//   );
// };

// export default App;

// #components-upload-demo-drag-sorting .ant-upload-draggable-list-item {
//   border-top: 2px dashed rgba(0, 0, 0, 0);
//   border-bottom: 2px dashed rgba(0, 0, 0, 0);
// }
// #components-upload-demo-drag-sorting .ant-upload-draggable-list-item.drop-over-downward {
//   border-bottom-color: #1890ff;
// }
// #components-upload-demo-drag-sorting .ant-upload-draggable-list-item.drop-over-upward {
//   border-top-color: #1890ff;
// }

// import { UploadOutlined } from '@ant-design/icons';
// import { Button, message, Upload } from 'antd';
// import React from 'react';
// const props = {
//   name: 'file',
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   headers: {
//     authorization: 'authorization-text',
//   },

//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }

//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },

//   progress: {
//     strokeColor: {
//       '0%': '#108ee9',
//       '100%': '#87d068',
//     },
//     strokeWidth: 3,
//     format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
//   },
// };

// const App = () => (
//   <Upload {...props}>
//     <Button icon={<UploadOutlined />}>Click to Upload</Button>
//   </Upload>
// );

// export default App;
