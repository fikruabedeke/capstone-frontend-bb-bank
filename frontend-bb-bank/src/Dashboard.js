import { Outlet as PubOutlet, NavLink } from "react-router-dom";
import Logo from './BeesBank.svg';
//import { useState } from "react";
//import style from "./styles/dashboard.css";

const Dashboard = (props) => {

  return (
    <> 
       <div className="navbar-brand container-fluid bg-success p-2 text-dark bg-opacity-50">
          <img src={Logo} width={120} height={80} alt="LogoMissing"/>
          {props.userdata.isAuthenticated?<h3 className="text-success">Welcome, {props.userdata.userName}</h3>:undefined}
          <h5>Capstone</h5>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: "", marginTop:5,marginBottom:5,borderRadius:5}}>
        <div className="container-fluid">
        <div className="navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page">
                <button type="button" className="btn menuItem">Home</button>
                </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create" className="nav-link active" aria-current="page" id="Open Account">
                  <button type="button" className="btn menuItem">Create Account</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" id="login">
                <button type="button" className="btn menuItem">Login</button>
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/deposit" className="nav-link" id="deposit">
               <button type="button" className="btn menuItem">Deposit</button>
            </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/balance" className="nav-link" id="balance">
                <button type="button" className="btn menuItem">Balance</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/withdraw" className="nav-link" id="withdraw">
              <button type="button" className="btn menuItem">Withdraw</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/alldata" className="nav-link" id="alldata">
              <button type="button" className="btn menuItem">AllData</button>
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
export default Dashboard;