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
    fontSize: "1.1vw",
  },
  option: {
    fontSize: "1.1vw",
    height: "3vw",
    width: "100%",
    overflowX:"hidden",
    overflowY:"auto"
  },
}));
let courses = ['ADA', 'DSA', 'SP'];

function Search(props) {
    const classes = useStyles();
    const [course, setCourse] = useState('');
    const {setFlies} = props;

    // const handleSearch = async(keyword, which) => {
    //   // const keyword = classname;
    //   const {
    //     data : {final, message}
    //   } = await instance.post('api/search', {
    //     keyword, which
    //   });
    //   console.log(final,message);
    //   if (which === 1) setSearchcourse(final);
    //   else setSearchcourseid(final);
    // }
    useEffect(()=>{
      //get course info from backend
    }, [])

    return (
      <>
        <div style={{float:"left"}}>
          <Autocomplete
                id="course_name"
                options={courses}
                getOptionLabel={(option) => option}
                classes={{
                  option: classes.option,
                  input: classes.input
                }}
                style={{ width: 400}}
                renderOption={(option) => (
                  <React.Fragment>
                    {option}
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
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
      </>
    );
};

export default Search;
