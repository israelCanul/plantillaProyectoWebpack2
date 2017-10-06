import React,{Component} from 'react';
//inputs
import SelectControl from '../../inputs/selectControl';
import { DateField, TransitionView, Calendar,DatePicker } from 'react-date-picker'

import moment from 'moment';// for time and date format


class ItemTour extends Component{
  constructor(props){
    super(props);
    this.state={
      arrivalDate : '2016-04-24',
      formato : "YYYY-MM-DD",
      minDate : "",
      adults:[],
      children : [],
      height : 0,
    }
    this.isMovil = this.isMovil.bind(this);
    this.datefieldIn = this.datefieldIn.bind(this);

    window.addEventListener("resize", this.isMovil);
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
    var fecha = moment(date,"YYYY-MM-DD");
    this.setState({arrivalDate : fecha.format("YYYY-MM-DD") });

  }
  isMovil(){
    let h = this.people.clientHeight;
    this.setState({height:h});
  }
  componentDidMount(){
    setTimeout(()=>{
      this.isMovil();
    },1000);
  }
  componentWillMount(){
     let minDias;
     if(this.props.maxdays){
       minDias= moment().add(this.props.maxdays,'days');//  se inicializa de acuerdo al numero de dias pasado
       this.setState({minDate : minDias.format("YYYY-MM-DD"),arrivalDate : minDias.format("YYYY-MM-DD")});
     }else{
       this.setState({minDate : moment().format("YYYY-MM-DD"),arrivalDate : moment().format("YYYY-MM-DD")});
     }
     this.setState({adults : this.createOptions(10),children : this.createOptions(9)});
  }
  render(){
    return(
        <div className="row items-wrap">
          <div className="col s12 close"> <div className="shapes icon-close small after-red before-red"></div></div>
          <div className="items-wrap-img col s12 m2 "><img src="/img/img-item-cart.png" /></div>
          <div className="items-wrap-description col s12 m4 ">
            <h3 className="margin-out">Whale Shark Adventure (From Cancun)</h3>
            <h4 className="margin-out"><span className="head">Category: </span>Adventure & Parks</h4>
            <div className="date-item margin-in-medium-top">
              <label className="margin-in-small-right">Date </label>
              <DateField
                forceValidDate
                dateFormat={this.state.formato}
                showClock={false}
                updateOnDateClick={true}
                collapseOnDateClick={true}
                value={this.state.arrivalDate}
                footer={false}
                minDate={this.state.minDate}
                ref={i=>this.selectedDate=i}
              >
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
          </div>
          <div ref={i=>this.people=i} className="items-wrap-people col s12 m2">
            <div className="field">
              <label>Adult</label>
              <SelectControl autoWidth={true}  optionsTours={this.state.adults} />
            </div>
            <div className="field">
              <label>Children</label>
              <SelectControl autoWidth={true}  optionsTours={this.state.children} />
            </div>
          </div>
          <div style={{height : this.state.height}} className="items-wrap-price col s12 m2 ">
            <div className="field">
              <label className="price"><span className="label">Adult: &nbsp;</span><span className="icon">$ </span><span className="cant">178.20 </span><span className="mon"> USD</span></label>
            </div>
            <div className="field">
              <label className="price"><span className="label">Children: &nbsp;</span><span className="icon"> $ </span><span className="cant">178.20 </span><span className="mon"> USD</span></label>
            </div>
          </div>
          <div style={{height : this.state.height}} className="items-wrap-subtotal col s12 m2 ">
            <div className="field">
              <label className="price subtotal "><span className="icon">$ </span><span className="cant">178.20 </span><span className="mon"> USD</span></label>
            </div>
            <div className="field">
              <label className="price subtotal"><span className="icon">$ </span><span className="cant">178.20 </span><span className="mon"> USD</span></label>
            </div>
          </div>
        </div>
    );
  }
}

export default ItemTour;
