import React,{Component} from 'react';
import ReactDOM from 'react-dom';

// redux libraries
import {connect } from 'react-redux';
import {fetchTours,fetchCartItems,setCartItems,updateCartItem,deleteCartItem} from '../actions/index';
import {initialConfigTransfersType,getItemsTransferByCart,wmGetConfigVtm} from '../actions/actionsTransfer';

import '../../scss/app.scss';
//import 'react-select/dist/react-select.css';


//componentes
import Header from './Header';
import Footer from './Footer';
import Gallery from './tour/gallery';
import Related from './tour/related';
import ItemTour from './cart/tour_cart';
import ItemSummary from './checkout/item-summary';
import FacebookApi from './checkout/facebook_api';
import GoogleApi from './checkout/google_api';
import PersonalInformation from './checkout/personal_information';



//data config
import {itemsMenu,configApp,typeTransDescription,typeTransConfig} from '../data_config';
let {   ARRIVAL, DEPARTURE, ROUNDTRIP  } = typeTransConfig;

class Checkout extends Component{
  constructor(props){
    super(props);
    this.state = {
      movil : false,
      bookEngine : false ,
      transTypeText : [],
      actualizado : false,
      itemCartOnWork : null,
      country  : "",
      countryApi : ""
    }
    this.isMovil = this.isMovil.bind(this);
    this.renderItemsTrans = this.renderItemsTrans.bind(this);
    this.renderItemsTour = this.renderItemsTour.bind(this);
    this.updatePrice = this.updatePrice.bind(this);


    window.addEventListener("resize", this.isMovil);
  }
  componentWillReceiveProps(nextProps){
    let that = this;
    let temp = [];
    if(nextProps.formulario.config){
      nextProps.formulario.config.map((item,id)=>{
        let descriptionType = '';
        if(item.ItemClassCode == DEPARTURE){
          descriptionType = typeTransDescription.DEPARTUREDESC;
        }else if(item.ItemClassCode == ARRIVAL){
          descriptionType = typeTransDescription.ARRIVALDESC;
        }else{
          descriptionType = typeTransDescription.ROUNDTRIPDESC;
        }
         temp[item.pkTransferTypeID] = {tipo:item.sTransferTypeCode,clase:item.ItemClassCode,description:descriptionType };
      });
    }
    this.setState({transTypeText : temp});
  }
  updatePrice(obj,id){
    this.setState({itemCartOnWork : id});
    this.props.setNewDataItemToCart(obj);
  }
  isMovil(){
    if(window.innerWidth > 766){
      this.setState({movil : false});
    }else{
      this.setState({movil : true});
    }
  }
  componentDidMount(){
      this.isMovil();

  }
  componentWillMount(){
     this.props.fetchTours();
     this.props.initialConfigTransfersType();
     this.props.getItemsTransferByCart();
     this.props.wmGetConfigVtm();

  }
  getCountryGoogle(){
    var profile = this.google.state.profile;
    if(profile.name.givenName){
      //this.nameInput.value = profile.name.givenName;
      //this.setState({name : profile.name.givenName});
    }
    if(profile.name.familyName){
      //this.lastnameInput.value = profile.name.familyName;
      //this.setState({lastname : profile.name.familyName});
    }
    if(profile.emails){
      //this.emailInput.value = profile.emails[0].value;
      //this.setState({Email:profile.emails[0].value});
    }

    if( profile.placesLived){

      //this.setState({countryApi : profile.placesLived[0].value});
      var namePais = profile.placesLived[0].value;
      this.checkCountry(namePais.trim());
    }
  }
  checkCountry(pais){
    var that = this;
    if(this.props.formulario.configTrans[2].length>0){
      this.props.formulario.configTrans[2].map(function(item,index){
        if(pais == item.Description){
          //onsole.log(item);
          that.setState({country  : item.CountryCode,countryApi : item.Description});
          //that.validar();
        }
      });
    }
  }
  renderListSearched(){
     // aqui van los items relacionados con el tour seleccionado
     if(this.props.data.tours != null){
       if(this.props.data.tours.items){
         let temp = [this.props.data.tours.items[0],this.props.data.tours.items[1],this.props.data.tours.items[2]];
         return <Related items={temp} />;
        }
     }
     return '';
  }
  checkOut(){
    this.setState({bookEngine : !this.state.bookEngine});
  }
  renderItemsTour(){
    if(this.props.data.itemsCart.items){
      return this.props.data.itemsCart.items.map((item,id)=>{
        if(!item.codeTrans){
          return <ItemTrans key={id}  />
        }
      });
    }
  }
  renderItemsTrans(){
    if(this.props.data.itemsCart.items){
      return this.props.data.itemsCart.items.map((item,id)=>{
        if(item.codeTrans && item.transferType && this.state.transTypeText[item.transferType]!=undefined){
          return <ItemSummary deleteThisItem={this.props.deleteCartItem}  key={id}   idCart={id} typeTrans={this.state.transTypeText}  itemData={item}  />;
        }
      });
    }
  }

