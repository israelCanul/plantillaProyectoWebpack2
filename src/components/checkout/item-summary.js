import React,{Component} from 'react';
//data config
import {typeTransConfig , typeTransDescription} from '../../data_config';
let { ARRIVAL, DEPARTURE, ROUNDTRIP } = typeTransConfig; // constantes para los tipos de transfers
let {  ARRIVALDESC,  DEPARTUREDESC,  ROUNDTRIPDESC } = typeTransDescription;

class ItemSummary extends Component{
  constructor(props){
    super(props);
    this.state={
    }
    this.renderItem = this.renderItem.bind(this);
  }
  componentDidMount(){

  }
  componentDidMount(){

  }
  deleteThisItemSummary(){

    this.props.deleteThisItem(this.props.idCart);
  }
  renderItem(){
    if(!this.props.itemData.codeTrans && !this.props.itemData.transferType){

    }else{
      return  <ItemTrans deleteThis={this.deleteThisItemSummary.bind(this)}  itemData={this.props.itemData}  typeTrans={this.props.typeTrans[this.props.itemData.transferType]} />;
    }
  }
  render(){
    return(
      <div className="col s12 items">
        {this.renderItem()}
      </div>
    );
  }
}

//<div className="shapes icon-close small after-red before-red" onClick={props.deleteThis}></div>
//constante para mostrar los valores del item transfer
const ItemTrans = (props)=>{
  let individualPrice = 0;
  let totalPrice = "00.00";
  let typeService = '';
  let category = '';
  let transferTypeDesc = '';
  let { PriceUSD, TotalPriceUSD, ItemTypeCode, CategoryCode } = props.itemData.itemTrans.data;

  if(props.itemData.itemTrans){
    individualPrice = parseFloat(PriceUSD).toFixed(2);
    totalPrice = parseFloat(TotalPriceUSD).toFixed(2);
    typeService = ItemTypeCode;
    switch (props.typeTrans.tipo) {
      case ARRIVAL:
        transferTypeDesc = ARRIVALDESC;
        break;
      case DEPARTURE:
        transferTypeDesc =  DEPARTUREDESC;
        break;
      case ROUNDTRIP:
        transferTypeDesc =  ROUNDTRIPDESC;
        break;
    }
    category =  CategoryCode + " (" + transferTypeDesc + ")";
  }
  return(
    <div className="row itemTrans ">
      <div className="col s12 m3">
        <h3 className="margin-out naranjaDiseno-text">{`${props.typeTrans.tipo!=DEPARTURE?props.itemData.arrivalHotelName:""}${props.typeTrans.tipo==ROUNDTRIP?" - ":""}${props.typeTrans.tipo!=ARRIVAL?props.itemData.departureHotelName:""} `}</h3>
        <i onClick={props.deleteThis} className="material-icons black-text ">delete_forever</i>
      </div>
      <div className="col s12 m3 ">
        <h3 className="naranjaDiseno-text">{`${props.typeTrans.tipo} - ${ItemTypeCode} SERVICE`}</h3>
        <h4>{`Category: ${category}`}</h4>
      </div>
      <div className="col s6 m2 ">
        <h4>{`${props.typeTrans.tipo!=DEPARTURE?"Arrival : "+props.itemData.arrivalDate:""}`}</h4>
        <h4>{`${props.typeTrans.tipo!=ARRIVAL?"Departure : "+props.itemData.departureDate:""}`}</h4>
      </div>
      <div className="col s6 m2 ">
        <h4><span className="azulFuerteDiseno-text">People : </span>{props.itemData.passengers}</h4>

      </div>
      <div className="col s12 m2 ">
        <h4>{` ${individualPrice} USD ${ItemTypeCode=='PRIVATE'?" Per Vehicle / Taxes included ":" Per passenger(s) / Taxes included "} `}</h4>
        <h4 className="naranjaDiseno-text"><span className="azulFuerteDiseno-text">Total : </span>{`$ ${totalPrice} USD`}</h4>
      </div>
    </div>
  );
}
const ItemTour = (props)=>{
  return(
    <div>
      tour
    </div>
  );
}

export default ItemSummary;
