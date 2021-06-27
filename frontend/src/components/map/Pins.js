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
    console.log(name)

    if (place === "library") {
      if (seats < 20) {
        return LibraryIconR;
      }
      else if (seats >= 20 && seats < 50) {
          return LibraryIconO;
      }
      else {
          return LibraryIconG;
      }
    }
    else if (place === 'Cafe'){
      if (seats < 5) {
        return CafeIconR;
      }
      else if (seats >= 5 && seats < 10) {
          return CafeIconO;
      }
      else {
          return CafeIconG;
      }
    }
    else if (place === 'PE Court') {
      if (name === 'Basketball Court') {
        if (seats < 1) {
          return BasketballR;
        }
        else if (seats >= 1 && seats < 3) {
            return BasketballO;
        }
        else {
            return BasketballG;
        }
      }
      else if (name === 'Baseball Field' || name === 'Baseball Practice Field') {
        if (seats < 1) {
          return BaseballR;
        }
        else if (seats >= 1 && seats < 3) {
            return BaseballO;
        }
        else {
            return BaseballG;
        }
      }
      else if (name === 'Gym') {
        if (seats < 1) {
          return FitnessR;
        }
        else if (seats >= 1 && seats < 3) {
            return FitnessO;
        }
        else {
            return FitnessG;
        }
      }
      else if (name === 'Golf Practice Field') {
        if (seats < 1) {
          return GolfR;
        }
        else if (seats >= 1 && seats < 3) {
            return GolfO;
        }
        else {
            return GolfG;
        }
      }
      else if (name === 'Sports Field' || name === 'Futsal Court') {
        if (seats < 1) {
          return PitchR;
        }
        else if (seats >= 1 && seats < 3) {
            return PitchO;
        }
        else {
            return PitchG;
        }
      }
      else if (name === 'Swimming Pool') {
        if (seats < 1) {
          return SwimmingR;
        }
        else if (seats >= 1 && seats < 3) {
            return SwimmingO;
        }
        else {
            return SwimmingG;
        }
      }
      else if (name === 'Table Tennis Room') {
        if (seats < 1) {
          return TableTennisR;
        }
        else if (seats >= 1 && seats < 3) {
            return TableTennisO;
        }
        else {
            return TableTennisG;
        }
      }
      else if (name === 'Tennis Court' || name === 'Clay Tennis Court') {
        if (seats < 1) {
          return TennisR;
        }
        else if (seats >= 1 && seats < 3) {
            return TennisO;
        }
        else {
            return TennisG;
        }
      }
      else if (name === 'Volleyball Court') {
        if (seats < 1) {
          return VolleyballR;
        }
        else if (seats >= 1 && seats < 3) {
            return VolleyballO;
        }
        else {
            return VolleyballG;
        }
      }
      else if (name === 'Dance Room') {
        if (seats < 1) {
          return DanceR;
        }
        else if (seats >= 1 && seats < 3) {
            return DanceO;
        }
        else {
            return DanceG;
        }
      }
      else if (name === 'Prosody Room') {
        if (seats < 1) {
          return ProsodyR;
        }
        else if (seats >= 1 && seats < 3) {
            return ProsodyO;
        }
        else {
            return ProsodyG;
        }
      }
      else if (name === 'Combat Room') {
        if (seats < 1) {
          return CombatR;
        }
        else if (seats >= 1 && seats < 3) {
            return CombatO;
        }
        else {
            return CombatG;
        }
      }
      else if (name === 'Judo Court') {
        if (seats < 1) {
          return JudoR;
        }
        else if (seats >= 1 && seats < 3) {
            return JudoO;
        }
        else {
            return JudoG;
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