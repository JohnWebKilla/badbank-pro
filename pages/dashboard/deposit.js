import React from "react";
import { Layout, Card, message } from "antd";
import Header from "../../components/header";
import Head from "next/head";
import { Form, Input, Button, Alert } from "antd";
import firebase from "../../firebase/firebase";

export default function deposit() {
  const [balance, setBalance] = React.useState(0);
  const profile = firebase.getProfile();
  const [form] = Form.useForm();

  // Get Balance
  React.useEffect(() => {
    const balancePromise = firebase.getBalancePromise(profile);
    balancePromise.then((result) => {
      if (result) setBalance(result.balance);
    });
  }, []);

  //Desposit
  async function doDeposit(values) {
    message.loading({
      key: "deposit",
      content: "Amount Desposit in Process !",
    }); // Showing deposit message
    try {
      firebase.depositAmount(profile, values.amount);
      setBalance(balance + Number(values.amount));
      form.resetFields();
      message.success({ key: "deposit", content: "Amount is Deposited !" }); // if success
    } catch (error) {
      // if error
      message.error({
        key: "deposit",
        content:
          error.message || "Amount not deposited. Something went wrong !",
      });
    }
  }
  return (
    <>
      <Head>
        <title>Deposit | Badbank</title>
      </Head>
      <Layout>
        <Header activeKey={"2"} />
        <Layout.Content
          style={{ padding: "0 50px", marginTop: 64, marginRight: 50 }}
        >
          <div className="site-layout-background mainlayout">
            <div className="container">
              <Card
                title="Deposit to your account"
                bordered={false}
                style={{ width: 750 }}
              >
                <Alert message={`Account Balance: ${balance}`} type="success" />
                <Form
                  form={form}
                  name="deposit"
                  style={{ width: "100%", maxWidth: 350 }}
                  initialValues={{}}
                  onFinish={doDeposit} // When click the Deposit Button
                >
                  <Form.Item
                    name="amount"
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input
                      style={{ marginTop: 10 }}
                      id="amount"
                      min={0}
                      max={10000000}
                      placeholder="Enter the amount you would like to deposit"
                      type="number"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      style={{ marginTop: 10 }}
                      type="success"
                      htmlType="submit"
                    >
                      Deposit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}
