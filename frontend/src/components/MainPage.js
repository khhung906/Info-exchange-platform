import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Cards from './Cards'
import MainPageTopBar from './MainPageTopBar'

const useStyles = makeStyles((theme) => ({
  feature_selection: {
    display: 'flex',
    flexWrap: 'wrap', '& >*': {margin: theme.spacing(3), width: theme.spacing(38), height: theme.spacing(42)},
  },
}));

function MainPage() {
    console.log('main page')
    const classes = useStyles();
    return (
      <div>
        <MainPageTopBar/>
        <div className={classes.feature_selection}>
          <Cards/>
        </div>
      </div>
    );
}
  
  export default MainPage;
