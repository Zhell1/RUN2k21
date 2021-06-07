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

const bsv = window.bsv1

export class pursePayPresto
{
    set_prestoWidget(widgetname, successCallback)
    {
      this.widgetname=widgetname
      this.successCallback=successCallback
    }
    async pay(rawtx, parents) {
        // process the raw transaction, outputs and UTXOs
        const tx = new bsv.Transaction(rawtx)
        let utxos = []
        for(let i=0; i<tx.inputs.length; i++){
          utxos.push({
            txid: tx.inputs[i].prevTxId.toString('hex'),
            vout: tx.inputs[i].outputIndex,
            satoshis: parents[i].satoshis,
            script: parents[i].script,
          })
        }
        let opreturn = bsv.Script(tx.outputs[0].script).toASM().split(' ')
        let pushdata = []
        for(let i=2; i<opreturn.length; i++){
          pushdata.push(decodeURIComponent(opreturn[i].replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&')))
        }
        let outputs = [{data: pushdata}]
        for (let i=1; i<tx.outputs.length; i++){
          outputs.push({
            satoshis: tx.outputs[i].satoshis,
            to: bsv.Address.fromPublicKeyHash(new bsv.Script.fromBuffer(tx.outputs[i]._scriptBuffer).getPublicKeyHash()).toString()
          })
        }
    var payment = Presto.create({
      key: 'Kx2p4o7FYJYjEwufdYJLXjPtu2vaSpQ8mB7mjMJnaHnPSrGQ1nQk', //  ephemeral private key for 1st tx
      description: 'RUN2K21_Hackaton_RunCraft',
      outputs: outputs,
    })
    payment.mount( embed('#'+this.widgetname, { style: ['rounded', 'border-thick'] }) )
    .on('funded', async(payment) => {
        const paid = payment.forge.inputs.pop()
        utxos.forEach(utxo => payment.forge.addInput(utxo))
        payment.forge.inputs.push(paid)
        payment.forge.build()
        for(let i=0; i<payment.forge.inputs.length-1; i++){
          payment.signTxIn(i, {keyPair: new bsv.KeyPair().fromPrivKey(new bsv.PrivKey().fromString(run.owner.privkey))})
        }
        payment.signTxIn(payment.forge.inputs.length-1, {keyPair: payment.keyPair})
        const signedrawtx = payment.getRawTx()
        let tx = await run.blockchain.broadcast(signedrawtx)
        console.log('TX sent', tx)
        this.successCallback(tx)
    })
    .on('error', err => {
      console.log('Error: ', err)
    })
  }
}