import Head from "next/head";
import { Form, Input, Button, message, Space } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import firebase from "../firebase/firebase";
import Router from "next/router";
import { useEffect } from "react";

export default function login() {
  useEffect(() => {
    if (firebase.isLoggedIN()) {
      Router.push("/dashboard");
    }
  }, []);

  // Login
  async function doLogin(values) {
    console.log(values);
    message.loading({ key: "login", content: "Logging in !" }); // Showing logging in message
    try {
      await firebase.login(values);
      message.success({ key: "login", content: "Logged in" }); // if success
      Router.push("/dashboard");
    } catch (error) {
      // if error
      message.error({
        key: "login",
        content: error.message || "Something went wrong !",
      });
    }
  }

  return (
    <>
      <Head>
        <title>Login | BadBank</title>
      </Head>
      <main className="fullscreenflexmiddle">
        <h1 style={{ fontSize: 25, marginBottom: 30 }}>Welcome to BadBank</h1>
        <h2 style={{ fontSize: 25, marginBottom: 30 }}>Login</h2>
        <Form
          name="login"
          style={{ width: "100%", maxWidth: 350 }}
          initialValues={{ remember: true }}
          onFinish={doLogin} // When click the Login Button
        >
          <Form.Item name="email" rules={[{ required: true, message: "" }]}>
            <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "" }]}>
            <Input
              size="large"
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>

            <Button
              style={{ marginTop: 10 }}
              size="large"
              type="secondry"
              href="/create-account"
              className="login-form-button"
              block
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </main>
    </>
  );
}
