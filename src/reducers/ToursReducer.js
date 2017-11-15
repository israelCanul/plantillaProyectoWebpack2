import { FETCHTOURS} from '../actions/index';

const INITIAL_STATE = {itemsCart : []};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCHTOURS:
    let arrayTours = {items : [],banner : [],categories : [] }
    return { ...state, tours:action.payload};
  default:
    return state;
  }
}



//GETINFOTOURS
