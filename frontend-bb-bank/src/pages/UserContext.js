import React from "react";
const UserContex = React.createContext({isAuthenticated:true, userName:"",userEmail:""});
export default UserContex;
//call this func to atuthenticate the user:
