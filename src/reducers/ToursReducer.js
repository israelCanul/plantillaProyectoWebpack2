import {
  FETCHTOURS,
  UPLOADIMAGESECTION
  } from '../actions/index';

const INITIAL_STATE = {itemsCart : []};

export default function(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch(action.type) {
  case FETCHTOURS:
    let arrayTours = {items : [],banner : [],categories : [] }
    return { ...state, tours:action.payload};
  case UPLOADIMAGESECTION:

    return { ...state, image:[]};
  default:
    return state;
  }
}




//GETINFOTOURS
