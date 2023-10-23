/* eslint-disable react/prop-types */

import { ConfigProvider } from "antd";

const Paper = ({ children, style }) => {
  return (
    <ConfigProvider
      key={"paper"}
      theme={{
        token: {
          colorBgContainer: "#ffffff",
          colorPrimary: "#617d98",
        },
      }}
    >
      <div
        style={{
          padding: 24,
          background: "rgb(255, 255, 255)",
          ...style
        }}
      >
        {children}
      </div>
    </ConfigProvider>
  );
};

export default Paper;
