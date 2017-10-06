import React,{Component} from 'react';
import ReactDOM from 'react-dom';

// redux libraries
import {connect } from 'react-redux';
import {fetchTours,fetchCartItems,setCartItems,updateCartItem,deleteCartItem} from '../actions/index';
import {initialConfigTransfersType,getItemsTransferByCart,setNewDataItemToCart,resetNewDataItemToCart} from '../actions/actionsTransfer';

import '../../scss/app.scss';
//import 'react-select/dist/react-select.css';


//componentes
import Header from './Header';
import Footer from './Footer';
import Gallery from './tour/gallery';
import Related from './tour/related';
import ItemTour from './cart/tour_cart';
import ItemTrans from './cart/trans_cart';


//data config
import {itemsMenu,configApp,typeTransDescription,typeTransConfig} from '../data_config';
let {   ARRIVAL, DEPARTURE, ROUNDTRIP  } = typeTransConfig;

class Cart extends Component{
  constructor(props){
    super(props);
    this.state = {
      movil : false,
      bookEngine : false ,
      transTypeText : [],
      actualizado : false,
      itemCartOnWork : null,
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
    // renderisado de items y se evalua si existe algun update
    let itemsUpdated = [];
    let that = this;
    if(this.props.data.itemsCart.items){
      return this.props.data.itemsCart.items.map((item,id)=>{
        if(item.codeTrans && item.transferType && this.state.transTypeText[item.transferType]!=undefined){
          let same = false;
          //let answerSelected = {};
          if(that.state.itemCartOnWork == id && that.props.formulario.itemUpdate){
            that.props.formulario.itemUpdate.map((trans,i)=>{
                if(item.itemTrans.data.ItemTypeCode == trans.ItemTypeCode && item.itemTrans.data.ItemCode == trans.ItemCode){
                    same = true;
                }else if(item.itemTrans.data.ItemCode == trans.ItemCode){
                  same = true;
                }
                if(i!=0){
                  itemsUpdated.push(trans);
                }
                //answerSelected = trans;
            });
            return <ItemTrans deleteItemEvent={this.props.deleteCartItem} resetItemsEvent={this.props.resetNewDataItemToCart}  key={id} updateCartItemEvent={this.props.updateCartItem} same={same} itemUpdated={itemsUpdated} idCart={id} typeTrans={this.state.transTypeText} setNewDataToCart={this.updatePrice} itemData={item}  />;
          }else{
            return <ItemTrans deleteItemEvent={this.props.deleteCartItem} resetItemsEvent={this.props.resetNewDataItemToCart}   key={id}  updateCartItemEvent={this.props.updateCartItem}  idCart={id} typeTrans={this.state.transTypeText} setNewDataToCart={this.updatePrice} itemData={item}  />;
          }
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
      <div className="cart-page" id="app-wrap">
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
          <div className="col s12 actions">
            <div className="actions-left">
              <a href="/" className="link naranjaDiseno-text">continue sopping</a>
            </div>
            <div className="actions-right">
              <div className="padding-in-medium-top padding-in-medium-bottom "><a href="" className="link padding-in-medium btn naranjaDiseno">proceed to checkout</a></div>
            </div>
          </div>
          <div className="col s12 items">
            <div className="row items-wrap header">
              <div className="items-wrap-img col m2 "><label>Tours</label></div>
              <div className="items-wrap-description col m4 "><label>&nbsp;</label></div>
              <div className="items-wrap-people col m2 "><label>People</label></div>
              <div className="items-wrap-price col m2 "><label>Price</label></div>
              <div className="items-wrap-subtotal col m2 "><label>Subtotal</label></div>
            </div>
          </div>
          <div className="col s12 items">
          {  this.renderItemsTour() }
          </div>
          <div className="col s12 actions">
            <div className="actions-left">
              <a href="/" className="link naranjaDiseno-text">continue sopping</a>
            </div>
            <div className="actions-right">
              <div className="padding-in-medium-top padding-in-medium-bottom "><a href="" className="link padding-in-medium btn naranjaDiseno">proceed to checkout</a></div>
            </div>
          </div>
          <div className="col s12 items">
            <div className="row items-wrap header">
              <div className="items-wrap-img col m2 "><label>Transfer</label></div>
              <div className="col m10 row">
                <div className="items-wrap-description col m4 "><label>&nbsp;</label></div>
                <div className="items-wrap-people col m3 "><label>Passengers</label></div>
                <div className="items-wrap-price col m2 "><label>Price</label></div>
                <div className="items-wrap-subtotal col m2 "><label>Subtotal</label></div>
              </div>

            </div>
          </div>
          <div className="col s12 items">
          {  this.renderItemsTrans() }
          </div>
          <div className="col s12 actions">
            <div className="actions-left">

            </div>
            <div className="actions-right">
              <div className="padding-in-medium-top padding-in-medium-bottom precio"><span className="label azulFuerteDiseno-text">TOTAL :</span><span className="moneda naranjaDiseno-text">$</span><span className="cantidad naranjaDiseno-text">{`${parseFloat(this.props.data.itemsCart.totalTrans).toFixed(2)}`}</span><span className="moneda naranjaDiseno-text">USD</span></div>
            </div>
          </div>
          <div className="col s12 actions">
            <div className="actions-left margin-in-small-right">
              <div className="line grey"></div>
            </div>
            <div className="actions-right">
              <div className="padding-in-medium-top padding-in-medium-bottom "><a href="" className="link padding-in-medium btn naranjaDiseno">proceed to checkout</a></div>
            </div>
          </div>
        </div>
        <div className='row section2 margin-in-large-top'>
          <div className={`row col s12 sectionItems margin-out-bottom ${haveTransItems?"havetransitems":""}`}>
              <h2 className="col s12">Customers who bought items in your cart also bought:</h2>
              <div className="wrapResults col s12">
                {this.renderListSearched()}
                <div className="wrapResults-categories wrap-items">
                  <div className="  categories padding-in-medium-left padding-in-small  wrap-items wrap-items-column center">
                    <h3 className="white-text margin-out margin-in-large-top"><span className="naranjaDiseno-text">Choose your</span> Category</h3>
                    <ul className="margin-in-small">
                      <li ><a className="grey-text" href="#"><span className="white-text">Dolphins &</span> Water Sports</a></li>
                      <li ><a className="grey-text" href="#"><span className="white-text">Archaeological &</span> Nature</a></li>
                      <li ><a className="grey-text" href="#"><span className="white-text">Mexican</span> Proud</a></li>
                      <li ><a className="grey-text" href="#"><span className="white-text">Adventure</span>  Parks</a></li>
                      <li ><a className="grey-text" href="#"><span className="white-text">Mexican</span> Proud</a></li>
                    </ul>
                  </div>
                </div>
              </div>
          </div>
        </div>
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
export default connect(mapStateToProps, { setCartItems,fetchCartItems,fetchTours,initialConfigTransfersType,getItemsTransferByCart,setNewDataItemToCart,updateCartItem,resetNewDataItemToCart,deleteCartItem })(Cart);
