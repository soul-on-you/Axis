import {
  Card,
  PageHeader,
  Comment,
  Avatar,
  Descriptions,
  Tag,
  Divider,
  Spin,
  Image,
} from "antd";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import React from "react";
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

function TaskCard({
  title,
  order,
  level,
  status,
  detailId,
  createdAt,
  updatedAt,
}) {
  //   const [fileList, setFileList] = useState([]);

  return (
    <Card
      // title={title}
      bordered={false}
    >
      <PageHeader
        className="site-page-header-responsive"
        title={title}
        subTitle={`Задание ${order}`}
        extra={[
          //   <Upload detailId={detailId}/>,
          <div
            //   style={{display:"flex", justifyContent:"space-between", alignItems:"center"}
            style={{ fontSize: 16, alignContent: "center" }}
          >
            Статус задания:{" "}
            {status === "done" ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                зачтено
              </Tag>
            ) : status === "moderation" ? (
              <Tag icon={<SyncOutlined spin />} color="processing">
                на рассмотрении
              </Tag>
            ) : status === "need_redone" ? (
              <Tag icon={<ExclamationCircleOutlined />} color="warning">
                требуются исправления
              </Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="error">
                не сдано
              </Tag>
            )}
          </div>,
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
        <Divider />

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

        <Divider />

        <Image
          src={`https://storage.yandexcloud.net/test.io/detail.png`}
          placeholder={<Spin />}
        />

        <Divider />

        <Upload detailId={detailId} />

        <Divider />
      </PageHeader>
    </Card>
  );
}

export default TaskCard;
