import { FETCHTOURS} from '../actions/index';

const INITIAL_STATE = {itemsCart : []};

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
  default:
    return state;
  }
}



//GETINFOTOURS
