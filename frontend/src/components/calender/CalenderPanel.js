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
import AddPlace from './AddPlace';
import AddGame from './AddGame'
import AddClub from './AddClub';
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
    width:'25%',
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
    const { courseList, setList, courses, setCourse, 
        events, userinfo, loadschedule, ShowList} = props;//otherList, setoList,setOthers, showEvents,
    const [search_course, setSearchcourse] = useState([]);
    const [search_courseid, setSearchcourseid] = useState([]);
    
    const [search_place, setSearchPlace] = useState([]);
    const [search_placeid, setSearchPlaceid] = useState([]);

    const [search_game, setSearchGame] = useState([]);
    const [search_gameid, setSearchGameid] = useState([]);

    const [search_club, setSearchClub] = useState([]);
    const [search_clubid, setSearchClubid] = useState([]);
    const pattern = new RegExp("[\u4E00-\u9FA5]+");
    const pattern2 = new RegExp("[A-Za-z]+");
    const addcourse = (course) =>{
        let list = [...courseList];
        list.push(course);
        setList(list);
        // console.log(course);
        let clist = {...courses};
        clist[course] = true;
        setCourse(clist);
    }
    
    // const addothers = (other) =>{
    //     let list = [...otherList];
    //     list.push(other);
    //     setoList(list);
    //     let clist = {...others};
    //     clist[other] = false;
    //     setOthers(clist);
    // } 

    const handleChange = (event) => {
        let c = { ...courses};
        // c[event.target.name] = event.target.checked;
        if(Object.keys(c).includes(event.target.name)){
            if(c[event.target.name]) c[event.target.name] = false;
            else c[event.target.name] = true;
        }
        setCourse(c);
        ShowList(c);
    };
    
    const [openAdd1, setOpenAdd1] = useState(false);
    const handleClickOpenAdd1 = () => {
        setOpenAdd1(true);
        handleSearch("",0,0);
        handleSearch("",1,0);
    };
    const handleCloseAdd1 = (value) => {
        setOpenAdd1(false);
    };

    const [openAdd2, setOpenAdd2] = useState(false);
    const handleClickOpenAdd2 = () => {
        setOpenAdd2(true);
        handleSearch("",0,1);
        handleSearch("",1,1);
    };
    
    const handleCloseAdd2 = (value) => {
        setOpenAdd2(false);
    };

    const [openAdd3, setOpenAdd3] = useState(false);
    const handleClickOpenAdd3 = () => {
        setOpenAdd3(true);
        handleSearch("",0,2);
        handleSearch("",1,2);
    };
    
    const handleCloseAdd3 = (value) => {
        setOpenAdd3(false);
    };

    const [openAdd4, setOpenAdd4] = useState(false);
    const handleClickOpenAdd4 = () => {
        setOpenAdd4(true);
        handleSearch("",0,3);
        handleSearch("",1,3);
    };
    
    const handleCloseAdd4 = (value) => {
        setOpenAdd4(false);
    };
    // const [openDelete, setOpenDelete] = useState(false);
    // const handleClickOpenDelete = () => {
    //     setOpenDelete(true);
    // };
    // const handleCloseDelete = (value) => {
    //     setOpenDelete(false);
    // };

    const handleSearch = async(keyword, which, type) => {
        // const keyword = classname;
        const {
          data : {final }//message
        } = await instance.post('api/search', {
          keyword, which, type
        });
        console.log(type)
        if (type === 0) {
            console.log(final)
            if (which === 1) setSearchcourse(final);
            else setSearchcourseid(final);
        }
        else if (type === 1){
            console.log(final)
            if (which === 1) setSearchPlace(final);
            else setSearchPlaceid(final);
        }
        else if (type === 2) {
            if (which === 1) setSearchGame(final);
            else setSearchGameid(final);
        }
        else if (type === 3) {
            console.log(final)
            if (which === 1) setSearchClub(final);
            else setSearchClubid(final);
        }
    }

    return (
        <div className={classes.root}>
        <UpcomingTable events={events}/>
        <Accordion className={classes.accordion}>
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
                        {courseList.filter(e => e.indexOf('(') !== -1 && e.indexOf('-') === -1).map((course, key) => (<FormControlLabel key={key}  control={<Checkbox style ={{
                        color: 'lightgreen',
                        }} size='small'onChange={handleChange} defaultChecked={true} checked={courses[course]} name={course} />}
                        label={course} className={classes.formControlLabel}
                        />))}
                    </FormGroup>
                    <AddCourse open={openAdd1} onClose={handleCloseAdd1} add={addcourse} userinfo={userinfo} loadschedule={loadschedule} search_course={search_course} search_courseid={search_courseid} />
                    <Button  size='small' className={classes.button} onClick={handleClickOpenAdd1} >
                        <AddIcon style ={{
                            color: "gray",
                            }}/><p style ={{color: "gray",}}>Add Course</p>
                    </Button>
                </FormControl>
            </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordion}>
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
                        {courseList.filter(e => e.indexOf('(') === -1 && e.indexOf('-') === -1 && !pattern2.test(e)).map((course, key) => (<FormControlLabel key={key}  control={<Checkbox style ={{
                        color: 'lightblue',
                        }} size='small'onChange={handleChange} defaultChecked={true} checked={courses[course]} name={course} />}
                            label={course} className={classes.formControlLabel}
                        />))}
                    </FormGroup>
                    <AddPlace open={openAdd2} onClose={handleCloseAdd2} add={addcourse} userinfo={userinfo} loadschedule={loadschedule} search_place={search_place} search_placeid={search_placeid}/>
                    <Button  size='small' className={classes.button} onClick={handleClickOpenAdd2} >
                        <AddIcon style ={{
                            color: "gray",
                            }}/><p style ={{color: "gray",}}>Add Place</p>
                    </Button>
                </FormControl>
            </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordion} >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Games</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormHelperText>Games you attend</FormHelperText>
                    <FormGroup>
                        {courseList.filter(e => e.indexOf('(') === -1 && e.indexOf('-') !== -1).map((course, key) => (<FormControlLabel key={key}  control={<Checkbox style ={{
                        color: 'plum',
                        }} size='small'onChange={handleChange} defaultChecked={true} checked={courses[course]} name={course} />}
                            label={course} className={classes.formControlLabel}
                        />))}
                    </FormGroup>
                    <AddGame open={openAdd3} onClose={handleCloseAdd3} add={addcourse} userinfo={userinfo} loadschedule={loadschedule} search_place={search_game} search_placeid={search_gameid}/>
                    <Button  size='small' className={classes.button} onClick={handleClickOpenAdd3} >
                        <AddIcon style ={{
                            color: "gray",
                            }}/><p style ={{color: "gray",}}>Add Game</p>
                    </Button>
                </FormControl>
            </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordion} >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Clubs</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormHelperText>Clubs you join</FormHelperText>
                    <FormGroup>
                        {courseList.filter(e => pattern.test(e) && pattern2.test(e) && e.indexOf('(') === -1).map((course, key) => (<FormControlLabel key={key} control={<Checkbox style ={{
                        color: 'lightgrey',
                        }} size='small'onChange={handleChange} defaultChecked={true} checked={courses[course]} name={course} />}
                            label={course} className={classes.formControlLabel}
                        />))}
                    </FormGroup>
                    <AddClub open={openAdd4} onClose={handleCloseAdd4} add={addcourse} userinfo={userinfo} loadschedule={loadschedule} search_place={search_club} search_placeid={search_clubid}/>
                    <Button  size='small' className={classes.button} onClick={handleClickOpenAdd4} >
                        <AddIcon style ={{
                            color: "gray",
                            }}/><p style ={{color: "gray",}}>Add Club</p>
                    </Button>
                </FormControl>
            </AccordionDetails>
        </Accordion>
        {/* <Accordion className={classes.accordion} defaultExpanded='true'>
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
        </Accordion> */}

        </div>
    );
  }
  
  export default CalenderPanel;
  