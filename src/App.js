import React, { useState } from 'react';
import './App.css';
import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Presto, embed} from 'paypresto.js'; 
import ResponsiveDialog from "./PayDialog";
import Grid from '@material-ui/core/Grid';
import logo from './logo.svg';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
}));

const useCardStyles = makeStyles({
  root: {
    maxWidth: 300,
    textAlign: 'left',
  },
});

function OracleCard(props) {
  const classes = useCardStyles();
  const [isOpenDialog, set_isOpenDialog] = useState(false)
  const handleClosedDialog = () => {
    set_isOpenDialog(false)
  }
  return(
    <Card className={classes.root}>
      <ResponsiveDialog open={isOpenDialog} handleClose={handleClosedDialog}>
          <div className="payprestoWidget" id="payprestoWidget"></div>
          <div id="payprestowidget"></div>
        </ResponsiveDialog>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price : {props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" color="primary"
          onClick={()=>{ set_isOpenDialog(true); pay() }}>
          Call
        </Button>
      </CardActions>
    </Card>
  )
}


function pay(){
  console.log(Presto)
  const payment = Presto.create({
    key: 'Kx2p4o7FYJYjEwufdYJLXjPtu2vaSpQ8mB7mjMJnaHnPSrGQ1nQk',
    description: 'My test payment',
    outputs: [
      { to: '1NSnepC6vitDCVozFJLw1BK2xTDY34KJbX', satoshis: 546 }, // TODO replace with oracle address
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
  return (
    <div className="App">
      <header className="App-header" style={{display: 'block'}}>
      <AppBar position="static" style={{marginBottom: "2em"}}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Oracles
          </Typography>
          <Button variant="contained" color="primary" style={{position: "absolute", right: "10px", top: "15px"}}>
            Add My Oracle
          </Button>
        </Toolbar>
      </AppBar>
        

     
        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
          <OracleCard title="Oracle1" description="This Oracle gives you the BSV price" price="0.1 Cents"/>
          <OracleCard title="Oracle2" description="This Oracle gives you too the BSV price!" price="0.1 Cents"/>
          <OracleCard title="Oracle3" description="Guess what? This Oracle gives you too the BSV price!" price="0.1 Cents"/>
        </Grid>
      </header>
    </div>
  );
}

export default App;
