//import {Presto, embed} from 'paypresto.js';

//import { run } from "./App.js"

const bsv = window.bsv
const bsvjs  = window.bsvjs
const Run = window.Run
const Presto = window.Paypresto.Presto
const embed  = window.Paypresto.embed

export class MyPurse
{
    set_prestoWidget(widgetname, successCallback, run)
    {
      this.widgetname=widgetname
      this.successCallback=successCallback
      this.run=run
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
        const run = this.run
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