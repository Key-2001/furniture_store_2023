/* eslint-disable react/prop-types */
import { useCallback, useContext, useState } from "react";
import {
  BlockOutlined,
  DatabaseOutlined,
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, ConfigProvider, Dropdown, Space } from "antd";
const { Header, Sider, Content } = Layout;
import logoUrl from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../context/AdminContext";

const LayoutAdmin = ({ children }) => {
  const navigate = useNavigate();
  const { admin, dispatch } = useContext(adminContext);
  //! Props

  //! State
  const [collapsed, setCollapsed] = useState(false);
  const [menuKey, setMenuKey] = useState(
    window.location.pathname.split("/")[2] ?? "dashboard"
  );
  //! Function
  const handleLogout = useCallback(() => {
    dispatch({ type: "LOG_OUT" });
  }, []);
  //! Effect

  //! Render
  const items = [
    {
      key: "1",
      label: (
        <span onClick={handleLogout}>
          Logout <LogoutOutlined />
        </span>
      ),
    },
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#eaded7",
          colorPrimary: "#617d98",
        },
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ background: "#eaded7" }}
        >
          <div style={{ padding: "16px" }}>
            <img src={logoUrl} alt="" style={{ width: "100%" }} />
          </div>
          <Menu
            style={{ borderInlineEnd: "unset" }}
            theme="light"
            mode="inline"
            defaultSelectedKeys={[menuKey]}
            items={[
              {
                key: "dashboard",
                icon: <HomeOutlined />,
                label: "Dashboard",
                onClick: () => {
                  setMenuKey("dashboard");
                  navigate("/admin/dashboard", { replace: true });
                },
              },
              {
                key: "analytic",
                icon: <LineChartOutlined />,
                label: "Analytic",
                onClick: () => {
                  setMenuKey("analytic");
                  navigate("/admin/analytic", { replace: true });
                },
              },
              {
                key: "product",
                icon: <DatabaseOutlined />,
                label: "Product",
                onClick: () => {
                  setMenuKey("product");
                  navigate("/admin/product", { replace: true });
                },
              },
              {
                key: "order",
                icon: <ShoppingOutlined />,
                label: "Order",
                onClick: () => {
                  setMenuKey("order");
                  navigate("/admin/order", { replace: true });
                },
              },
              {
                key: "user",
                icon: <UserOutlined />,
                label: "User",
                onClick: () => {
                  setMenuKey("user");
                  navigate("/admin/user", { replace: true });
                },
              },
              {
                key: "discount",
                icon: <BlockOutlined />,
                label: "Discount",
                onClick: () => {
                  setMenuKey("discount");
                  navigate("/admin/discount", { replace: true });
                },
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#eaded7",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </div>
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "#102a42" }}
                >
                  <Space style={{ width: "64px" }}>{admin.name}</Space>
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              minHeight: 280,
              overflowY: "auto",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutAdmin;
