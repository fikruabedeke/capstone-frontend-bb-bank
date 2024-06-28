

import { Navigate } from "react-router-dom";
import { useAuth } from "../Authenticator.js";
import Dashboard from '../Dashboard.js';


/*import Deposit from "./pages/Deposit.js";
import Balance from "./pages/Balance.js";
import Withdraw from "./pages/Withdraw.js";
import AllData from "./pages/Alldata.js";*/

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  } else {
	return (
	 <>
	 <Dashboard/>
	 </>
	)
  }
  return children;
};