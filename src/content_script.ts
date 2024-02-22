import { MessageBody, ResponseBody } from "./background";

var startX: number;
var startY: number;
var endX: number;
var endY: number;
var box: HTMLDivElement | null;
var isDrawing: boolean = false;
var confirmButton: HTMLButtonElement | null;
var cancelButton: HTMLButtonElement | null;

const generalButtonStyles = {
  position: "fixed",
  zIndex: "9999",
  width: "75px",
  height: "auto",
  padding: "10px",
  margin: "0px 0px 8px 5px",
  cursor: "pointer",
  borderRadius: "6px",
  color: "white",
  backgroundColor: "blueviolet",
  border: "none",
};

const generalDrawBoxStyles = {
  borderRadius: "2px",
  border: "2px dashed purple",
  position: "fixed",
  zIndex: "9999",
};

const confirmFunction = async () => {
  if (!box) {
    alert("GrabSnipe: Some error occured, please try again");
    return cancelFunction();
  } else {
    removeControlButtons();
    const message: MessageBody = {
      action: "screenCapture",
    };
    const response: ResponseBody = await chrome.runtime.sendMessage(message);
    if (!response) {
      alert("GrabSnipe: Some error occured, please try again");
      return cancelFunction();
    }
    const image = new Image();
    image.src = response.data!;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");

      if (!context) {
        alert("GrabSnipe: Some error occured, please try again");
        return cancelFunction();
      }

      const areaOfImage = image.width * image.height;
      const areaOfDom =
        document.documentElement.clientWidth *
        document.documentElement.clientHeight;

      const timesIncrease = areaOfImage / areaOfDom;
      console.log(timesIncrease);

      const newBoxWidth = Math.sqrt(timesIncrease) * box!.offsetWidth;
      const newBoxHeight = Math.sqrt(timesIncrease) * box!.offsetHeight;

      const newBoxLeft = Math.sqrt(timesIncrease) * box!.offsetLeft;
      const newBoxTop = Math.sqrt(timesIncrease) * box!.offsetTop;

      context.drawImage(
        image,
        newBoxLeft + 5,
        newBoxTop + 5,
        newBoxWidth - 20,
        newBoxHeight - 15,
        0,
        0,
        image.width,
        image.height
      );
      const croppedDataUrl = canvas.toDataURL("image/png");

      const croppedImageAction: MessageBody = {
        action: "downloadCroppedImage",
        data: croppedDataUrl,
      };
      chrome.runtime.sendMessage(croppedImageAction);
      cancelFunction();
    };
  }
};

const cancelFunction = () => {
  if (document.getElementById("drawBox")) {
    document.body.removeChild(box!);
    box = null;
  }
  removeControlButtons();
};

