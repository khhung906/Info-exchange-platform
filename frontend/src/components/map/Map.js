import React, {useState, useEffect, useRef, useCallback} from 'react'
import ReactDOM from 'react-dom'
import MainPageTopBar from '../MainPageTopBar';
import HashLoader from 'react-spinners/HashLoader'
import mapboxgl from 'mapbox-gl';
import geoJson from './library-data.json';
import SideInfo from './SideInfo';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Geocoder from 'react-map-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3R2MTIyMiIsImEiOiJja3BvMzR2ZXI0a3l3MnVueGR0bGxrZjdmIn0.34CD3AHK7plUolQwFSje-Q'

const Marker = ({ onClick, children, feature}) => {
    const _onClick = (e) => {
        onClick(feature.properties.seats)
    }
    return (
        <button onClick={_onClick} className="marker">
            {children}
        </button>
    )
}

// Marker Clicked alert 
const markerClicked = (data) => {
    // window.alert("Seats Availablle: \n" + data)
    console.log(data)
    return (
        <SideInfo data={data}/>
    )
}





const DefaultMap = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(121.5398);
    const [lat, setLat] = useState(25.0165);
    const [zoom, setZoom] = useState(14.87);
    

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        })
        

        // Create markers and map data
        geoJson.features.map((feature) => {
            const ref = React.createRef();
            ref.current = document.createElement('div');
            ReactDOM.render(
                <Marker onClick={markerClicked} feature={feature}/>,
                ref.current
            );
            new mapboxgl.Marker(ref.current).setLngLat(feature.geometry.coordinates).addTo(map)
            
        })

        // Add navigation control (+/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right')

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        })
        
        return () => map.remove();
    }, [])


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

