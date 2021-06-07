import React, { useState } from 'react';
import { Button, Container } from '@material-ui/core';
import ResponsiveDialog from "./ResponsiveDialog";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { SnackbarProvider } from 'notistack';
import Run from "run-sdk";

import { get_bsvusd } from "./getBsvPrice.js"
import { waitAndCheckValue, TIMEOUT_MS } from "./checkOracleValue.js"
import { CopiedMessage } from "./copiedMessage.js"


import { run } from "./App.js"

const useCardStyles = makeStyles({
    root: {
      maxWidth: 300,
      textAlign: 'left',
      margin: "20px",
    }
});

const exampleOfUse =
`class MysteriousEgg extends Jig
{ 
  init(){ 
    this.randomValue = new RandomValue()
  }
  hatch(){
    let x = this.randomValue.value
    // rarity between 1-99 but we make it super rare to get one near 100
    this.rarity = parseInt(power(100,x*x*x), 10)
  }
}
MysteriousEgg.deps = { RandomValue, power }

// TimestampRequest idea => make an egg that can only be hatched on full moon
`

function createLink(requestId){
    return "https://run.network/explorer/?query="+requestId+"&network=main"
  }

async function load_contract(origin){
    // load oracleRequests contracts
    let contract = await run.load(origin)
    await contract.sync()
    await run.sync()
    console.log("load_contracts(): contract = ",contract,"for",origin)
    return contract
}

