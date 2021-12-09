import React from "react";
import { Layout, Result } from "antd";
import Header from "../../components/header";
import Head from "next/head";
import { Card, Alert } from "antd";
import firebase from "../../firebase/firebase";

export default function dashboard() {
  const [balance, setBalance] = React.useState(0);
  const profile = firebase.getProfile();
  React.useEffect(() => {
    const balancePromise = firebase.getBalancePromise(profile);
    balancePromise.then((result) => {
      if (result) setBalance(result.balance);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard | Badbank</title>
      </Head>
      <Layout>
        <Header activeKey={"1"} />
        <Layout.Content
          style={{ padding: "0 50px", marginTop: 64, marginRight: 50 }}
        >
          <div className="site-layout-background mainlayout">
            <div className="container">
              <Card
                title="Welcome to BadBank"
                bordered={false}
                style={{ width: 750 }}
              >
                <h1>Account name: {profile.name}</h1>
                <Alert message={`Account Balance: ${balance}`} type="info" />
              </Card>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}
