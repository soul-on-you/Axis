import React, { useState } from "react";

// import Icon from "@ant-design/icons";
import logo from "../../assets/Axis/Logo.svg";
import { Tabs, Typography } from "antd";
import Footer from "../../components/global/Footer";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      style={{
        background: "#F0F2F5",
        heig: "100vh",
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: 550,
        minHeight: 680,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "90vh",
          minHeight: 600,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: 130,
            }}
          >
            <img src={logo} className="App-logo" alt="logo" />
            <Typography.Title level={2}>Axis View</Typography.Title>
          </div>
          <Typography.Text style={{ color: "rgba(0, 0, 0, 0.45)" }}>
            Axis View is the new way of engeneer planning
          </Typography.Text>
        </div>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => {
            if (activeTab !== undefined) {
                setActiveTab(key);
            }
          }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Tabs.TabPane tab="Вход" key="login">
            <LoginForm setActiveTab={setActiveTab} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Регистрация" key="register">
            <RegisterForm setActiveTab={setActiveTab} />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

export default Auth;
