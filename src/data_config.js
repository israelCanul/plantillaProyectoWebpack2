
// items del header asi como sus configuraciones
export const itemsMenu = [
{link:"/",label:"Home",icon: 'home'},
{link:"/app/TourListing.aspx",label:"Tours",icon: 'place'},
{link:"http://www.thomasmoretravel.com/app/TransportationList.aspx",label:"Transportation",icon:'local_taxi'},
//{link:"#",label:"Resorts",icon : 'local_taxi'},
{link:"special-offers.html",label:"Special Offers",icon : 'local_offer'},
//{link:"/gallery.html",label:"Gallery VR",icon : 'settings_overscan'},
//{link:"#",label:"",icon : 'shopping_cart',type: "cart"},
{link:"#",label:"",icon : 'search',type: "search"}
];
//<i class="material-icons">search</i>
export const configApp = {
  phone : '1 865 733 7715',// se muestra o no el numero de telefono
};

export const typeTransConfig={
  ARRIVAL: "ARRIVAL",
  DEPARTURE: "DEPARTURE",
  ROUNDTRIP : "ROUNDTRIP"
}
export const typeTransDescription={
  ARRIVALDESC: "Airport-Hotel",
  DEPARTUREDESC: "Hotel-Airpot",
  ROUNDTRIPDESC : "Airpot-Hotel-Airport"
}
export const dataUserWebService={
  USERNAME: "FkZSuDbCrfCrpYZZfb6wOg==",
  USERPASS: "38JKB8B+m+cCUd/4mMH9qQ=="
}
export const CODEPRICETOURS = ["CHILD","REGULAR"];// tipos de varcode aceptados por el momento para los precios de tours [VarCode]
export const ABREVING = "eng";
export const ABREVESP = "esp";

//urls to get info of outside
export const DEV_URL_SPECIALOFFERS = 'http://localhost:8080/data_special_offers.json';
export const DEV_URL = 'http://localhost:8080/data-temp-option-tours.json';
export const QA_URL = 'https://wdev.rrgapps.com/vtmservice/vtmservice.asmx/';
export const PROD_URL = 'https://wprdinternet.servicesrr.com:444/vtmservice/vtmservice.asmx/';
export const METHOD_wmGetTourAttributeSet = "wmGetTourAttributeSet";// lista de tours para el search
export const METHOD_wmGetItemByPlaceWebVw = "wmGetItemByPlaceWebVw";// to get a specific price of a IDTour

export const ToursOfferTheme = true;

//Analitics
export const prodCodeAnalitics = 'UA-7015474-1';


export function convertNativeToArray(obj){
  //console.log(obj);
  let array = [];
  for (var i = 0; i < obj.length ; i ++) {
    //console.log(obj[i]);
    array.push(obj[i]);
  }
  return array;
}


//
export const configFirebase = {
    apiKey: "AIzaSyCDxJvKZn2uiUcIBk9bz2n2oj7QSjSl56k",
    authDomain: "thomasmore-44171.firebaseapp.com",
    databaseURL: "https://thomasmore-44171.firebaseio.com",
    projectId: "thomasmore-44171",
    storageBucket: "",
    messagingSenderId: "4231149970"
  };
