let sLanguageCode = 'eng'; // lenguaje de las peticiones ENG
// aqui van las variables globales que necesita la aplicacion para funcionar
let ClientToken = '/71I7WG71vwytqqsoO80n2F4iaUBpvqV';
let AppToken = 'z9emEb5bQDagl6U8OHEx+xFQLPObe8Bi';
let strToken2 = 'VGoX7lOss5uY+xE5mNniaw==';
let strToken4 = 'IV0KRalQXryO/NexOBAiMQ==';
let strToken5 = 'POS';// esta es la BD a la que se hacen las peticiones
let aplicationId = 4;

//datos de la API de vuelos
let PassAppKey = '63e6d0a6959639c096c5ce3895c944fb';
let UserApiFlight = 'ae83afff'


//para reservation_transportation
var AccId = 709035;
var PaymentTypeCode = 'CC';
var ResTypeCode = '';

var qas = 'http://wqas.royalresorts.com/thomasmoreservice/thomasmoreservice.asmx';
var dev = 'http://wdev.rrgapps.com/thomasmoreservice/thomasmoreservice.asmx';
var prod = 'https://wprdinternet.servicesrr.com:444/thomasmoreservice/thomasmoreservice.asmx';
var uriWebService = prod;
//var uriWebService = 'http://wqas.royalresorts.com/thomasmoreservice/thomasmoreservice.asmx';




export const FETCHTHOTELS = 'FETCHTHOTELS';
export const INITIALCONFIG = 'INITIALCONFIG';
export const INITIALCONFIGTYPES = 'INITIALCONFIGTYPES';
export const GETCATALOGITEMSTRANSFER = 'GETCATALOGITEMSTRANSFER';
export const GETITEMSTRANSFERBYCART = 'GETITEMSTRANSFERBYCART';
export const SETNEWDATAITEMTOCART = 'SETNEWDATAITEMTOCART';
export const CLEARSEARCH = 'CLEARSEARCH';
export const RESETNEWDATAITEMTOCART = 'RESETNEWDATAITEMTOCART';
export const GETCONFIGVTM = 'GETCONFIGVTM';

//declaracion e actions
export function soapHoteles(){
  return {
    type: FETCHTHOTELS,
    payload : soapHoteles_Webservice()
  }
}
export function initialConfigTransfers(){
  return {
    type: INITIALCONFIG,
    payload : soapConfig_Webservice()
  }
}
export function initialConfigTransfersType(){
  return{
    type:INITIALCONFIGTYPES ,
    payload : soapConfigTypes_Webservice()
  }
}
export function getCatalogItemsTransfer(iTransferTypeID,HotelArrivalCode,HotelDeparturCode,NumPax){
  return{
    type : GETCATALOGITEMSTRANSFER,
    payload : wmGetCatalogItemsVtm_Webservice(iTransferTypeID,HotelArrivalCode,HotelDeparturCode,NumPax)
  }
}
export function getItemsTransferByCart(){
  // este action lo que hace es solicitar los items y calcular el precio, para asi devolver el total de acuerdo al itemscart y evitar calcularlo en el front de react
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

  return{
     type : GETITEMSTRANSFERBYCART,
     payload : cartItems
   }

}
export function clearSearch(){
  return {
    type: CLEARSEARCH
  }
}

export function setNewDataItemToCart(item){
  return{
    type : SETNEWDATAITEMTOCART,
    payload :  wmGetCatalogItemsVtm_Webservice(item.type,item.arrivalHotel,item.departureHotel,item.passengers)
  }
}
export function resetNewDataItemToCart(){
  return{
    type : RESETNEWDATAITEMTOCART,
    payload : []
  }
}
export function wmGetConfigVtm(){
  return {
    type : GETCONFIGVTM,
    payload : wmGetConfigVtm_webservice()
  }
}




