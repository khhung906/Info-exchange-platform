import React, {useState} from 'react'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DateFnsUtils from '@date-io/date-fns'; 
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

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
function AddtoCalendar(props) {
  const classes = useStyles();
  const { open, onClose } = props;
  const handleClose = () => {
    onClose();
  };

  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Add Course</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter Your Course Information
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="class-id"
          label="Class ID"
          fullWidth
        />
        <TextField
          margin="dense"
          id="course-name"
          label="Course Name"
          fullWidth
        />
        <TextField
          margin="dense"
          id="professor-name"
          label="Professor Name"
          fullWidth
        />
        {/* {<MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            clearable
            value={selectedDate}
            placeholder="10/10/2018"
            onChange={date => handleDateChange(date)}
            minDate={new Date()}
            format="MM/dd/yyyy"
            style={{marginTop: '15px'}}
            label="Exam Date"
          />
        </MuiPickersUtilsProvider>} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddtoCalendar;