/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import firebaseApp from "../firebase";
import { Dialog } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { ArrowDownward } from "@mui/icons-material";

function Loginreport() {
  const [userdata, setUserdata] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [opendocId, setOpendocId] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [isSortdata, setIsSortdata] = useState(false);

  const db = getFirestore(firebaseApp);
  const Navigate = useNavigate();

  useEffect(() => {
    getUserdataFromDb();
  }, []);

  async function getUserdataFromDb() {
    let userdata = [];
    const querySnapshot = await getDocs(collection(db, "loginData"));
    querySnapshot.forEach((doc) => {
      let docId = doc.id;
      let datas = doc.data();
      userdata.push({ ...datas, docId });
    });
    console.log("userdata[0]", userdata);
    setUserdata(userdata);
  }

  const updateData = (e, docId) => {
    e.preventDefault();
    const docRef = doc(db, "loginData", docId);
    updateDoc(docRef, {
      name: fullname,
      email: email,
      password: password,
      mobileNo: mobileNo,
      country: country,
      state: state,
    });
    alert("Your Data has been Updated Successfully!");
  };

  const deleteData = (e, docId) => {
    e.preventDefault();
    const docRef = doc(db, "loginData", docId);
    deleteDoc(docRef, {
      name: fullname,
      email: email,
      password: password,
      mobileNo: mobileNo,
      country: country,
      state: state,
    });
    alert("Your Data has been Deleted Successfully!");
  };

  const handleClickOpen = (docId) => {
    setIsUpdate(true);
    setOpendocId(docId);
    console.log("docId", docId);
    let editData = userdata.filter((res) => res.docId === docId);
    console.log("opendocId", editData);

    setFullname(editData[0].name);
    setEmail(editData[0].email);
    setPassword(editData[0].password);
    setMobileNo(editData[0].mobileNo);
    setCountry(editData[0].country);
    setState(editData[0].state);
  };

  const handleClose = () => {
    setIsUpdate(false);
  };

  // Delete Component handle Click

  const handleClickOpen1 = (docId) => {
    setIsDelete(true);
    setOpendocId(docId);
    console.log("docId", docId);
    let editData = userdata.filter((res) => res.docId === docId);
    console.log("opendocId", editData);
  };

  const handleClose1 = () => {
    setIsDelete(false);
  };

  // Add Data Function

  const addData = (e) => {
    e.preventDefault();
    Navigate("/registration");
  };

  //Logout Data Function

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    Navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedin") === "true") {
    } else {
      Navigate("/");
    }
  }, []);

  const sortDate = () => {
    if (isSortdata) {
      userdata.sort((a, b) => a.date - b.date);
    } else {
      userdata.sort((a, b) => b.date - a.date);
    }
    setIsSortdata(!isSortdata);
  };

  return (
    <div>
      <div className="btn-container">
        <div className="left-btn">
          <button type="button" className="addbtn" onClick={addData}>
            Add Data
          </button>
        </div>
        <div>
          <h2 className="sap">Super Admin Panel</h2>
        </div>
        <div className="right-btn">
          <button type="button" className="logoutbtn" onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>User UID</th>
            <th>Email - Id</th>
            <th>Mobile No.</th>
            <th>Country</th>
            <th>State</th>
            <th>
              Date<ArrowDownward onClick={sortDate}></ArrowDownward>
            </th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userdata &&
            userdata.length > 0 &&
            userdata.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{value.name}</td>
                  <td>{value.docId}</td>
                  <td>{value.email}</td>
                  <td>{value.mobileNo}</td>
                  <td>{value.country}</td>
                  <td>{value.state}</td>
                  <td>{new Date(value.date).toLocaleString()}</td>
                  <td>
                    <EditIcon
                      className="report"
                      onClick={() => handleClickOpen(value.docId)}
                    ></EditIcon>
                  </td>
                  <td>
                    <DeleteIcon
                      className="report1"
                      onClick={(e) => handleClickOpen1(value.docId)}
                    ></DeleteIcon>
                  </td>
                </tr>
              );
            })}
        </tbody>

        {/* Update Component */}

        <Dialog open={isUpdate} onClose={handleClose}>
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
                pattern="[1-9]{1}[0-9]{9}"
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
            <div className="button-container1">
              <button
                type="button"
                className="button1"
                onClick={(e) => {
                  updateData(e, opendocId);
                  handleClose();
                }}
              >
                Update
              </button>
              <button type="button" className="button1" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </form>
        </Dialog>

        {/* Delete Component */}

        <Dialog open={isDelete} onClose={handleClose1}>
          <form>
            <div>
              <h2>Are you sure you want to Delete this Data ?</h2>
            </div>
            <div className="button-container1">
              <button
                type="button"
                className="button2"
                onClick={(e) => {
                  deleteData(e, opendocId);
                  handleClose1();
                }}
              >
                Delete
              </button>
              <button type="button" className="button2" onClick={handleClose1}>
                Cancel
              </button>
            </div>
          </form>
        </Dialog>
      </table>
    </div>
  );
}
export default Loginreport;
