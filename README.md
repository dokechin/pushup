[Japanese Document is here](README_ja.md)

### Overview
This repository stores the REST API server source code used for the Clova extension "Kinsta". To see how the "Kintre Cheer" extension works, use the voice command "キンスタを起動して (Launch the Kinsta)" on the Clova app or any Clova-compatible speaker (such as WAVE or Friends). The extension will tell you the counting. You can roll 1-100 counts at a time, and the extension will tell you the counts.

### Requirements
The REST API server for the "Kintore Cheer" Clova extension is implemented using Node.js. Any compatible operating system including Windows, macOS, Linux can run the server. You can find more information on compatibility, and download the latest version of Node.js on the official Node.js website. https://nodejs.org/ja/download/current/

### Installation
Follow the steps below to install the "Kintore Cheer" REST API server source code.
1) Install Node.js: https://nodejs.org/ja/download/current/
2) Download the source code: git clone https://github.com/line/clova-extension-sample-dice.git
3) Install library dependencies: npm install
4) Edit config.js to replace "com.example.dice" with your Extension ID 

### Usage
The REST API server for the "Kintore Cheer" Clova extension is designed to return appropriate responses to the extension requests sent from the Clova platform. Be advised that even if you run the API server, the API requests must be identical to the requests sent from the Clova platform. When publicly launching the service, you must change the domain to a HTTPS-based domain that can be accessed publicly.
- Run the API server: node app.js
  - To disable the signature verification、run  `DEBUG=true node app.js` 
- Test the API server: Using [Postman](https://www.getpostman.com/), send the following JSON request to test if a JSON response is returned.
    - URL: http://localhost:3000/clova
    - Request method: POST
    - Body: Select "raw" and then select "JSON (application/json)" from the dropdown menu
- Request example
```
{
  "version": "0.1.0",
  "session": {
    "sessionId": "55ca6ee4-72dd-4694-b30f-4b49e238634f",
    "user": {
      "userId": "U1bd47e4c7c68ca8a8ead15517d055ad1",
      "accessToken": "3d0e7bab-2c1a-44d4-be20-c84910b78e2c"
    },
    "new": true
  },
  "context": {
    "System": {
      "user": {
        "userId": "U1bd47e4c7c68ca8a8ead15517d055ad1",
        "accessToken": "3d0e7bab-2c1a-44d4-be20-c84910b78e2c"
      },
      "device": {
        "deviceId": "da6db6c26dcbe1a077eb2c890031ce2b1980asf2d30e00ee58804daf0ee89eff"
      },
      "application": {
        "applicationId": "com.example.dice"
      }
    }
  },
  "request": {
    "type": "IntentRequest",
    "intent": {
      "name": "CountIntent",
      "slots": {
        "CountSlot": {
          "name": "CountSlot",
          "value": "10"
        }
      }
    }
  }
}
```

### License
Dokechin

```

