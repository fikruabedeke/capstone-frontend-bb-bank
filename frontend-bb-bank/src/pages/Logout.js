//import { useAuth } from "../Authenticator.js";
//import { useState } from 'react';
 const Logout = (props) => {
  const handleLogout = () => {
    const udata = {isAuthenticated: false, userName:"", userEmail:""};
     props.handleuser(udata);
  };

  return (
    <div>
      <button type="button" className="btn btn-primary btn-lg" onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Logout;