  render(){
    let haveTransItems=false;
    let itemscart = [];
    if(this.props.formulario.itemTrans){
      if(Object.keys(this.props.formulario.itemTrans).length>0){
        haveTransItems = true;
      }
    }
    if(this.props.data.itemsCart.items){
      itemscart= this.props.data.itemsCart.items;
    }
    return(
      <div className="checkout-page" id="app-wrap">
      <Header
          typeTransfers={this.props.formulario.config}
          itemsCart={itemscart}
          fixed={true}
          active={0}
          items={itemsMenu}
          phone={configApp.phone}/>
        <div className="section1 row margin-out-bottom">
          <div className="col s12 imgStep">
            <img src="/img/step-cart.png" />
          </div>
          <div className="col s12 header azulFuerteDiseno ">
              <div className="header-title col 12 white-text">SUMMARY</div>
          </div>
          <div className="row items-header margin-out-bottom">
              <div className="items-header-label col m2 margin-out-bottom "><h3>Tours</h3></div>
          </div>
          <div className="col s12 items">
          {  this.renderItemsTour() }
          </div>
          <div className="row items-header margin-out-bottom">
              <div className="items-header-label col m2 margin-out-bottom"><h3>Transfers</h3></div>
          </div>
          {  this.renderItemsTrans() }
          <div className="col s12 items-price">
            <div className="padding-in-medium-top padding-in-medium-bottom precio"><span className="label azulFuerteDiseno-text">TOTAL :</span><span className="moneda naranjaDiseno-text">$</span><span className="cantidad naranjaDiseno-text">{`${parseFloat(this.props.data.itemsCart.totalTrans).toFixed(2)}`}</span><span className="moneda naranjaDiseno-text">USD</span></div>
          </div>
          <div className="col s12 header">
              <div className="header-title col 12 azulFuerteDiseno-text">REGISTER WITH</div>
          </div>
        </div>
        <div className='row section2 margin-in-small socialConnectionsSections'>
          <FacebookApi ref={elm=>{this.facebook=elm}} />
          <GoogleApi ref={elm=>{this.google=elm}}  changeCountry={this.getCountryGoogle.bind(this)}/>
        </div>
        <div className="col s12 header">
              <div className="header-title col 12 azulFuerteDiseno-text">People Information</div>
        </div>
        <PersonalInformation formulario={this.props.formulario}  country={this.state.country} countryApi={this.state.countryApi}/>


      <Footer
            logo="/img/logoTMT.png"
            items={itemsMenu}
            socialLinks={[
              {link:"#",img:"img/facebook-logo-2.png",active:true},
              {link:"#",img:"img/twitter-logo.png"}]}
            rights="&#169; 2017 Los Murales All rights reserved" />
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {data: state.data,formulario : state.formulario};
}
export default connect(mapStateToProps, { setCartItems,fetchCartItems,fetchTours,initialConfigTransfersType,getItemsTransferByCart,updateCartItem,deleteCartItem,wmGetConfigVtm})(Checkout);