export function OracleCard(props) {
    /**
     *  title, description, widgetname, oracleOrigin
     */
    const classes = useCardStyles();
  
    const [called_loadPrice, set_called_loadPrice] = useState(false)
    const [oracleRequestLocation, set_oracleRequestLocation] = useState(null)
    //const [satoshisPerCall, set_satoshisPerCall] = useState("loading")
    const [priceUSD, set_priceUSD] = useState(null)
    const [oracleValue, set_oracleValue] = useState()
  
    async function loadPrice(){
  
      if(!props.oracleOrigin) return
  
      let my_oracleRequest = await load_contract(props.oracleOrigin) // load & sync
  
      console.log("my_oracleRequest = ",my_oracleRequest)
      console.log("my_oracleRequest.oracle = ",my_oracleRequest.oracle)
  
      
      set_oracleRequestLocation(my_oracleRequest.location)
  
      let my_oracle = my_oracleRequest.oracle
      console.log("my_oracle 1 = ",my_oracle)
      await my_oracle.sync()
      console.log("my_oracle 2 = ",my_oracle)
      set_priceUSD(my_oracle.priceUSD)
      //let satoshis = my_oracle.satoshisPerCall
      //set_satoshisPerCall(satoshis)
    }
  
    if(!called_loadPrice){
      set_called_loadPrice(true)
      loadPrice()
      // TODO there is probably a cleaner way to do this
    }
  
  
    const [isOpenPopup, set_isOpenPopup] = useState(false)
    const handleClosedPopup = () => {
      set_isOpenPopup(false)
    }
    const handleOpenPopup = () => {
      set_isOpenPopup(true)
    }
  
    // Paypresto popup
    const [isOpenPayPresto, set_isOpenPayPresto] = useState(false)
    const handleClosedPayPresto = () => {
      set_isOpenPayPresto(false)
    }
    const handleOpenPayPresto = async () => {
      
      set_isOpenPayPresto(true)
  
      run.purse.set_prestoWidget(props.widgetname, successCallback)
  
      set_step("clicked")
    }
  
    function callback_timeout(){
      set_step("timedout")
    }
  
    async function callback_successOracle(value, txid)
    {
      var myRequest = await run.load(txid+'_o1') // TODO make that better
      await myRequest.sync()
      set_oracleValue(myRequest.value)
      var value2 = myRequest.value
      set_step("response")
      console.log("callback_successOracle(): value=",value," & value2=",value2)
    }
  
    function successCallback(txid){ // success payment
      console.log("successCallback!! txid=",txid)
      set_step("paid")
      set_isOpenPayPresto(false)
      
      waitAndCheckValue(txid, callback_timeout, callback_successOracle)
    }
  
    const [step, set_step] = useState("init") // init, clicked, ready, paid, response, timedout
  
  
    async function loadPayPresto(){
  
      // RUN tx oracle request
  
      if(!oracleRequestLocation) return
      var oracleRequest = await load_contract(oracleRequestLocation)
  
      // resync for safety
      await oracleRequest.sync()
      await run.sync()
      //
      let my_oracle = oracleRequest.oracle
      console.log("my_oracle 1 = ",my_oracle)
      await my_oracle.sync()
      //
      let topay_usd = my_oracle.priceUSD
      let bsvusd = await get_bsvusd()
      let topay_satoshis = parseInt(topay_usd / bsvusd * 1e8,10)
      //
      const tx = new Run.Transaction()
      var myRequest
      tx.update(()=>{
        myRequest = new oracleRequest(topay_satoshis)
      })
      const rawtx = await tx.export({pay: true})
  
      console.log("handleOpenPayPresto(): myRequest = ",myRequest)
      //pay(props.widgetname, successCallback) // old
    }
  
    if(step=="clicked")
    {
      set_step("ready")
      loadPayPresto()
    }
  
    //var price = (satoshisPerCall=="loading"?"loading":"$"+satsToUsd(satoshisPerCall))
    var price = priceUSD?"$"+priceUSD:"loading"
  
    return(
      <Card className={classes.root} >
  
          <ResponsiveDialog open={isOpenPopup} handleClose={handleClosedPopup}>
              <Typography variant="h5">
                {props.title}
              </Typography> 
             <br/>
             {props.description} 
             <br/>
             <br/>
             Price {price}/call <br/><br/>
  
            {step=="init"?
                <Button variant="contained" color="primary"
                  onClick={handleOpenPayPresto}>
                  TEST ORACLE
                </Button>
            :step=="paid"?
              <div>
                <Alert severity="info">Sent, waiting for Oracle now... </Alert>
                <LinearProgress />
              </div>
            :step=="response"?
              <div>
                <Alert severity="success">Oracle responded with value: {oracleValue}</Alert>
              </div>
            :step=="timedout"?
              <div>
                <Alert severity="warning">Request timed out after {parseInt(TIMEOUT_MS/1000, 10)} seconds, try again or contact admin.</Alert>
              </div>
            :
              <Button variant="contained" color="primary"
                onClick={handleOpenPayPresto}>
                TEST ORACLE
              </Button> 
            }
  
            <br/><br/>
            Origin: 
            <br/>
            <a href={createLink(props.oracleOrigin)} target="_blank" rel="noopener noreferrer">
              {props.oracleOrigin}
            </a>
            <input type="text" value={props.oracleOrigin} id ="textToCopy" style={{opacity:"0"}}></input>
            <br/>
            <SnackbarProvider maxSnack={3}>
              <CopiedMessage/>
            </SnackbarProvider>
            <br/><br/>
            
            Example of use:
            <br/>
            <SyntaxHighlighter language="javascript" style={a11yDark} wrapLongLines="true">
              {exampleOfUse}
            </SyntaxHighlighter>
            <Container style={{padding: "0px 178px"}}>
              <a href="https://github.com/Zhell1/RUN2k21" style={{textDecoration: "none"}} target="_blank" rel="noopener noreferrer"><Button variant="contained">See more on GitHub</Button></a>
            </Container>
            <ResponsiveDialog open={isOpenPayPresto} handleClose={handleClosedPayPresto}>
              <div id={props.widgetname} class={props.widgetname}></div>
            </ResponsiveDialog>
  
          </ResponsiveDialog>
  
  
        <CardActionArea onClick={handleOpenPopup}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
            <br/>
            <Typography variant="body2" color="textSecondary" component="p">
              <span style={{background: "#3f51b5", borderRadius: "4px", color: "white", padding: "3px"}}>
                {price}
              </span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }