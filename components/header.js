import { Layout, Menu} from "antd";
import Router from "next/router";
import { useEffect } from "react";
import firebase from "../firebase/firebase";
import Link from "next/link";
import {
  BankFilled
} from '@ant-design/icons';
import { Table, Tag, Space } from 'antd';

export default function header(props) {
  

  useEffect(() => {
    if (!firebase.isLoggedIN()) {
      Router.push("/login");
    }
  });

  return (
    <Layout.Header className="headerContainer">
      <h1><BankFilled /> BadBank</h1>
      <Menu
        style={{ float: "right" }}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[props.activeKey]}
      >
        <Menu.Item key="1">
          <Link href="/dashboard">Dashboard</Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link href="/dashboard/deposit">Deposit</Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link href="/dashboard/withdraw">Withdraw</Link>
        </Menu.Item>

        <Menu.Item key="4">
          <Link href="/dashboard/profile">Profile</Link>
        </Menu.Item>

        <Menu.Item
          key="5"
          onClick={async () => {
            // Logout
            await firebase.logout();
            Router.push("/login");
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
}
