import axios from 'axios';
import * as firebase from "firebase";



export const FETCHTOURS = 'FETCHTOURS';

import {configFirebase} from '../data_config';

//iniciamos firebase con las configuraciones correspondientes
firebase.initializeApp(configFirebase);


export function fetchTours(){

  let v =  firebase.database().ref('/dataTours').once('value');
  return {
     type: FETCHTOURS,
     payload : v
   }
}
