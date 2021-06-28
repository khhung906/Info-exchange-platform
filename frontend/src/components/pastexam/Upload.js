import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import instance from '../../axios';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    height: "1vw", // Changed from 2vw
    fontSize: "18px",
  },
  option: {
    fontSize: "18px",
    height: "3vw",
    width: "100%",
    overflowX:"hidden",
    overflowY:"auto"
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
}));


function Search(props) {
  const classes = useStyles();
  const [upload, setUpload] = useState(false);
  const [year, setYear] = useState(0);
  const [semster, setSemester] = useState("spring");
  const [test, setTest] = useState("midterm");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoad] = useState(false)
  const {courses} = props;

  const handleUpload = async() => {
    console.log(file)
    setLoad(true)
    if(!file || !course || !year || file.type !== "application/pdf"){
      alert('fail')
    }
    else{
      const formData = new FormData();
      formData.append('file',file);
      formData.append('year',year);
      formData.append('course',course);
      formData.append('semester',semster);
      formData.append('test',test);
      formData.append('filename', file.name);
      const {
        data : {message}
      } = await instance.post('api/savefile', formData, { 
        headers: { "Content-Type": "multipart/form-data" }});
      if(message === "upload Succesfully"){
        setFile(null)
        setCourse("")
        setTest("midterm")
        setSemester("spring")
        setYear(0)
        setUpload(false)
      }
      else{
        // temp version
        alert('something went wrong')
      }
    }
    setLoad(false)
  }

  const handleClose = () => {
    setFile(null)
    setCourse("")
    setTest("midterm")
    setSemester("spring")
    setYear(0)
    setUpload(false)
  }

  return (
    <>
      <Dialog fullWidth  maxWidth="sm" open={upload} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="simple-dialog-title">Upload Past Exam</DialogTitle>
          <DialogContent style={{fontSize: 14}}>
            <div style={{left: 30}}>
              <Autocomplete
                  id="course_name"
                  options={courses}
                  getOptionLabel={(option) => option.name}
                  classes={{
                    option: classes.option,
                    input: classes.input
                  }}
                  style={{ width: 400 }}
                  renderOption={(option) => (
                    <React.Fragment>
                      {option.name}
                    </React.Fragment>
                  )}
                  hasPopupIcon

                  renderInput={(params) => <TextField style={{ width: "100%" }}
                                            {...params} label="Course Name"  
                                            InputLabelProps={{
                                              shrink: true,
                                            }}/>}
                  onInputChange={(event, newInputValue) => {
                    setCourse(newInputValue);
                  }}
                />
            </div>
            <br/>
            <TextField 
                id="Test Year"
                label="Year"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {setYear(e.target.value)}}  
            />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField 
                id="Test Semester"
                label="Semester"
                select
                SelectProps={{
                  native: true,
                }}
                onChange={(e) => {setSemester(e.target.value)}}
            >
              <option key="spring" value="spring" style ={{height:"50px", overflowX : "hidden", overflowY : "auto"}}>
                spring
              </option>
              <option key="fall" value="fall" style ={{height:"50px", overflowX : "hidden", overflowY : "auto"}}>
                fall
              </option>
            </TextField>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField 
                id="Test type"
                label="test"
                select
                SelectProps={{
                  native: true,
                }}
                onChange={(e) => {setTest(e.target.value)}}
            >
              <option key="midterm" value="midterm" style ={{height:"50px", overflowX : "hidden", overflowY : "auto"}}>
                midterm
              </option>
              <option key="final" value="final" style ={{height:"50px", overflowX : "hidden", overflowY : "auto"}}>
                final
              </option>
              <option key="quiz" value="quiz" style ={{height:"50px", overflowX : "hidden", overflowY : "auto"}}>
                quiz
              </option>
              <option key="others" value="others" style ={{height:"50px", overflowX : "hidden", overflowY : "auto"}}>
                others
              </option>
            </TextField>
          <br/><br/>
          <Button
            variant="outlined"
            component="label"
            color="primary"
            style={{width:"70px" ,height:"30px", fontSize:"12px", fontWeight:"bold"}}
          >
            Upload
            <input
              type="file"
              hidden
              onChange={(e) => {setFile(e.target.files[0])}}
            />
          </Button>&nbsp;&nbsp;&nbsp;&nbsp;
          {file? file.name:"only pdf file"}
          <br/><br/>{loading? <LinearProgress style={{backgroundColor: '#1a90ff', color: '#1a90ff'}}/>: <div/>}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
      <Button variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              variant="outlined"
              color="primary"
              onClick={() => {setUpload(true)}}>
      Upload File
      </Button>
    </>
  );
};

export default Search;
