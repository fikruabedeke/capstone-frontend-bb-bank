import {useState} from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
//import { AuthContext } from "./Authenticator.js";
import Dashboard from './Dashboard.js';
import Home from "./pages/Home.js";
import CreateAccount from "./pages/CreateAccount.js";
import Login from "./pages/Login.js";
import Logout from "./pages/Logout.js";
import Deposit from "./pages/Deposit.js";
import Balance from "./pages/Balance.js";
import Withdraw from "./pages/Withdraw.js";
import AllData from "./pages/Alldata.js";
//import Footer from "./pages/Footer.js";
import DepoStatus from "./status/DepoStatus.js";
import BalStatus from "./status/BalStatus.js";
import WithDrwSt from "./status/WithDrwSt.js";
import AllDStatus from './status/AllDStatus.js';
import NoPage from "./NoPage.js";

//import style from './styles/footer.css';
//import {AuthProvider, useAuth} from "./Authenticator.js";

function App(){
  const [userData, setUserData] = useState({isAuthenticated:false, userName:"", userEmail:""});
  const [isLogged, setIsLogged] = useState(false);
  const handleUserData = async (data) =>{
      console.log("app is updated after getting data from backend", data);
      setUserData(data);
      if(data.isAuthenticated) {
          setIsLogged(true);
        } 
      else{
          setIsLogged(false);
        }
     }
  console.log(isLogged);
  return (
    <>
    <BrowserRouter>
     <Dashboard userdata={userData}/>
      <Routes>
      <Route path="/" index element={<Home/>}/>
          <Route path="/create" element={<CreateAccount updateuser={handleUserData} isUserLogged={isLogged}/>}/>
          <Route path="/login" element={<Login handleuser={handleUserData} isLogged={isLogged}/>}/>
          <Route path="/deposit" element={isLogged?(<Deposit accountHolder={userData}/>):(<DepoStatus/>)}/>
          <Route path="/withdraw" element={isLogged?(<Withdraw/>):(<WithDrwSt/>)}/>
          <Route path="/balance" element={isLogged?(<Balance/>):(<BalStatus/>)}/>
          <Route path="/alldata" element={isLogged?(<AllData/>):(<AllDStatus/>)}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
        {isLogged && (<div><Logout handleuser={handleUserData}/></div>)}
     </BrowserRouter>
     <br/>
     <div className="App-footer"><footer><p>&copy;Copyright 2024, Bees Bank, Columbus, Ohio </p></footer></div>
     </>
  );
}
export default App;
