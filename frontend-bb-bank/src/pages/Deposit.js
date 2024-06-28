import React, {useState} from "react";
let inputErr ="";
const isAmountValid = (amount)=>{
    if(amount<1){
        inputErr += "Deposit amount should be greater than $1";
        return false;
    } else{
        return true;
    }
  }
const callBackEndDepo = async (receiveDepoResponse,amnt,ueml)=>{
    try{
      /*
      const randstring = ["a0532zor4ks","a9n8efg038b","c0bk4zb58rg","dbc7cyi3c21","ez0y09bn7zq","f09fa056c5e","gk1bo3da4ya","k0br7o9shm2a", "a94z84b58sd"];
      const idx1 = Math.floor(Math.random()*10);
      const idx2 =  Math.floor(Math.random() * 100);
      const stateVal = randstring[idx1]+idx2;
      const newURL = `https://cloud.digitalocean.com/v1/oauth/authorize?response_type=code&client_id=4111f9f5d55d7daf02b2616de9a9474fddf84988ea65a6362704a19ab370e776&redirect_uri=https://sea-turtle-app-59o9h.ondigitalocean.app/account/deposit/${amnt}/${ueml}&scope=read write&state=${stateVal}`;
      */
      const url = 'http://localhost:4500';
      //const newurl = `https://cloud.digitalocean.com/v1/oauth/authorize?client_id=1c72634a0e694ebcb8409b0ee1d93722548ba1a18e54e69c7b09a6c79b633d62&redirect_uri=https://seashell-app-g45p7.ondigitalocean.app/account/deposit/${amnt}/${ueml}&response_type=code`;
      //const url = `https://seashell-app-g45p7.ondigitalocean.app/account/deposit/${amnt}/${ueml}`;
        (async () => { 
        await fetch(url).then(response=>{
                    return response.json();
                   }).then(result=>{
                    if(result){
                        console.log("printing user creation result", result);
                        if(result.error){
                          console.log(result);
                           return receiveDepoResponse(result);
                        } else{
                          return receiveDepoResponse(result);
                        }
                     } 
                     else{
                        return receiveDepoResponse({statusCode:500, statusMessage:"Failure", error:"unknown exception, please reach support team @2404768982"});
                     }
                   }).catch(err=>{
                    console.log(err);
                     return receiveDepoResponse({statusCode:500, statusMessage:"Failure", error:"exception during db call, please reach support team @2404768982"});
               })
        })();
    }
   catch(err){
       console.log(err);
      return receiveDepoResponse({statusCode:500, statusMessage:"Failure", error:"exception in try/catch block, please reach support team @2404768982"});
   }
  }
  
const Deposit = (props) => {
   const [amount, setAmount] = useState(0);
   const [status, setStatus] = useState("");
   const receiveDepoRSP= async (rsp)=>{
    if(rsp.error){
     setStatus(rsp.error);
    } else{
     setStatus(JSON.stringify(rsp));
    }
 } 

 const handleDeposit = async ()=>{
    const isValidAmt = isAmountValid(amount);
    if(isValidAmt){
      await callBackEndDepo(receiveDepoRSP,amount, props.accountHolder.userEmail);
      } 
      else{
       setStatus(inputErr);
      }
    }
    return (
         <div className="card text-bg-primary mb-3" style={{maxWidth: '18rem'}}>
            <div className="card-header bg-dark"><h5>Deposit</h5></div>
            <div className="card-body">
              Amount<br/>
              <input type="number" className="form-control" id="depositAmount" value={amount} onChange={e=>setAmount(e.target.value)}  placeholder="Enter amount..."/><br/>
              <button type="submit" id="submit" className="btn btn-secondary" onClick={()=>{handleDeposit();setAmount(""); inputErr="";}}>Submit Deposit</button><br/><br/>
              <p>{status}</p>
            </div>
        </div>
    );
  };
  
  export default Deposit;