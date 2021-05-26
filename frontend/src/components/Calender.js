import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import MainPageTopBar from './MainPageTopBar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCourse from './AddCourse'

function Calender() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
      <div>
          <MainPageTopBar/>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                add course
            </Button>
          <AddCourse open={open} onClose={handleClose} />
      </div>
    );
  }
  
  export default Calender;
  