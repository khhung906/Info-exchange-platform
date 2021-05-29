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
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';

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
const dividers = [
    {
      value: 'DSA(CS1108)',
      label: 'DSA(CS1108)',
    },
    {
      value: 'SP(CS1022)',
      label: 'SP(CS1022)',
    },
  ];

//select, pickers
function AddSchedule(props) {
  const classes = useStyles();
  const { open, onClose } = props;
  const [title, setTitle] = useState('');
  const [start, setStart] = useState("2021-05-29T10:30");
  const [end, setEnd] = useState("2021-05-29T10:30");
  const handleClose = () => {
    onClose();
  };

  const handleAdd = () => {
    //add new schedule to calender
    //...
    onClose();
  };

  const typeTitle = (e) =>{
    setTitle(e.target.value);
  }

  const [category, setCategory] = React.useState('');

  const ChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const ChangeStart = (event) =>{
    setStart(event.target.value);
  }

  const ChangeEnd = (event) =>{
    setEnd(event.target.value);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Add Course</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add schedule to your calendar
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="add-title"
          label="Add title"
          fullWidth
          onChange={typeTitle}
        />
        <TextField
            id="datetime-local"
            label="From"
            type="datetime-local"
            defaultValue="2021-05-29T10:30"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={ChangeStart}
        />
        <TextField
            id="datetime-local"
            label="To"
            type="datetime-local"
            defaultValue="2021-05-29T10:30"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={ChangeEnd}
        />
        <TextField
          id="standard-select-currency"
          select
          label="Category"
          value={category}
          onChange={ChangeCategory}
          helperText="Please select category"
        >
          {dividers.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSchedule;