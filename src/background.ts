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
          chrome.downloads.download({url:dataUrl,filename:"screenCapture.png"})
        }
      );
    }



    if(message.action === "downloadCroppedImage"){
      chrome.downloads.download({url:message.data!,filename:"screenGrab.png"})
    }


    if(message.action === "fullPageCapture"){
      (async()=>{
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.debugger.attach({ tabId: tabs[0].id! }, "1.2", () => {
          if(chrome.runtime.lastError){
            let response : ResponseBody = {message : chrome.runtime.lastError.message!}
            sendResponse(response)
          }
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
                      sendResponse({message:"Capture succesfull"})
                      chrome.debugger.detach({tabId: tabs[0].id!})
                    }
                  );
                },1000)
              }
            )
          } else {
            let response : ResponseBody = {
              message : "Extension can only be used in web pages starting with http | https"
            }
            sendResponse(response)
          }
        });

      })()
    }



    return true
  }
);

