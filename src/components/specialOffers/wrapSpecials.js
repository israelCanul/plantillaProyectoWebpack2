import React,{Component} from 'react';
import ItemSpecialOffers from './special_offers_item';
import {convertNativeToArray} from '../../data_config';


class WrapItemsSpecials extends Component{
  constructor(props){
    super(props);
    this.state={
      height: 0,
      M: 1,
      T: 3,
      D:4,
      items : 0,
    }
    this.renderItems= this.renderItems.bind(this); // le proporcionamos a la funcion el contexto en el que se esta creando
    window.addEventListener("resize",this.resize.bind(this));
  }
  componentDidMount(){
    this.resize();
  }
  resize(){
    let items = 0;
    if(window.innerWidth < 767){
      //console.log(window.innerWidth + ' mobil');
      this.setState({items : this.state.M});
      items = this.state.M;
    }else if(window.innerWidth > 767 && window.innerWidth < 1200){
      //console.log(window.innerWidth + ' tablet');
      this.setState({items : this.state.T});
      items = this.state.T;
    }else if(window.innerWidth > 1200){
      //console.log(window.innerWidth + ' desktop');
      this.setState({items : this.state.D});
      items = this.state.D;
    }

  }
  componentWillMount(){
    // let that = this;
    // if(this.props.itemsSpecials){
    //   this.props.itemsSpecials.map((item,id)=>{
    //     that.props.eventToGetPrices(item.id);
    //   });
    //}
  }
  // componentWillReceiveProps(nextProps){
  //   console.log(nextProps);
  //    if(nextProps.itemsSpecials){
  //      nextProps.itemsSpecials.map((item,id)=>{
  //        if(!item.priceDetail){
  //          console.log("no hay precios");
  //        }
  //        //
  //        //nextProps.eventToGetPrices(item.id);
  //      });
  //   }
  //   return true;
  // }
  //<div className="SpecialOfferSection-wrapSpecials row">
  renderItems(){
    let cont= 0;
    let rows = [];
    if(this.props.itemsSpecials && this.state.items>0){
      for (var i = 0; i < (this.props.itemsSpecials.length / this.state.items); i++) {
        let temps=[];
        cont+=this.state.items;
        for (var z = (cont-this.state.items); z < cont; z++) {

           if(z < this.props.itemsSpecials.length){
             //console.log(" items "+this.props.itemsSpecials[z].id);
             temps.push(<ItemSpecialOffers getDataInfo={this.props.eventToGetPrices} key={z} data={this.props.itemsSpecials[z]} /> );
           }
        }
        rows.push(
          <div key={i} className="SpecialOfferSection-wrapSpecials row">
            {temps}
          </div>
        );
      }
    }


    return rows.map((item,id)=>{
      return item;
    });
  }

  render(){
    return(
      <div className="SpecialOfferSection" >
          {this.renderItems()}
      </div>
    );
  }
}
export default WrapItemsSpecials;
