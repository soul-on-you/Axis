import { Card, PageHeader, Button, Comment, Avatar, Descriptions, Tag } from "antd";
import React, { useState } from "react";
import Upload from "../Upload/Upload";

const ExampleComment = ({ children }) => (
  <Comment
    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
    content={
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure).
      </p>
    }
  >
    {children}
  </Comment>
);

function TaskCard({ title, order, level, createdAt, updatedAt, detailId }) {
  //   const [fileList, setFileList] = useState([]);

  return (
    <Card title={title} bordered={false}>
      <PageHeader
        className="site-page-header-responsive"
        title={title}
        subTitle={`Задание ${order}`}
        extra={[
          // <Button key="123">Загрузить задание</Button>,
          //   <DEV_UPLOAD_V2 fileList={fileList} setFileList={setFileList} />,
          <Upload detailId={detailId}/>,
          //   <Button key="132" type="primary">
          //     Сдать задание
          //   </Button>,
        ]}
        footer={
          <>
            <ExampleComment />
            <ExampleComment />
            <ExampleComment />
            <ExampleComment />
          </>
        }
      >
        <Descriptions size="small" column={2}>
          <Descriptions.Item label="Деталь выдал">
            Сальный А.Г.
          </Descriptions.Item>

          <Descriptions.Item label="Сложность">
            {level === "beginer" ? (
              <Tag color="lime">очень легко</Tag>
            ) : level === "easy" ? (
              <Tag color="green">легко</Tag>
            ) : level === "medium" ? (
              <Tag color="orange">номально</Tag>
            ) : level === "hard" ? (
              <Tag color="volcano">сложно</Tag>
            ) : level === "extra-hard" ? (
              <Tag color="red">очень сложно</Tag>
            ) : (
              <Tag color="blue">error</Tag>
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Задание выдано">
            {createdAt.slice(0, 10)}
          </Descriptions.Item>

          <Descriptions.Item label="Последние изменения">
            {updatedAt.slice(0, 10)}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </Card>
  );
}

export default TaskCard;
