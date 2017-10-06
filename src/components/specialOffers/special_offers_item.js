import React,{Component} from 'react';
import {CODEPRICETOURS,ABREVING,ABREVESP} from '../../data_config';
let IDIOMA = ABREVING;


if(location.hostname == "thomasmoretravel.com.mx"){
    IDIOMA = ABREVESP;
}
let urlToToursDescription = "http://www.thomasmoretravel.com/app/TourDetail.aspx?4=";


class ItemSpecialOffers extends Component{
  constructor(props){
    super(props);
    this.state={

    }
    window.addEventListener("resize",this.resize.bind(this));
  }
  resize(){

  }
  componentWillMount(){
    //console.log(this.props.data);
    // if(this.props.data.id){
    //   this.props.getDataInfo(this.props.data.id);
    // }
  }
  componentWillReceiveProps(nextProps){
    //console.log("item - "+nextProps.data.id);

    return true;
  }
  render(){
    if(!this.props.data.priceDetail){
      this.props.getDataInfo(this.props.data.id);
    }
    let pricesItems = [];
    if(this.props.data.priceDetail){
      if(this.props.data.priceDetail.childPrice != "Item does not exists or not is active"){
        CODEPRICETOURS.map((item,id)=>{
          //console.log(item);
          if(item == this.props.data.priceDetail.childPrice.VarCode){
            pricesItems.push(<PriceItem data={item} price={this.props.data.priceDetail.childPrice} key={id} />);
          }
        });
      }
      // else{
      //     pricesItems.push(<i alt="Item does not exists or not is active" className="material-icons red-text noprice">warning</i>);
      // }
      if(this.props.data.priceDetail.regularPrice != "Item does not exists or not is active"){
        CODEPRICETOURS.map((item,id)=>{
          //console.log(item);
          if(item == this.props.data.priceDetail.regularPrice.VarCode){
            pricesItems.push(<PriceItem data={item} price={this.props.data.priceDetail.regularPrice} key={id} />);
          }
        });
      }
      // else{
      //   pricesItems.push(<i alt="Item does not exists or not is active"
      //   className="material-icons red-text noprice">warning</i>);
      // }
    }
    return(
      <div ref={i=> this.SpecialItem = i} style={{marginLeft: 'initial'}} className="SpecialItem col s12 m4 l3 OtherAzulFuerte padding-in-small">
        <img className="img img-responsive bg" src={this.props.data.img} />
        <div className="SpecialItem-description">
          <h1 className="margin-out text oswald naranjaDiseno-text">{this.props.data.label}</h1>
          <h2 className="margin-out text oswald white-text">{this.props.data.subLabel}</h2>
          <div className="priceDescriptions wrap-items wrap-items-row center-vertical">
            {pricesItems}
          </div>
          <div className="includes margin-in-small-top margin-in-small-bottom">
            <label className="text oswald naranjaDiseno-text margin-in-small-right">Included</label>
            <img src={this.props.data.urlImgInclude} />
          </div>
          <div>
            <a className="btn white-text text oswald" href={`${urlToToursDescription+this.props.data.id}`}>Select</a>
          </div>
        </div>
      </div>
    );
  }
}

const PriceItem = ({data,price})=>{
  let {Description} = data;
  let cost;
  if(IDIOMA == ABREVESP){
   cost = price.priceDetailPriceMX;
  }else{
   cost = price.PriceUSD;
  }
  return(
    <div className="priceItem">
      <label className="text oswald naranjaDiseno-text">{data}</label>
      <p className="margin-out white-text text oswald">{`$ ${parseFloat(cost).toFixed(2)}`}</p>
    </div>
  );
}
export default ItemSpecialOffers;
