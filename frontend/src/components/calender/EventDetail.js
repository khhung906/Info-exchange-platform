import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import SubjectIcon from '@material-ui/icons/Subject';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import AccessAlarmTwoToneIcon from '@material-ui/icons/AccessAlarmTwoTone';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import moment from 'moment'
import instance from '../../axios';

//select, pickers
function EventDetail(props) {
  const {open, onClose, detail, events, setEvents, setShow, onmoreEvents, setMore} = props;// showEvents
  const [onEdit, setEdit] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDis] = useState("");
  const [error, setError] = useState(false);
  //console.log(moment(detail.start).format("yyyy-MM-DDThh:mm:ss"))
  //console.log(new Date(detail.start).toISOString())

  useEffect(() => {
    setStart(moment(detail.start).format("yyyy-MM-DDThh:mm:ss"))
    setEnd(moment(detail.end).format("yyyy-MM-DDThh:mm:ss"))
    setTitle(detail.title)
    setCategory(detail.divider)
    setDis(detail.description)
    // console.log(detail)
},[detail])

  const handleEdit = () => {
    setEdit(true)
  }

  const handleClose = () => {
    setEdit(false);
    setError(false)
    onClose();
  };

  const handleSave  = async() =>{
    console.log(start)
    console.log(end)
    if(title !== ''&& end >= start){
      let current_events = [...events]
      let idx, course_name;
      if (detail.divider.indexOf('(') !== -1 && detail.divider.indexOf('-') === -1){
        idx = detail.divider.indexOf('(');
        course_name = detail.divider.slice(0, idx);
      }
      else {
        course_name = detail.divider;
      }
      const activity = {
        start : detail.start, 
        end : detail.end, 
        title : detail.title, 
        category : detail.category, 
        description : detail.description
      };
      const newActivity = {
        id : title+category,
        start : new Date(start).toString(),
        end : new Date(end).toString(), 
        divider: category,
        title : title,
        description : description
      };
        
      const {
        data : {message} //, info
      } = await instance.post('api/changecourse', {
        course_name, activity, newActivity
      });
      // const final_info = info.map(e => JSON.parse(e));
      // console.log(final_info)
      console.log(message)
      let idx_ =current_events.findIndex(e => 
        e.start === activity.start && 
        e.end === activity.end && 
        e.title === activity.title && 
        e.description === activity.description && 
        e.category === activity.category
      );
      current_events.splice(idx_, 1);
      console.log(idx_)
      current_events.push(newActivity);
      console.log(current_events)
      setEvents(current_events);
      setShow(current_events);
      handleClose();
    }
    else{
      setError(true)
    }
  }
//problem : 1. useState Latency 2.calender render
  const handleDelete = async() =>{
    //call backend and delete
    let idx, course_name;
      if (detail.divider.indexOf('(') !== -1 && detail.divider.indexOf('-') === -1){
        idx = detail.divider.indexOf('(');
        course_name = detail.divider.slice(0, idx);
      }
      else {
        course_name = detail.divider;
      }
    const activity = {
      start : detail.start, 
      end : detail.end, 
      title : detail.title
    };
    const {
      data : {message}//, info
    } = await instance.post('api/deleteActivity', {
      course_name, activity
    });
    console.log(message)
    // console.log(info);
    if(message === "Update successfully"){
      let current_events = [...events]
      // console.log(current_events)
      let idx_ = current_events.findIndex(e => e.start === activity.start && e.end === activity.end && e.title === activity.title);
      current_events.splice(idx_, 1);
      // console.log(current_events)
      let idx_on = onmoreEvents.findIndex(e => e.start === activity.start && e.end === activity.end && e.title === activity.title);
      console.log(idx_on)
      if(idx_on >= 0){
        let more =[...onmoreEvents]
        more.splice(idx_on, 1)
        setMore(more)
      }
      setEvents(current_events);
      setShow(current_events);
      handleClose();
    }
  }

  // const ChangeCategory = (event) => {
  //   console.log(event.target.value)
  //   setCategory(event.target.value);
  // };

  const ChangeStart = (event) =>{
    setStart(event.target.value);
  }

  const ChangeEnd = (event) =>{
    console.log(event.target.value)
    setEnd(event.target.value);
  }

  const ChangeDis = (event) =>{
    console.log(event.target.value)
    setDis(event.target.value);
  }

  const ChangeTitle = (event) =>{
    console.log(event.target.value)
    setTitle(event.target.value);
  }

  if(onEdit){
    return(
      <Dialog fullWidth  maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            {detail.divider}
          </DialogTitle>
          <DialogContent>
              <TextField 
                error = {error}
                id="add-title"
                label="Add title"
                defaultValue={detail.title}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={ChangeTitle}
              />
              <br></br>
              <br></br>
              <TextField
                error = {error}
                id="datetime-local"
                label="From"
                type="datetime-local"
                defaultValue={moment(detail.start).format("yyyy-MM-DDThh:mm:ss")}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={ChangeStart}
            />
            <TextField
              error = {error}
              id="datetime-local"
              label="To"
              type="datetime-local"
              defaultValue={moment(detail.end).format("yyyy-MM-DDThh:mm:ss")}
              InputLabelProps={{
              shrink: true,
              }}
              onChange={ChangeEnd}
          />
            <br/><br/>
            {/* <TextField
              id="input-with-icon-textfield"
              defaultValue={detail.divider}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SubjectIcon/>
                  </InputAdornment>
                ),
              }}
              onChange={ChangeCategory}
            />
            <br/><br/> */}
            <TextField
              id="input-with-icon-textfield"
              defaultValue={detail.description}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionTwoToneIcon/>
                  </InputAdornment>
                ),
              }}
              onChange={ChangeDis}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete} color="primary">
              Delete
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
  else{
    return (
        <Dialog fullWidth  maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{detail.title}</DialogTitle>
          <DialogContent>
            <DialogContentText style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}}>
              <AccessAlarmTwoToneIcon/>&emsp;&emsp;
              {detail.start.split('G')[0]+'     '}—
              {'     '+detail.end.split('G')[0]} 
            </DialogContentText>
            <DialogContentText style={{color:"black", display: 'flex',alignItems: 'center',flexWrap: 'wrap',}}>
              <SubjectIcon/>&emsp;&emsp;
              {detail.divider}
            </DialogContentText>
            <DialogContentText style={{color:"black", display: 'flex',alignItems: 'center',flexWrap: 'wrap',}}>
              <DescriptionTwoToneIcon/>&emsp;&emsp;
              {detail.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEdit} color="primary">
              Edit
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default EventDetail;