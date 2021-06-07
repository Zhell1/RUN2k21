import { run } from "./App.js"

export const TIMEOUT_MS = 20*1000 // for value set() by oracle

export async function waitAndCheckValue(txid, callback_timeout, callback_successOracle, retry_every=200, timeout_ms=TIMEOUT_MS, init_timestamp=null){

    if(!init_timestamp){
      init_timestamp = Date.now()
      console.log("set timestamp at ",init_timestamp)
    }
  
      setTimeout(async ()=>{
        // run.sync and check .value != undefined
      var myRequest = await run.load(txid+'_o1') // TODO make that better
      await myRequest.sync()
      var value = myRequest.value
      
      if(value){
        console.log("success with value: myRequest=",myRequest," \n\n value = ",value)
        
        callback_successOracle(value, txid)
  
      } else {
          if(Date.now()-init_timestamp > timeout_ms) {
          console.log("timedout at ",Date.now())
          callback_timeout()
        } else {
                  waitAndCheckValue(txid, callback_timeout, callback_successOracle, retry_every, timeout_ms, init_timestamp)
        }
      }
      }, retry_every)
  }