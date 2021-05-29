import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import MainPageTopBar from './MainPageTopBar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCourse from './AddCourse';
import DeleteCourse from './DeleteCourse';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function Calender(props) {
    const [events, setEvents]=useState([
      {
          id: 0,
          title: 'All Day Event very long title',
          allDay: true,
          start: new Date(2021, 5, 3),
          end: new Date(2021, 5, 18),
      },
      {
        id: 1,
        title: 'Long Event',
        start: new Date(2015, 3, 7),
        end: new Date(2015, 3, 10),
      },
    ]);
    const now = new Date();


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

    return (
      <div>
          <MainPageTopBar/>
            <AddCourse open={openAdd} onClose={handleCloseAdd}/>
              <Button variant="contained" color="primary" onClick={handleClickOpenAdd}>
                  Add Course
              </Button>
            <DeleteCourse open={openDelete} onClose={handleCloseDelete}/>
              <Button variant="contained" color="primary" onClick={handleClickOpenDelete}>
                  Delete Course
              </Button>
          <div style={{marginLeft:'250pt', marginTop:'50pt', height: '450pt', width:'800pt'}}>
            <Calendar
              events={events}
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
  
  export default Calender;
  