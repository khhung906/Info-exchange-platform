import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import MainPageTopBar from './MainPageTopBar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCourse from './AddCourse';
import Calendar from 'react-calendar'
import DeleteCourse from './DeleteCourse';


function Calender() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const [value, onChange] =useState(new Date())

  
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
          <Calendar onChange={onChange} value={value} className="react-calendar">
          </Calendar>
      </div>
    );
  }
  
  export default Calender;
  