import React from 'react'
import ReactDOM from 'react-dom'

import {ToursOfferTheme} from '../data_config';

class Item extends React.Component{
  constructor(props){
    super(props);
    this.state={
      openInfo:false,
    }
    this.openInfo = this.openInfo.bind(this);

  }
  openInfo(event){
    event.preventDefault();
    this.setState({openInfo : !this.state.openInfo});
    return false;
  }
  render(){
    var that = this;
    let price,image;
      if(this.props.dataItem.ItemTypeCode.trim()=='SHARED'){
        price=(<span>$ {parseFloat(this.props.dataItem.PriceUSD).toFixed(2)} Per passenger(s) / Taxes included </span>);
      }else{
        price =(<span>$ {parseFloat(this.props.dataItem.PriceUSD).toFixed(2)} Per Vehicle / Taxes included </span>);
      }

      if(this.props.dataItem.attributeImage){
        image = this.props.dataItem.attributeImage.trim();
        image = image.split('~/Content/');
        image = image[1];
      }else{
        image = "img/imagen1.jpg";
      }

    //{this.props.dataItem.attributeDescriptioni}
    var WrapInfo =`wrap-information ${this.state.openInfo?"active":""}`;

    return(
      <div className="wrap">
        <div className="wrap-image">
            <img  src={image} alt="" />
        </div>
        <div className="wrap-description">
            <h2>{this.props.dataItem.attributeTypes}</h2>
            <h3>{this.props.dataItem.ItemClassDesc}</h3>
            <p className="wrap-description-text">
              {this.props.dataItem.ItemDesc}<br></br>
            <strong style={{color:'black'}}>{this.props.dataItem.attributePax}</strong><br></br>
            <span>{price}</span><br></br>
              <span style={{color:'black'}}>For {this.props.passengers} passengers</span>
            </p>
            <div className="wrap-description-prices">
              <label>Total  <small>$</small> {parseFloat(this.props.dataItem.TotalPriceUSD).toFixed(2)} <span>USD</span></label>
            </div>
            <button onClick={this.props.onCLick.bind(this,this.props.dataItem) } value={this.props.dataItem.ItemCode.trim()} className="wrap-description-button" >ADD TO CART</button>
            <a onClick={this.openInfo} className="wrap-description-info" href="#">More details <i className="material-icons">info</i></a>
        </div>
        <div className={WrapInfo}>
          <div className="wrap-information-action"><i onClick={this.openInfo} className="material-icons">close</i></div>

        <p dangerouslySetInnerHTML={{__html: this.props.dataItem.attributeDescriptioni}}></p>
        </div>
      </div>
    );
  }

}
//            <button onClick={this.props.onCLick.bind(this,parseFloat(this.props.dataItem.TotalPriceUSD).toFixed(2) ) } value={this.props.dataItem.ItemCode.trim()} className="wrap-description-button" >BOOK NOW</button>

//
class ListItems extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataItems : this.props.dataItems
    }
    //this.eventoButton = this.eventoButton.bind(this);
  }
  componentWillReceiveProps(nextProps){

      this.setState({
        dataItems : nextProps.dataItems
      });
      return true;
  }

  renderItems(){
    var that = this;
    let ThemeTours = ToursOfferTheme;
    //onsole.log(ThemeTours);
    let items = this.state.dataItems.map(function(item,index){
      if(index>0){
        return <Item  key={index} passengers={that.props.passengers} onCLick={that.props.evento} dataItem={item} />;
      }
    });
    if(this.state.dataItems.length > 0){
      return(
        <div className={`${ToursOfferTheme? "ThemeTours":""}`}>
          {items}
        </div>
      );
    }
  }
  render(){
    return(
      <div className={`results-result ${ToursOfferTheme? "ThemeTours":""}`}>
        { this.renderItems()}
      </div>
    );
  }

}


export default ListItems;