//Aqui se establecen las funciones predeterminada de tmttransfers para modificarlas ya que regresan promises
function soapHoteles_Webservice(){
  return new Promise(function(res,reject){
    var xmlhttp = new XMLHttpRequest();
    if ("withCredentials" in xmlhttp) {
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
          xmlhttp.open('POST', uriWebService, true);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xmlhttp = new XDomainRequest();
      xmlhttp.open('OPTIONS', uriWebService);

    } else {

      // Otherwise, CORS is not supported by the browser.
      xmlhttp = null;

    }
    // build SOAP request
    var sr =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
          '<soap:Body>' +
            '<wmGetCalagoHoteles xmlns="ThomasMoreService">' +
              '<sClientToken>'+ ClientToken +'</sClientToken>' +
              '<sAppToken>'+ AppToken +'</sAppToken>' +
              '<sleguage>'+sLanguageCode+'</sleguage>' +
              '<iModo>1</iModo>' +
              '<strToken1></strToken1>' +
              '<strToken2>'+ strToken2 +'</strToken2>' +
              '<strToken3></strToken3>' +
              '<strToken4>'+ strToken4 +'</strToken4>' +
              '<strToken5>'+ strToken5 +'</strToken5>' +
            '</wmGetCalagoHoteles>' +
          '</soap:Body>' +
        '</soap:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var xmlDoc = this.responseXML;
                var x = xmlDoc.getElementsByTagName("Table");

                var dataJSON = [];
                for (var i = 0; i< x.length; i++) {
                  var txt = x[i].childNodes[1].textContent;
                  var value = x[i].childNodes[0].textContent;
                  var value = value.trim();
                  var pkHotelID = x[i].childNodes[2].textContent.trim();
                  var ynRRclub = x[i].childNodes[3].textContent.trim();

                  dataJSON.push({"label" : txt ,"value": value ,"pkHotelID" : pkHotelID , "ynRRclub" : ynRRclub });
                }
                res(dataJSON);
            }
        }
    }
    xmlhttp.onerror = function () {
      reject({
        status: 0,
        statusText: xmlhttp.statusText
      });
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
    // send request
    // ...
  });

}

function soapConfig_Webservice(){
  return new Promise(function(res,reject){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', uriWebService, true);

    // build SOAP request
    var sr =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
          '<soap:Body>' +
          '<wmGetCalagoHoteles xmlns="ThomasMoreService">' +
            '<sClientToken>'+ ClientToken +'</sClientToken>' +
            '<sAppToken>'+ AppToken +'</sAppToken>' +
            '<sleguage>'+sLanguageCode+'</sleguage>' +
            '<iModo>3</iModo>' +
            '<strToken1></strToken1>' +
            '<strToken2>'+ strToken2 +'</strToken2>' +
            '<strToken3></strToken3>' +
            '<strToken4>'+ strToken4 +'</strToken4>' +
            '<strToken5>'+ strToken5 +'</strToken5>' +
          '</wmGetCalagoHoteles>' +
          '</soap:Body>' +
        '</soap:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {

                var xmlDoc = this.responseXML;

                var x = xmlDoc.getElementsByTagName("Table");

                var dataJSON = [];
                for (var i = 0; i< x.length; i++) {
                  if(i == 5){
                    var concept = x[i].childNodes[0].textContent;
                    var val = x[i].childNodes[2].textContent;
                    dataJSON.push({"concept" : concept.trim() ,"value": val.trim()  });
                  }
                  if(i == 6){
                    var concept = x[i].childNodes[0].textContent;
                    var val = x[i].childNodes[1].textContent;
                    dataJSON.push({"concept" : concept.trim() ,"value": val.trim() });
                  }
                }
                res(dataJSON);
            }
        }
    }
    xmlhttp.onerror = function () {
      reject({
        status: 0,
        statusText: xmlhttp.statusText
      });
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
    // send request
    // ...
  });

}

function soapConfigTypes_Webservice(){

  return new Promise(function(res,reject){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', uriWebService, true);

    // build SOAP request
    var sr =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
          '<soap:Body>' +
          '<wmGetCalagoHoteles xmlns="ThomasMoreService">' +
            '<sClientToken>'+ ClientToken +'</sClientToken>' +
            '<sAppToken>'+ AppToken +'</sAppToken>' +
            '<sleguage>'+sLanguageCode+'</sleguage>' +
            '<iModo>1</iModo>' +
            '<strToken1></strToken1>' +
            '<strToken2>'+ strToken2 +'</strToken2>' +
            '<strToken3></strToken3>' +
            '<strToken4>'+ strToken4 +'</strToken4>' +
            '<strToken5>'+ strToken5 +'</strToken5>' +
          '</wmGetCalagoHoteles>' +
          '</soap:Body>' +
        '</soap:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              var dataJSON = [];

              if(this.responseXML!=null){

                var xmlDoc = this.responseXML;

                var data1 = xmlDoc.getElementsByTagName("Table1");

                var objeto = [];

                for (var i = 0; i< data1.length; i++) {
                  var obj = {};
                  for(var z = 0; z < data1[i].children.length; z++) {
                    obj[data1[i].childNodes[z].nodeName] = data1[i].childNodes[z].textContent.trim();
                  }
                  objeto.push(obj);//se agrega el resultado
                }

                dataJSON = objeto ;

              }else{
                reject({
                  status: 0,
                  statusText: 'No data in xml'
                });
              }
                res(dataJSON);
            }
        }
    }
    xmlhttp.onerror = function () {
      reject({
        status: 0,
        statusText: xmlhttp.statusText
      });
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
    // send request
    // ...
  });

}

