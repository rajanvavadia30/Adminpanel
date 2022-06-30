import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebaseApp from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(firebaseApp);
  const Navigate = useNavigate();

  const collectionData = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("isLoggedin", true);
        alert("You have Login Successfully");
        Navigate("/loginreport");
      })
      .catch((error) => {
        console.log(error);
        alert("You have enter wrong Email/Password");
      });
  };

  return (
    <div className="style">
      <div className="title">Login Page</div>
      <div className="login-form">
        <form>
          <div className="input-container">
            <label>
              <h3>Email-Id</h3>
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
          </div>
          <div className="button-container">
            <button type="button" onClick={collectionData}>
              Login
            </button>
          </div>
          <div>
            <p>
              <b>
              Are you a new User?
              </b>
              <Link to="/registration">
                <h5>Please Register</h5>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
