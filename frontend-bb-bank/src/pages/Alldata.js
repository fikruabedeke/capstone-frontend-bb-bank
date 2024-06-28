import React, {useState} from "react";
  
const callBackendForAllData = async (receiveAllDataResponse,ueml)=>{
    try{
        console.log("calling backend...");
        /*
        const randstring = ["a0532zor4ks","a9n8efg038b","c0bk4zb58rg","dbc7cyi3c21","ez0y09bn7zq","f09fa056c5e","gk1bo3da4ya","k0br7o9shm2a", "a94z84b58sd"];
        const idx1 = Math.floor(Math.random()*10);
        const idx2 =  Math.floor(Math.random() * 100);
        const stateVal = randstring[idx1]+idx2;
        const newURL = `https://cloud.digitalocean.com/v1/oauth/authorize?response_type=code&client_id=4111f9f5d55d7daf02b2616de9a9474fddf84988ea65a6362704a19ab370e776&redirect_uri=https://sea-turtle-app-59o9h.ondigitalocean.app/account/alldata/${ueml}&scope=read write&state=${stateVal}`;
        */
        const url = 'http://localhost:4500';
        //const newurl = `https://cloud.digitalocean.com/v1/oauth/authorize?client_id=1c72634a0e694ebcb8409b0ee1d93722548ba1a18e54e69c7b09a6c79b633d62&redirect_uri=https://seashell-app-g45p7.ondigitalocean.app/account/alldata/${ueml}&response_type=code`;
        //const url = `https://seashell-app-g45p7.ondigitalocean.app/account/alldata/${ueml}`;
        (async () => { 
        await fetch(url).then(response=>{
                    return response.json();
                   }).then(result=>{
                    if(result){
                        if(result.error){
                           return receiveAllDataResponse(result);
                        } else{
                          return receiveAllDataResponse(result);
                        }
                     } 
                     else{
                        return receiveAllDataResponse({statusCode:500, statusMessage:"Failure", error:"unknown exception, please reach support team @2404768982"});
                     }
                   }).catch(err=>{
                    console.log(err);
                     return receiveAllDataResponse({statusCode:500, statusMessage:"Failure", error:"exception during backend call, please reach support team @2404768982"});
               })
        })();
    }
   catch(err){
       console.log(err);
      return receiveAllDataResponse({statusCode:500, statusMessage:"Failure", error:"cautht exception while calling backend to fetch all data"});
   }
  }

const AllData = (props) => {
       const [allDatastatus, setAllDataStatus] = useState(null);
       
       const receiveAllDataRSP= async (rsp)=>{
        if(rsp.error){
         setAllDataStatus(rsp.error);
        } else{
         setAllDataStatus(JSON.stringify(rsp));
        }
     } 

       const handleAllDataReq = async ()=>{
           callBackendForAllData(receiveAllDataRSP, props.getAllData.userEmail);
           console.log(props.getAllData.userEmail);
         }
         const clearWindow = async ()=>{
            setAllDataStatus("");
          }

    return (
        <div className="card  mb-3 border border-dark bg-warning" style={{maxWidth: '18rem'}}>
        <div className="card-header bg-dark text-white"><h6>Get all data</h6></div>
        <div className="card-body bg-dark-subtle">
             <br/>
            <button type="submit" id="submit" className="btn btn-info" onClick={()=>{handleAllDataReq();}}>Fetch All Data</button>&nbsp;&nbsp;&nbsp;
            <button type="submit" id="submit" className="btn btn-secondary" onClick={()=>{clearWindow();}}>Clear</button><br/><br/>
            {allDatastatus&&<p>{allDatastatus}</p>}
        </div>
        </div>
        );
      };
    
  export default AllData;