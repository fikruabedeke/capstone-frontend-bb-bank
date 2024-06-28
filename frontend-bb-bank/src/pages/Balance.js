import React, {useState} from "react";

/*let inputErr ="";
const isAmountValid = (amount)=>{
    if(amount<1){
        inputErr += "balance amount should be greater than $1";
        return false;
    } else{
        return true;
    }
  }*/
const callBackendForBalance = async (receiveBalanceResponse,ueml)=>{
    try{
      /*
        const randstring = ["a0532zor4ks","a9n8efg038b","c0bk4zb58rg","dbc7cyi3c21","ez0y09bn7zq","f09fa056c5e","gk1bo3da4ya","k0br7o9shm2a", "a94z84b58sd"];
        const idx1 = Math.floor(Math.random()*10);
        const idx2 =  Math.floor(Math.random() * 100);
        const stateVal = randstring[idx1]+idx2;
        const newURL = `https://cloud.digitalocean.com/v1/oauth/authorize?response_type=code&client_id=4111f9f5d55d7daf02b2616de9a9474fddf84988ea65a6362704a19ab370e776&redirect_uri=https://sea-turtle-app-59o9h.ondigitalocean.app/account/balance/${ueml}&scope=read write&state=${stateVal}`;
        */
        const url = 'http://localhost:4500';
        //const newurl = `https://cloud.digitalocean.com/v1/oauth/authorize?client_id=1c72634a0e694ebcb8409b0ee1d93722548ba1a18e54e69c7b09a6c79b633d62&redirect_uri=https://seashell-app-g45p7.ondigitalocean.app/account/balance/${ueml}&response_type=code`;
        //const url = `https://seashell-app-g45p7.ondigitalocean.app/account/balance/${ueml}`;
        (async () => { 
        await fetch(url).then(response=>{
                    return response.json();
                   }).then(result=>{
                    if(result){
                        console.log("printing user creation result", result);
                        if(result.error){
                           return receiveBalanceResponse(result);
                        } else{
                          return receiveBalanceResponse(result);
                        }
                     } 
                     else{
                        return receiveBalanceResponse({statusCode:500, statusMessage:"Failure", error:"unknown exception, please reach support team @2404768982"});
                     }
                   }).catch(err=>{
                    console.log(err);
                     return receiveBalanceResponse({statusCode:500, statusMessage:"Failure", error:"exception during backend call, please reach support team @2404768982"});
               })
        })();
    }
   catch(err){
       console.log(err);
      return receiveBalanceResponse({statusCode:500, statusMessage:"Failure", error:"exception while calling backend: try/catch block, please reach support team @2404768982"});
   }
  }

const Balance = (props) => {
       const [status, setStatus] = useState("");
       const receiveBalanceRSP= async (rsp)=>{
        if(rsp.error){
         setStatus(rsp.error);
        } else{
         setStatus(JSON.stringify(rsp));
        }
     } 

       const handleBalanceReq = async ()=>{
           callBackendForBalance(receiveBalanceRSP, props.balanceHolder.userEmail);
           console.log(props.balanceHolder.userEmail);
         }
         const clearWindow = async ()=>{
            setStatus("");
          }

    return (
        <div className="card  mb-3 border border-dark" style={{maxWidth: '18rem'}}>
        <div className="card-header border border-dark"><h5>Get Account Balance</h5></div>
        <div className="card-body">
             <br/>
            <button type="submit" id="submit" className="btn btn-info" onClick={()=>{handleBalanceReq();}}>Fetch</button>&nbsp;&nbsp;&nbsp;
            <button type="submit" id="submit" className="btn btn-secondary" onClick={()=>{clearWindow();}}>Clear</button><br/><br/>
            <p>{status}</p>
        </div>
        </div>
        );
      };
    
  export default Balance;