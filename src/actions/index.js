import axios from 'axios';
import Firebase from "firebase";



export const FETCHTOURS = 'FETCHTOURS';
export const UPLOADIMAGESECTION = 'UPLOADIMAGESECTION';

import {configFirebase} from '../data_config';


Firebase.initializeApp(configFirebase);
let dataTours  =  Firebase.database().ref('/dataTours');
//let storageTours = Firebase.storage().ref('toursitos/petos');
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

export function uploadImageToSection(file,section,itemCode,array){

  return (dispatch) => {
    let getNameOnBD = section.split("/");
    let nameOnBD = getNameOnBD.pop();

      if(array == 0){
        let storageTours = Firebase.storage().ref(section);

        let archivoFile = file[0];
        let metaData = {
          contentType: archivoFile.type,
            customMetadata: {
              'itemCode': itemCode,
              'name': archivoFile.name,
              'key' : nameOnBD
            }
          }
          storageTours.put(archivoFile,metaData).then(function(snapshot) {
            dispatch({
               type: UPLOADIMAGESECTION,
               payload : []
             });
          });
      }else{
        for (var i = 0; i < file.length; i++) {
          let index = i;
          let storageTours = Firebase.storage().ref(section+"-"+index);
          let archivoFile = file[i];
          let metaData = {
            contentType: archivoFile.type,
            customMetadata: {
              'itemCode': itemCode,
              'name': archivoFile.name,
              'array': index.toString(),
              'key' : nameOnBD
            }
          }
          storageTours.put(archivoFile,metaData).then(function(snapshot){
              dispatch({
                 type: UPLOADIMAGESECTION,
                 payload : []
               });
          });
        }
      }
  };

}
