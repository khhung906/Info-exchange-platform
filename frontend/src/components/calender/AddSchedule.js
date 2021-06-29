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
function AddSchedule(props) {
  const classes = useStyles();
  const { open, onClose ,courseList, events, setEvents} = props;
  const [title, setTitle] = useState('');
  const [start, setStart] = useState("2021-06-29T10:30");
  const [end, setEnd] = useState("2021-06-29T10:30");
  const [category, setCategory] = useState(courseList[0]);
  const [error, setError] = useState(false);
  const [description, setDis] = useState('');
  const handleClose = () => {
    setError(false)
    setEnd("2021-06-29T10:30");
    setStart("2021-06-29T10:30")
    onClose();
  };

  const handleAdd = async() => {
    //add new schedule to calender
    //..
    if(title && category && end >= start){
      let tmp_event = [...events]
      const new_event = {
        id: title+category,
        title: title,
        divider: category,
        start: new Date(start).toString(),
        end: new Date(end).toString(),
        description: description
      }
      tmp_event.push(new_event)
      const {
        data : {message} //classinfo
      } = await instance.post('api/addschedule', {
        new_event
      });
      if (message === "Add successfully"){
        setEvents(tmp_event)
        handleClose();
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
    if(!category){
      setCategory(courseList[0]);
    }
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

  const ChangeDis = (event) =>{
    setDis(event.target.value);
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
        autoFocus
        margin="dense"
        id="add-description"
        fullWidth
        onChange={ChangeDis}
        label="Add description"
       />
        <TextField
            id="datetime-local"
            label="From"
            type="datetime-local"
            defaultValue="2021-06-29T10:30"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={ChangeStart}
            style={{marginTop:'8px'}}
        />
        <TextField
            id="datetime-local"
            label="To"
            type="datetime-local"
            defaultValue="2021-06-29T10:30"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={ChangeEnd}
            style={{marginTop:'8px'}}
        />
        <TextField
          error = {error}
          id="standard-select-currency"
          select
          label="Category"
          SelectProps={{
            native: true,
          }}
          value={category}
          onChange={ChangeCategory}
          helperText="Please select a category"
          style={{marginTop:'8px'}}
        >
        
          {courseList.map((course) => (
            <option key={course} value={course} style ={{height:"50px", overflowX : "hidden", overflowY : "auto"}}>
              {course}
            </option>
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