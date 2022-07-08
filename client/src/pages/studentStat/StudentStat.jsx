import React, { useState } from "react";
import {
  Button,
  Descriptions,
  PageHeader,
  Tabs,
  Card,
  Col,
  Row,
  Tag,
  Avatar,
  Comment,
  Statistic,
} from "antd";
import AliyunOSSUpload from "../DEV/DEV_UPLOAD";
import TaskCard from "../../components/studentTaskCard/TaskCard";
// import DEV_UPLOAD_V2 from "../DEV/DEV_UPLOAD_V2";

function StudentStat() {
  const renderContent = (column = 2) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="Деталь выдал">Сальный А.Г.</Descriptions.Item>
      {/* <Descriptions.Item label="Association">
            <a>421421</a>
          </Descriptions.Item> */}
      <Descriptions.Item label="Сложность">
        {/* <Tag color="red">red</Tag> */}
        {/* <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="lime">lime</Tag> */}
        <Tag color="green">очень легко</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Задание выдано">2017-01-10</Descriptions.Item>
      <Descriptions.Item label="Последние изменения">
        2017-10-10
      </Descriptions.Item>
      {/* <Descriptions.Item label="Remarks">
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item> */}
    </Descriptions>
  );

  const Content = ({ children, extra }) => (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );

  const student = {
    tasks: [
      {
        detail: {
          detailId: "62b561b581e7bb50a6e859b0",
          title: "nissan gt",
          graduation: "easy",
        },
        order: 1,
        passed: false,
        mark: 20,
        moderation: false,
        moderated: false,
        comment: "переделай все",
        createdAt: "2022-06-24T06:44:30.443+00:00",
        updatedAt: "2022-06-24T06:44:30.443+00:00",
      },
      {
        detail: {
          detailId: "62b561b581e7bb50a6e859af",
          title: "tesla model 3",
          graduation: "hard",
        },
        order: 2,
        passed: true,
        mark: 90,
        moderation: false,
        moderated: true,
        comment: "все отлично",
        createdAt: "2022-06-24T06:44:30.443+00:00",
        updatedAt: "2022-06-24T06:44:30.443+00:00",
      },
      {
        detail: {
          detailId: "62b561b581e7bb50a6e859b1",
          title: "bmw i8",
          graduation: "extra-hard",
        },
        order: 4,
        passed: false,
        moderation: false,
        createdAt: "2022-06-24T06:44:30.443+00:00",
        updatedAt: "2022-06-24T06:44:30.443+00:00",
      },
      {
        detail: {
          detailId: "62b561b581e7bb50a6e859ae",
          title: "tesla model s",
          graduation: "hard",
        },
        order: 3,
        passed: false,
        moderation: false,
        createdAt: "2022-06-24T06:44:30.443+00:00",
        updatedAt: "2022-06-24T06:44:30.443+00:00",
      },
    ],
    passed: false,
  };
  const [fileList, setFileList] = useState([]);

  const ExampleComment = ({ children }) => (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={<a>Han Solo</a>}
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
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

//   const MyCard = ({ title }) => {
//     <Col span={12}>
//       <Card title={title} bordered={false}>
//         <PageHeader
//           className="site-page-header-responsive"
//           // onBack={() => window.history.back()}
//           title="Деталь 145"
//           subTitle="Задание 5"
//           extra={[
//             // <Button key="123">Загрузить задание</Button>,
//             <DEV_UPLOAD_V2 fileList={fileList} setFileList={setFileList} />,
//             <Button key="132" type="primary">
//               Сдать задание
//             </Button>,
//           ]}
//           footer={
//             <ExampleComment>
//               <ExampleComment>
//                 <ExampleComment />
//                 <ExampleComment />
//               </ExampleComment>
//             </ExampleComment>
//           }
//         >
//           {/* <Content extra={extraContent}>{renderContent()}</Content> */}
//         </PageHeader>
//       </Card>
//     </Col>;
//   };
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        // onBack={() => window.history.back()}
        title="Статистика по заданиям"
        // subTitle="Успеваемость студента"
        // extra={[
        //   <Button key="3">Operation</Button>,
        //   <Button key="2">Operation</Button>,
        //   <Button key="1" type="primary">
        //     Primary
        //   </Button>,
        // ]}
        // footer={
        //   <Tabs defaultActiveKey="details">
        //     <Tabs.TabPane tab="Details" key="details" />
        //     <Tabs.TabPane tab="Rule" key="rule" />
        //   </Tabs>
        // }
      >
        {/* <Content>{renderContent()}</Content>*/}

        <Descriptions size="small" column={2}>
          {/* <Descriptions.Item label="Всего заданий">
            {student.tasks.length}
          </Descriptions.Item> */}
          <Descriptions.Item>
            <Statistic
              title="Всего заданий выдано"
              value={`${student.tasks.length}`}
            />
          </Descriptions.Item>

          {/* <Descriptions.Item label="Средний балл по сданным заданиям">
            {(
              student.tasks.reduce((acc, task) => acc + (task.mark || 0), 0) /
              student.tasks.reduce((acc, task) => acc + !!task.mark, 0)
            ).toFixed(2)}
            /100.00
          </Descriptions.Item> */}

          <Descriptions.Item>
            <Statistic
              title="Итоговый средний балл"
              //   prefix="$"
              value={`${(
                student.tasks.reduce((acc, task) => acc + (task.mark || 0), 0) /
                student.tasks.length
              ).toFixed(2)} / 100.00`}
            />
          </Descriptions.Item>

          {/* <Descriptions.Item label="Всего заданий выполнено">
            {student.tasks.reduce((acc, task) => acc + task.passed, 0)}/
            {student.tasks.length}
          </Descriptions.Item> */}

          <Descriptions.Item>
            <Statistic
              title="Всего заданий выполнено"
              value={`${student.tasks.reduce(
                (acc, task) => acc + task.passed,
                0
              )} / ${student.tasks.length}`}
            />
          </Descriptions.Item>

          {/* <Descriptions.Item label="Итоговый средний балл">
            {(
              student.tasks.reduce((acc, task) => acc + (task.mark || 0), 0) /
              student.tasks.length
            ).toFixed(2)}
            /100.00
          </Descriptions.Item> */}

          <Descriptions.Item>
            <Statistic
              title="Средний балл по сданным заданиям"
              value={`${(
                student.tasks.reduce((acc, task) => acc + (task.mark || 0), 0) /
                student.tasks.reduce((acc, task) => acc + !!task.mark, 0)
              ).toFixed(2)} / 100.00`}
            />
          </Descriptions.Item>
        </Descriptions>
        <Statistic
          title="Статус зачета"
          value=" "
          prefix={
            student.passed ? (
              <Tag color="green">Получен</Tag>
            ) : (
              <Tag color="red">Не получен</Tag>
            )
          }
          style={{
            marginRight: 32,
          }}
        />
        {/* <Statistic
          title="Средний балл по сданным заданиям"
          //   prefix="$"
          value={"27.50/100.00"}
        /> */}
      </PageHeader>
      <div
        style={{
          padding: 30,
        }}
      >
        <Row gutter={[16, 24]}>
          {student.tasks.map((task) => (
            <Col span={12} key={task.detail.detailId}>
              <TaskCard
                title={task.detail.title}
                order={task.order}
                level={task.detail.graduation}
                detailId={task.detail.detailId}
                createdAt={task.createdAt}
                updatedAt={task.updatedAt}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default StudentStat;

// extra={extraContent}>
