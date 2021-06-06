import React, {useState, useEffect} from 'react'
import MainPageTopBar from '../MainPageTopBar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddSchedule from './AddSchedule';
import CalenderPanel from './CalenderPanel';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import instance from '../../axios';
import HashLoader from 'react-spinners/HashLoader'
import EventDetail from './EventDetail';


const localizer = momentLocalizer(moment);

// improve resize of screen

function Calender(props) {

    const {userinfo,log_in} = props; 
    // console.log(userinfo);
    const [courseList, setList] = useState([]);
    //['DSA(CS1108)', 'SP(CS1022)', 'Web(EE2252)']
    const [courses, setCourse] = useState({});
    const [otherList, setoList] = useState(['Speaking', 'WVS Club', 'Basketball']);
    const [others, setOthers] = useState({
      'Speaking': false,
      'WVS Club': false,
      'Basketball': false,
    });
    const [events, setEvents] = useState([]);
    const [showEvents, setShow] = useState(events);

    const [openAdd, setOpenAdd] = useState(false);
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };
    const handleCloseAdd = (value) => {
        setOpenAdd(false);
    };

    const [openDetail, setOpenDetail] = useState(false);
    const [detail, setDetail] = useState({});

    const onSelect = (event) =>{
      console.log(event)
      setDetail(event);
      setOpenDetail(true);
    }

    const handleCloseDetail = (value) => {
      setOpenDetail(false);
    };

    const loadcourse = async() => {
      const email = userinfo;
      const {
        data : {classinfo} 
      } = await instance.post('api/loadcourse' ,{
        email
      });
      console.log(classinfo)
      setList(classinfo)
      let tmp_c = {}
      for(let c = 0; c < classinfo.length; c++){
        tmp_c[classinfo[c]] = false;
      }
      setCourse(tmp_c);
    }

    const loadschedule = async() => {
      const email = userinfo;
      const {
        data : {message, scheduleinfo} 
      } = await instance.post('api/loadschedule' ,{
        email
      });
      if(message === 'Load schedule success'){
        setEvents(scheduleinfo)
        console.log(scheduleinfo)
      }
      // setList(classinfo)
      // let tmp_c = {}
      // for(let c = 0; c < classinfo.length; c++){
      //   tmp_c[classinfo[c]] = false;
      // }
      // setCourse(tmp_c);
    }

    useEffect(() => {
      loadcourse();
      loadschedule();
    }, [])

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const loadData = async () => {
          await new Promise((r) => setTimeout(r, 2000))
          setLoading((loading) => !loading)
        }
        loadData()
    }, [])

    if (loading) {
        return (
          <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <HashLoader size={100}/>
          </div>
        )
    }

    else {
      return (
      <div>
        <MainPageTopBar log_in = {log_in}/>
        <AddSchedule open={openAdd} onClose={handleCloseAdd} courseList={courseList} events={events} setEvents={setEvents}/>
        <EventDetail open={openDetail} onClose={handleCloseDetail} courseList={courseList} detail={detail} events={events} setEvents={setEvents}/>
        <div style={{marginLeft:'240pt', marginTop:'10pt' ,float:'top'}}>
          <Button onClick={handleClickOpenAdd} >
            <AddCircleOutlineIcon style ={{
                color: "Aquamarine",
                }}/><p style ={{color: "gray",}}>Add schedule</p>
          </Button>
        </div>
        <CalenderPanel courseList={courseList} setList={setList} courses={courses} setCourse={setCourse}
                      otherList={otherList} setoList={setoList} others={others} setOthers={setOthers}
                      showEvents={showEvents} setShow={setShow} events={events} userinfo={userinfo} 
                      loadschedule = {loadschedule}/>
        <div style={{marginLeft:'20pt', marginTop:'0pt', height: '450pt', width:'700pt' ,float:'left'}}>
          <Calendar
            events={showEvents}
            views={["month"]}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={onSelect}
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
      </div>
      )
    }
  }
  
  export default Calender;
  