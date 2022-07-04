// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Breadcrumb, Layout, Menu } from "antd";
// import React from "react";
// const { Header, Content, Footer, Sider } = Layout;
// const items1 = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);
//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,
//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   }
// );

// const App = () => (
//   <Layout>
//     <Header className="header">
//       <div className="logo" />
//       <Menu
//         theme="dark"
//         mode="horizontal"
//         defaultSelectedKeys={["2"]}
//         items={items1}
//       />
//     </Header>
//     <Content
//       style={{
//         padding: "0 50px",
//       }}
//     >
//       <Breadcrumb
//         style={{
//           margin: "16px 0",
//         }}
//       >
//         <Breadcrumb.Item>Home</Breadcrumb.Item>
//         <Breadcrumb.Item>List</Breadcrumb.Item>
//         <Breadcrumb.Item>App</Breadcrumb.Item>
//       </Breadcrumb>
//       <Layout
//         className="site-layout-background"
//         style={{
//           padding: "24px 0",
//         }}
//       >
//         <Sider className="site-layout-background" width={200}>
//           <Menu
//             mode="inline"
//             defaultSelectedKeys={["1"]}
//             defaultOpenKeys={["sub1"]}
//             style={{
//               height: "100%",
//             }}
//             items={items2}
//           />
//         </Sider>
//         <Content
//           style={{
//             padding: "0 24px",
//             minHeight: 280,
//           }}
//         >
//           Content
//         </Content>
//       </Layout>
//     </Content>

//   </Layout>
// );

// export default App;

import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const routes = useMemo(
    () => [
      { label: "Home", key: "home", onClick: () => navigate("/") },
      { label: "Counter", key: "counter", onClick: () => navigate("/counter") },
      { label: "About", key: "about", onClick: () => navigate("/about") },
      { label: "Contact", key: "contact", onClick: () => navigate("/contact") },
      { label: "Dev", key: "dev", onClick: () => navigate("/dev") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Header
      className="header"
      style={{
        margin: 0,
        padding: 0,
        position: "sticky",
        zIndex: 10,
        top: 0,
        width: "100%",
      }}
    >
      {/* <Row justify="start"> */}
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname.slice(1) || "home"]}
        items={routes}
      />
      {/* </Row> */}
      {/* <Row justify="end">
        <Menu.Item key="login" onClick={() => navigate("/login")}>
          Login
        </Menu.Item>
      </Row> */}
    </Header>
  );
}

export default Navbar;
