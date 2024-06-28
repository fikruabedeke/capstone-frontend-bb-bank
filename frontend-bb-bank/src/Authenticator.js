import { createContext, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const logInUser = async (data) => {
     setUser(data);
     localStorage.removeItem("BBBanker");
     localStorage.setItem("BBBanker", JSON.stringify(user));
     console.log("printing from local store", window.localStorage.getItem("BBBanker"));
    //navigate("/secret");
  };

  // call this function to sign out logged in user
  const logOutUser = async (data) => {
    setUser(data);
    localStorage.removeItem("BBBanker");
    console.log("from logout hit", user);
    localStorage.setItem("BBBanker", JSON.stringify(user));
    //navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      logInUser,
      logOutUser,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};