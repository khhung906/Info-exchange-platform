import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import instance from '../../axios';

const useStyles = makeStyles(() => ({
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
}));


function Search(props) {
    const classes = useStyles();
    
    const [course, setCourse] = useState('');
    const {setFlies, courses} = props;

    const handleclick = async() =>{
      //call backend and find course list of files
      const {
        data : { exams }//message
      } = await instance.post('api/findfiles', {course});
      console.log(exams)
      exams.sort((a, b) => (a.year+a.semester < b.year+b.semester ? -1: 1))
      setFlies(exams)
      //exam sort
    }

    return (
      <>
        <div style={{float:"left"}}>
          <Autocomplete
                id="course_name"
                options={courses}
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
                                          {...params} label="Course Name" variant="outlined" />}
                onInputChange={(event, newInputValue) => {
                  setCourse(newInputValue);
                }}
            />
        </div>  
        <div style={{float:"left"}}>
          <IconButton type="submit" className={classes.iconButton} aria-label="search" color="black">
            <SearchIcon onClick={handleclick}/>
          </IconButton>
        </div>
      </>
    );
};

export default Search;
