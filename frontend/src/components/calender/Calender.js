import React, {useState, useEffect} from 'react'
import MainPageTopBar from '../mainpage/MainPageTopBar';
import AddSchedule from './AddSchedule';
import CalenderPanel from './CalenderPanel';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import instance from '../../axios';
import HashLoader from 'react-spinners/HashLoader'
import EventDetail from './EventDetail';


const localizer = momentLocalizer(moment);

// improve resize of screen

function Calender(props) {

    const {userinfo,log_in} = props; 
    const [courseList, setList] = useState([]);
    const [courses, setCourse] = useState({});
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
    const [detail, setDetail] = useState({start:"", end:""});

    const onSelect = (event) =>{
      // console.log(event)
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
        email, which : 0
      });
      setList(classinfo)
      let tmp_c = {}
      for(let c = 0; c < classinfo.length; c++){
        tmp_c[classinfo[c]] = true;
      }
      console.log(tmp_c)
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

    const ShowList = (c) =>{
      let show = [];
      // console.log(events)
      for(let i = 0; i < events.length; i++){
          if(c[events[i].divider]){
              show.push(events[i]);
          }
      }
      setShow(show);
    }

    useEffect(() => {
      ShowList(courses)
    }, [courses, events])
    console.log(showEvents)

    const pattern = new RegExp("[\u4E00-\u9FA5]+");
    const pattern2 = new RegExp("[A-Za-z]+");

    const eventProp = (event) => {
      console.log(event)
      //select category
      const e = event.divider
      console.log(e)
      let newStyle = {
        color: 'black',
        borderRadius: "0px",
        border: "none"
      };
      if(e.indexOf('(') !== -1 && e.indexOf('-') === -1){newStyle.backgroundColor = 'lightgreen'}
      else if(e.indexOf('(') === -1 && e.indexOf('-') === -1 && !pattern2.test(e)){newStyle.backgroundColor = 'lightblue'}
      else if(e.indexOf('(') === -1 && e.indexOf('-') !== -1){newStyle.backgroundColor = 'plum'}
      else {newStyle.backgroundColor = 'lightgrey'}
      return {
        style: newStyle
      }
    }

    if (loading) {
        return (
          <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <HashLoader size={100}/>
          </div>
        )
    }

    else {
      return (
      <div style={{backgroundColor:'#f7f3f3', height:'100vh'}}>
        <MainPageTopBar log_in={log_in} userinfo={userinfo}/>
        <AddSchedule open={openAdd} onClose={handleCloseAdd} courseList={courseList}  events={events} setEvents={setEvents}/>
        <EventDetail open={openDetail} onClose={handleCloseDetail} courseList={courseList}  detail={detail} events={events} setEvents={setEvents} showEvents={showEvents} setShow={setShow}/>
        <div style={{marginLeft:'257pt', marginTop:'10pt' ,float:'top'}}>
          <Button onClick={handleClickOpenAdd} >
            <AddCircleOutlineIcon style ={{
                color: "#00e676"
                }}/><p style ={{color: "black"}}>Add schedule</p>
          </Button>
        </div>
        <CalenderPanel courseList={courseList}  setList={setList} courses={courses} setCourse={setCourse} 
                      showEvents={showEvents} setShow={setShow} events={events} userinfo={userinfo} ShowList={ShowList}
                      loadschedule = {loadschedule}/>
        <div style={{marginLeft:'20pt', marginTop:'0pt', height: '80%', width:'70%' ,float:'left'}}>
          <Calendar
            events={showEvents}
            views={["month"]}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={onSelect}
            defaultDate={moment().toDate()}
            localizer={localizer}
            style={{color:'black'}}
            eventPropGetter={
              eventProp
            }
          />
        </div>
      </div>
      )
    }
  }
  
  export default Calender;
  