function wmGetCatalogItemsVtm_Webservice(iTransferTypeID,HotelArrivalCode,HotelDeparturCode,NumPax){
  var iTransferTypeID = iTransferTypeID;
  var HotelArrivalCode = HotelArrivalCode;
  var HotelDeparturCode = HotelDeparturCode;
  var NumPax = NumPax;

  return new Promise(function(res,reject){
    var xmlhttp = new XMLHttpRequest();
    if ("withCredentials" in xmlhttp) {
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xmlhttp.open('POST', uriWebService);
    } else if (typeof XDomainRequest != "undefined") {
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xmlhttp = new XDomainRequest();
      xmlhttp.open('POST', uriWebService);
    } else {
      // Otherwise, CORS is not supported by the browser.
      xmlhttp = null;
    }

    // build SOAP request
    var sr =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
          '<soap:Body>' +
            '<wmGetCatalogItemsVtm xmlns="ThomasMoreService">' +
              '<sLanguageCode>'+ sLanguageCode +'</sLanguageCode>' +
              '<sItemCode></sItemCode>' +
              '<sAttributeCodes></sAttributeCodes>' +
              '<iTransferTypeID>'+ iTransferTypeID +'</iTransferTypeID>' +
              '<sItemTypeCodes></sItemTypeCodes>' +
              '<sHotelArrivalCode>'+ HotelArrivalCode +'</sHotelArrivalCode>' +
              '<sHotelDeparturCode>'+ HotelDeparturCode +'</sHotelDeparturCode>' +
              '<iNumPax>'+ NumPax +'</iNumPax>' +
              '<sClientToken>'+ ClientToken +'</sClientToken>' +
              '<sAppToken>'+ AppToken +'</sAppToken>' +
              '<strToken1></strToken1>' +
              '<strToken2>'+ strToken2 +'</strToken2>' +
              '<strToken3></strToken3>' +
              '<strToken4>'+ strToken4 +'</strToken4>' +
              '<strToken5>'+ strToken5 +'</strToken5>' +
            '</wmGetCatalogItemsVtm>' +
          '</soap:Body>' +
        '</soap:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var xmlDoc = xmlhttp.responseXML;

                var data = xmlDoc.getElementsByTagName("Table");
                var result = xmlDoc.getElementsByTagName("tblResult");


                var dataJSON = [];
                var codResult = result[0].childNodes[0].textContent;//obtener el codigo status de la peticion
                var descResult = result[0].childNodes[1].textContent;//obtener el codigo status de la peticion
                dataJSON.push({"iResult" : codResult.trim() ,"sResult": descResult.trim()  });//se agrega el resultado

                if(codResult == "1"){

                  for (var i = 0; i< data.length; i++) {
                    var obj = {};
                    for(var z = 0; z < data[i].children.length; z++) {
                      obj[data[i].childNodes[z].nodeName] = data[i].childNodes[z].textContent.trim();
                    }
                    dataJSON.push(obj);//se agrega el resultado
                  }
                }

                res(dataJSON);
            }
        }
    }
    xmlhttp.onerror = function () {
      reject({
        status: 0,
        statusText: xmlhttp.statusText
      });
    }
    // Send the POST request
    xmlhttp.setRequestHeader('content-Type', 'text/xml');
    xmlhttp.send(sr);
    // send request
    // ...
  });

}


