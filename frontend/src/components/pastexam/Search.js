import React, { useState, useRef, useCallback, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import instance from '../../axios';

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    height: "1vw", // Changed from 2vw
    fontSize: "1.2vw",
  },
  option: {
    fontSize: "1.1vw",
    height: "3vw",
    width: "100%",
    overflowX:"hidden",
    overflowY:"auto"
  },
}));

function createData(name, test, year) {
  return { name, test, year };
}

function Search(props) {
    const classes = useStyles();
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState('');
    const {setFlies} = props;

    const getcourse = async(which, keyword) => {
      // const keyword = classname;
      const {
        data : {message, final}
      } = await instance.post('api/search', {
        which, keyword
      });
      setCourses(final)
    }

    useEffect(()=>{
      //get course info from backend
      getcourse(1, "")
    }, [])

    const handleclick = () =>{
      //call backend and find course list of files
      setFlies([createData('final-test', 'quiz2', '2015'), createData('hihi', 'midterm', '2017')])
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
