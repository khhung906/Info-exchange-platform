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
function AddOthers(props) {
  const classes = useStyles();
  const { open, onClose , add, userinfo, loadschedule } = props;
  const [category, setCategory] = useState('');
  const [iderror, setIderror] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleAdd = () => {
    add(category)
    onClose();
    // connect to backend find whether id exist
    // const email = userinfo;
    // const course_id = classid;
    // const {
    //   data : {message, classinfo}
    // } = await instance.post('api/addcourse', {
    //   course_id, email
    // });
    // if (message === "Add successfully"){
    //   add(classinfo+"("+classid+")")
    //   onClose();
    //   loadschedule();
    // }
    // else{
    //   setIderror(true);
    //   setNamerror(true);
    // }
  };


  const typeName = (e) =>{
    //connect to backend to give hint
    setCategory(e.target.value);
  } 


  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Add Others</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter category name you want to add
          </DialogContentText>
          <TextField
            error = {iderror}
            autoFocus
            margin="dense"
            id="other-c"
            label="category name"
            fullWidth
            onChange={typeName}
          />
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
    </>
  );
}

export default AddOthers;