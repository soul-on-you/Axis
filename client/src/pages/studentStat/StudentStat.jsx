import React from "react";
import { Descriptions, PageHeader, Col, Row, Tag, Statistic } from "antd";
import TaskCard from "../../components/studentTaskCard/TaskCard";

function StudentStat() {
  const student = {
    tasks: [
      {
        detail: {
          detailId: "62b561b581e7bb50a6e859b0",
          title: "Деталь 12",
          graduation: "easy",
        },
        order: 1,
        passed: false,
        status: "need_redone",
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
          title: "Деталь 40",
          graduation: "hard",
        },
        order: 2,
        passed: true,
        status: "done",
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
          title: "Деталь 7",
          graduation: "extra-hard",
        },
        order: 4,
        passed: false,
        status: "moderation",
        moderation: false,
        createdAt: "2022-06-24T06:44:30.443+00:00",
        updatedAt: "2022-06-24T06:44:30.443+00:00",
      },
      {
        detail: {
          detailId: "62b561b581e7bb50a6e859ae",
          title: "Деталь 58",
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

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        title="Статистика по заданиям"

        // footer={
        //   <Tabs defaultActiveKey="details">
        //     <Tabs.TabPane tab="Details" key="details" />
        //     <Tabs.TabPane tab="Rule" key="rule" />
        //   </Tabs>
      >
        <Descriptions size="small" column={2}>
          <Descriptions.Item>
            <Statistic
              title="Всего заданий выдано"
              value={`${student.tasks.length}`}
            />
          </Descriptions.Item>

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

          <Descriptions.Item>
            <Statistic
              title="Всего заданий выполнено"
              value={`${student.tasks.reduce(
                (acc, task) => acc + task.passed,
                0
              )} / ${student.tasks.length}`}
            />
          </Descriptions.Item>

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
              <Tag
                style={{ height: 40, fontSize: 20, padding: 10 }}
                color="green"
              >
                Получен
              </Tag>
            ) : (
              <Tag
                style={{ height: 40, fontSize: 20, padding: 10 }}
                color="red"
              >
                Не получен
              </Tag>
            )
          }
          style={{
            marginRight: 32,
          }}
        />
      </PageHeader>
      <div
        style={{
          padding: 30,
        }}
      >
        <Row gutter={[16, 24]}>
          {student.tasks.map((task) => (
            <Col
              md={{ span: 24 }}
              xl={{ span: 12 }}
              key={task.detail.detailId}
            >
              <TaskCard
                title={task.detail.title}
                order={task.order}
                level={task.detail.graduation}
                status={task.status}
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

