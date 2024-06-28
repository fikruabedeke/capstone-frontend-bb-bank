import { Outlet as PubOutlet, NavLink } from "react-router-dom";
import Logo from '../images/BBLogo.svg';
import {useState } from "react";
import UserContex from "../pages/UserContext";

const HomeDashboard = (props) => {
    //const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [link, setLink] = useState('/logout');

  return (
    <> 
       <div className="navbar-brand container-fluid bg-success p-2 text-dark bg-opacity-50">
          <img src={Logo} width={120} height={80} alt="LogoMissing"/>
          <h5>Capstone</h5>
        </div>
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: "", marginTop:5,marginBottom:5,borderRadius:5}}>
        <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page">
                <button type="button" className="btn btn-outline-primary">Home</button>
                </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" id="login">
                <button type="button" className="btn btn-outline-primary">Login</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create" className="nav-link active" aria-current="page" id="Open Account">
                  <button type="button" className="btn btn-outline-primary">Create Account</button>
              </NavLink>
            </li>
        </ul>
        </div>
        </div>
        </nav>
      <PubOutlet/>
    </>
  )
};
export default HomeDashboard;