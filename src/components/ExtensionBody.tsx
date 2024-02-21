import React, { useState } from "react";
import styles from "../styles/ExtensionBody.module.css";
import { MessageBody } from "../background";
import { ResponseBody } from "../background";

type CaptureScreenShotResult = {
  data: string;
};

export default function ExtensionBody() {
  const [alert, setAlert] = useState("");
  const [snip, setSnip] = useState(false);

  const grabButtonClicked = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAlert("");
    setSnip(true)
    const message: MessageBody = { action: "grabClicked" };
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if(!tabs[0].url?.startsWith("http")){
      setAlert("Only Works in webPages starting with http/https")
      return setSnip(false)
    }
    const response:ResponseBody = await chrome.tabs.sendMessage(tabs[0].id!, message);
    setAlert(response.message)
  };

  const cancelButtonClicked = async (e: React.MouseEvent) => {
    e.preventDefault();
    const message: MessageBody = { action: "cancelClicked" };
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const response:ResponseBody = await chrome.tabs.sendMessage(tabs[0].id!, message);
    setSnip(false)
    setAlert(response.message)
  };

  const EntireScreenCapture = async () => {
    setAlert("");
    const message: MessageBody = {
      action: "screenCapture",
    };
    const response: ResponseBody = await chrome.runtime.sendMessage(message);
    if (response.data) {
      setAlert(response.message)
      chrome.downloads.download({
        url: response.data,
        filename: "screenCapture.png",
      });
    }
  };

  const FullPageCapture = async () => {
    const response: ResponseBody =
      await chrome.runtime.sendMessage<MessageBody>({
        action: "fullPageCapture",
      });
    if (response) {
      setAlert(response.message);
    } else {
      setAlert("");
    }
  };

  return (
    <div className={styles.extensionBody}>
      <header className={styles.header}>
        <h1>GrabSnipe</h1>
      </header>
      <main className={styles.main}>
        <p className={styles.extDescription}>
        GrabSnipe, provides users with three seamless screenshot options. Users can precisely capture specific areas with screensnip, take quick screenshots, or opt for complete webpage captures, enhancing flexibility and user experience.
        </p>
        <div className={styles.extButtonContainer}>
          {!snip ? (
            <button
              className={styles.extButton}
              onClick={(e) => grabButtonClicked(e)}
            >
              Grab a snip
            </button>
          ) : (
            <button
              className={`${styles.extButton} ${styles.cancelBtn}`}
              onClick={(e) => cancelButtonClicked(e)}
            >
              Cancel
            </button>
          )}
          <button
            className={styles.extButton}
            onClick={(e) => EntireScreenCapture()}
          >
            Screen Shot
          </button>
          <button
            className={styles.extButton}
            onClick={(e) => FullPageCapture()}
          >
            Full Page Screenshot
          </button>
        </div>
      </main>
      <div className={styles.alertDiv}>
        <p className={styles.alertMessage}>{alert}</p>
      </div>
      <footer className={styles.footer}>@GrabSnipe - Made By Ankush Shenoy</footer>
    </div>
  );
}
