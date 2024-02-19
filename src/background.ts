export type MessageBody = {
  action: string;
  data?:string
};

export type ResponseBody = {
  message: string;
  data?: string;
};


chrome.runtime.onMessage.addListener(
  (message: MessageBody, sender, sendResponse) => {
    if (message.action === "screenCapture") {
      chrome.tabs.captureVisibleTab(
        {
          format: "png",
        },
        (dataUrl) => {
          const response: ResponseBody = {
            message: "screenCapture succeed",
            data: dataUrl
          };
          sendResponse(response);
        }
      );
    }
    if(message.action === "downloadCroppedImage"){
      console.log(message.data)
      // chrome.downloads.download({url:message.data!,filename:"screenGrab.png"})
    }
    return true
  }
);

