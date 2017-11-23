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

export function uploadImageToSection(file,section,itemCode,nameOnBD){


console.log(file.lenght);
  return (dispatch) => {
      if(file.length == 1){
        let storageTours = Firebase.storage().ref(section);
        console.log(section);
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

      }else if(file.length > 1){
          
          file.map((fileImage,index)=>{
            let storageTours = Firebase.storage().ref(section+"-"+index);
            let archivoFile = fileImage;
            let metaData = {
              contentType: archivoFile.type,
              customMetadata: {
                'itemCode': itemCode,
                'name': archivoFile.name,
                'array': index.toString(),
                'key' : nameOnBD
              }
            }
            storageTours.put(archivoFile,metaData).then(function(snapshot) {
              dispatch({
                 type: UPLOADIMAGESECTION,
                 payload : []
               });
            });
          });
      }
  };
  // let subida = storageTours.put(archivoFile,metaData);


}
