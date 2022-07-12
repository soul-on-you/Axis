import { Table } from "antd";
import React, { useMemo, useState } from "react";

function DEV_ADMIN_STUDPANEL() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "serialNumber",
        key: "id",
      },
      {
        title: "ФИО",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Электронная почта",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Роль",
        dataIndex: "role",
        key: "role",
      },
    ],
    []
  );

  const fetchData = (params = {}) => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: 200, // 200 is mock data, you should read it from server
          total: data.totalCount,
        });
      });
  };

  useEffect(() => {
    fetchData({
      pagination,
    });
  }, []);

  const handleTableChange = (newPagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Table
        columns={columns}
        rowKey={(record) => record.email}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default DEV_ADMIN_STUDPANEL;

//  const columns = [
//  {
//  title: 'Name',
//  dataIndex: 'name',
//  sorter: true,
//  render: (name) => `${name.first} ${name.last}`,
//  width: '20%',
//  },
//  {
//  title: 'Gender',
//  dataIndex: 'gender',
//  filters: [
//  {
//  text: 'Male',
//  value: 'male',
//  },
//  {
//  text: 'Female',
//  value: 'female',
//  },
//  ],
//  width: '20%',
//  },
//  {
//  title: 'Email',
//  dataIndex: 'email',
//  },
//  ];

//  const getRandomuserParams = (params) => ({
//  results: params.pagination?.pageSize,
//  page: params.pagination?.current,
//  ...params,
//  });

// const App = () => {
//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 10,
//   });

//   const fetchData = (params = {}) => {
//     setLoading(true);
//     fetch(
//       `https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`
//     )
//       .then((res) => res.json())
//       .then(({ results }) => {
//         setData(results);
//         setLoading(false);
//         setPagination({
//           ...params.pagination,
//           total: 200, // 200 is mock data, you should read it from server
//           total: data.totalCount,
//         });
//       });
//   };

//   useEffect(() => {
//     fetchData({
//       pagination,
//     });
//   }, []);

//   const handleTableChange = (newPagination, filters, sorter) => {
//     fetchData({
//       sortField: sorter.field,
//       sortOrder: sorter.order,
//       pagination: newPagination,
//       ...filters,
//     });
//   };

//   return (
//     <Table
//       columns={columns}
//       rowKey={(record) => record.email}
//       dataSource={data}
//       pagination={pagination}
//       loading={loading}
//       onChange={handleTableChange}
//     />
//   );
// };

// что может админ
// - просматривать преподов и студентов в одном окне
//     - добавлять студентов преподов и админов
//     - удалять студентов преподов и админов
//     - редактировать преподов и студентов

// - выдавать детали студентам и менять детали студентам
// - добавлять и удалять детали в пулле деталей

// - создавать группы и просматривать группы + архивировать группы и добавлять в них студентов
// - дать управление над группой преподавателю
// - препод может добавлять студентов без группы в свои группы

// что может препод и админ в плане управления студентиками
// - смотреть задания студентов т.е. скачать их из сданных заданий
// - комментить задания студентов
// - ставаить оценку за задание
// - менять детали
// - ставить зачеты и незачеты
// - добавлять студентов в группы
// - архивировать группы
// - искать группы и искать студента
