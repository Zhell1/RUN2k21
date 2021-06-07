const Run = require("run-sdk") 
const fetch = require("node-fetch")

const purseprivkey = "<my-purse-private-key>"
const run = new Run({trust:"*", purse: purseprivkey})
console.log("purse at ",run.purse.address)

/*
 this file demonstrates loading and calling a RandomValue Request from the oracle and displaying it
*/

async function get_bsvusd(){
    let bsvusd = 170 // default 
    await fetch("https://api.preev.pro/v1/tickers/12eLTxv1vyUeJtp5zqWbqpdWvfLdZ7dGf8",{  method: 'GET' })
    .then((response) => { return response.json(); })
    .then((json)  => { bsvusd = json.p.ppi.l })
    return bsvusd
}

async function loadOracle(origin)
{
    console.log("syncing oracle contract...")
    let myOracle= await run.load(origin)
    await myOracle.sync()
    await myOracle.oracle.sync()
    console.log("price per call: $",myOracle.oracle.priceUSD)
    return myOracle
}

async function main()
{
    let RandomValueRequest= await loadOracle("c968fc2674921d07c39051fa735e6a5ebbb69cc0b8b90232e76ae87e3d72101a_o2")

    try {
        console.log("asking oracle onchain...")
        var satoshisToPay = parseInt(RandomValueRequest.oracle.priceUSD / await get_bsvusd() * 1e8, 10)
        console.log("satoshisToPay=",satoshisToPay)
        var myRequest = new RandomValueRequest(satoshisToPay)
        await run.sync()
        console.log("waiting...")
        // wait a little for oracle to answer, you should rather use your own retry pattern here to get the response faster
        setTimeout( async ()=>{
            await myRequest.sync()
            console.log("myRequest.value = ",myRequest.value ||"timeout, wait longer or contact admin?")
        }, 8000)
    }
    catch(e){ console.error(e) }
}
main()
