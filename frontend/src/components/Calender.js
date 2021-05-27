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

function Calender() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const now = new Date();
    const events = [
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
      {
          id: 2,
          title: 'DTS STARTS',
          start: new Date(2016, 2, 13, 0, 0, 0),
          end: new Date(2016, 2, 20, 0, 0, 0),
      },
      {
        id: 3,
        title: 'Today',
        start: now,
        end: now,
      },
    ]
    const onSelect = (event) =>{
      console.log(event)
    }

    return (
      <div>
          <MainPageTopBar/>
            <AddCourse open={open} onClose={handleClose}/>
              <Button variant="contained" color="primary" onClick={handleClickOpen}>
                  Add Course
              </Button>
            <DeleteCourse open={open} onClose={handleClose}/>
              <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
  