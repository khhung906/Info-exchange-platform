import * as React from 'react';
import {Marker} from 'react-map-gl';
import libraryIcon from '../img/library-icon.png';
import CafeIcon from '../img/cafe-icon.png';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;


function Pins(props) {
  const {data, onClick} = props;

  console.log(data.id)
  const ChangeIcon = (change) => {
    if (change === "library") {
      return libraryIcon;
    }
    else {
      return CafeIcon;
    }
  }

  return data.map((ab, index) => (
    <Marker key={`marker-${index}`} longitude={ab.longitude} latitude={ab.latitude}>
      {/* <svg
        height={SIZE}
        viewBox="0 0 24 24"
        style={{
          cursor: 'pointer',
          fill: '#d00',
          stroke: 'none',
          transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
        }}
        onClick={() => onClick(ab)}
        src="./library-15-2.png"
      >
        <path d={ICON} />
      </svg> */}
      <img 
        src={ChangeIcon(ab.id)} 
        onClick={() => onClick(ab)} 
        height='40px'
        style={{
        cursor: 'pointer',
        fill: '#d00',
        stroke: 'none',
        transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
        }}>
      </img>
    </Marker>
  ));
}

export default React.memo(Pins);