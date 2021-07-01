import * as React from 'react';
import {Marker} from 'react-map-gl';
import LibraryIconR from '../img/red/library.png';
import CafeIconR from '../img/red/cafe.png';
import LibraryIconO from '../img/orange/library.png';
import CafeIconO from '../img/orange/cafe.png';
import LibraryIconG from '../img/green/library.png';
import CafeIconG from '../img/green/cafe.png';
import BasketballG from '../img/green/basketball.png';
import BasketballO from '../img/orange/basketball.png';
import BasketballR from '../img/red/basketball.png';
import BaseballR from '../img/red/baseball.png';
import BaseballG from '../img/green/baseball.png';
import BaseballO from '../img/orange/baseball.png';
import FitnessR from '../img/red/fitness-centre.png';
import FitnessG from '../img/green/fitness-centre.png';
import FitnessO from '../img/orange/fitness-centre.png';
import GolfR from '../img/red/golf.png';
import GolfG from '../img/green/golf.png';
import GolfO from '../img/orange/golf.png';
import PitchR from '../img/red/pitch.png';
import PitchG from '../img/green/pitch.png';
import PitchO from '../img/orange/pitch.png';
import SwimmingR from '../img/red/swimming.png';
import SwimmingG from '../img/green/swimming.png';
import SwimmingO from '../img/orange/swimming.png';
import TableTennisR from '../img/red/table-tennis.png';
import TableTennisG from '../img/green/table-tennis.png';
import TableTennisO from '../img/orange/table-tennis.png';
import TennisR from '../img/red/tennis.png';
import TennisG from '../img/green/tennis.png';
import TennisO from '../img/orange/tennis.png';
import VolleyballR from '../img/red/volleyball.png';
import VolleyballG from '../img/green/volleyball.png';
import VolleyballO from '../img/orange/volleyball.png';
import DanceR from '../img/red/dance.png';
import DanceG from '../img/green/dance.png';
import DanceO from '../img/orange/dance.png';
import ProsodyR from '../img/red/prosody.png';
import ProsodyG from '../img/green/prosody.png';
import ProsodyO from '../img/orange/prosody.png';
import CombatR from '../img/red/combat.png';
import CombatG from '../img/green/combat.png';
import CombatO from '../img/orange/combat.png';
import JudoR from '../img/red/judo.png';
import JudoG from '../img/green/judo.png';
import JudoO from '../img/orange/judo.png';

const SIZE = 20;


function Pins(props) {
  const {data, onClick} = props;
  console.log()
  const ChangeIcon = (place, seats, name) => {
    //console.log(seats)

    if (place === "library") {
      if (seats === 'empty' || seats === '30%') {
        return LibraryIconG;
      }
      else if (seats === '50%') {
          return LibraryIconO;
      }
      else {
          return LibraryIconR;
      }
    }
    else if (place === 'Cafe'){
      if (seats === 'empty' || seats === '30%') {
        return CafeIconG;
      }
      else if (seats === '50%') {
          return CafeIconO;
      }
      else {
          return CafeIconR;
      }
    }
    else if (place === 'PE Court') {
      if (name.includes('Basketball Court')) {
        if (seats === 'empty' || seats === '30%') {
          return BasketballG;
        }
        else if (seats === '50%') {
            return BasketballO;
        }
        else {
            return BasketballR;
        }
      }
      else if (name.includes('Baseball Field') || name === 'Baseball Practice Field') {
        if (seats === 'empty' || seats === '30%') {
          return BaseballG;
        }
        else if (seats === '50%') {
            return BaseballO;
        }
        else {
            return BaseballR;
        }
      }
      else if (name.includes('Gym')) {
        if (seats === 'empty' || seats === '30%') {
          return FitnessG;
        }
        else if (seats === '50%') {
            return FitnessO;
        }
        else {
            return FitnessR;
        }
      }
      else if (name === 'Golf Practice Field') {
        if (seats === 'empty' || seats === '30%') {
          return GolfG;
        }
        else if (seats === '50%') {
            return GolfO;
        }
        else {
            return GolfR;
        }
      }
      else if (name.includes('Sports Field') || name === 'Futsal Court') {
        if (seats === 'empty' || seats === '30%') {
          return PitchG;
        }
        else if (seats === '50%') {
            return PitchO;
        }
        else {
            return PitchR;
        }
      }
      else if (name.includes('Swimming Pool')) {
        if (seats === 'empty' || seats === '30%') {
          return SwimmingG;
        }
        else if (seats === '50%') {
            return SwimmingO;
        }
        else {
            return SwimmingR;
        }
      }
      else if (name.includes('Table Tennis Room')) {
        if (seats === 'empty' || seats === '30%') {
          return TableTennisG;
        }
        else if (seats === '50%') {
            return TableTennisO;
        }
        else {
            return TableTennisR;
        }
      }
      else if (name.includes('Tennis Court')) {
        if (seats === 'empty' || seats === '30%') {
          return TennisG;
        }
        else if (seats === '50%') {
            return TennisO;
        }
        else {
            return TennisR;
        }
      }
      else if (name === 'Volleyball Court') {
        if (seats === 'empty' || seats === '30%') {
          return VolleyballG;
        }
        else if (seats === '50%') {
            return VolleyballO;
        }
        else {
            return VolleyballR;
        }
      }
      else if (name.includes('Dance Room')) {
        if (seats === 'empty' || seats === '30%') {
          return DanceG;
        }
        else if (seats === '50%') {
            return DanceO;
        }
        else {
            return DanceR;
        }
      }
      else if (name === 'Prosody Room') {
        if (seats === 'empty' || seats === '30%') {
          return ProsodyG;
        }
        else if (seats === '50%') {
            return ProsodyO;
        }
        else {
            return ProsodyR;
        }
      }
      else if (name === 'Combat Room') {
        if (seats === 'empty' || seats === '30%') {
          return CombatG;
        }
        else if (seats === '50%') {
            return CombatO;
        }
        else {
            return CombatR;
        }
      }
      else if (name.includes('Judo Court')) {
        if (seats === 'empty' || seats === '30%') {
          return JudoG;
        }
        else if (seats === '50%') {
            return JudoO;
        }
        else {
            return JudoR;
        }
        
      }
    }
  }

  return data.map((ab, index) => (
    <Marker key={`marker-${index}`} longitude={ab.longitude} latitude={ab.latitude}>
      <img 
        src={ChangeIcon(ab.id, ab.Seats, ab.Name)} 
        onClick={() => onClick(ab)} 
        height='30px'
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