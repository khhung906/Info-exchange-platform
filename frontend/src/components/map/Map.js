// import React, {useState, useEffect, useRef, useCallback} from 'react'
// import ReactDOM from 'react-dom'
// import MainPageTopBar from '../MainPageTopBar';
// import HashLoader from 'react-spinners/HashLoader'
// import mapboxgl from 'mapbox-gl';
// import geoJson from './library-data.json';
// import SideInfo from './SideInfo';
// import Geocoder from 'react-map-gl-geocoder';

// mapboxgl.accessToken = 'pk.eyJ1Ijoic3R2MTIyMiIsImEiOiJja3Bud3duc2YwZDFrMnVsZnR3bzJwdnh1In0.8NeYXbzz2K0qztqEULiY-w'

// const Marker = ({ onClick, children, feature}) => {
//     const _onClick = (e) => {
//         onClick(feature.properties.seats)
//     }
//     return (
//         <button onClick={_onClick} className="marker">
//             {children}
//         </button>
//     )
// }

// // Marker Clicked alert 
// const markerClicked = (data) => {
//     // window.alert("Seats Availablle: \n" + data)
//     console.log(data)
//     return (
//         <SideInfo data={data}/>
//     )
// }





// const DefaultMap = () => {
//     const mapContainer = useRef(null);
//     const map = useRef(null);
//     const [lng, setLng] = useState(121.5398);
//     const [lat, setLat] = useState(25.0165);
//     const [zoom, setZoom] = useState(14.87);
    

//     useEffect(() => {
//         const map = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [lng, lat],
//             zoom: zoom
//         })
        

//         // Create markers and map data
//         geoJson.features.map((feature) => {
//             const ref = React.createRef();
//             ref.current = document.createElement('div');
//             ReactDOM.render(
//                 <Marker onClick={markerClicked} feature={feature}/>,
//                 ref.current
//             );
//             new mapboxgl.Marker(ref.current)
//             .setLngLat(feature.geometry.coordinates)
//             .addTo(map)
            
//         })

//         // Add navigation control (+/- zoom buttons)
//         map.addControl(new mapboxgl.NavigationControl(), 'top-right')

//         map.on('move', () => {
//             setLng(map.getCenter().lng.toFixed(4));
//             setLat(map.getCenter().lat.toFixed(4));
//             setZoom(map.getZoom().toFixed(2));
//         })

//         // Add search bar
//         // map.addControl(
//         //     new MapboxGeocoder({
//         //         zoom: 14,
//         //         placeholder: 'Enter search e.g. National Taiwan University',
//         //         mapboxgl: mapboxgl
//         //     }, 'top-right')
//         // )
        
//         return () => map.remove();
//     }, [])


//     return(
//         <div>
//             <div ref={mapContainer} className="map-container">
//                 <div className="map-sidebar">
//                     Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//                 </div>
//             </div>
//         </div>
//     )
// }






// function Map (props) {

//     const {userinfo,log_in} = props; 

//     const [loading, setLoading] = useState(true)

//     useEffect(()=>{
//         const loadData = async () => {
//           await new Promise((r) => setTimeout(r, 2000))
//           setLoading((loading) => !loading)
//         }
//         loadData()
//     }, [])

//     if (loading) {
//         return (
//           <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
//             <HashLoader size={100}/>
//           </div>
//         )
//     }

//     else {
//         return (
//             <div>
//                 <MainPageTopBar log_in = {log_in}/>
//                 <DefaultMap/>
//             </div>
//         )
//     }
// }

// export default Map;

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import MapGL, {Marker, NavigationControl, ScaleControl, GeolocateControl, Source, Layer, LinearInterpolator, Popup} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import MainPageTopBar from '../MainPageTopBar';
import HashLoader from 'react-spinners/HashLoader';
import Pins from './Pins';
import libraryData from './libraryData.json';
import LibraryInfo from './LibraryInfo';

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3R2MTIyMiIsImEiOiJja3Bud3duc2YwZDFrMnVsZnR3bzJwdnh1In0.8NeYXbzz2K0qztqEULiY-w";

function Map(props) {

    const {userinfo,log_in} = props; 

  const [viewport, setViewport] = useState({
    latitude: 25.0175,
    longitude: 121.54,
    zoom: 15
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );


  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 2000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );
    
    //Popup info
    const [popupInfo, setPopupInfo] = useState(null)


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
                <div style={{ height: "773px" }}>
                <MapGL
                    ref={mapRef}
                    {...viewport}
                    width="100%"
                    height="100%"
                    onViewportChange={handleViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    transitionInterpolator={new LinearInterpolator()}
                >
                    <Geocoder
                    mapRef={mapRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    position="top-left"
                    />
                    <Pins data={libraryData} onClick={setPopupInfo}/>
                    {popupInfo && (
                        <Popup
                            tipSize={5}
                            anchor="top"
                            longitude={popupInfo.longitude}
                            latitude={popupInfo.latitude}
                            closeOnClick={false}
                            onClose={setPopupInfo}
                        >
                            <LibraryInfo info={popupInfo}/>
                        </Popup>
                    )}
                    <NavigationControl style={{left:'1400px',top:'10px'}}/>
                    <ScaleControl maxWidth={100} unit="metric" style={{left:'1330px', top:'730px'}}/>
                    <GeolocateControl style={{left:'1400px', top:'120px'}}positionOptions={{enableHighAccuracy: true}} trackUserLocation={true} auto/>
                    <div className="map-sidebar">
                        Longitude: {viewport.longitude} | Latitude: {viewport.latitude} | Zoom: {viewport.zoom}
                    </div>
                </MapGL>
                </div>
            </div>
        );
    }
};

export default Map;
