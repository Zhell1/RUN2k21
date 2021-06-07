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

const RandomValueRequest_origin = "c968fc2674921d07c39051fa735e6a5ebbb69cc0b8b90232e76ae87e3d72101a_o2"
const BSVUSDRequest_origin 			= "c1f16893516de7824af5984aa343ce4df42d38b238b8b1dced2b1d3abb44361c_o2"
const TimestampRequest_origin	 	= "fcbf7ad48704593f46c1d357d0d6913f442fc244c58c2ef0fef78cb15a5dac7e_o2"


function App() {

  if(!run)
    run = new Run({
        network: 'main',
        purse: myPurse,
        trust:"*",
        app: "RUN2K2021_Hackaton_RunCraft",
    })
  run.activate()
  window.run = run // make accessible in console
  async function loadjig(){
    var jig = await run.load(RandomValueRequest_origin)
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
              Oracles
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
          <OracleCard title="Random Value Oracle" description="This Oracle gives you a random value as a float between 0 and 1, same as Math.random() but for jigs." widgetname="oracle1" oracleOrigin={RandomValueRequest_origin}/>
          <OracleCard title="BSV/USD Price Oracle" description="This Oracle gives you the current BSV price in USD" price={0.01} widgetname="oracle2" oracleOrigin={BSVUSDRequest_origin}/>
          <OracleCard title="Timestamp Oracle" description="This Oracle gives you the current timestamp in ms, same as Date.now() but for jigs." price={0.01} widgetname="oracle3" oracleOrigin={TimestampRequest_origin}/>     
        </Grid>
      </header>
    </div>
  );
}

export default App;
