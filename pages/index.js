import { useEffect } from "react";
import firebase from "../firebase/firebase";
import Router from "next/router";
import { Card } from 'antd';
import 'antd/dist/antd.css';

export default function Home() {

  useEffect(() => {
    if (!firebase.isLoggedIN()) {
      Router.push("/login");
    }
  });

  return (
    <>
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>,
</>

    )
}
