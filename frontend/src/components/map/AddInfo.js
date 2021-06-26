import React, {useState, useEffect} from 'react'
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

function AddInfo(props) {
  const classes = useStyles();
  const { open, onClose , setInfo, info} = props;
  const [seats, setSeats] = useState(0);
  const handleClose = () => {
    onClose();
  };

  const updateSeats = async() => {
    // console.log(e.target)
    // const seats = e.target.value;
    console.log(seats)
    const Name = info.Name;
    const {
      data : {message, newinfo}
    } = await instance.post('api/updateInfo', {
      Name, seats
    }) ;
    let updateInfo = info;
    updateInfo.Seats = seats;
    console.log(updateInfo)
    setInfo(updateInfo);
    handleClose();
  }

  const changeValue = (e) => {
    setSeats(parseInt(e.target.value), 10);
  }

  useEffect(() => {
    setSeats(info.Seats);
    console.log(seats)
  }, [])

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className="enter-mapinfo-dialog" >
        <DialogTitle id="simple-dialog-title">Add Info</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Seats Remaining"
            fullWidth
            onChange={changeValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button color='primary' onClick={updateSeats}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddInfo;