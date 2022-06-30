import { ZoomMtg } from "@zoomus/websdk";
import { useEffect } from "react";
import cryptoJs from "crypto-js";
import { Buffer } from "buffer";

// const crypto = require('crypto') 
// crypto comes with Node.js
function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  // Prevent time sync issue between client signature generation and Zoom
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = cryptoJs.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(apiKey, meetingNumber, timestamp, role, hash).toString('base64')
  return signature
}
// pass in your Zoom JWT API Key, Zoom JWT API Secret, Zoom Meeting Number, and 0 to join meeting or webinar or 1 to start meeting

var apiKey = "RFFACjwxTsKveUWAoznmuQ";
var apiSecret = "sKw9Io7LsAxUIJJFzgEp3KH9II5QesnyjVxL";
var meetingNumber = 123456789;
var leaveUrl = "http://localhost:3000"; //Redirect URL
var userName = "WebSDK";
var userEmail = "";
var passWord = "";

var signature = generateSignature(apiKey, apiSecret, meetingNumber, 0);

const Zoom = () => {
  useEffect(() => {
    zoomDiv();
    ZoomMtg.setZoomJSLib('https://source.zoom.us/2.4.0/lib', '/av')
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initiateMeeting();
  }, []);

  const zoomDiv = () => {
    document.getElementById('zmmtg-root').style.display = "block";
  };

  const initiateMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  return <div className="App">Zoom</div>;
};
export default Zoom;