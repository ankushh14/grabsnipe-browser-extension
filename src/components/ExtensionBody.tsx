import React, { useState } from "react";
import styles from "../styles/ExtensionBody.module.css";
import { MessageBody } from "../background";
import { ResponseBody } from "../background";



type CaptureScreenShotResult = {
  data : string
}

export default function ExtensionBody() {

  const [alert,setAlert] = useState("")


  const grabButtonClicked = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAlert("")
    const message : MessageBody = { action: "grabClicked" }
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tabs[0].id!,message)
    console.log(response)
  };

  const cancelButtonClicked = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAlert("")
    const message : MessageBody = { action: "cancelClicked" }
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tabs[0].id!,message)
    console.log(response)
  };

  const EntireScreenCapture = () => {
    setAlert("")
    const message:MessageBody = {
      action : "screenCapture"
    }
    chrome.runtime.sendMessage(message)
  };

  const FullPageCapture = async () => {
    const response:ResponseBody = await chrome.runtime.sendMessage<MessageBody>({
      action : "fullPageCapture"
    })
    if(response){
      setAlert(response.message)
    }else{
      setAlert("")
    }
  };

  return (
    <div className={styles.extensionBody}>
      <header className={styles.header}>
        <h1>GrabSnipe</h1>
      </header>
      <main className={styles.main}>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          blanditiis rem omnis eveniet nihil! Id nobis esse doloremque sunt rem?
        </p>
        <button onClick={(e) => grabButtonClicked(e)}>Grab a snip</button>
        <button onClick={(e) => cancelButtonClicked(e)}>Cancel</button>
        <button onClick={(e) => EntireScreenCapture()}>Entire screen</button>
        <button onClick={(e) => FullPageCapture()}>Full page</button>
      </main>
      <div>
        <h3>
          {alert}
        </h3>
      </div>
      <footer className={styles.footer}>All rights reserved @c</footer>
    </div>
  );
}
