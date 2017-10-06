import { combineReducers } from 'redux';
import ToursReducer from './ToursReducer';
import BookTransferReducer from './BookTransferReducer';

//data config
import {prodCodeAnalitics} from '../data_config';

//**************
//Analitics [Start]
//**************
import ReactGA from 'react-ga';
ReactGA.initialize(prodCodeAnalitics);
//**************
//Analitics [Ends]
//**************


const rootReducer = combineReducers({
  data: ToursReducer,
  formulario: BookTransferReducer
});

export default rootReducer;
