import axios from 'axios';
import * as firebase from "firebase";



export const FETCHTOURS = 'FETCHTOURS';
export const FETCHCARTITEMS = 'FETCHCARTITEMS';
export const SETCARTITEMS = 'SETCARTITEMS';
export const UPDATECARTITEM = 'UPDATECARTITEM';
export const DELETECARTITEM = 'DELETECARTITEM';
export const GETTOURINFO = 'GETTOURINFO';
export const GETTOURCAT = 'GETTOURCAT';
export const GETINFOTOURS = 'GETINFOTOURS';
export const SETITEMSCOMPARE = 'SETITEMSCOMPARE';
export const GETITEMSCOMPARE = 'GETITEMSCOMPARE';
export const DELETEITEMCOMPARE = 'DELETEITEMCOMPARE';
export const FETCHSPECIALTOURS = 'FETCHSPECIALTOURS';
export const ADDINFOSPECIALTOUR = 'ADDINFOSPECIALTOUR';

// const DEV_URL = 'http://localhost:8080/data-temp-option-tours.json';
// const QA_URL = 'http://wdev.rrgapps.com/vtmservice/vtmservice.asmx/wmGetTourAttributeSet';
// const PROD_URL = 'http://wdev.rrgapps.com/vtmservice/vtmservice.asmx/wmGetTourAttributeSet';
import {
  configFirebase,
  ABREVING,
  ABREVESP,
  dataUserWebService,
  DEV_URL_SPECIALOFFERS,
  DEV_URL,
  QA_URL,
  PROD_URL,
  METHOD_wmGetTourAttributeSet,
  METHOD_wmGetItemByPlaceWebVw} from '../data_config';
 let URL_WEB_SERVICE;

  if(location.hostname == "www.thomasmoretravel.com" || location.hostname == "www.thomasmoretravel.com.mx" || location.hostname == "localhost" ){
      URL_WEB_SERVICE = PROD_URL;
  }else{
      URL_WEB_SERVICE = QA_URL;
  }
//iniciamos firebase con las configuraciones correspondientes
firebase.initializeApp(configFirebase);

//let defaultStorage = firebase.database();



const ROOT_URL= DEV_URL;///vtmservice/vtmservice.asmx/wmGetTourAttributeSet
const ROOT_URL_ESPECIALS = DEV_URL_SPECIALOFFERS;

//helpers
import {getCookie} from '../helpers/cookies.js';

