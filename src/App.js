import "./App.css";
// import Integrate from "./components/integrate";

import Loginreport from './components/loginreport';
import "./components/loginreport.css";

import Registration from "./components/registration";
import "./components/registration.css";

import Login from "./components/login";
import "./components/login.css"; 

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exate path="/registration" element={<Registration />} />
          <Route exate path="/loginreport" element={<Loginreport />} />
        </Routes>
      </BrowserRouter>
      {/* <Integrate /> */}
    </div>
  );
}
export default App;