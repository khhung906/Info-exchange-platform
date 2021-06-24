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
import Autocomplete from '@material-ui/lab/Autocomplete';
import instance from '../../axios';

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    height: "1vw", // Changed from 2vw
    fontSize: "1.1vw",
  },
  option: {
    fontSize: "1.1vw",
    height: "3vw",
    width: "100%",
    overflowX : "hidden",
    overflowY : "auto"
    // backgroundColor : "red"
  },
  // root: {
  //   width:"1000px"
  // }
}));
//select, pickers
function AddCourse(props) {
  const classes = useStyles();
  const { open, onClose , add, userinfo, loadschedule, search_course, search_courseid} = props;
  const [classname, setname] = useState('');
  const [alertopen, setAlert] = useState(false);
  const [classid, setid] = useState('');
  const [iderror, setIderror] = useState(false);
  const [namerror, setNamerror] = useState(false);
  const [nameLabel, setNameLabel] = useState("Course Name")
  const [idLabel, setIdLabel] = useState("Course ID")
  const handleClose = () => {
    onClose();
  };

  const handleAdd = async() => {
    //connect to backend find whether id exist
    const email = userinfo;
    const course_id = classid;
    const {
      data : {message, classinfo}
    } = await instance.post('api/addcourse', {
      course_id, email
    });
    if (message === "Add successfully"){
      add(classinfo+"("+classid+")")
      onClose();
      loadschedule();
    }
    else{
      setIderror(true);
      setNamerror(true);
    }
  };

  const alertClose = () =>{
    setAlert(false);
  } 

  const getinfo = async(which, idOrname) => {
    let course_name = "", course_id = ""
    if (which === 1) course_name = idOrname
    else course_id = idOrname
    const {
      data : {message, info}
    } = await instance.post('api/getInfo', {
      course_name, course_id, which
    });
    console.log(info)
    if (which === 1) {
      setid(info)
      setIdLabel(info);
    }
    else {
      setname(info);
      setNameLabel(info);
    }
  }

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={classes.root}>
        <DialogTitle id="simple-dialog-title">Add Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Your Course Information
          </DialogContentText>
          <Autocomplete
              id="course_name"
              options={search_course}
              getOptionLabel={(option) => option.name}
              classes={{
                option: classes.option,
                input: classes.input
              }}
              style={{ width: 400}}
              renderOption={(option) => (
                <React.Fragment>
                  {option.name}
                </React.Fragment>
              )}
              renderInput={(params) => <TextField style={{ width: "100%" }}
                                        {...params} label={nameLabel} variant="outlined" />}
              onInputChange={(event, newInputValue) => {
                setname(newInputValue);
                getinfo(1, newInputValue);
              }}
          />
          <Autocomplete
              id="course_id"
              options={search_courseid}
              getOptionLabel={(option) => option.name}
              classes={{
                option: classes.option,
                input: classes.input
              }}
              style={{ width: 400}}
              renderOption={(option) => (
                <React.Fragment>
                  {option.name}
                </React.Fragment>
              )}
              renderInput={(params) => <TextField style={{ width: "100%" }}
                                        {...params} label={idLabel} variant="outlined" />}
              onInputChange={(event, newInputValue) => {
                setid(newInputValue);
                getinfo(0, newInputValue);
              }}
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

export default AddCourse;