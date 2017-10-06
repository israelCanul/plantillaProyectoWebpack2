import React,{Component} from 'react';

import * as firebase from "firebase";
import Bodymovin from 'bodymovin';

// redux libraries
import {connect } from 'react-redux';
import {
  fetchTours,
  fetchCartItems,
  setCartItems,
  getInfoTours,
  setCompareItems,
  getCompareItems,deleteCompareItems} from '../actions/index';
import {soapHoteles,initialConfigTransfers,initialConfigTransfersType,getCatalogItemsTransfer,clearSearch} from '../actions/actionsTransfer';
import '../../scss/app.scss';
//import 'react-select/dist/react-select.css';




//componentes
import Header from './Header';
import Footer from './Footer';
import ListItems from './home/list_items_search';
//import Formulario from '../transferEngine/form_search';
import CompareComponent from './home/container_compare_tours';


//data config
import {itemsMenu,configApp,prodCodeAnalitics} from '../data_config';

//inputs
import Select from 'react-select';
import ImageGallery from 'react-image-gallery';



//**************
//Analitics [Start]
//**************
import ReactGA from 'react-ga';
//**************
//Analitics [Ends]
//**************



class Index extends Component{

  constructor(props){
    super(props);
    this.state={
      classImageIndex : "firstIndex",
      indexSelected : 0,
      openCompare : false,
      linkTourBanner : "#",
    }
    this.setCompareObject = this.setCompareObject.bind(this);
    this.onChangeControlSearch = this.onChangeControlSearch.bind(this);
    this.rendercategories = this.rendercategories.bind(this);

  }
  componentDidMount(){
    //**************
    //Analitics [Start]
    //**************
    ReactGA.event({
     category: 'LifeCycle',
     action: 'Home Mounted'
   });
   //**************
   //Analitics [Ends]
   //**************

    //StreetByMorning.json
    //Plane.json
    let element = document.getElementById('loader-before-imageGallery');
    Bodymovin.loadAnimation({
      container : element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: './animations/gears.json'
    });
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


     this.props.soapHoteles();
     this.props.initialConfigTransfers();
     this.props.initialConfigTransfersType();
     this.props.fetchCartItems();
     this.props.getInfoTours();
     this.props.getCompareItems();
     // se inicializa el listener para cualquier cambio en la aplicacion
     let v =  firebase.database().ref('/dataTours');
     v.on('value', function(snapshot) {
        that.props.fetchTours();
     });

   }
   setCompareObject(obj,e){
     e.preventDefault();
     this.props.setCompareItems(obj);
   }
   onChangeControlSearch(val){
     if(val!=null){
       let url;
       if(location.hostname == "www.thomasmoretravel.com.mx" || location.pathname == "/es/" || location.pathname == "/thomasmoretravel.com.mx/"){
           url = "http://www.thomasmoretravel.com.mx/app/TourDetail.aspx?4=";
       }else{
           url = "http://www.thomasmoretravel.com/app/TourDetail.aspx?4=";
       }
        window.location = url+val.ItemCode;
     }
   }
   renderSearchTours(){
    if(this.props.data.toursInfo != null){
      return <Select
            ref="selectCountry"
            name="SP"
            valueKey="ItemCode"
            labelKey="ItemAttributeNAME"
            options={this.props.data.toursInfo}
            onChange={this.onChangeControlSearch}/>;
    }else{
        return <span className="Select-loading margin-in-medium" ></span>;
    }
   }
   renderListSearched(){
     if(this.props.data.tours != null){
       return <ListItems eventToCompareComponent={this.setCompareObject}  items={this.props.data.tours.items}  />
     }
   }
   onImageSlide(currentIndex){
     this.setState({indexSelected: currentIndex});
     if(currentIndex==0){
       this.setState({classImageIndex:"firstIndex",linkTourBanner : this.props.data.tours.banner[currentIndex].url });
     }else{
       this.setState({classImageIndex:"",linkTourBanner : this.props.data.tours.banner[currentIndex].url});
     }
     //this.props.setCompareItems({e:"sss"});
   }
   rendercategories(){
     if(this.props.data.tours){
       return this.props.data.tours.categories.map((item,id)=>{

         return <li key={id} ><a className="grey-text" href={item.url}><span className="white-text">{item.name}</span> </a></li>;
       });
     }

   }
  render(){

    // se valida que la informacion del formulario sea correcta
    let formulario;
    let classFirstIndexGallery = "";
    if(this.props.formulario.daysRestrictions && this.props.formulario.hoteles && this.props.formulario.config && this.props.formulario.departure && this.props.formulario.daysRestrictions){
        // si existen los props se renderisa el formulario
        //formulario = <Formulario hoteles={this.props.formulario.hoteles} className="formulario" idTypeTransfers={this.props.formulario.config} departure={this.props.formulario.departure}  maxdays={this.props.formulario.daysRestrictions.maxDays} clearSearch={this.props.clearSearch} fetchItemsTrans={this.props.fetchCartItems} setItemsCart={this.props.setCartItems}  eventos={this.props.getCatalogItemsTransfer} itemTrans={this.props.formulario.itemTrans}   />;
    }
    let haveTransItems=false;
    if(this.props.formulario.itemTrans){
      if(Object.keys(this.props.formulario.itemTrans).length>0){
        haveTransItems = true;
      }
    }
    let toursInfo;
    let banners,title,subtitle,desc;
    if(this.props.data.toursInfo){
      toursInfo = this.props.data.toursInfo;

    }
    if(this.props.data.tours){
      banners =<ImageGallery
        ref={i => this._imageGallery = i}
        showThumbnails={false}
        items={this.props.data.tours.banner}
        startIndex={0}
        autoPlay={true}
        slideInterval={5000}
        onPlay={this.onImageSlide.bind(this)}
        onSlide={this.onImageSlide.bind(this)}/>;
      title = this.props.data.tours.banner[this.state.indexSelected].title;
      subtitle = this.props.data.tours.banner[this.state.indexSelected].subtitle;
      desc = this.props.data.tours.banner[this.state.indexSelected].desc;
    }else{
      banners = <div style={{    width: "20%",marginLeft: "40%", marginBottom: "200px"}} id="loader-before-imageGallery"></div>
    }
    // if(this._imageGallery){
    //   //console.log(this._imageGallery.getCurrentIndex());
    //   if(this._imageGallery.getCurrentIndex()==0){
    //     classFirstIndexGallery = "firstIndex";
    //   }else{
    //     classFirstIndexGallery = "";
    //   }
    // }

    // <div className="col s12 section1-slide margin-out-bottom">
    //   <img src="/img/bg_home.jpg" className="img img-responsive" />
    // </div>

    //esto es la parte donde va el formulario
    // <div className="row col s12 transferSection">
    //   <div className="col s12 transferSection-engine ">
    //     <h3>Airport Transfers</h3>
    //     {formulario}
    //   </div>
    // </div>



    return(
      <div className="index-page" id="app-wrap">
      <Header
          toursInfo = {toursInfo}
          typeTransfers={this.props.formulario.config}
          itemsCart={this.props.data.itemsCart}
          fixed={true}
          active={0}
          items={itemsMenu}
          phone={configApp.phone}/>
        <div className="section1 row margin-out-bottom">
          <div className={`col s12 section1-text ${this.state.classImageIndex}`}>
            <a href={this.state.linkTourBanner}>
              <h1 className="margin-out padding-out text-align-center">{title}</h1>
              <h2 className="margin-out padding-out text-align-center ">{subtitle}</h2>
              <p>
                {desc}
                <br></br><br></br>
                <span className="naranjaDiseno-text ">READ MORE</span>
              </p>

            </a>
          </div>
          {banners}
          <div className="icon-down"><div className="shapes icon icon-triangle icon-triangle-down large "></div></div>
        </div>
        <div className='row section2'>
          <div className={`col s12 search margin-out-bottom azulFuerteBackground ${haveTransItems?"havetransitems":""}`} >
            <div className=" wrap-items center padding-in-small search-wrap">
              <label className="input label white-text">TOUR SEARCH</label>
              <div className="wrap-items wrap-select center padding-in-medium-right padding-in-medium-left white border-rounded" >
                {this.renderSearchTours()}
                <div className="shapes icon-magnifying-glass icon-magnifying-glass-shades-black "></div>
              </div>
            </div>
          </div>
          <div className={`row col s12 sectionItems margin-out padding-out-left padding-out-right ${haveTransItems?"havetransitems":""}`}>
              <h2 className="col s12">An Outstanding Selection of Tours in cancun Mexico</h2>
              <div className="wrapResults col s12 margin-out padding-out">
                {this.renderListSearched()}
                <div className="wrapResults-categories wrap-items">
                  <div className="  categories padding-in-medium-left padding-in-small  wrap-items wrap-items-column center">
                    <p className="text-align-left white-text margin-out ">Welcome to a world of natural & historical wonders, adventures and experiences.<br></br>
                    Let <strong>Thomas More Travel</strong> be your guide as you explore  the Mexican Caribbean & the Yucatan, we’ll make your vacation truly unforgettable.</p>
                    <h3 className="white-text margin-out margin-in-large-top"><span className="naranjaDiseno-text">Choose your</span> Category</h3>
                    <ul className="margin-in-small">
                      {this.rendercategories()}
                    </ul>
                  </div>
                </div>
              </div>
          </div>
          <div className={`col s12 espacio padding-in-small ${haveTransItems?"havetransitems":""}`}>
          </div>





        </div>
      <Footer
            logo="/img/logoTMT.png"
            items={itemsMenu}
            socialLinks={[
              {link:"#",img:"img/facebook-logo-2.png",active:true},
              {link:"#",img:"img/twitter-logo.png"}]}
            rights="&#169; 2017 Los Murales All rights reserved" />
          <CompareComponent eventForDelete={this.props.deleteCompareItems.bind(this)} openCompare={this.state.openCompare} itemsCompare={this.props.data.itemsCompare} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {data: state.data,formulario : state.formulario};
}
export default connect(mapStateToProps, { setCartItems,fetchCartItems,fetchTours,soapHoteles,initialConfigTransfers,initialConfigTransfersType,getCatalogItemsTransfer,clearSearch,getInfoTours,setCompareItems,getCompareItems,deleteCompareItems})(Index);
