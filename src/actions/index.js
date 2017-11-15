import axios from 'axios';
import Firebase from "firebase";



export const FETCHTOURS = 'FETCHTOURS';

import {configFirebase} from '../data_config';


Firebase.initializeApp(configFirebase);
let dataTours  =  Firebase.database().ref('/dataTours');

export function fetchTours(){
  return (dispatch) => {
    dataTours.on('value',snapshot =>{
      dispatch({
         type: FETCHTOURS,
         payload : snapshot.val()
       });
    })
  };


}
