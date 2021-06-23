import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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

//select, pickers
function AddInfo(props) {
  const classes = useStyles();
  const { open, onClose , add, userinfo, loadschedule } = props;
  const [classname, setname] = useState('');
  const [alertopen, setAlert] = useState(false);
  const [classid, setid] = useState('');
  const [iderror, setIderror] = useState(false);
  const [namerror, setNamerror] = useState(false);
  const handleClose = () => {
    onClose();
  };


  const alertClose = () =>{
    setAlert(false);
  } 

  const typeName = (e) =>{
    //connect to backend to give hint
    setname(e.target.value);
  } 

  const typeID = (e) =>{
    setid(e.target.value);
  }

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Add Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Seats Availablle
          </DialogContentText>
          <TextField
            error = {iderror}
            autoFocus
            margin="dense"
            id="class-id"
            label="Seats Remaining"
            fullWidth
            onChange={typeID}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddInfo;