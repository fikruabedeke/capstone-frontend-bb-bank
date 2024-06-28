import { useState } from "react";
let inputErr ="";
const isAmountValid = (amount)=>{
    if(amount<1){
        inputErr += "Withdrawal amount should be greater than $1";
        return false;
    } else{
        return true;
    }
  }
const callWithdrawalService = async (receiveWithdrawalRespone,amnt,ueml)=>{
    try{
        console.log("calling backend...");
        /*const randstring = ["a0532zor4ks","a9n8efg038b","c0bk4zb58rg","dbc7cyi3c21","ez0y09bn7zq","f09fa056c5e","gk1bo3da4ya","k0br7o9shm2a", "a94z84b58sd"];
        const idx1 = Math.floor(Math.random()*10);
        const idx2 =  Math.floor(Math.random() * 100);
        const stateVal = randstring[idx1]+idx2;
        const newURL = `https://cloud.digitalocean.com/v1/oauth/authorize?response_type=code&client_id=4111f9f5d55d7daf02b2616de9a9474fddf84988ea65a6362704a19ab370e776&redirect_uri=https://sea-turtle-app-59o9h.ondigitalocean.app/account/withdraw/${amnt}/${ueml}&scope=read write&state=${stateVal}`;
        */
        const url = 'http://localhost:4500';
        //const newURL = `https://cloud.digitalocean.com/v1/oauth/authorize?client_id=1c72634a0e694ebcb8409b0ee1d93722548ba1a18e54e69c7b09a6c79b633d62&redirect_uri=https://seashell-app-g45p7.ondigitalocean.app/account/withdraw/${amnt}/${ueml}&response_type=code`;
        //const url = `https://seashell-app-g45p7.ondigitalocean.app/account/withdraw/${amnt}/${ueml}`;
        (async () => { 
        await fetch(url).then(response=>{
                    return response.json();
                   }).then(result=>{
                    if(result){
                        console.log("printing user creation result", result);
                        if(result.error){
                           return receiveWithdrawalRespone(result);
                        } else{
                          return receiveWithdrawalRespone(result);
                        }
                     } 
                     else{
                        return receiveWithdrawalRespone({statusCode:500, statusMessage:"Failure", error:"unknown exception, please reach support team @2404768982"});
                     }
                   }).catch(err=>{
                    console.log(err);
                     return receiveWithdrawalRespone({statusCode:500, statusMessage:"Failure", error:"unexpected exception encountered:when processing backend response, please reach help desk for support"});
               })
        })();
    }
   catch(err){
       console.log(err);
      return receiveWithdrawalRespone({statusCode:500, statusMessage:"Failure", error:"unexpected exception encountered: try/catch block, please reach help desk for support"});
   }
  }

const Withdraw = (props) => {
        const [withdAmount, setWithAmount] = useState(0);
        const [withdrwalStatus, setWithdrwalStatus] = useState("");

        const receiveWithdrwaldRSP= async (wRsp)=>{
          if(wRsp.error){
            setWithdrwalStatus(wRsp.error);
          } else{
            setWithdrwalStatus(JSON.stringify(wRsp));
         }
     } 
    const handleWithdrawal = async ()=>{
        const isValidAmt = isAmountValid(withdAmount);
        if(isValidAmt){
            await callWithdrawalService(receiveWithdrwaldRSP,withdAmount, props.withdAccountHolder.userEmail);
            console.log(props.withdAccountHolder.userEmail);
          } 
          else{
            setWithdrwalStatus(inputErr);
          }
        }
    return (
        <div className="card text-bg-success mb-3" style={{maxWidth: '18rem'}}>
        <div className="card-header bg-primary"><h5>Withdrawal Service</h5></div>
        <div className="card-body">
          Amount<br/>
          <input type="number" className="form-control" id="withdrwalAmount" value={withdAmount} onChange={e=>setWithAmount(e.target.value)}  placeholder="Enter amount..."/><br/>
          <button type="submit" id="submit" className="btn btn-dark" onClick={()=>{handleWithdrawal();setWithAmount(""); inputErr="";}}>Submit</button><br/><br/>
          <p>{withdrwalStatus}</p>
        </div>
    </div>
    );
  };
  
  export default Withdraw;