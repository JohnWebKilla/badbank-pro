import { useEffect } from "react";
import firebase from "../firebase/firebase";
import Router from "next/router";

export default function Home() {

  useEffect(() => {
    if (!firebase.isLoggedIN()) {
      Router.push("/login");
    }
  });

  return (
    <>
  
</>

    )
}
