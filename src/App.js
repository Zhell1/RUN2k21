import React, {useState} from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Run from "run-sdk"; // "Error: assert failed" in build
import { OracleCard } from "./oracleCard.js"
import { MyPurse } from "./purse.js"

const Run = window.Run
var run

const myPurse = new MyPurse()

const Oracle_RandomValue_origin = "8bf48350464e32cd9eea006e6a7a9cea40358a457b2dd432da924d592b919ee7_o2"
const Oracle_BSVUSD_origin 			= "8eb566a8337b3fc3deb28f1a8829911fce8e2353c27407985b9630ab46f6c00c_o2"
const Oracle_Timestamp_origin	 	= "ec2425d007e792c9fc543cac51623f530338c347ca6f1dc53ab870a3996feac3_o2"
const Oracle_BSVEUR_origin           = "8e9965b9653807a4a3bf3cfa2f20e247fdb14ded4de41e5209fadbf9d659ecca_o2"


function App() {

  if(!run)
    run = new Run({
        network: 'main',
        purse: myPurse,
        trust:"*",
        app: "runcraft.io",  // previously: "RUN2K2021_Hackaton_RunCraft"
    })
  run.activate()
  window.run = run // make accessible in console
  async function loadjig(){
    var jig = await run.load(Oracle_RandomValue_origin)
    console.log("jig = ",jig)
    await jig.sync()
    console.log("jig = ",jig)
  }
  loadjig()


  return (
    <div className="App">
      <header className="App-header" style={{display: 'block'}}>
        <AppBar position="static" style={{marginBottom: "2em"}}>
          <Toolbar>
            <Typography variant="h5">
              Oracles_v2.1
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
          <OracleCard title="Random Value Oracle" description="This Oracle gives you a random value as a float between 0 and 1, same as Math.random() but for jigs." widgetname="oracle1" oracleOrigin={Oracle_RandomValue_origin}/>
          <OracleCard title="BSV/USD Price Oracle" description="This Oracle gives you the current BSV price in USD" price={0.01} widgetname="oracle2" oracleOrigin={Oracle_BSVUSD_origin}/>
          <OracleCard title="Timestamp Oracle" description="This Oracle gives you the current timestamp in ms, same as Date.now() but for jigs." price={0.01} widgetname="oracle3" oracleOrigin={Oracle_Timestamp_origin}/>    
          <OracleCard title="BSV/EUR Oracle" description="This Oracle gives you you the current BSV price in EUR" price={0.01} widgetname="oracle4" oracleOrigin={Oracle_BSVEUR_origin}/>   
        </Grid>
      </header>
    </div>
  );
}

export default App;
