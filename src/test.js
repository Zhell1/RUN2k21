//const Run = require("run-sdk") 
const Run = window.Run

const purseprivkey = "<my-purse-private-key>"
const run = new Run({trust:"*", purse: purseprivkey})

/*
 this file demonstrates loading and calling a RandomValue Request from the oracle and displaying it
 
 note after Hackaton deadline: this doesn't work anymore after the oracle was moved to being usd-priced
 the only 2 updates required to fix it are: 
   myOracle.oracle.satoshisPerCall => myOracle.oracle.priceUSD
 and
   var myRequest = new RandomValueRequest() => var myRequest = new RandomValueRequest(satoshistopay)
*/

async function loadOracle(origin)
{
    console.log("syncing oracle contract...")
    let myOracle= await run.load(origin)
    await myOracle.sync()
    await myOracle.oracle.sync()
    console.log("price per call:",myOracle.oracle.satoshisPerCall,"satoshis")
    return myOracle
}

async function main()
{
    let RandomValueRequest= await loadOracle("c968fc2674921d07c39051fa735e6a5ebbb69cc0b8b90232e76ae87e3d72101a_o2")

    try {
        console.log("asking oracle onchain...")
        var myRequest = new RandomValueRequest()
        await run.sync()
        // wait a little for oracle to answer, you should rather use your own retry pattern here to get the response faster
        setTimeout( async ()=>{
            await myRequest.sync()
            console.log("myRequest.value = ",myRequest.value ||"timeout, wait longer or contact admin?")
        }, 8000)
    }
    catch(e){ console.error(e) }
}
main()
