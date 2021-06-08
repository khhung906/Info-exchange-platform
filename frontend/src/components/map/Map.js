import React, {useState, useEffect} from 'react'
import MainPageTopBar from '../MainPageTopBar';
import HashLoader from 'react-spinners/HashLoader'

function Map (props) {
    const {userinfo,log_in} = props; 

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
                
            </div>
        )
    }
}

export default Map;