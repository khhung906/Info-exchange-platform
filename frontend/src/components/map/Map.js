import React, {useState, useEffect, useRef} from 'react'
import MainPageTopBar from '../MainPageTopBar';
import HashLoader from 'react-spinners/HashLoader'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3R2MTIyMiIsImEiOiJja3BvMzR2ZXI0a3l3MnVueGR0bGxrZjdmIn0.34CD3AHK7plUolQwFSje-Q'

function DefaultMap(){
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(120.4);
    const [lat, setLat] = useState(23.44);
    const [zoom, setZoom] = useState(7);

    useEffect(() => {
        if (map.current) return; //initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        })
    })

    useEffect(() => {
        if (!map.current) return; 
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        })
    })
    
    return(
        <div>
            <div ref={mapContainer} className="map-container">
                <div className="map-sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div>
        </div>
    )
}






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
                <DefaultMap/>
            </div>
        )
    }
}

export default Map;