import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import MapGL, {NavigationControl, ScaleControl, GeolocateControl,LinearInterpolator} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import MainPageTopBar from '../mainpage/MainPageTopBar';
import HashLoader from 'react-spinners/HashLoader';
import Pins from './Pins';
// import Data from './Data.json';
// import LibraryInfo from './LibraryInfo';
import SideInfo from './SideInfo';
import instance from '../../axios';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3R2MTIyMiIsImEiOiJja3Bud3duc2YwZDFrMnVsZnR3bzJwdnh1In0.8NeYXbzz2K0qztqEULiY-w";

function Map(props) {
  const {userinfo,log_in} = props; 
  const [Data, setData] = useState([]);
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

    const LoadAllData = async() => {
      const {
        data : {Data} //message
      } = await instance.post('api/loadAllData');
      // console.log(message, Data)
      console.log(Data)
      setData(Data);
    }
    useEffect(()=> {
      LoadAllData()
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
                <MainPageTopBar log_in={log_in} userinfo={userinfo}/>
                <div style={{ height: "95vh" }}>
                <SideInfo info={popupInfo} setInfo={setPopupInfo} userinfo={userinfo} Data={Data} setData={setData}/>
                <MapGL
                    ref={mapRef}
                    {...viewport}
                    mapStyle="mapbox://styles/mapbox/outdoors-v11"
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
                    style={{right:'50px',top:'10px'}}
                    />
                    <Pins data={Data} onClick={setPopupInfo}/>
                    {/* {popupInfo && (
                        <Popup
                            tipSize={10}
                            anchor="top"
                            longitude={popupInfo.longitude}
                            latitude={popupInfo.latitude}
                            closeOnClick={false}
                            onClose={setPopupInfo}

                        >
                            <LibraryInfo info={popupInfo}/>
                        </Popup>
                    )} */}
                    <NavigationControl style={{right:'10px',top:'10px'}}/>
                    <ScaleControl maxWidth={100} unit="metric" style={{right:'10px', bottom:'25px'}}/>
                    <GeolocateControl style={{right:'10px', top:'120px'}} positionOptions={{enableHighAccuracy: true}} trackUserLocation={false}/>
                    <div className="map-sidebar" style={{left:'90px', bottom:'0px'}}>
                        Longitude: {viewport.longitude} | Latitude: {viewport.latitude} | Zoom: {viewport.zoom}
                    </div>
                </MapGL>
                </div>
            </div>
        );
    }
};

export default Map;
