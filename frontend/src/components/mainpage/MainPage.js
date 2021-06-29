import React, {useState, useEffect} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Cards from './Cards'
import MainPageTopBar from './MainPageTopBar'
import HashLoader from 'react-spinners/HashLoader'


const useStyles = makeStyles((theme) => ({
  feature_selection: {
    display: 'flex',
    backgroundColor:"#f7f3f3",
    minHeight:'100vh',
    flexWrap: 'wrap', '& >*': {margin: theme.spacing(5), width: theme.spacing(38), height: theme.spacing(42)},
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  
}));


function MainPage({log_in, userinfo}) {
    const classes = useStyles();

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
        <div className={classes.background}>
          <MainPageTopBar log_in={log_in} userinfo={userinfo}/>
          <div className={classes.feature_selection}>
            <Cards/>
          </div>
        </div>

      );
    }
}
  
  export default MainPage;
