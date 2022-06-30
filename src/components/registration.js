import React, { useState } from "react";
import firebaseApp from "../firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { TextField } from "@mui/material";

function Registration() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [captcha, setCaptcha] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (checkCaptcha()) {
      setOpen(false);
    }
  };

  const checkCaptcha = (e) => {
    var validCaptcha = /^\d*$/;

    if (captcha.length > 0) {
      if (!validCaptcha.test(captcha)) {
        alert("Your Captcha is Incorrect");
        return false;
      } else {
        return true;
      }
    }
  };

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const Navigate = useNavigate();

  const collectionData = (e) => {
    e.preventDefault();

    var date = new Date().getTime();
    if (checkCaptcha()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          addDoc(collection(db, "loginData"), {
            name: fullname,
            email: email,
            password: password,
            mobileNo: mobileNo,
            country: country,
            state: state,
            date: date,
          });
          localStorage.setItem("isLoggedin", true);
          alert("You have Successfully Registered!!");
          Navigate("/loginreport")
          // window.location.href="/loginreport"
        })
        .catch((error) => {
          console.log(error);
          alert("Your Email already in Use, So kindly Login!!");
        });
    }
  };

  return (
    <div className="styles">
      <div className="title">Registration Page</div>
      <div className="app">
        <div className="registration-form">
          <form>
            <div className="input-container">
              <label>
                <h3>Full Name</h3>
              </label>
              <input
                type="text"
                className="formdata"
                placeholder="Enter your Full name"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <label>
                <h3>Email</h3>
              </label>
              <input
                type="email"
                className="formdata"
                placeholder="Enter your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>
                <h3>Password</h3>
              </label>
              <input
                type="password"
                className="formdata"
                placeholder="Enter your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>
                <h3>Mobile no.</h3>
              </label>
              <input
                type="number"
                className="formdata"
                placeholder="Enter your Mobile no."
                required
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
              <label>
                <h3>Country</h3>
              </label>
              <input
                type="text"
                className="formdata"
                placeholder="Enter your Country name"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <label>
                <h3>State</h3>
              </label>
              <input
                type="text"
                className="formdata"
                placeholder="Enter your State name"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="button-container">
              {/* <button type="button" onClick={collectionData}>
                Register
              </button> */}
              <Popup
                trigger={
                  <button type="button" onClick={handleClickOpen}>
                    Register
                  </button>
                }
                open={open}
                onClose={handleClose}
                position="left center"
              >
                <h4>Please Fill the Captcha :</h4>
                <p className="captcha">12345</p>
                <TextField
                  value={captcha}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      console.log("Enter Key was Pressed");
                      collectionData(event);
                    }
                  }}
                  onChange={(e) => setCaptcha(e.target.value)}
                  id="outlined-basic"
                  label="Captcha"
                  variant="outlined"
                />
              </Popup>
            </div>
            <div>
              <p>
                <b>Are you a Existing User?</b>
                <Link to="/">
                  <h5>Please Login</h5>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Registration;