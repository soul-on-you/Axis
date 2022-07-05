import { Footer as AntdFooter } from "antd/lib/layout/layout";
import React from "react";

function Footer() {
  return (
    <AntdFooter
      style={{
        textAlign: "center",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "22px",
        color: "rgba(0, 0, 0, 0.45)",
      }}
    >
      AXIS View Copyright ©2022 Created by DiomedialC
    </AntdFooter>
  );
}

export default Footer;
