// import { Button, Descriptions, PageHeader, Row, Statistic, Tag } from 'antd';
// import React from 'react';

// const DEV = () => (
//   <>
//     <PageHeader
//       className="site-page-header"
//       onBack={() => window.history.back()}
//       title="Title"
//       subTitle="This is a subtitle"
//       extra={[
//         <Button key="3">Operation</Button>,
//         <Button key="2">Operation</Button>,
//         <Button key="1" type="primary">
//           Primary
//         </Button>,
//       ]}
//     >
//       <Descriptions size="small" column={3}>
//         <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
//         <Descriptions.Item label="Association">
//           <a>421421</a>
//         </Descriptions.Item>
//         <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
//         <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
//         <Descriptions.Item label="Remarks">
//           Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
//         </Descriptions.Item>
//       </Descriptions>
//     </PageHeader>
//     <br />
//     <PageHeader
//       onBack={() => window.history.back()}
//       title="Title"
//       tags={<Tag color="blue">Running</Tag>}
//       subTitle="This is a subtitle"
//       extra={[
//         <Button key="3">Operation</Button>,
//         <Button key="2">Operation</Button>,
//         <Button key="1" type="primary">
//           Primary
//         </Button>,
//       ]}
//     >
//       <Row>
//         <Statistic title="Status" value="Pending" />
//         <Statistic
//           title="Price"
//           prefix="$"
//           value={568.08}
//           style={{
//             margin: '0 32px',
//           }}
//         />
//         <Statistic title="Balance" prefix="$" value={3345.08} />
//       </Row>
//     </PageHeader>
//   </>
// );

// export default DEV;

import {
  Button,
  Descriptions,
  PageHeader,
  Statistic,
  Tabs,
  Card,
  Col,
  Row,
  Tag,
  Avatar,
  Comment,
} from "antd";
import React from "react";
import AliyunOSSUpload from "./DEV_UPLOAD";
import DEV_UPLOAD_V2 from "./DEV_UPLOAD_V2";
const { TabPane } = Tabs;

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

const extraContent = (
  <div
    style={{
      display: "flex",
      width: "max-content",
      justifyContent: "flex-end",
    }}
  >
    <Statistic
      title="Status"
      value="Pending"
      style={{
        marginRight: 32,
      }}
    />
    <Statistic title="Price" prefix="$" value={568.08} />
  </div>
);

const Content = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

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

const DEV = () => (
  <>
    <PageHeader
      className="site-page-header-responsive"
      // onBack={() => window.history.back()}
      title="Деталь 144"
      subTitle="Задание 4"
      // extra={[
      //   <Button key="3">Operation</Button>,
      //   <Button key="2">Operation</Button>,
      //   <Button key="1" type="primary">
      //     Primary
      //   </Button>,
      // ]}
      footer={
        <Tabs defaultActiveKey="details">
          <TabPane tab="Details" key="details" />
          <TabPane tab="Rule" key="rule" />
        </Tabs>
      }
    >
      <Content extra={extraContent}>{renderContent()}</Content>
    </PageHeader>
    <div
      style={{
        padding: 30,
        // background: "#ececec"
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Card title" bordered={false}>
            <PageHeader
              className="site-page-header-responsive"
              // onBack={() => window.history.back()}
              title="Деталь 144"
              subTitle="Задание 4"
              extra={[
                // <Button key="2">Загрузить задание</Button>,
                <AliyunOSSUpload />,
                <Button key="pass_button" type="primary">
                  Сдать задание
                </Button>,
              ]}
              footer={
                // <ExampleComment>
                //   <ExampleComment>
                //     <ExampleComment />
                //     <ExampleComment />
                //   </ExampleComment>
                // </ExampleComment>
                <>
                  <ExampleComment />
                  <ExampleComment />
                  <ExampleComment />
                  <ExampleComment />
                </>
              }
            >
              <Content extra={extraContent}>{renderContent()}</Content>
            </PageHeader>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Card title" bordered={false}>
            <PageHeader
              className="site-page-header-responsive"
              // onBack={() => window.history.back()}
              title="Деталь 145"
              subTitle="Задание 5"
              extra={[
                // <Button key="123">Загрузить задание</Button>,
                <DEV_UPLOAD_V2 />,
                <Button key="132" type="primary">
                  Сдать задание
                </Button>,
              ]}
              footer={
                <ExampleComment>
                  <ExampleComment>
                    <ExampleComment />
                    <ExampleComment />
                  </ExampleComment>
                </ExampleComment>
              }
            >
              <Content extra={extraContent}>{renderContent()}</Content>
            </PageHeader>
          </Card>
        </Col>
        {/* <Col span={8}>
          <Card
            title="Card title"
            bordered={false}
            // style={{
            //   width: 300,
            // }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col> */}
      </Row>
    </div>
  </>
);

export default DEV;
