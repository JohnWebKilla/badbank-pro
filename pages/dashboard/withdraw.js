import React from "react";
import { Form, Layout, Card, message } from "antd";
import Header from "../../components/header";
import Head from "next/head";
import { Input, Button, Alert } from "antd";
import firebase from "../../firebase/firebase";

export default function withdraw() {
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

  //Withdraw
  async function doWithdraw(values) {
    message.loading({
      key: "withdraw",
      content: "Amount Withdraw in Process !",
    }); // Showing deposit message
    try {
      const newBalance = balance - Number(values.amount);
      if (newBalance < 0) {
        message.error({
          key: "withdraw",
          content: "Can't Withdraw. Insufficient Balance!",
        });
        return;
      }
      firebase.withdrawAmount(profile, newBalance);
      setBalance(newBalance);
      form.resetFields();

      message.success({ key: "withdraw", content: "Amount is Withdrawed !" }); // if success
    } catch (error) {
      // if error
      message.error({
        key: "withdraw",
        content:
          error.message || "Amount not withdrawed. Something went wrong !",
      });
    }
  }

  return (
    <>
      <Head>
        <title>Withdraw | Badbank</title>
      </Head>
      <Layout>
        <Header activeKey={"3"} />
        <Layout.Content
          style={{ padding: "0 50px", marginTop: 64, marginRight: 50 }}
        >
          <div className="site-layout-background mainlayout">
            <div className="container">
              <Card
                title="Withdraw to your account"
                bordered={false}
                style={{ width: 750 }}
              >
                <Alert message={`Account Balance: ${balance}`} type="success" />
                <Form
                  form={form}
                  name="withdraw"
                  style={{ width: "100%", maxWidth: 350 }}
                  initialValues={{}}
                  onFinish={doWithdraw} // When click the Withdraw Button
                >
                  <Form.Item
                    name="amount"
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input
                      style={{ marginTop: 10 }}
                      min={0}
                      max={10000000}
                      placeholder="Enter the amount you would like to withdraw"
                      type="number"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      style={{ marginTop: 10 }}
                      type="danger"
                      htmlType="submit"
                    >
                      Withdraw
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
