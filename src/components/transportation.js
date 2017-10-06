import React,{Component} from 'react';
import ReactDOM from 'react-dom';

// redux libraries
import {connect } from 'react-redux';
import {fetchTours,fetchCartItems,setCartItems} from '../actions/index';
import {soapHoteles,initialConfigTransfers,initialConfigTransfersType,getCatalogItemsTransfer,clearSearch} from '../actions/actionsTransfer';

import '../../scss/app.scss';
//import 'react-select/dist/react-select.css';


//componentes
import Header from './Header';
import Footer from './Footer';
import ListItems from './home/list_items_search';
import Formulario from '../transferEngine/form_search';


//data config
import {itemsMenu,configApp} from '../data_config';

//inputs
import SelectControl from '../inputs/selectControl';
import ImageGallery from 'react-image-gallery';


class Transportation extends Component{
  constructor(props){
    super(props);
    this.state={
      imagenes:[
          {
            original:'/img/transportation_bg.jpg',
            thumbnail:'/img/bg_home.jpg',
            originalClass : "startsImage",
            url: "",
            title : "the best cancun airport transfers",
            subtitle : "30 years of welcoming you like royalty",
            desc : "",
          }
        ],
      classImageIndex : "firstIndex",
      indexSelected : 0,
    }
  }
   componentWillMount(){
     this.props.fetchTours();
     this.props.soapHoteles();
     this.props.initialConfigTransfers();
     this.props.initialConfigTransfersType();
     this.props.fetchCartItems();
   }
   renderSearchTours(){
    if(this.props.data.tours != null){
      return <SelectControl  optionsTours={this.props.data.tours.items} />;
    }else{
        return <span className="Select-loading margin-in-medium" ></span>;
    }
   }
   renderListSearched(){
     if(this.props.data.tours != null){
       return <ListItems items={this.props.data.tours.items}  />
     }
   }
   onImageSlide(currentIndex){
     this.setState({indexSelected: currentIndex});
     if(currentIndex==0){
       this.setState({classImageIndex:"firstIndex"});
     }else{
       this.setState({classImageIndex:"",linkTourBanner : this.state.imagenes[currentIndex].url});
     }
   }
  render(){
    // se valida que la informacion del formulario sea correcta
    let formulario;
    let classFirstIndexGallery = "";
    if(this.props.formulario.daysRestrictions && this.props.formulario.hoteles && this.props.formulario.config && this.props.formulario.departure && this.props.formulario.daysRestrictions){
        // si existen los props se renderisa el formulario
        formulario = <Formulario hoteles={this.props.formulario.hoteles} className="formulario" idTypeTransfers={this.props.formulario.config} departure={this.props.formulario.departure}  maxdays={this.props.formulario.daysRestrictions.maxDays} clearSearch={this.props.clearSearch} fetchItemsTrans={this.props.fetchCartItems} setItemsCart={this.props.setCartItems}  eventos={this.props.getCatalogItemsTransfer} itemTrans={this.props.formulario.itemTrans}   />;
    }
    let haveTransItems=false;
    if(this.props.formulario.itemTrans){
      if(Object.keys(this.props.formulario.itemTrans).length>0){
        haveTransItems = true;
      }
    }
    return(
      <div className="transportation-page" id="app-wrap">
      <Header
          typeTransfers={this.props.formulario.config}
          itemsCart={this.props.data.itemsCart}
          fixed={true}
          active={0}
          items={itemsMenu}
          phone={configApp.phone}/>
        <div className="section1 row margin-out-bottom">
          <div className={`col s12 section1-text ${this.state.classImageIndex}`}>
            <a href={this.state.linkTourBanner}>
              <h1 className="margin-out padding-out text-align-center">{this.state.imagenes[this.state.indexSelected].title}</h1>
              <h2 className="margin-out padding-out text-align-center ">{this.state.imagenes[this.state.indexSelected].subtitle}</h2>
              <p>
                {this.state.imagenes[this.state.indexSelected].desc}
              </p>
            </a>
          </div>
          <ImageGallery
            ref={i => this._imageGallery = i}
            showThumbnails={false}
            items={this.state.imagenes}
            startIndex={0}
            slideInterval={2000}
            onPlay={this.onImageSlide.bind(this)}
            onSlide={this.onImageSlide.bind(this)}/>
        </div>
        <div className='row section2'>
          <div className="row col s12 transferSection">
            <div className="col s12 transferSection-engine ">
              {formulario}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m3 l3 details-details"><img src="img/transportation/GreatService-home.png" alt="GREAT SERVICE"/><h5>GREAT SERVICE</h5><p>No standing in line, no hassle. Book your airport transfer with Thomas More Travel and your driver will be waiting for you outside the departure area</p></div>
          <div className="col s12 m3 l3 details-details"><img src="img/transportation/SearchFast-home.png" alt="QUICK &amp; EASY"/><h5>QUICK &amp; EASY TO BOOK</h5><p>Cancun Airport Transportation booking made easy! Just do at least 48 hours before your arrival, pick your hotel and finish your reservation within 5 minutes. Our service is 100% guaranteed.</p></div>
          <div className="col s12 m3 l3 details-details"><img src="img/transportation/BestRates-home.png" alt="BEST RATES"/><h5>BEST RATES</h5><p>We offer the best rates to our customers for a service with no pair and our 30+ years of experience speak for us. Private service rates are per vehicle and shared service rates are per customer.</p></div>
          <div className="col s12 m3 l3 details-details"><img src="img/transportation/VehiclesPrice-home.png" alt="RATES PER VEHICLES"/><h5>RATES PER VEHICLE</h5><p>Choose the airport transfer service that suits your needs. Private Service is available 24 hours, daily. Vans seat 7 or 10 passengers and rates are per vehicle.</p></div>
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
export default connect(mapStateToProps, { setCartItems,fetchCartItems,fetchTours,soapHoteles,initialConfigTransfers,initialConfigTransfersType,getCatalogItemsTransfer,clearSearch})(Transportation);
