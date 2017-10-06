import { FETCHTHOTELS,INITIALCONFIG,INITIALCONFIGTYPES,GETCATALOGITEMSTRANSFER,CLEARSEARCH,GETITEMSTRANSFERBYCART,SETNEWDATAITEMTOCART,RESETNEWDATAITEMTOCART,GETCONFIGVTM } from '../actions/actionsTransfer';
const INITIAL_STATE = {itemTrans:[]};

export default function(state = INITIAL_STATE, action) {
  //console.log(action);
  switch(action.type) {
  case FETCHTHOTELS:
    return { ...state, hoteles: action.payload };
  case INITIALCONFIG:
    let days = {
      maxDays:0,
      maxTime : 0,
    };
    action.payload.map((item,id)=>{
      switch (item.concept) {
        case "MAXDAYSRSV":
          days.maxDays = item.value;
          break;
        case "MAXTIMERSV":
          days.maxTime = item.value;
          break;
        default:
      }
    });
    return { ...state, daysRestrictions : days };
  case INITIALCONFIGTYPES:
    let departure = false;
    action.payload.map((item,id)=>{
      if(item.sTransferTypeCode === 'DEPARTURE'){
            departure = true;
      }
    });
    return { ...state, config: action.payload , departure : true };
  case GETCATALOGITEMSTRANSFER:
    return { ...state, itemTrans : action.payload };
  case CLEARSEARCH:
    return { ...state, itemTrans : [] };
  case SETNEWDATAITEMTOCART:
      return { ...state,  itemUpdate : action.payload  };
  case RESETNEWDATAITEMTOCART:

        return { ...state, itemUpdate : undefined };
  case GETCONFIGVTM:
      return { ...state, configTrans : action.payload };
  default:
    return state;
  }
}