//obtener los items transfers pasando el tipo de servicio y los id del hotel arrival y departure
function wmGetConfigVtm_webservice(){

  return new Promise(function(res,reject){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', uriWebService, true);
    // build SOAP request
    var sr =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
          '<soap:Body>' +
            '<wmGetCalagoHoteles xmlns="ThomasMoreService">' +
              '<sClientToken>'+ ClientToken +'</sClientToken>' +
              '<sAppToken>'+ AppToken +'</sAppToken>' +
              '<sleguage>'+sLanguageCode+'</sleguage>' +
              '<iModo>2</iModo>' +
              '<strToken1></strToken1>' +
              '<strToken2>'+ strToken2 +'</strToken2>' +
              '<strToken3></strToken3>' +
              '<strToken4>'+ strToken4 +'</strToken4>' +
              '<strToken5>'+ strToken5 +'</strToken5>' +
            '</wmGetCalagoHoteles>' +
          '</soap:Body>' +
        '</soap:Envelope>';


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var xmlDoc = this.responseXML;

                var result = xmlDoc.getElementsByTagName("tblResult");
                var data = xmlDoc.getElementsByTagName("Table");
                var data1 = xmlDoc.getElementsByTagName("Table1");
                var data2 = xmlDoc.getElementsByTagName("Table2");
                var data3 = xmlDoc.getElementsByTagName("Table3");
                var data4 = xmlDoc.getElementsByTagName("Table4");
                var data5 = xmlDoc.getElementsByTagName("Table5");


                var dataJSON = [];
                var codResult = result[0].childNodes[0].textContent;//obtener el codigo status de la peticion
                var descResult = result[0].childNodes[1].textContent;//obtener el codigo status de la peticion
                dataJSON.push({"iResult" : codResult.trim() ,"sResult": descResult.trim()  });//se agrega el resultado

                if(codResult == "1"){


                  var objeto = [];
                  for (var i = 0; i< data.length; i++) {
                    var obj = {};
                    for(var z = 0; z < data[i].children.length; z++) {
                      obj[data[i].childNodes[z].nodeName] = data[i].childNodes[z].textContent.trim();
                    }
                    objeto.push(obj);//se agrega el resultado
                  }

                  dataJSON.push(objeto);
                  objeto = [];
                  for (var i = 0; i< data1.length; i++) {
                    var obj = {};
                    for(var z = 0; z < data1[i].children.length; z++) {
                      obj[data1[i].childNodes[z].nodeName] = data1[i].childNodes[z].textContent.trim();
                    }
                    objeto.push(obj);//se agrega el resultado
                  }
                  dataJSON.push(objeto);
                  objeto = [];
                  for (var i = 0; i< data2.length; i++) {
                    var obj = {};
                    for(var z = 0; z < data2[i].children.length; z++) {
                      obj[data2[i].childNodes[z].nodeName] = data2[i].childNodes[z].textContent.trim();

                    }
                    objeto.push(obj);//se agrega el resultado
                  }
                  dataJSON.push(objeto);
                  objeto = [];
                  for (var i = 0; i< data3.length; i++) {
                    var obj = {};
                    for(var z = 0; z < data3[i].children.length; z++) {
                      obj[data3[i].childNodes[z].nodeName] = data3[i].childNodes[z].textContent.trim();
                    }
                    objeto.push(obj);//se agrega el resultado
                  }
                  dataJSON.push(objeto);
                  objeto = [];
                  for (var i = 0; i< data4.length; i++) {
                    var obj = {};
                    for(var z = 0; z < data4[i].children.length; z++) {
                      obj[data4[i].childNodes[z].nodeName] = data4[i].childNodes[z].textContent.trim();
                    }
                    objeto.push(obj);//se agrega el resultado
                  }
                  dataJSON.push(objeto);
                  objeto = [];
                  for (var i = 0; i< data5.length; i++) {
                    var obj = {};
                    for(var z = 0; z < data5[i].children.length; z++) {
                      obj[data5[i].childNodes[z].nodeName] = data5[i].childNodes[z].textContent.trim();
                    }
                    objeto.push(obj);//se agrega el resultado
                  }
                  dataJSON.push(objeto);
                  objeto = [];
                }


                res(dataJSON);
            }
        }
    }
    xmlhttp.onerror = function () {
      reject({
        status: 0,
        statusText: xmlhttp.statusText
      });
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
    // send request
    // ...
  });

}
