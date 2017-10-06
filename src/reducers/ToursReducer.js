import { FETCHTOURS,FETCHCARTITEMS,SETCARTITEMS,UPDATECARTITEM,DELETECARTITEM,GETTOURINFO,GETTOURCAT,GETINFOTOURS,SETITEMSCOMPARE,GETITEMSCOMPARE,DELETEITEMCOMPARE,FETCHSPECIALTOURS,ADDINFOSPECIALTOUR} from '../actions/index';
import { GETITEMSTRANSFERBYCART} from '../actions/actionsTransfer';
import {parseString} from 'xml2js';

const INITIAL_STATE = { itemsCart : [],itemsCompare : []};

export default function(state = INITIAL_STATE, action) {

  switch(action.type) {
  case FETCHTOURS:
    let arrayTours = {items : [],banner : [],categories : [] }
    action.payload.forEach(function(childSnapshot) {
         switch (childSnapshot.key) {
           case "items":
             arrayTours.items = childSnapshot.val();
             break;
           case "banner":
             arrayTours.banner = childSnapshot.val();
             break;
           case "categories":
             arrayTours.categories = childSnapshot.val();
             break;
         default:
         }
    });
    return { ...state, tours: arrayTours};
  case FETCHSPECIALTOURS:
    let array = {
      items : [],
      src : "",
      title : "",
      color : ""
    }
    //console.log();

    action.payload.forEach(function(childSnapshot) {

         switch (childSnapshot.key) {
           case "items":
             array.items = childSnapshot.val();

            //  array.items.forEach(function(item,id){
            //     console.log(item);
            //  });
             break;
           case "src":
             array.src = childSnapshot.val();
             break;
           case "title":
             array.title = childSnapshot.val();
             break;
           case "color":
             array.color = childSnapshot.val();
             break;
           default:
         }
    });
    return{...state,specialTours :array }
  case SETITEMSCOMPARE:
    return {...state, itemsCompare : action.payload};// generamos un array nuevo
  case GETITEMSCOMPARE:
    return {...state, itemsCompare : action.payload };// generamos un array nuevo
  case DELETEITEMCOMPARE:
    return {...state, itemsCompare : action.payload };// generamos un array nuevo
  case FETCHCARTITEMS:
      return {...state, itemsCart :action.payload  };
  case SETCARTITEMS:
      return {...state, itemsCart : action.payload };
  case UPDATECARTITEM:
        return {...state, itemsCart : action.payload}
  case GETITEMSTRANSFERBYCART:
    return { ...state, itemsCart : action.payload };
  case DELETECARTITEM:
    return {...state,itemsCart : action.payload };
  case GETTOURINFO:
    let dataInfo = "Item tour not found"
    if(action.payload.val()){
      //console.log(action.payload.val());
      // var item = "mi";
      // var string = "foemiterom0tem8s";
      //
      // console.log(string.search(item));

      action.payload.forEach(function(childSnapshot) {
           //console.log(childSnapshot.val());
           dataInfo = childSnapshot.val();
      });
    }

      // action.payload.forEach(function(childSnapshot) {
      //      switch (childSnapshot.key) {
      //        case "items":
      //          arrayTours.items = childSnapshot.val();
      //          break;
      //        case "banner":
      //          arrayTours.banner = childSnapshot.val();
      //          break;
      //      default:
      //      }
      // });



      return {...state, dataTour : dataInfo };
  case GETTOURCAT:
      return {...state, dataCat : action.payload };
  case GETINFOTOURS:
      var xmlDoc = action.payload.request.responseXML;
      var x = xmlDoc.getElementsByTagName("Table");
      var dataJSON = [];

      for (let id in x) {
        let tour;
          if(x[id].outerHTML){
            tour = x[id].outerHTML;
            parseString(tour, function (err, result) {
              //console.dir(result.Table);
              result.Table.AttributeTypeCodeDESC = result.Table.AttributeTypeCodeDESC[0].trim();
              result.Table.AttributeTypeCodeNAME = result.Table.AttributeTypeCodeNAME[0].trim();
              result.Table.AttributeTypeCodeTHUMB = result.Table.AttributeTypeCodeTHUMB[0].trim();
              result.Table.ItemAttributeDESC = result.Table.ItemAttributeDESC[0].trim();
              result.Table.ItemAttributeNAME = result.Table.ItemAttributeNAME[0].trim();
              result.Table.ItemAttributeTHUMB = result.Table.ItemAttributeTHUMB[0].trim();
              result.Table.ItemClassDesc = result.Table.ItemClassDesc[0].trim();
              result.Table.ItemClassDescEsp = result.Table.ItemClassDescEsp[0].trim();
              result.Table.ItemCode = result.Table.ItemCode[0].trim();
              result.Table.ItemDesc = result.Table.ItemDesc[0].trim();
              result.Table.PriceMX = result.Table.PriceMX[0].trim();
              result.Table.PriceUSD = result.Table.PriceUSD[0].trim();
              result.Table.TipAmount = result.Table.TipAmount[0].trim();
              result.Table.pkItemID = result.Table.pkItemID[0].trim();
              dataJSON.push(result.Table);
            });
          }
      }
      return {...state, toursInfo : dataJSON  };
   case ADDINFOSPECIALTOUR:
   //obtenemos los parametros que se enviaron
    let params = new URLSearchParams(action.payload.config.data);

    let regularPrice = 0;
    let childPrice = 0;
    //console.log(action.payload.request);
    var xmlDoc = action.payload.request.responseXML;
    //console.log(xmlDoc);
    var x = xmlDoc.getElementsByTagName("Table");
    //console.log(x);
    parseString(x[0].outerHTML, function (err, result) {
      if(err){
        //console.dir(err);
      }else{
        //console.log(result);
      }
    });

     var dataJSON = [];
     if(x.length){
       if(x.length > 0){
          if(x[0].outerHTML){
            parseString(x[0].outerHTML, function (err, result) {
              if(err){
                regularPrice = "Item does not exists or not is active";
              }else{
                if(result.Table.Column1 && result.Table.Column2){
                  regularPrice = result.Table.Column2[0].trim();
                }else{
                  let tem = {Description : result.Table.Description[0].trim(),
                  ItemDesc : result.Table.ItemDesc[0].trim(),
                  ItemVariantID : result.Table.ItemVariantID[0].trim(),
                  NetAmountMX : result.Table.NetAmountMX[0].trim(),
                  NetAmountUSD : result.Table.NetAmountUSD[0].trim(),
                  PriceMX : result.Table.PriceMX[0].trim(),
                  PriceUSD : result.Table.PriceUSD[0].trim(),
                  PriceUSDTip : result.Table.PriceUSDTip[0].trim(),
                  TaxAmountMX : result.Table.TaxAmountMX[0].trim(),
                  TaxAmountUSD : result.Table.TaxAmountUSD[0].trim(),
                  VarCode : result.Table.VarCode[0].trim(),
                  VarID : result.Table.VarID[0].trim(),
                  iPlaceId : result.Table.iPlaceId[0].trim(),
                  pkItemID : result.Table.pkItemID[0].trim()}
                  regularPrice = tem;
                }
              }
            });
          }
          if(x[1]){
            if(x[1].outerHTML){
              parseString(x[1].outerHTML, function (err, result) {
                if(err){
                  childPrice = "Item does not exists or not is active";
                }else{
                  let tem = {Description : result.Table.Description[0].trim(),
                    ItemDesc : result.Table.ItemDesc[0].trim(),
                    ItemVariantID : result.Table.ItemVariantID[0].trim(),
                    NetAmountMX : result.Table.NetAmountMX[0].trim(),
                    NetAmountUSD : result.Table.NetAmountUSD[0].trim(),
                    PriceMX : result.Table.PriceMX[0].trim(),
                    PriceUSD : result.Table.PriceUSD[0].trim(),
                    PriceUSDTip : result.Table.PriceUSDTip[0].trim(),
                    TaxAmountMX : result.Table.TaxAmountMX[0].trim(),
                    TaxAmountUSD : result.Table.TaxAmountUSD[0].trim(),
                    VarCode : result.Table.VarCode[0].trim(),
                    VarID : result.Table.VarID[0].trim(),
                    iPlaceId : result.Table.iPlaceId[0].trim(),
                    pkItemID : result.Table.pkItemID[0].trim()}
                    childPrice = tem;
                }
              });
            }
          }else{
            childPrice = "Item does not exists or not is active";
          }
       }
    }
    state.specialTours.items.map((item,id)=>{
       if(item.id == params.get("strItemCode")){
         item.priceDetail = {regularPrice : regularPrice,childPrice : childPrice};
       }
    });
   return {...state, specialTours : state.specialTours  };
  default:
    return state;
  }
}



//GETINFOTOURS
