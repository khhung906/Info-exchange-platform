import React, {useState} from 'react'
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
import instance from '../../axios';

//select, pickers
function EventDetail(props) {
  const {open, onClose, detail} = props;
  const [onEdit, setEdit] = useState(false);
  const [start, setStart] = useState("2021-05-29T10:30");
  const [end, setEnd] = useState("2021-05-29T10:30");
  const [category, setCategory] = useState('');
  const [description, setDis] = useState('');

  const handleEdit = () => {
    setEdit(true)
  }

  const handleClose = () => {
    setEdit(false);
    onClose();
  };

  const handleSave = () =>{
    //call backend and making changes
    handleClose();
  }

  const handleDelete = () =>{
    //call backend and delete 
    handleClose();
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

  if(onEdit){
    return(
      <Dialog fullWidth  maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{detail.title}</DialogTitle>
          <DialogContent>
              <TextField
                id="datetime-local"
                label="From"
                type="datetime-local"
                defaultValue={new Date(detail.start).toISOString().slice(0, 16)}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={ChangeStart}
            />
            <TextField
              id="datetime-local"
              label="To"
              type="datetime-local"
              defaultValue={new Date(detail.end).toISOString().slice(0, 16)}
              InputLabelProps={{
              shrink: true,
              }}
              onChange={ChangeEnd}
          />
            <br/><br/>
            <TextField
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
            <br/><br/>
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