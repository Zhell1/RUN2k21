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

function copyText() {
    /* Get the text field */
    var copyText = document.getElementById("textToCopy");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
}

export function CopiedMessage() {
    const { enqueueSnackbar } = useSnackbar();
  
    const handleClickVariant = (variant) => () => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar('Copied message!', { variant });
    };
  
    function clickCopy(){
      copyText()
      handleClickVariant('success')
    }
  
    return (
      <React.Fragment>
        <span onClick={copyText}>
          <Button variant="outlined" size="small" onClick={handleClickVariant('success')}>
            <FileCopyIcon size="small" color="primary"/>
            &nbsp; Copy origin
          </Button>
        </span>
      </React.Fragment>
    );
  }