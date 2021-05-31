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
import HashLoader from 'react-spinners/HashLoader'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000'
const instance = axios.create({
  baseURL: API_ROOT,
})

const localizer = momentLocalizer(moment);

// improve resize of screen

function Calender(props) {
    const {userinfo} = props; 
    // console.log(userinfo);
    const [courseList, setList] = useState([]);
    //['DSA(CS1108)', 'SP(CS1022)', 'Web(EE2252)']
    const [courses, setCourse] = useState({
      'DSA(CS1108)': true,
      'SP(CS1022)': true,
      'Web(EE2252)': true,
    });
    const [otherList, setoList] = useState(['Speaking', 'WVS Club', 'Basketball']);
    const [others, setoState] = useState({
      'Speaking': true,
      'WVS Club': true,
      'Basketball': true,
    });
    const [events, setEvents] = useState([
      {
          id: 0,
          title: 'DSA test',
          allDay: true,
          divider: 'DSA(CS1108)',
          start: new Date(2021, 5, 3),
          end: new Date(2021, 5, 18),
      },
      {
        id: 1,
        title: 'Web final',
        allDay: true,
        divider: 'Web(EE2252)',
        start: new Date(2021, 5, 20),
        end: new Date(2021, 5, 21),
      },
    ]);
    const [showEvents, setShow] = useState(events);

    const onSelect = (event) =>{
      console.log(event)
      // console.log('open');
      // let e = [...events];
      // e.push({
      //     id: 4,
      //     title: 'hihi',
      //     allDay: true,
      //     start: new Date(2021, 5, 4),
      //     end: new Date(2021, 5, 25),
      // })
      //setEvents(e);
    }

    const [openAdd, setOpenAdd] = useState(false);
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };
    const handleCloseAdd = (value) => {
        setOpenAdd(false);
    };
    const loadcourse = async() => {
      const email = userinfo;
      console.log("test2")
      const {
        data : {classinfo} 
      } = await instance.post('api/loadcourse' ,{
        email
      });
      setList(classinfo)
    }

    useEffect(() => {
      loadcourse();
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
          <MainPageTopBar/>
          <AddSchedule open={openAdd} onClose={handleCloseAdd}/>
          <div style={{marginLeft:'240pt', marginTop:'10pt' ,float:'top'}}>
            <Button onClick={handleClickOpenAdd} >
              <AddCircleOutlineIcon style ={{
                  color: "Aquamarine",
                  }}/><p style ={{color: "gray",}}>Add schedule</p>
            </Button>
          </div>
          <CalenderPanel courseList={courseList} setList={setList} courses={courses} setCourse={setCourse}
                        otherList={otherList} setoList={setoList} others={others} setoState={setoState}
                        showEvents={showEvents} setShow={setShow} events={events} userinfo={userinfo} />
          <div style={{marginLeft:'40pt', marginTop:'0pt', height: '450pt', width:'700pt' ,float:'left'}}>
            <Calendar
              events={showEvents}
              views={["month", "week", "day"]}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={onSelect}
              defaultDate={moment().toDate()}
              localizer={localizer}
            />
          </div>
        </div>
      );
    }
  }
  
  export default Calender;
  