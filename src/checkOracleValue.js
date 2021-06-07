import React, { useState } from 'react';
import './App.css';
import { Button, Container } from '@material-ui/core';
import {Presto, embed} from 'paypresto.js'; 
import ResponsiveDialog from "./ResponsiveDialog";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Run from "run-sdk";


import {run} from "./App.js"

export const TIMEOUT_MS = 10*1000 // for value set() by oracle

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