import React from 'react';
import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddCourse from './AddCourse';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FormHelperText from '@material-ui/core/FormHelperText';
import UpcomingTable from'./UpcomingTable';
import instance from '../../axios';
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft:'5pt', 
    marginTop:'0pt', 
    height: '450pt', 
    width:'240pt',
    float:'left',
    border: 'none',
    boxSizing: 'border-box'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion:{
    borderRadius:'0px',
    boxShadow: "none",
    '&.MuiExpansionPanel-root:before': {
        display: 'none',
      },
  },
  formControl: {
    
  },
  FormControlLabel:{
    '&$checked': {
        color: 'green',
      },
    },
  button: {
    flexDirection: "column",
    left: "px",
    width: "125px",
    length: "10px",
    }  
}));

function CalenderPanel(props) {
    const classes = useStyles();
    const { courseList, setList, courses, setCourse, otherList, 
        setoList, others, setOthers, showEvents, setShow, events, userinfo, loadschedule, placeList, setPlaceList, places, setPlace} = props;
    const [search_course, setSearchcourse] = useState([]);
    const [search_courseid, setSearchcourseid] = useState([]);
    
    const addcourse = (course) =>{
        let list = [...courseList];
        list.push(course);
        setList(list);
        let clist = {...courses};
        clist[course] = false;
        setCourse(clist);
    }
    

    const addothers = (other) =>{
        let list = [...otherList];
        list.push(other);
        setoList(list);
        let clist = {...others};
        clist[other] = false;
        setOthers(clist);
    } 

    const ShowList = (c, o) =>{
        let show = [];
        console.log(events)
        for(let i = 0; i < events.length; i++){
            if(c[events[i].divider]){
                show.push(events[i]);
            }
            else if(o[events[i].divider]){
                show.push(events[i]);
            }
        }
        setShow(show);
    }

    const handleChange = (event) => {
        let c = { ...courses};
        let o = { ...others};
        // c[event.target.name] = event.target.checked;
        if(Object.keys(c).includes(event.target.name)){
            if(c[event.target.name]) c[event.target.name] = false;
            else c[event.target.name] = true;
        }
        if(Object.keys(o).includes(event.target.name)){
            if(o[event.target.name]) o[event.target.name] = false;
            else o[event.target.name] = true;
        }
        setCourse(c, o);
        ShowList(c, o);
    };
    
    const [openAdd1, setOpenAdd1] = useState(false);
    const handleClickOpenAdd1 = () => {
        setOpenAdd1(true);
        handleSearch("",0);
        handleSearch("",1);
    };
    const handleCloseAdd1 = (value) => {
        setOpenAdd1(false);
       
    };

    const [openAdd2, setOpenAdd2] = useState(false);
    const handleClickOpenAdd2 = () => {
        setOpenAdd2(true);
    };
    
    const handleCloseAdd2 = (value) => {
        setOpenAdd2(false);
    };


    const [openDelete, setOpenDelete] = useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = (value) => {
        setOpenDelete(false);
    };

    const handleSearch = async(keyword, which) => {
        // const keyword = classname;
        const {
          data : {final, message}
        } = await instance.post('api/search', {
          keyword, which
        });
        console.log(final,message);
        if (which === 1) setSearchcourse(final);
        else setSearchcourseid(final);
        
    }

    useEffect(() => {
        ShowList(courses, others)
    }, [courses, others])


    return (
        <div className={classes.root}>
        <UpcomingTable events={events}/>
        <Accordion className={classes.accordion} defaultExpanded='true'>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Courses</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormHelperText>Course you have subscribed</FormHelperText>
                    <FormGroup>
                        {courseList.map(course => (<FormControlLabel  control={<Checkbox style ={{
                        color: "#00e676",
                        }} size='small'onChange={handleChange} checked={courses[course]} name={course} />}
                            label={course} className={classes.formControlLabel}
                        />))}
                    </FormGroup>
                    <AddCourse open={openAdd1} onClose={handleCloseAdd1} add={addcourse} userinfo={userinfo} loadschedule={loadschedule} search_course={search_course} search_courseid={search_courseid}/>
                    <Button  size='small' className={classes.button} onClick={handleClickOpenAdd1} >
                        <AddIcon style ={{
                            color: "gray",
                            }}/><p style ={{color: "gray",}}>Add Course</p>
                    </Button>
                </FormControl>
            </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordion} defaultExpanded='true'>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Places</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormHelperText>Places you frequently visit</FormHelperText>
                    <FormGroup>
                        {courseList.map(course => (<FormControlLabel  control={<Checkbox style ={{
                        color: "#00e676",
                        }} size='small'onChange={handleChange} checked={courses[course]} name={course} />}
                            label={course} className={classes.formControlLabel}
                        />))}
                    </FormGroup>
                    <AddCourse open={openAdd1} onClose={handleCloseAdd1} add={addcourse} userinfo={userinfo} loadschedule={loadschedule} search_course={search_course} search_courseid={search_courseid}/>
                    <Button  size='small' className={classes.button} onClick={handleClickOpenAdd1} >
                        <AddIcon style ={{
                            color: "gray",
                            }}/><p style ={{color: "gray",}}>Add Course</p>
                    </Button>
                </FormControl>
            </AccordionDetails>
        </Accordion>
        {/*<Accordion className={classes.accordion} defaultExpanded='true'>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
            <Typography className={classes.heading}>Others</Typography>
            </AccordionSummary>
              <AccordionDetails>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                        {otherList.map(other => (<FormControlLabel control={<Checkbox style ={{
                        color: "#00e676",
                        }} size='small' checked={others.course} onChange={handleChange} name={other} />}
                            label={other} className={classes.formControlLabel}
                        />))}
                    </FormGroup>
                    <AddOthers open={openAdd2} onClose={handleCloseAdd2} add={addothers} userinfo={userinfo} loadschedule={loadschedule}/>
                    <Button  size='small' className={classes.button} onClick={handleClickOpenAdd2} >
                        <AddIcon style ={{
                            color: "gray",
                            }}/><p style ={{color: "gray",}}>Add Others</p>
                    </Button>
                </FormControl>
            </AccordionDetails>} 
        </Accordion>*/}

        </div>
    );
  }
  
  export default CalenderPanel;
  