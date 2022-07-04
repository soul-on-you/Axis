// import React from "react";
// import { Outlet } from "react-router-dom";
// import { Layout as AntdLayout } from "antd";
// import Footer from "../components/global/Footer";
// import Navbar from "../components/global/Navbar";

// function Layout() {
//   return (
//     <AntdLayout>
//       <Navbar />
//       <Outlet />
//       {/* <Footer /> */}
//     </AntdLayout>
//   );
// }

// export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import { Layout as AntdLayout } from "antd";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
import Sider from "../components/global/Sider";

function Layout() {
  return (
    // <AntdLayout style={{ minHeight: "100vh" }}>
    //   <Navbar />
    //   <AntdLayout
    //     className="site-layout"
    //     // style={{
    //     //   marginRight: 100,
    //     //   marginLeft: 100,
    //     // }}
    //   >
    //     <Sider />
    //     {/* <AntdLayout.Header
    //       className="site-layout-background"
    //       style={{
    //         padding: 0,
    //       }}
    //     /> */}
    //     <AntdLayout.Content
    //     style={{
    //       margin: '24px 16px 0',
    //       overflow: 'initial',
    //     }}
    //   >
    //     <Outlet />
    //     </AntdLayout.Content>
    //     {/* <Footer /> */}
    //   </AntdLayout>
    //   {/* <Footer /> */}
    // </AntdLayout>

    <AntdLayout style={{ minHeight: "100vh" }}>
      <Sider />
      <AntdLayout className="site-layout">
        <AntdLayout.Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Outlet />
        </AntdLayout.Content>
        <Footer />
      </AntdLayout>
    </AntdLayout>
  );
}

export default Layout;

{
  /* <Layout>
<Sider>Sider</Sider>
<Layout>
  <Header>Header</Header>
  <Content>Content</Content>
  <Footer>Footer</Footer>
</Layout>
</Layout> */
}
