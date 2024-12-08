import "../styles/common.css";

import React from "react";

import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export interface MenuItem {
  label: string;
  key: string;
  element: any; // Should be a React Component
}

export interface TopNavigationProps {
  items: MenuItem[];
}

export default function TopNavigation({ items }: TopNavigationProps) {
  const navigator = useNavigate();

  const navigateHook: any = (event: MenuItem) => {
    if (event !== null) {
      const path: any = event.key;
      navigator(path ?? -1);
    }
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div className="demo-logo" style={{ color: "black"}}>
          <h1>EasyEats</h1>
        </div>
        <Menu
          mode="horizontal"
          onClick={navigateHook}
          style={{ flex: 1, justifyContent: "flex-end", margin: 0 }}
          items={items.map((item) => ({
            ...item,
            label: (
              <h2
                style={{
                  margin: 0,
                  color: "black",
                }}
              >
                {item.label}
              </h2>
            ),
          }))}
          className="navbar"
        />
      </Header>
    </Layout>
  );
}
