import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddCourse from './AddCourse';
import DeleteCourse from './DeleteCourse';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft:'5pt', 
    marginTop:'100pt', 
    height: '450pt', 
    width:'200pt',
    float:'left',
    border: 'none',
    boxSizing: 'border-box'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
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
    const { courseList, setList, courses, setCourse, otherList, setoList, others, setoState, showEvents, setShow, events} = props;

    const addcourse = (course) =>{
        let list = [...courseList];
        list.push(course);
        setList(list);
        let clist = {...courses};
        clist[course] = true;
        setCourse(clist);
    }

    const handleChange = (event) => {
        let c = { ...courses};
        let o = { ...others};
        // c[event.target.name] = event.target.checked;
        if(c[event.target.name]) c[event.target.name] = false;
        else c[event.target.name] = true;
        if(o[event.target.name]) c[event.target.name] = false;
        else o[event.target.name] = true;
        setCourse(c);
        let show = [];
        for(let i = 0; i < events.length; i++){
            if(c[events[i].divider] || o[events[i].divider]){
                show.push(events[i]);
            }
        }
        setShow(show)
    };
    
    const [openAdd, setOpenAdd] = useState(false);
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };
    const handleCloseAdd = (value) => {
        setOpenAdd(false);
    };


    const [openDelete, setOpenDelete] = useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = (value) => {
        setOpenDelete(false);
    };

    return (
        <div className={classes.root}>
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
                    <FormGroup>
                        {courseList.map(course => (<FormControlLabel  control={<Checkbox style ={{
                        color: "#00e676",
                        }} size='small'onChange={handleChange} checked={courses[course]} name={course} />}
                            label={course} className={classes.formControlLabel}
                        />))}
                    </FormGroup>
                    <AddCourse open={openAdd} onClose={handleCloseAdd} add={addcourse}/>
                    <Button  size='small' className={classes.button} onClick={handleClickOpenAdd} >
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
                </FormControl>
            </AccordionDetails>
        </Accordion>

        </div>
    );
  }
  
  export default CalenderPanel;
  