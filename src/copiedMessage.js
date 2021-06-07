import React from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useSnackbar } from 'notistack';

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