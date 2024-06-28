import React, {useState} from "react";
//import Card from './Card.js';
//import UserContext from './UserContext.js';
let inputErr="";
const isNameValid = (name)=>{
  if(name.length<3 || name===undefined || name===""){
      inputErr += "user name is too short or empty, ";
      return false;
  } else if(name.length>20){
      inputErr += "user name is too long";
      return false;
  } else{
      //console.log("user name is valid");
      return true;
  }
}

const isEmailValid = (email)=>{
  const allowed=/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
  const test = allowed.test(email);
  if(email !==null && test===true){
      return true;
    } else {
      inputErr += "invalid email id, ";
      return false;
    }
}
const isPwdValid = (pwd)=>{
  if(pwd.length<3 || pwd===undefined || pwd===""){
      inputErr += "password is too short, ";
      return false;
  } else if(pwd.length>20){
      inputErr += ", password too long";
      return false;
  } else{
      return true;
  }
}

const callBackEnd = async (receiveBackendCallResponse, uname, ueml, upwd)=>{
  try{
    /*
    const randstring = ["a0532zor4ks","a9n8efg038b","c0bk4zb58rg","dbc7cyi3c21","ez0y09bn7zq","f09fa056c5e","gk1bo3da4ya","k0br7o9shm2a", "a94z84b58sd"];
    const idx1 = Math.floor(Math.random()*10);
    const idx2 =  Math.floor(Math.random() * 100);
    const stateVal = randstring[idx1]+idx2;
    const newURL = `https://cloud.digitalocean.com/v1/oauth/authorize?response_type=code&client_id=4111f9f5d55d7daf02b2616de9a9474fddf84988ea65a6362704a19ab370e776&redirect_uri=https://sea-turtle-app-59o9h.ondigitalocean.app/account/create/${uname}/${ueml}/${upwd}&scope=read write&state=${stateVal}`;
      */
     const data = {name:uname, email:ueml, password:upwd};
     const url = 'http://localhost:4500';
     //const newURL = `https://cloud.digitalocean.com/v1/oauth/authorize?client_id=1c72634a0e694ebcb8409b0ee1d93722548ba1a18e54e69c7b09a6c79b633d62&redirect_uri=https://seashell-app-g45p7.ondigitalocean.app/account/create&response_type=code&scope=read write`;
    //const url = `https://seashell-app-g45p7.ondigitalocean.app/account/create/${uname}/${ueml}/${upwd}`;
      (async ()=>{ 
      await fetch(url, {method: 'POST',mode: "same-origin",cache: "no-cache", headers: {"Content-Type": "application/json"},redirect: "follow",referrerPolicy: "no-referrer",
        body: JSON.stringify(data)})
           .then(response=>{
                  return response.json();
                 }).then(result=>{
                  if(result){
                      if(result.error){
                        console.log(result);
                         return receiveBackendCallResponse(result);
                      } else{
                        return receiveBackendCallResponse(result);
                      }
                   } 
                   else{
                      return receiveBackendCallResponse({statusCode:500, statusMessage:"Failure", error:"unknown exception, please reach support team @2404768982"});
                   }
                 }).catch(err=>{
                  console.log(err);
                   return receiveBackendCallResponse({statusCode:500, statusMessage:"Failure", error:"exception during backend call, please reach support team @2404768982"});
             })
      })();
  }
 catch(err){
     console.log(err);
    return receiveBackendCallResponse({statusCode:500, statusMessage:"Failure", error:"exception during backend call: caught in try catch block, please reach support team @2404768982"});
 }
}

const CreateAccount = (props) => {
    const [statusMsg, setStatusMsg] = useState("");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    
    let user = {isAuthenticated: false, userName:"", userEmail:""};
    const receiveBackendRSP= async (rsp)=>{
       if(rsp.error){
        await props.updateuser(user);
        setStatusMsg(rsp.error);
       } else{
        user.isAuthenticated=true;
        user.userName=name;
        user.userEmail=email;
        await props.updateuser(user);
        setStatusMsg("user successfully created");
       }
    } 
    const handleSubmit = async ()=>{
        const isValidName = isNameValid(name);
        const isValidEmail = isEmailValid(email);
        const isValidPwd = isPwdValid(password);
        if(isValidName && isValidEmail && isValidPwd){
          await  callBackEnd(receiveBackendRSP,name, email, password);
          } 
          else{
              setStatusMsg(inputErr);
          }
    }
  
   return (
    <div className="card text-bg-secondary mb-3" style={{maxWidth:"18rem"}}>
      <div className="card-header"><h5>Create Account</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label  className="form-label">Name</label>
          <input type="text" className="form-control" id="nameId" value={name} onChange={e=>setName(e.target.value)} placeholder="Enter user name..."/>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="text" className="form-control" id="eamilId" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter email id..."/>
        </div>
        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordId" value={password} onChange={e=>setPwd(e.target.value)} placeholder="Enter password..."/>
        </div>
        <div><br/>
        <button type='submit' className='btn btn-info' onClick={()=>{handleSubmit();setEmail(""); setName("");setPwd("");inputErr="";}}>Submit</button>
        <h5>{statusMsg}</h5>
        </div>
      </div>
    </div>
   );
 }
 
 export default CreateAccount;