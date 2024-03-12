# GrabSnipe

GrabSnipe a chromium based browser extension, provides users with three seamless screenshot options. Users can precisely capture specific areas with screensnip, take quick screenshots, or opt for complete webpage captures, enhancing flexibility and user experience.

## Features

- Grap a snip, capture only the required part of screen
- Capture viewport
- Capture full page 
- No special permissions required
- Free and Open Source

## Methods

#### **`Grab a snip`**

1. Click on the first option in the extension ui.
2. The users will now be able to draw a box to specify the area they want to capture.
3. Click on the "Confirm" button which appears near the drawn box to capture the screen snip.
4. The user can cancel the capture using "Cancel" button which appears near the drawn box.

#### **`Screen Shot`**

1. Click on the second option in the extension ui.
2. A screen shot of the current viewport, the user is on will be captured and image is saved in png format.

#### **`Full Page Screenshot`**

1. Click on the third option in the extension ui.
2. A screen shot of the entire web page, the user is currently on will be captured and image is saved in png format.

## Caveats

The extension won't work on the following origins:

- chrome and extension settings pages - `chrome://` and `chrome-extension://`
- the official chrome web store - `https://chromewebstore.google.com/`
- your home page

## Installation

### Load unpacked .zip

1. Go to [releases] and pick the latest release.
2. Download the `grab.snipe.zip` file and extract it.
3. Navigate to `chrome://extensions`.
4. Make sure that the `Developer mode` switch is enabled.
5. Click on the `Load unpacked` button and select the extracted directory.

### Build

1. Clone this repository.
2. Execute `npm run build` command.
3. Navigate to `chrome://extensions`.
4. Make sure that the `Developer mode` switch is enabled.
5. Click on the `Load unpacked` button and select the dist folder in the cloned directory.

## 📋 LICENSE

Apache 2.0 © [2024](https://github.com/ankushh14/grabsnipe-browser-extension/blob/main/LICENSE)