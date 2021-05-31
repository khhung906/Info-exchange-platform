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
import MenuItem from '@material-ui/core/MenuItem';
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
function AddSchedule(props) {
  const classes = useStyles();
  const { open, onClose ,courseList, events, setEvents} = props;
  const [title, setTitle] = useState('');
  const [start, setStart] = useState("2021-05-29T10:30");
  const [end, setEnd] = useState("2021-05-29T10:30");
  const [category, setCategory] = useState('');
  const [error, setError] = useState(false);
  const handleClose = () => {
    onClose();
  };

  const handleAdd = async() => {
    //add new schedule to calender
    //...
    if(title && category){
      let tmp_event = [...events]
      const new_event = {
        id: tmp_event.length,
        title: title,
        divider: category,
        start: new Date(start),
        end: new Date(end),
      }
      tmp_event.push(new_event)
      const {
        data : {message, classinfo}
      } = await instance.post('api/addschedule', {
        new_event
      });
      if (message === "Add successfully"){
        setEvents(tmp_event)
        onClose();
      }
      else{
        setError(true);
      }
    }
    else{
      setError(true);
    }
  };

  const typeTitle = (e) =>{
    setTitle(e.target.value);
  }

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
          error = {error}
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
          error = {error}
          id="standard-select-currency"
          select
          label="Category"
          value={category}
          onChange={ChangeCategory}
          helperText="Please select a category"
        >
          {courseList.map((course) => (
            <MenuItem key={course} value={course} style ={{height:"50px"}}>
              {course}
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