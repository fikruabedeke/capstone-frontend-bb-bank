import { Outlet as PubOutlet, NavLink } from "react-router-dom";
import Logo from './BBLogo.svg';
import { useContext, useState } from "react";
//import GreenMark from './GreenMark.svg';
//import Banner from './Banner.svg';
//import Login from "./Login";
//import CreateAccount from "./CreateAccount";
import UserContex from "./UserContext";

const Dashboard = (props) => {
    const ctx = useContext(UserContex);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [link, setLink] = useState('/login')
    const handLoginInClick=()=>{
        if(ctx.isAuthenticated){
          setLink('/logout');
          setIsUserLogged(true);
        } else{
          setLink('/login');
          setIsUserLogged(false);
        }
    }

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
                <button type="button" className="btn btn-outline-primary" border-primary-dark rounded-3>Home</button>
                </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create" className="nav-link active" aria-current="page" id="Open Account">
                  <button type="button" className="btn btn-outline-primary">Create Account</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={link} onClick={handLoginInClick} className="nav-link" id="login">
                {isUserLogged?(<button type="button" className="btn btn-outline-primary">Logout</button>):
                <button type="button" className="btn btn-outline-primary">Login</button>
                }
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/deposit" className="nav-link" id="deposit">
               <button type="button" className="btn btn-outline-primary">Deposit</button>
            </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/balance" className="nav-link" id="balance">
                <button type="button" className="btn btn-outline-primary">Balance</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/withdraw" className="nav-link" id="withdraw">
              <button type="button" className="btn btn-outline-primary">Withdraw</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/alldata" className="nav-link" id="alldata">
              <button type="button" className="btn btn-outline-primary">AllData</button>
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