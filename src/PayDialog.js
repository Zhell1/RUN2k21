import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function ResponsiveDialog(props) {
    /**
     *              open              boolean
     * (optional)   handleClose       callback
     */
  const [open, setOpen] = React.useState(props.open) // false
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

 /* function handleClickOpen() {
    setOpen(true);
  }
  */

  function handleClose() {
    if(props.handleClose) props.handleClose() // callback
  }
  

  return (
    <div>
    {/*}
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
    */}
    <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="responsive-dialog-title"
        keepMounted={true} // keep mounted otherwise paypresto can't inject in it 
      >
        <DialogContent>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
