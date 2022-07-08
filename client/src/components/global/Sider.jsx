import { Layout, Menu } from "antd";
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  PieChartOutlined,
  TeamOutlined,
  BarChartOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Object3D } from "../UI/icons/Object3D";
import ShortLogo from "../../assets/Axis/ShortLogo2.svg";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/AuthSlice";
const { Sider: AntdSider } = Layout;

function Sider() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname);

  const user = useSelector(selectUser);
  // const user = {
  //   tasks: [
  //     { detail: { title: "Task1", id: "6723iuBUHBUIe2" } },
  //     { detail: { title: "Task2", id: "Hj3njcy893dfsa" } },
  //     { detail: { title: "Task3", id: "jk3jY&*2jhjka6" } },
  //     { detail: { title: "Task4", id: "HJhjdhbhg89hsh" } },
  //   ],
  // };

  const routes = useMemo(
    () =>
      user.role === "admin"
        ? [
            {
              label: "Home",
              key: "home",
              icon: <TeamOutlined />,
              onClick: () => navigate("/"),
            },
            {
              label: "Students",
              key: "students",
              icon: <TeamOutlined />,
              onClick: () => navigate("/students"),
            },
            {
              label: "Processed Works",
              key: "allerts",
              icon: <BellOutlined />,
              onClick: () => navigate("/counter"),
            },
            {
              label: "Groups Stat",
              key: "stats",
              icon: <BarChartOutlined />,
              onClick: () => navigate("/counter"),
            },

            {
              label: "Profile",
              key: "profile",
              icon: <UserOutlined />,
              onClick: () => navigate("/profile"),
            },
            {
              label: "Dev",
              key: "dev",
              icon: <UserOutlined />,
              onClick: () => navigate("/dev"),
            },
          ]
        : user.role === "professor"
        ? [
            {
              label: "Home",
              key: "home",
              icon: <TeamOutlined />,
              onClick: () => navigate("/"),
            },
            {
              label: "Students",
              key: "students",
              icon: <TeamOutlined />,
              onClick: () => navigate("/students"),
            },
            {
              label: "Processed Works",
              key: "allerts",
              icon: <BellOutlined />,
              onClick: () => navigate("/counter"),
            },
            {
              label: "Groups Stat",
              key: "stats",
              icon: <BarChartOutlined />,
              onClick: () => navigate("/counter"),
            },
            {
              label: "Profile",
              key: "profile",
              icon: <UserOutlined />,
              onClick: () => navigate("/profile"),
            },
          ]
        : [
            {
              label: "Home",
              key: "home",
              icon: <TeamOutlined />,
              onClick: () => navigate("/"),
            },
            {
              label: "Details",
              key: "detail",
              icon: <Object3D />,
              children: user.student.tasks.map((task) => ({
                key: task.detail.detailId,
                label: task.detail.title,
                onClick: () => navigate(`/detail/${task.detail.detailId}`), //console.log(1)
              })),
              // onClick: () => navigate("/detail"), //console.log(2)
            },
            {
              label: "Statistic",
              key: "statistic",
              icon: <PieChartOutlined />,
              onClick: () => navigate("/statistic"),
            },
            {
              label: "Profile",
              key: "profile",
              icon: <UserOutlined />,
              onClick: () => navigate("/profile"),
            },
          ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntdSider
      className="sider"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        float: "right",
        overflow: "auto",
        position: "sticky",
        top: 0,
        left: 0,
      }}
      theme="light"
    >
      <img
        src={ShortLogo}
        alt="shortlogo"
        style={{
          height: 32,
          width: "100%",
          marginTop: 16,
          marginBottom: 16,
          justifySelf: "center",
        }}
      />

      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[
          location.pathname.split("/")[1] === "detail"
            ? location.pathname.split("/")[2]
            : location.pathname.split("/")[1] || "home",
        ]}
        defaultOpenKeys={
          location.pathname.split("/")[1] === "detail"
            ? [location.pathname.split("/")[1]]
            : null
        }
        items={routes}
      />
    </AntdSider>
  );
}

export default Sider;

//  {/* </Row> */}
//       {/* <Row justify="end">
//         <Menu.Item key="login" onClick={() => navigate("/login")}>
//           Login
//         </Menu.Item>
//       </Row> */}
