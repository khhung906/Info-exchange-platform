import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import instance from '../../axios';

// const useStyles = makeStyles((theme) => ({
//   avatar: {
//       backgroundColor: blue[100],
//       color: blue[600],
//   },
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));

function AddInfo(props) {
  // const classes = useStyles();
  const { open, onClose , setInfo, info, Data, setData} = props;
  const [seats, setSeats] = useState("full");
  const handleClose = () => {
    onClose();
  };

  const updateSeats = async() => {
    // console.log(e.target)
    // const seats = e.target.value;
    console.log(seats)
    const Name = info.Name;
    const time = new Date().toLocaleString();
    console.log(time);
    const {
      data : {message} //newinfo
    } = await instance.post('api/updateInfo', {
      Name, seats, time
    }) ;
    console.log(message)
    let updateInfo = info;
    updateInfo.Seats = seats;
    updateInfo.time = time;
    let new_data = [...Data]
    const found = new_data.find(element => element.name === updateInfo.name)
    new_data[found] = updateInfo
    setData(new_data)
    setInfo(updateInfo);
    setSeats("full")
    handleClose();
  }

  const changeValue = (e) => {
    setSeats(e.target.value);
  }

  // useEffect(() => {
  //   setSeats(info.Seats);
  //   console.log(seats)
  // }, [])

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className="enter-mapinfo-dialog" >
        <DialogTitle id="simple-dialog-title">Current Usage(approximately)</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            select
            fullWidth
            onChange={changeValue}
            SelectProps={{
              native: true,
            }}
          >
            <option key={"full"} value={"full"} >
              full
            </option>
            <option key={"80%full"} value={"80%"} >
              80%
            </option>
            <option key={"50%full"} value={"50%"} >
              50%
            </option>
            <option key={"30%full"} value={"30%"} >
              30%
            </option>
            <option key={"empty"} value={"empty"} >
              empty
            </option>
          </TextField>
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

{/* <TextField
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
          ))} */}