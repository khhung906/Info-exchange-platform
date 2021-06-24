import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import instance from '../../axios';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

function LeaveComment(props) {
  const classes = useStyles();
  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };


  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="sm" fullWidth>
        <DialogTitle id="simple-dialog-title">Leave Comments</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Give Comments here"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LeaveComment;