export function fetchTours(){
   //const request =  axios.get(`${ROOT_URL}`);
   //const request =  axios.get(`${ROOT_URL_ESPECIALS}`);
  let v =  firebase.database().ref('/dataTours').once('value');
  return {
     type: FETCHTOURS,
     payload : v
   }
}
export function getInfoTour(){
   let path = location.pathname;
   let data;

   let v =  firebase.database().ref('/tours').orderByChild('url')
                 //.equalTo("whale_shark_adventure")
                 .once("value")

   if(path == "/tour/index.html"){
     let url = ""
     data ={title : "COLUMBUS LOBSTER DINNER CRUISE",banner : '/img/columbus.jpg',galleryItems : [{video: false,src:'/img/tours/barco.jpg'},{ video:true,src:'https://www.youtube.com/embed/8x9IAGgQNAo?rel=0&amp;controls=0&amp;showinfo=0',thum : "/img/play.jpg"},{video: false,src:'/img/tours/cena.jpg'},{video:false,src:'/img/tours/langosrta.jpg'},{ video:true,src:'https://www.youtube.com/embed/8x9IAGgQNAo?rel=0&amp;controls=0&amp;showinfo=0',thum : "/img/play.jpg"}]};
   }else{
     data ={title : "Xcaret",banner : '/img/xcaret 3.jpg' ,galleryItems : [{video: false,src:'/img/tours/rio-subterraneo.jpg'},{ video:false,src:'/img/tours/xcaret-mexico-espectacular.jpg'},{video: false,src:'/img/tours/danza-pueblo-maya.jpg'},{video:false,src:'/img/tours/voladores-papantla.jpg'}] };
   }
   return {
     type: GETTOURINFO,
     payload : v
   }
}
export function getInfoCat(){
   let path = location.pathname;
   let data;

   switch (path) {
   case "/category/aqua-activities.html":
      data ={title : "Water Activities & Dolphins",banner : '/img/categories/aqua-activities.jpg'}
      break;
   case "/category/archeological.html":
      data ={title : "Archeological Sites & Nature",banner : '/img/categories/archeological.jpg'}
    break;
    case "/category/mexican-pride.html":
      data ={title : "Mexican Pride",banner : '/img/categories/mexican-pride.jpg'}
    break;
    case "/category/night.html":
      data ={title : "Night Activities",banner : '/img/categories/night.jpg'}
      break;
     default:
      data ={title : "Adventure & Parks",banner : '/img/categories/cat_adventure_parks.jpg'}
   }

   return {
     type: GETTOURCAT,
     payload : data
   }
}
export function fetchCartItems(){
  let cartItems  = [];
  // get items tnars
  if(localStorage.getItem('itemsTrans')){
    //cartItems = JSON.parse(window.atob(getCookie().itemsTrans));
    cartItems = JSON.parse(window.atob(localStorage.getItem('itemsTrans')));
  }
   return {
     type: FETCHCARTITEMS,
     payload : cartItems
   }
}
export function setCartItems(obj){
  let localItems=[];
  if(localStorage.getItem('itemsTrans')){
    localItems =JSON.parse(window.atob(localStorage.getItem('itemsTrans')));
    localItems.push(obj);
  }else{
    localItems=[obj];
  }
  localStorage.setItem('itemsTrans' , window.btoa(JSON.stringify(localItems)));

  let cartItems  = [];
  // get items tnars
  if(localStorage.getItem('itemsTrans')){
    //cartItems = JSON.parse(window.atob(getCookie().itemsTrans));
    cartItems = JSON.parse(window.atob(localStorage.getItem('itemsTrans')));
  }
  return {
     type: SETCARTITEMS,
     payload : cartItems
  }
}

export function updateCartItem(obj,id){// function to update a item of itemTrans cookie
  let localItems=[];
  if(localStorage.getItem('itemsTrans')){
    localItems =JSON.parse(window.atob(localStorage.getItem('itemsTrans')));
    localItems[id].arrivalDate = obj.arrivalDate;
    localItems[id].departureDate = obj.departureDate;
    localItems[id].codeTrans = obj.codeTrans;
    localItems[id].passengers = obj.passengers;
    localItems[id].TotalPriceUSD = obj.total;
    localItems[id].transferType = obj.transferType;
    localItems[id].itemTrans.data = obj.itemTrans;
    //localItems.push(obj);
  }
  localStorage.setItem('itemsTrans' , window.btoa(JSON.stringify(localItems)));
  let cartItems  = {items : [] , totalTrans : 0};
  if(localStorage.getItem('itemsTrans')){
    //cartItems = JSON.parse(window.atob(getCookie().itemsTrans));
    cartItems.items = JSON.parse(window.atob(localStorage.getItem('itemsTrans')));
    cartItems.items.map((item,id)=>{
      if(item.codeTrans){
        cartItems.totalTrans  += parseFloat(item.itemTrans.data.TotalPriceUSD);
      }
    });
  }
  return {
     type: UPDATECARTITEM,
     payload : cartItems
  }
}

