import fetch from "node-fetch"

export async function get_bsvusd(){
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
