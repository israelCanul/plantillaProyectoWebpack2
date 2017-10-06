import React,{Component} from 'react';

//inputs
import SelectControl from '../inputs/selectControl';
import { DateField, TransitionView, Calendar,DatePicker } from 'react-date-picker'

import moment from 'moment';// for time and date format



class TourEngine extends Component{
  constructor(props){
    super(props);
    this.state={
      adults:[],
      children : [],
      arrivalDate : '2016-04-24',
      formato : "YYYY-MM-DD",
      minDate : "",
      arrivalDate : '2016-04-24',
      heightFormIsMovil : "284px",
    }
    //datepicker
    this.datefieldIn = this.datefieldIn.bind(this);
    this.resize = this.resize.bind(this);
    //window.addEventListener("resize", this.resize);
  }
  resize(){
    // let height = this.FormTourEngine.clientHeight;
    // this.setState({heightFormIsMovil : height + "px" });
  }
  datefieldIn(date){
    // la fecha seleccionada se anexa al arrival date y se actualiza la info del departure date
    var fecha = moment(date,"YYYY-MM-DD");
    this.setState({arrivalDate : fecha.format("YYYY-MM-DD") });

  }
  createOptions(count){
    let temp = [];
    for (var i = 1; i <= count; i++) {
      temp.push({ value: i, label: i });
    }
    return temp;
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
  componentDidMount(){
    this.resize();
  }
  render(){
    let height="0px";
    if(this.props.movil && this.props.active){
      height = this.state.heightFormIsMovil;
    }else if(!this.props.movil){
      height=null;
    }
    return(
      <div ref={i=>this.FormTourEngine = i } className={`FormTourEngine ${this.props.movil?" movil":""} ${this.props.movil && this.props.active?" active":""} `}  style={{height : height }}  >
        <div className="FormTourEngine-select">
          <label>Adults</label>
          <SelectControl  optionsTours={this.state.adults} />
        </div>
        <div className="FormTourEngine-select">
          <label>Children</label>
          <SelectControl  optionsTours={this.state.children} />
        </div>
        <div className="FormTourEngine-select">
          <label>Date</label>
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
        <div className="FormTourEngine-select">
          <a className="Select-submit" href="#">ADD TO CART</a>
        </div>
      </div>
    );
  }
}

export default TourEngine;
