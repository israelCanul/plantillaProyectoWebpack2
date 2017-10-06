import React,{Component} from 'react';
//inputs
import SelectControl from '../../inputs/selectControl';
import { DateField, TransitionView, Calendar,DatePicker } from 'react-date-picker'

// components
import ItemUpdate from './update_item';


import moment from 'moment';// for time and date format

import {typeTransConfig , typeTransDescription} from '../../data_config';
let { ARRIVAL, DEPARTURE, ROUNDTRIP } = typeTransConfig; // constantes para los tipos de transfers
let {  ARRIVALDESC,  DEPARTUREDESC,  ROUNDTRIPDESC } = typeTransDescription;

class ItemTrans extends Component{
  constructor(props){
    super(props);
    this.state={
      arrivalDate : '2016-04-24',
      departureDate : '2016-04-24',
      formato : "YYYY-MM-DD",
      minDate : "",
      minDateOut : "",
      adults:[],
      children : [],
      height : 0,
      typeTrans : 'ARRIVAL',
      tranferItems : [],
      isMovil : true,
    }
    this.isMovil = this.isMovil.bind(this);
    this.datefieldIn = this.datefieldIn.bind(this);
    this.datefieldOut = this.datefieldOut.bind(this);

    this.renderDateIn = this.renderDateIn.bind(this);
    this.renderDateOut = this.renderDateOut.bind(this);

    this.renderDateOutWithoutMovil = this.renderDateOutWithoutMovil.bind(this);
    this.renderDateInWithoutMovil = this.renderDateInWithoutMovil.bind(this);

    this.setNewData = this.setNewData.bind(this);
    this.renderModalUpdateDataItem = this.renderModalUpdateDataItem.bind(this);


    //evento bind para setear de nuevo el cart con el item actualizado
    this.setItemTransToCart = this.setItemTransToCart.bind(this);

    window.addEventListener("resize", this.isMovil);
  }
  setNewData(){
    console.log('ss');
    let that = this;
    setTimeout(()=>{
      let obj = {
        arrivalDate : that.state.arrivalDate,
        departureDate : that.state.departureDate,
        passengers : that.passengersSelect.state.value,
        type : that.props.itemData.transferType,
        arrivalHotel : that.props.itemData.arrivalHotel,
        departureHotel : that.props.itemData.departureHotel
      }
      that.props.setNewDataToCart(obj,this.props.idCart);
    },100);
  }
  createOptions(count){
    let temp = [];
    for (var i = 1; i <= count; i++) {
      temp.push({ value: i, label: i });
    }
    return temp;
  }
  datefieldIn(date){
    // la fecha seleccionada se anexa al arrival date y se actualiza la info del departure date
    let fecha = moment(date,this.state.formato);
    this.setState({arrivalDate : fecha.format(this.state.formato) });
    let minDateOut = moment(date).add(1,"days");

    if(this.state.typeTrans==ARRIVAL){
      this.setState({
        departureDate : fecha.format(this.state.formato)
      });
    }else{
      let dateOut = moment(this.state.departureDate);
      if(fecha.format("YYYY-MM-DD") > dateOut.format("YYYY-MM-DD")){
        this.setState({
            departureDate : fecha.format("YYYY-MM-DD"),
            minDateOut : fecha.format("YYYY-MM-DD"),
        });
      }else{
        this.setState({
            minDateOut : fecha.format("YYYY-MM-DD"),
        });
      }
    }
    this.setNewData();
  }
  datefieldOut(date){
    // la fecha seleccionada se anexa al arrival date y se actualiza la info del departure date
    var fecha = moment(date,this.state.formato);
    this.setState({departureDate : fecha.format(this.state.formato) });
    let minDateOut = moment(date).add(1,"days");

    if(this.state.typeTrans==DEPARTURE){
      this.setState({
        arrivalDate : fecha.format(this.state.formato)
      });
    }
    this.setNewData();
  }
  isMovil(){
    let h = this.people.clientHeight;
    this.setState({height:h});
    if(window.innerWidth>=767){
      this.setState({isMovil : false});
    }else{
      this.setState({isMovil : true});
    }
  }
  componentDidMount(){
    setTimeout(()=>{
      this.isMovil();
    },100);
  }
  componentWillMount(){

    let {tipo,clase} = this.props.typeTrans[this.props.itemData.transferType];
    let datein,dateout;
    let date =  moment().add('1','days');
    let fechaA= moment(this.props.itemData.arrivalDate);//  se inicializa de acuerdo al numero de dias pasado
    let fechaD =  moment(this.props.itemData.departureDate);// se inicializa de acuerdo al numero de dias pasado

    // se inicializa la info de las fecha para que se apliquen las restricciones
    this.setState({
        arrivalDate:fechaA.format("YYYY-MM-DD"),
        departureDate:fechaD.format("YYYY-MM-DD"),
        minDate:date.format("YYYY-MM-DD"),
        minDateOut : date.format("YYYY-MM-DD"),
    });
    // se agrega el id del tipo de tranfer de acuerdo al codigo (dinamico de acuerdo al web service)
    this.setState({typeTrans : tipo});
     this.setState({adults : this.createOptions(10)});

  }
  renderDateIn(){
    if((this.state.typeTrans == ARRIVAL || this.state.typeTrans == ROUNDTRIP) && this.state.isMovil ){
      return(
        <div className="date-item margin-in-medium-top">
          <label className="margin-in-small-right">Arrival</label>
          <DateField
            forceValidDate
            dateFormat={this.state.formato}
            showClock={false}
            updateOnDateClick={true}
            collapseOnDateClick={true}
            value={this.state.arrivalDate}
            footer={false}
            minDate={this.state.minDate}
            ref={i=>this.selectedDateIn=i} >
              <DatePicker
                onChange={this.datefieldIn}
                style={{padding: 10}}
                ref="checkinDate"
                navigation={true}
                locale="en"
                forceValidDate={true}
                highlightWeekends={true}
                highlightToday={false}
                weekNumbers={true}
                weekStartDay={0}
                weekNumbers={false}
                />
        </DateField>
        </div>
      );
    }
  }
  renderDateOut(){
    if((this.state.typeTrans == DEPARTURE || this.state.typeTrans == ROUNDTRIP) && this.state.isMovil){
    return(
        <div className="date-item margin-in-medium-top">
          <label className="margin-in-small-right">Departure</label>
          <DateField
            forceValidDate
            dateFormat={this.state.formato}
            showClock={false}
            updateOnDateClick={true}
            collapseOnDateClick={true}
            value={this.state.departureDate}
            footer={false}
            minDate={this.state.minDateOut}
            ref={i=>this.selectedDateOut=i} >
              <DatePicker

                onChange={this.datefieldOut}
                style={{padding: 10}}
                ref="checkOutDate"
                navigation={true}
                locale="en"
                forceValidDate={true}
                highlightWeekends={true}
                highlightToday={false}
                weekNumbers={true}
                weekStartDay={0}
                weekNumbers={false}
                />
        </DateField>
        </div>
      );
    }
  }
  renderDateInWithoutMovil(){

    if((this.state.typeTrans == ARRIVAL || this.state.typeTrans == ROUNDTRIP) && !this.state.isMovil ){
      return (
        <div className="date-item margin-in-medium-top">
          <label className="margin-in-small-right">Arrival</label>
          <DateField
            forceValidDate
            dateFormat={this.state.formato}
            showClock={false}
            updateOnDateClick={true}
            collapseOnDateClick={true}
            value={this.state.arrivalDate}
            footer={false}
            minDate={this.state.minDate}
            ref={i=>this.selectedDateIn=i} >
              <DatePicker
                onChange={this.datefieldIn}
                style={{padding: 10}}
                ref="checkinDate"
                navigation={true}
                locale="en"
                forceValidDate={true}
                highlightWeekends={true}
                highlightToday={false}
                weekNumbers={true}
                weekStartDay={0}
                weekNumbers={false}
                />
        </DateField>
        </div>
      );
    }

  }
  renderModalUpdateDataItem(){
    if(this.props.itemUpdated){
      return(
        <ItemUpdate eventReset={this.closeAndGet.bind(this)} ref={i=>this.ItemsUpdateWrap=i} transferType={this.props.itemData.transferType} setItemTransToCart={this.setItemTransToCart} typeActual={this.props.itemData.itemTrans.data.ItemTypeCode}  items={this.props.itemUpdated} />
      );
    }
  }
  closeAndGet(){
    this.props.resetItemsEvent();
        let datein,dateout;
        let date =  moment().add('1','days');
        let fechaA= moment(this.props.itemData.arrivalDate);//  se inicializa de acuerdo al numero de dias pasado
        let fechaD =  moment(this.props.itemData.departureDate);// se inicializa de acuerdo al numero de dias pasado

        // se inicializa la info de las fecha para que se apliquen las restricciones
        this.setState({
            arrivalDate:fechaA.format("YYYY-MM-DD"),
            departureDate:fechaD.format("YYYY-MM-DD"),
            minDate:date.format("YYYY-MM-DD"),
            minDateOut : date.format("YYYY-MM-DD"),
        });
        // se agrega el id del tipo de tranfer de acuerdo al codigo (dinamico de acuerdo al web service)

         this.setState({adults : this.createOptions(10)});
         this.passengersSelect.setState({value : this.props.itemData.passengers});
  }
  setItemTransToCart(item,event){
    event.preventDefault();
    let temObj= {
      arrivalDate : this.state.arrivalDate,
      departureDate : this.state.departureDate,
      passengers : this.passengersSelect.state.value,
      codeTrans : item.ItemCode,
      transferType : this.props.itemData.transferType,
      total : item.TotalPriceUSD,
      itemTrans  : item
    }
    console.log(temObj);
    this.props.updateCartItemEvent(temObj,this.props.idCart);
    this.ItemsUpdateWrap.setState({clase : ''});
    setTimeout(()=>{
      this.props.resetItemsEvent();
    },400);

  }
  renderDateOutWithoutMovil(){
    let that = this;
    if((this.state.typeTrans == DEPARTURE || this.state.typeTrans == ROUNDTRIP) && !this.state.isMovil){
      return (
        <div className="date-item margin-in-medium-top">
          <label className="margin-in-small-right">Departure</label>
          <DateField
            forceValidDate
            dateFormat={this.state.formato}
            showClock={false}
            updateOnDateClick={true}
            collapseOnDateClick={true}
            value={this.state.departureDate}
            footer={false}
            minDate={this.state.minDateOut}
            ref={i=>this.selectedDateOut=i} >
          >
              <DatePicker
                onChange={this.datefieldOut}
                style={{padding: 10}}
                ref="checkOutDate"
                navigation={true}
                locale="en"
                forceValidDate={true}
                highlightWeekends={true}
                highlightToday={false}
                weekNumbers={true}
                weekStartDay={0}
                weekNumbers={false}
                />
        </DateField>
        </div>
      );
    }
  }
  deleteThisItem(event){
    console.log(this.props.idCart);
    this.props.deleteItemEvent(this.props.idCart);
  }
  render(){
    let individualPrice = 0;
    let totalPrice = "00.00";
    let typeService = '';
    let category = '';
    let transferTypeDesc = '';

    if(this.props.itemData.itemTrans){
      let { PriceUSD, TotalPriceUSD, ItemTypeCode, CategoryCode } = this.props.itemData.itemTrans.data;
      individualPrice = parseFloat(PriceUSD).toFixed(2);
      totalPrice = parseFloat(TotalPriceUSD).toFixed(2);
      typeService = ItemTypeCode;

        switch (this.state.typeTrans) {
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
        <div className="row items-wrap">
          <div className="col s12 close"> <div className="shapes icon-close small after-red before-red" onClick={this.deleteThisItem.bind(this)}></div></div>
          <div className="items-wrap-img col s12 m2 "><img src="/img/img-item-cart.png" /></div>
          <div className="col s12 m10 row ">
            <div className="items-wrap-description col s12 m4 ">
              <h3 className="margin-out">{`${this.state.typeTrans!=DEPARTURE?this.props.itemData.arrivalHotelName:""}${this.state.typeTrans==ROUNDTRIP?" - ":""}${this.state.typeTrans!=ARRIVAL?this.props.itemData.departureHotelName:""} `}</h3>
              <h4 className="margin-out">{`${this.state.typeTrans} - ${typeService} SERVICE`}</h4>
              <h4 className="margin-out"><span className="head">Category: </span>{category}</h4>
              {this.renderDateIn()}
              {this.renderDateOut()}
            </div>
            <div ref={i=>this.people=i} className="items-wrap-people col s12 m3">
              <div className="field">
                <label className="trans">Passengers</label>
                <SelectControl event={this.setNewData} autoWidth={true} ref={i=>this.passengersSelect=i} value={this.props.itemData.passengers}  optionsTours={this.state.adults} />
              </div>
            </div>
            <div style={{height : this.state.height}} className="items-wrap-price col s12 m2 ">
              <div className="field">
                <label className="price"><span className="label">People: &nbsp;</span><span className="icon">$ </span><span className="cant">{individualPrice}&nbsp;</span><span className="mon"> USD</span></label>
              </div>

            </div>
            <div style={{height : this.state.height}} className="items-wrap-subtotal col s12 m2 ">
              <div className="field">
                <label className="price subtotal "><span className="icon">$ </span><span className="cant">{ totalPrice }&nbsp;</span><span className="mon"> USD</span></label>
              </div>
            </div>
            <div className="col s12 datefieldsNoMovil">
              {this.renderDateInWithoutMovil()}
              {this.renderDateOutWithoutMovil()}

            </div>

          </div>
          {
            this.renderModalUpdateDataItem()
          }

        </div>
    );
  }
}






export default ItemTrans;
