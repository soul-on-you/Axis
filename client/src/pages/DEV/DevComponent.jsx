import Icon, {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MySvg = () => {
  return (
    // <svg width="100%" height="100%" viewBox="0 0 100 100">
    //   <path
    //     d="M832 320L576 192H512L256 320v384l256 128h64l256-128V384z m-320 448l-192-96v-256L512 512z m256-96L576 768V512l192-96zM576 448H512L320 352 512 256h64l192 96zM128 283.52L512 64h64l128 72.96v-64L576 0H512L64 256v256h64zM576 960H512l-384-219.52V576H64v192l448 256h64l192-109.44v-64L576 960z m192-850.56v64l192 109.44v456.96l-128 72.96v64l192-108.8V256z"
    //     fill="#666666"
    //     p-id="567"
    //   ></path>
    // </svg>
    // <svg
    // //   class="icon"
    //   //   style={{
    //   //     width: " 1em",
    //   //     height: "1em",
    //   //     verticalAlign: "middle",
    //   //     fill: "currentColor",
    //   //     overflow: "hidden",
    //   //   }}
    //   width="1em"
    //   height="1em"
    //   fill="currentColor"

    //   viewBox="0 0 1024 1024"
    // //   version="1.1"
    //   //   xmlns="http://www.w3.org/2000/svg"
    //   //   p-id="566"
    // >
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path
        d="M832 320L576 192H512L256 320v384l256 128h64l256-128V384z m-320 448l-192-96v-256L512 512z m256-96L576 768V512l192-96zM576 448H512L320 352 512 256h64l192 96zM128 283.52L512 64h64l128 72.96v-64L576 0H512L64 256v256h64zM576 960H512l-384-219.52V576H64v192l448 256h64l192-109.44v-64L576 960z m192-850.56v64l192 109.44v456.96l-128 72.96v64l192-108.8V256z"
        // fill="#666666"
        // p-id="567"
      ></path>
    </svg>
  );
};

const MyIcon = ()=><Icon component={MySvg} />;

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <MyIcon />), //FileOutlined
];

const DEV = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "200vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          className="logo"
          style={{
            height: 32,
            margin: 16,
            background: "blue",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: "#fff",
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DEV;

// #components-layout-demo-side .logo {
//   height: 32px;
//   margin: 16px;
//   background: rgba(255, 255, 255, 0.3);
// }

// .site-layout .site-layout-background {
//   background: #fff;
// }
