import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import instance from '../../axios';

// const useStyles = makeStyles((theme) => ({
//     avatar: {
//         backgroundColor: blue[100],
//         color: blue[600],
//     },
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
// }));

function LeaveComment(props) {
  // const classes = useStyles();
  const { open, onClose , info, setInfo, userinfo} = props;
  const [comment, setComment] = useState("");
  const handleClose = () => {
    onClose();
  };
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const updateComments = async() => {
  //userName, comment, Name(site)
    console.log(comment);
    const Name = info.Name;
    const UserName = userinfo;
    const crttime = new Date();
    const time = monthNames[crttime.getMonth()]+' '+crttime.getDate()+', '+crttime.getFullYear();
    const {
      data : {message}// comments
    } = await instance.post('api/updateComment', {
      Name, UserName, comment, time
    }) ;
    console.log(message);
    console.log(info)
    let newinfo = info;
    newinfo.comments.push({UserName : UserName, comment : comment, time : time});
    console.log(newinfo);
    setInfo(newinfo);
    handleClose();
  }

  const changeComment = (e) => {
    setComment(e.target.value);
  }
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
            onChange={changeComment}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={updateComments}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LeaveComment;