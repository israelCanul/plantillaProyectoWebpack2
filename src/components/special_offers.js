import React,{Component} from 'react';
import '../../scss/appSpecials.scss';

import * as firebase from "firebase";

// redux libraries
import {connect } from 'react-redux';
import {
  getInfoTours,
  fetchSpecialTours,
  setCompareItems,
  getCompareItems,
  deleteCompareItems,
  addInfoToSpecialTours} from '../actions/index';
import {initialConfigTransfersType} from '../actions/actionsTransfer';


import {itemsMenu,configApp} from '../data_config';


//componentes
import Header from './Header';
import Footer from './Footer';
import CompareComponent from './home/container_compare_tours';
import WrapItemsSpecials from './specialOffers/wrapSpecials';



//**************
//Analitics [Start]
//**************
import ReactGA from 'react-ga';
//**************
//Analitics [Ends]
//**************


class SpecialOffers extends Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    let that = this;

    //**************
    //Analitics [Start]
    //**************
    ReactGA.pageview(window.location.pathname + window.location.search);
    //**************
    //Analitics [Ends]
    //**************


    this.props.initialConfigTransfersType();
    this.props.getInfoTours();
    this.props.getCompareItems();
    this.props.fetchSpecialTours();
    // se inicializa el listener para cualquier cambio en la aplicacion
    let v =  firebase.database().ref('/special');
    v.on('value', function(snapshot) {
       that.props.fetchSpecialTours();
    });
  }
  componentDidMount(){
    //**************
    //Analitics [Start]
    //**************
    ReactGA.event({
     category: 'LifeCycle',
     action: 'Special Offers Mounted'
   });
   //**************
   //Analitics [Ends]
   //**************
  }
  render(){
    let toursInfo;
    if(this.props.data.toursInfo){
      toursInfo = this.props.data.toursInfo;
    }
    // let toursSpecials;
    // if(this.props.data.specialTours ){// verificamos que existe la variable antes de enviarla como parametro
    //   toursSpecials = this.props.data.specialTours.items;
    // }
    let ItemsSpecials;
    if(this.props.addInfoToSpecialTours && this.props.data.specialTours){
      //console.log(this.props.data.specialTours);
      ItemsSpecials = <WrapItemsSpecials eventToGetPrices={this.props.addInfoToSpecialTours} itemsSpecials={this.props.data.specialTours.items} />;
    }
    let title,srcImg,colortext;
    if(this.props.data.specialTours){
      title = this.props.data.specialTours.title;
      srcImg = this.props.data.specialTours.src;
      colortext = this.props.data.specialTours.color;
      console.log(colortext);
    }

    return(
      <div >
      <Header
          toursInfo = {toursInfo}
          typeTransfers={this.props.formulario.config}
          itemsCart={this.props.data.itemsCart}
          fixed={true}
          active={3}
          items={itemsMenu}
          phone={configApp.phone}/>
        <div className="specials-page" id="app-wrap">

          <div className="row banner margin-out">
            <div className="col s12 wrapper margin-out-bottom margin-out-top">
              <div className="content">
                <h1 className=" text text-align-center oswald " style={{color:colortext}} >{title}</h1>
              </div>
              <img className="img img-responsive " src={srcImg} />
            </div>
          </div>
            {ItemsSpecials}
        </div>
        <Footer/>
        <CompareComponent eventForDelete={this.props.deleteCompareItems.bind(this)}  itemsCompare={this.props.data.itemsCompare} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {data: state.data,formulario : state.formulario};
}
export default connect(mapStateToProps, {
  initialConfigTransfersType,
  getInfoTours,
  setCompareItems,
  getCompareItems,
  deleteCompareItems,
  fetchSpecialTours,
  addInfoToSpecialTours})(SpecialOffers);
