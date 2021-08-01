import fetch from "node-fetch"

async function get_bsvusd(){
    let bsvusd = 170 // default value
    //take the value of BSV from preev API
    await fetch("https://api.preev.pro/v1/tickers/12eLTxv1vyUeJtp5zqWbqpdWvfLdZ7dGf8",{ 
      method: 'GET'
    })
    .then((response) => { return response.json(); })
    .then((json)  => {
      bsvusd = json.p.ppi.l
    })
    return bsvusd
}

export function get_latest_BSVUSD_price()
{
    // strategy: if one fails we move to the next one
    // preev is the best because they already provide a volume-weighted average
    return new Promise((resolve, reject) =>
    {
        console.log("fetching BSVUSD from Preev...")
        get_BSVUSD_Preev().then(resolve).catch(e =>
        {
            console.log("Error while fetching BSV price from Preev", e)
            console.log("fetching BSVUSD from Cryptonator...")
            get_BSVUSD_Cryptonator().then(resolve).catch(e =>
            {
                console.log("Error while fetching BSV price from Cryptonator", e)
                console.log("fetching BSVUSD from CoinGecko...")
                get_BSVUSD_CoinGecko().then(resolve).catch(reject)
            })
        })
    })
}

function get_BSVUSD_Preev() {
    
    const url = "https://api.preev.pro/v1/tickers/12eLTxv1vyUeJtp5zqWbqpdWvfLdZ7dGf8"

    return new Promise((resolve, reject) => {
        fetch(url).then(function(res) {
            if (res.status !== 200) {
                reject("Error while fetching Preev:", res.status)
                return;
            }
            return res.json()
        }).then(data => {
            if(data && data.p && data.p.ppi && data.p.ppi.l){
                resolve(data.p.ppi.l)
            }
            reject("Error while parsing response from Preev price API, data=",data)
        }).catch(reject)
    })
}


function get_BSVUSD_Cryptonator()
{
    const url = "https://api.cryptonator.com/api/ticker/bsv-usd"
    
    return new Promise((resolve, reject) => {
        fetch(url).then(function(res) {
            if (res.status !== 200) {
                reject("Error while fetching Cryptonator:", res.status)
                return;
            }
            return res.json()
        }).then(data => {
            if (data["ticker"] && data["ticker"]["price"]) {
                const price = Number(data["ticker"]["price"])
                if (price > 0) {
                    resolve(price)
                    return;
                }
            }
            reject("Error while parsing response from Crytponator price API, data=",data)
        }).catch(reject)
    })
}

function get_BSVUSD_CoinGecko()
{
    const bsv_id = "bitcoin-cash-sv"
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=" + bsv_id + "&vs_currencies=USD"

    return new Promise((resolve, reject) => {
        fetch(url).then(function(res) {
            if (res.status !== 200) {
                reject("Error while fetching CoinGecko: ", res.status);
                return;
            }
            return res.json()
        }).then(data => {
            if (data[bsv_id] && data[bsv_id]["usd"]) {
                const price = Number(data[bsv_id]["usd"]);
                if (price > 0) {
                    resolve(price)
                    return;
                }
            }
            reject("Error while parsing response from coingecko price API, data=",data);
        }).catch(reject)
    })
}


/*function keepLastTwoNonZeroValues(floatPrice){
  let strDecimals = String(floatPrice).split('.')[1]
  if (!strDecimals) {
  	return parseFloat(floatPrice)
  }
  let nbdec = 0
  let nbNonZerofound = 0
  for(let i=0; i<strDecimals.length && nbNonZerofound<2; i++){
    if(strDecimals[i] != "0"){
      nbNonZerofound++
    }
    nbdec++
  }
  return parseFloat(floatPrice).toFixed(nbdec)
}*/

/*function satsToUsd(satoshis){
  return keepLastTwoNonZeroValues(satoshis*bsvusd*1e-8)
}*/
