import React from "react";
import styles from "../styles/ExtensionBody.module.css";
import { MessageBody } from "../background";
import { ResponseBody } from "../background";



type CaptureScreenShotResult = {
  data : string
}

export default function ExtensionBody() {
  const grabButtonClicked = async (e: React.MouseEvent) => {
    e.preventDefault();
    const message : MessageBody = { action: "grabClicked" }
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tabs[0].id!,message)
    console.log(response)
  };

  const cancelButtonClicked = async (e: React.MouseEvent) => {
    e.preventDefault();
    const message : MessageBody = { action: "cancelClicked" }
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tabs[0].id!,message)
    console.log(response)
  };

  const EntireScreenCapture = async () => {
    const message:MessageBody = {
      action : "screenCapture"
    }
    const response:ResponseBody = await chrome.runtime.sendMessage(message)
    if(response.data){
      chrome.downloads.download({url:response.data,filename:"screenCapture.png"})
    }
  };

  const FullPageCapture = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.debugger.attach({ tabId: tabs[0].id! }, "1.2", () => {
      if (tabs[0].url?.startsWith("http")) {
        chrome.debugger.sendCommand(
          { tabId: tabs[0].id! },
          "Page.enable",
          ()=>{
            setTimeout(()=>{
              chrome.debugger.sendCommand(
                { tabId: tabs[0].id! },
                "Page.captureScreenshot",
                {
                  format: "png",
                  captureBeyondViewport: true,
                  fromSurface : true,
                  quality : 100
                },
                (data : any)=>{
                  const objectURL = "data:image/png;base64," + data!.data
                  chrome.downloads.download({url:objectURL,filename:"fullScreenCapture.png"})
                }
              );
            },1000)
          }
        )
      } else {
        alert("This can only be used in pages starting with http/https");
      }
    });
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
      <footer className={styles.footer}>All rights reserved @c</footer>
    </div>
  );
}
