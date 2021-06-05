import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Presto, embed} from 'paypresto.js'; 
import ResponsiveDialog from "./PayDialog"

import './App.css';
import logo from './logo.svg';

const useStyles = makeStyles((theme) => ({

}));


function pay(){
  console.log(Presto)
  const payment = Presto.create({
    key: 'Kx2p4o7FYJYjEwufdYJLXjPtu2vaSpQ8mB7mjMJnaHnPSrGQ1nQk',
    description: 'My test payment',
    outputs: [
      { to: '1CBTGrChDDGsewF1eAV6FQyxRaSXRvUT7o', satoshis: 5000 }, // TODO replace with oracle address
      { data: [Buffer.from("Hello world!")] }
    ]
  })
  console.log(payment)
  
  payment
    .mount(embed('#payprestowidget', { style: ['rounded', 'border-thick'] }))
    .on('funded', payment => payment.pushTx())
    .on('success', txid => console.log('TX sent', txid))
}

function App() {
  const classes = useStyles();

  const [isOpenDialog, set_isOpenDialog] = useState(false)

  const handleClosedDialog = () => {
    set_isOpenDialog(false)
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Oracles
        </h1>
        
        <Button variant="contained" color="primary">
            Add My Oracle
        </Button>
        
        <ResponsiveDialog open={isOpenDialog} handleClose={handleClosedDialog}>
          <div className="payprestoWidget" id="payprestoWidget"></div>
          <div id="payprestowidget"></div>
        </ResponsiveDialog>

        <Button variant="contained" color="primary"
                onClick={()=>{ set_isOpenDialog(true); pay() }}>
          PAY
        </Button>
      </header>
    </div>
  );
}

export default App;