const createControlButtons = () => {
  if (!document.getElementById("drawBox")) return;

  confirmButton = document.createElement("button");
  confirmButton.style.top = `${startY + 10}px`;
  if(endX + 80 > window.innerWidth && startX - 90 >0){
    confirmButton.style.left = `${startX - 90}px`
  }
  else if(startX - 90 < 0 && endX + 90 > window.innerWidth && startY - 60 > 0){
    confirmButton.style.top = `${startY-50}px`
    confirmButton.style.left = `${endX - 185}px`
  }
  else if(startX - 90 < 0 && endX + 90 > window.innerWidth && startY - 60 < 0){
    confirmButton.style.top = `${endY + 10}px`
    confirmButton.style.left = `${endX - 185}px`
  }
  else{
    confirmButton.style.left = `${endX}px`;
  }
  confirmButton.style.position = generalButtonStyles.position;
  confirmButton.style.zIndex = generalButtonStyles.zIndex;
  confirmButton.style.width = generalButtonStyles.width;
  confirmButton.style.height = generalButtonStyles.height;
  confirmButton.style.padding = generalButtonStyles.padding;
  confirmButton.style.margin = generalButtonStyles.margin;
  confirmButton.style.cursor = generalButtonStyles.cursor;
  confirmButton.style.borderRadius = generalButtonStyles.borderRadius;
  confirmButton.style.color = generalButtonStyles.color;
  confirmButton.style.backgroundColor = generalButtonStyles.backgroundColor;
  confirmButton.style.border = generalButtonStyles.border;
  confirmButton.id = "df0c9e1c1ca905961faaafab1063673f";
  confirmButton.innerText = "Confirm";
  confirmButton.onclick = confirmFunction;
  document.body.appendChild(confirmButton);

  cancelButton = document.createElement("button");
  cancelButton.style.top = `${startY + 60}px`;
  if(endX + 90 > window.innerWidth && startX - 90 >0){
    cancelButton.style.left = `${startX - 90}px`
  }
  else if(startX - 90 < 0 && endX + 90 > window.innerWidth && startY - 60 > 0){
    cancelButton.style.top = `${startY-50}px`
    cancelButton.style.left = `${endX - 100}px`
  }
  else if(startX - 90 < 0 && endX + 90 > window.innerWidth && startY - 60 < 0){
    cancelButton.style.top = `${endY + 10}px`
    cancelButton.style.left = `${endX - 100}px`
  }
  else{
    cancelButton.style.left = `${endX}px`;
  }
  cancelButton.style.position = generalButtonStyles.position;
  cancelButton.style.zIndex = generalButtonStyles.zIndex;
  cancelButton.style.width = generalButtonStyles.width;
  cancelButton.style.height = generalButtonStyles.height;
  cancelButton.style.padding = generalButtonStyles.padding;
  cancelButton.style.margin = generalButtonStyles.margin;
  cancelButton.style.cursor = generalButtonStyles.cursor;
  cancelButton.style.borderRadius = generalButtonStyles.borderRadius;
  cancelButton.style.color = generalButtonStyles.color;
  cancelButton.style.backgroundColor = generalButtonStyles.backgroundColor;
  cancelButton.style.border = generalButtonStyles.border;
  cancelButton.id = "f02632c5d6919e84f2cafecb9cf1fc42";
  cancelButton.innerText = "Cancel";
  cancelButton.onclick = cancelFunction;
  document.body.appendChild(cancelButton);
};

const removeControlButtons = () => {
  if (document.getElementById("df0c9e1c1ca905961faaafab1063673f")) {
    document.body.removeChild(confirmButton!);
    confirmButton = null;
  }
  if (document.getElementById("f02632c5d6919e84f2cafecb9cf1fc42")) {
    document.body.removeChild(cancelButton!);
    cancelButton = null;
  }
};

const updateBox = () => {
  if (!box) {
    box = document.createElement("div");
    box.id = "drawBox";
    box.style.borderRadius = generalDrawBoxStyles.borderRadius;
    box.style.border = generalDrawBoxStyles.border;
    box.style.position = generalDrawBoxStyles.position;
    box.style.zIndex = generalDrawBoxStyles.zIndex;
    document.body.appendChild(box);
  }
  box.style.left = `${startX}px`;
  box.style.top = `${startY}px`;
  box.style.width = `${endX - startX}px`;
  box.style.height = `${endY - startY}px`;
};

const animateDivDraw = () => {
  if (isDrawing) {
    updateBox();
    requestAnimationFrame(animateDivDraw);
  }
};

const mouseDownListener = (e: MouseEvent) => {
  isDrawing = true;
  startX = e.clientX;
  startY = e.clientY;
  animateDivDraw();
};

const mouseMoveListener = (e: MouseEvent) => {
  if (isDrawing) {
    endX = e.clientX;
    endY = e.clientY;
  } else {
    return;
  }
};

const mouseUpListener = (e: MouseEvent) => {
  if (isDrawing) {
    createControlButtons();
    startX = 0;
    startY = 0;
    endX = 0;
    endY = 0;
    isDrawing = false;
    removeSnipFunction();
  }
};

const snipFunction = () => {
  cancelFunction();

  document.body.style.cursor = "crosshair";
  document.addEventListener("mousedown", mouseDownListener);
  document.addEventListener("mousemove", mouseMoveListener);
  document.addEventListener("mouseup", mouseUpListener);
};

const removeSnipFunction = () => {
  document.body.style.cursor = "default";
  document.removeEventListener("mousedown", mouseDownListener);
  document.removeEventListener("mousemove", mouseMoveListener);
  document.removeEventListener("mouseup", mouseUpListener);
};

chrome.runtime.onMessage.addListener(
  (message: MessageBody, sender, sendResponse) => {
    if (message.action === "grabClicked") {
      snipFunction();
      let response: ResponseBody = {
        message: "Draw the outline of the snip you want to capture",
      };
      sendResponse(response);
    }
    if (message.action === "cancelClicked") {
      removeSnipFunction();
      let response: ResponseBody = {
        message: "",
      };
      sendResponse(response);
    }
    return true;
  }
);
