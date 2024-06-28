
import React, {useState} from "react";

//const url = `http://localhost:4500/account/login/${ueml}/${upwd}`;
let inputErr="";
const handleBackendFetch = async (giveUpdateToApp,dbResponseChecker, eml, pwd)=>{
    try{
        /*
        const randstring = ["a0532zor4ks","a9n8efg038b","c0bk4zb58rg","dbc7cyi3c21","ez0y09bn7zq","f09fa056c5e","gk1bo3da4ya","k0br7o9shm2a", "a94z84b58sd"];
        const idx1 = Math.floor(Math.random()*10);
        const idx2 =  Math.floor(Math.random() * 100);
        const stateVal = randstring[idx1]+idx2;
        const newURL = `https://cloud.digitalocean.com/v1/oauth/authorize?response_type=code&client_id=4111f9f5d55d7daf02b2616de9a9474fddf84988ea65a6362704a19ab370e776&redirect_uri=https://sea-turtle-app-59o9h.ondigitalocean.app/account/login/${eml}/${pwd}&scope=read write&state=${stateVal}`;
        */
        const url = 'http://localhost:4500';
        //const newURL = `https://cloud.digitalocean.com/v1/oauth/authorize?client_id=1c72634a0e694ebcb8409b0ee1d93722548ba1a18e54e69c7b09a6c79b633d62&redirect_uri=https://seashell-app-g45p7.ondigitalocean.app/account/login/${eml}/${pwd}&response_type=code`;
        //const url = `https://seashell-app-g45p7.ondigitalocean.app/account/login/${eml}/${pwd}`;
        (async ()=>{ 
        await fetch(url).then(response=>{
                    return response.json();
                   }).then(result=>{
                    if(result){
                        let user;
                        if(result.error){
                          user = {isAuthenticated: false, userName:"", userEmail:""};
                          giveUpdateToApp(JSON.parse(JSON.stringify(user)));
                           return dbResponseChecker(result);
                        } else{
                          user = {isAuthenticated: true, userName:result.name, userEmail:result.email};
                          giveUpdateToApp(JSON.parse(JSON.stringify(user)));
                          return dbResponseChecker(result);
                        }
                     } 
                     else{
                        return dbResponseChecker({statusCode:500, statusMessage:"Failure", error:"unknown exception, please reach support team @2404768982"});
                     }
                   }).catch(err=>{
                    console.log(err);
                    dbResponseChecker({statusCode:500, statusMessage:"Failure", error:"exception during backend call, please reach support team @2404768982"});
                    return {statusCode:500, statusMessage:"Failure", error:"exception during backend call, please reach support team @2404768982"};
               })
        })();
    }
   catch(err){
       console.log(err);
      return {statusCode:500, statusMessage:"Failure", error:"exception while calling backend call: try/catch block, please reach support team @2404768982"};
   }
}
//validate email
const validateEmail = (email)=>{
    const allowed=/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
    const test = allowed.test(email);
    if(email !==null && test===true){
        return true;
      } else {
        inputErr += "Invalid email id,";
        return false;
      }
}
//validate password
const validatePwd = (pwd)=>{
    if(pwd.length<3 || pwd===undefined || pwd===""){
        inputErr += "password missing or too short";
        return false;
    } else if(pwd.length>20){
        inputErr += "password too long";
        return false;
    } else{
        return true;
    }
}

const Login = (props) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [statusMsg, setStatusMsg] = useState("");
    const [isValidInput, setIsValidInput] = useState(false);
    //validate user input
    async function handleLoginUsrNamePwd(){
      inputErr="";
      const isValidEamil = validateEmail(userEmail);
      const isValidPwd = validatePwd(userPwd);
      
      if(isValidEamil && isValidPwd){
        const rspChecker = async (dbrsp)=>{
            const statuscode = dbrsp.statusCode;
            if(statuscode===200){
               setIsValidInput(true);
               setStatusMsg("Login is success");
            }else{
               setStatusMsg("404: user not found:" +dbrsp.error);
               setIsValidInput(false); 
            }
          };
            await handleBackendFetch(props.handleuser,rspChecker, userEmail, userPwd);
            } 
        else{
            setIsValidInput(false);
            setStatusMsg(inputErr);
            }
        }

    return (
        <div className="card text-bg-info mb-3" style={{maxWidth: '18rem'}}>
        <h5 className="card-header">Log into your account</h5>
        <div className="card-body">
            Email<br/>
            <input type="input" className="form-control" id="loginEmail" placeholder="Enter Email id..." value={userEmail} onChange={e=>setUserEmail(e.target.value)}/><br/>
            Password:<br/>
            <input type="password" className="form-control" id="loginpwd" placeholder="Enter passcode..." value={userPwd} onChange={e=>setUserPwd(e.target.value)}/><br/>
            <button type="submit" className="btn btn-primary btn-lg" id="loginviapwd"    onClick={()=>{handleLoginUsrNamePwd();}}>Login</button><br/><br/><br/>
            {!isValidInput && <h6 className="bg-warning text-white text-center">{statusMsg}</h6>}  
            {props.isLogged&&<h4 className="text-success">{statusMsg}</h4>} 
            </div> 
        </div>
    );
  };
  export default Login;