export function deleteCartItem(id){
  //console.log('asda');
  let localItems=[];
  let tempItems = [];
  if(localStorage.getItem('itemsTrans')){
    localItems = JSON.parse(window.atob(localStorage.getItem('itemsTrans')));
    localItems.map((item,idItem)=>{
      if(idItem != id){
        tempItems.push(item);
      }
    });
  }
  localStorage.setItem('itemsTrans' , window.btoa(JSON.stringify(tempItems)));
  let cartItems  = {items : [] , totalTrans : 0};
  if(localStorage.getItem('itemsTrans')){
    //cartItems = JSON.parse(window.atob(getCookie().itemsTrans));
    cartItems.items = JSON.parse(window.atob(localStorage.getItem('itemsTrans')));
    cartItems.items.map((item,id)=>{
      if(item.codeTrans){
        cartItems.totalTrans  += parseFloat(item.itemTrans.data.TotalPriceUSD);
      }
    });
  }
  return {
     type: DELETECARTITEM,
     payload : cartItems
  }
}
export function getInfoTours(){
  //console.log(location);
  let params = new URLSearchParams();
  params.append('strUserName', dataUserWebService.USERNAME);
  params.append('strUserPassword', dataUserWebService.USERPASS);
  params.append('intType', '1');
  if(location.hostname == "www.thomasmoretravel.com.mx" || location.pathname == "/thomasmoretravel.com.mx/" || location.pathname == "/thomasmoretravel.com.mx/"  ){
      params.append('strLanguageCode', ABREVESP);
  }else{
      params.append('strLanguageCode', ABREVING);
  }
  params.append('strTourCode','');
  params.append('strAttributeCodes','');
  params.append('strItemClassCodes','');
  params.append('strItemTypeCodes','');
  params.append('strHotelCode','');
  const request =  axios.post(`${URL_WEB_SERVICE+METHOD_wmGetTourAttributeSet}`,params);
  return {
     type: GETINFOTOURS,
     payload : request
  }
}
/*
  NOTE: Se agrega los actions para administrar la watch list
*/

// get the items that will be wtaching
export function getCompareItems(obj){
  let cartItems;
  if(localStorage.getItem('itemsCompare')){
    cartItems = JSON.parse(window.atob(localStorage.getItem('itemsCompare')));
  }else{
    cartItems = [];
  }
  return{
    type:GETITEMSCOMPARE,
    payload : cartItems
  }
}
//set a new item to watching list
export function setCompareItems(obj){
  let nuevoItem = obj;
  let localItems=[];
  let tempItems = [];
  let ifExist = false;
  if(localStorage.getItem('itemsCompare')){
    localItems = JSON.parse(window.atob(localStorage.getItem('itemsCompare')));
    localItems.map((item,idItem)=>{
      if(item.id == obj.id){
        ifExist = true;
      }
    });
  }
  if(!ifExist){
    localItems.push(obj);
    localStorage.setItem('itemsCompare' , window.btoa(JSON.stringify(localItems)));
  }
  let cartItems;
  if(localStorage.getItem('itemsCompare')){
    cartItems = JSON.parse(window.atob(localStorage.getItem('itemsCompare')));
  }else{
    cartItems = [];
  }
  return{
    type:SETITEMSCOMPARE,
    payload : cartItems
  }
}
//delete an item to watching list
export function deleteCompareItems(id){
  let localItems=[];
  let tempItems = [];
  if(localStorage.getItem('itemsCompare')){
    localItems = JSON.parse(window.atob(localStorage.getItem('itemsCompare')));
    localItems.map((item,idItem)=>{
      if(idItem != id){
        tempItems.push(item);
      }
    });
  }
  localStorage.setItem('itemsCompare' , window.btoa(JSON.stringify(tempItems)));

  let cartItems;
  if(localStorage.getItem('itemsCompare')){
    cartItems = JSON.parse(window.atob(localStorage.getItem('itemsCompare')));
  }else{
    cartItems = [];
  }

  return{
    type:DELETEITEMCOMPARE,
    payload : cartItems
  }
}

/*
  NOTE: Lista de special offerts
*/

export function fetchSpecialTours(){
   //const request =  axios.get(`${ROOT_URL_ESPECIALS}`);
   let v =  firebase.database().ref('/special').once('value');

   return {
     type: FETCHSPECIALTOURS,
     payload : v
   }
}
export function addInfoToSpecialTours(idTour){
  let params = new URLSearchParams();
  params.append('strUserName', dataUserWebService.USERNAME);
  params.append('strUserPassword', dataUserWebService.USERPASS);
  params.append('strPlaceCode','vtmweb');
  params.append('strItemCode',idTour);
  const request =  axios.post(`${URL_WEB_SERVICE+METHOD_wmGetItemByPlaceWebVw}`,params);
  return {
     type: ADDINFOSPECIALTOUR,
     payload : request
  }
}
