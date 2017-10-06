import React,{Component} from 'react';
import ReactDOM from 'react-dom';

// redux libraries
import {connect } from 'react-redux';
import {fetchTours,fetchCartItems,setCartItems,getInfoTour,getInfoTours,
  setCompareItems,
  getCompareItems,
  deleteCompareItems} from '../actions/index';
import {initialConfigTransfersType} from '../actions/actionsTransfer';

import '../../scss/app.scss';
//import 'react-select/dist/react-select.css';


//componentes
import Header from './Header';
import Footer from './Footer';
import Gallery from './tour/gallery';
import Related from './tour/related';


import CompareComponent from './home/container_compare_tours';

//data config
import {itemsMenu,configApp} from '../data_config';

//inputs
import Select from 'react-select';


//<Formulario  />
import Formulario from '../tourEngine/form_engine';


class Tour extends Component{
  constructor(props){
    super(props);
    this.state = {
      movil : false,
      bookEngine : false ,
    }
    this.isMovil = this.isMovil.bind(this);

    window.addEventListener("resize", this.isMovil);

    this.setCompareObject = this.setCompareObject.bind(this);
  }
  isMovil(){
    if(window.innerWidth > 766){
      this.setState({movil : false});
    }else{
      this.setState({movil : true});
    }
  }
  setCompareObject(obj,e){
    e.preventDefault();
    this.props.setCompareItems(obj);
  }
   componentWillMount(){
     this.props.getInfoTour();
     this.props.fetchTours();
     this.props.getInfoTours();
     this.props.fetchCartItems();
     this.props.initialConfigTransfersType();
     this.isMovil();
   }
   renderSearchTours(){
    if(this.props.data.tours != null){
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
     // aqui van los items relacionados con el tour seleccionado
     if(this.props.data.tours ){
       if(this.props.data.tours.items){
         let temp = [this.props.data.tours.items[0],this.props.data.tours.items[1],this.props.data.tours.items[2]];
          return <Related eventToCompareComponent={this.setCompareObject} items={temp} />;
        }
     }
     return 'nada';
   }//this.bookWrapDesktop
   noscroll() {
      //window.scrollTo( 0, 0 );
    }
  openBook(){
    if(!this.state.bookEngine){
      window.addEventListener('scroll', this.noscroll);
    }else{
      window.removeEventListener('scroll', this.noscroll);
    }
    this.setState({bookEngine : !this.state.bookEngine});
  }
  renderBook(){
    let formMovil,formDesktop,title,imgbanner;
    if(!this.state.movil){
      formDesktop = <Formulario maxdays="1" />;
    }else{
      formMovil = <Formulario movil={this.state.movil} active={this.state.bookEngine && this.state.movil? true:false} maxdays="1" />;
    }
    if(this.props.data.dataTour){
      title = this.props.data.dataTour.title;
      imgbanner = this.props.data.dataTour.headerImg;
    }
    return(
      <div className="section1 row margin-out-bottom">
        <div className="col s12 section1-text ">
          <div className={`book-wrap ${this.state.movil?"movil":""} `} >
            <div onClick={this.openBook.bind(this)} className="book" >Book Now</div>
            {formMovil}
          </div>
          <div className="tour">
            <div className="tour-book  padding-out-top padding-in-medium">
              <div className={`tour-book-engine ${this.state.bookEngine?"active":""}`} >{formDesktop}</div>
                <div className="tour-book-price margin-in-small-bottom">
                  <div className="adult price">
                    <label className="price-price white-text header"><span className=" text monserrat bold">{title}</span></label>
                  </div>
                </div>
              <div className="tour-book-price">
                <div className="adult price">
                  <label className="price-tag text-uppercase naranjaDiseno-text">Adult</label>
                  <label className="price-price white-text"><span className="price-price-icon">$ </span><span className="price-price-cant">178.20</span> <span className="price-price-money">USD</span></label>
                </div>
                <div className="children price">
                  <label className="price-tag text-uppercase naranjaDiseno-text">Children <span className="text-uppercase-out">(ages 5-8)</span></label>
                  <label className="price-price white-text"><span className="price-price-icon">$ </span><span className="price-price-cant">158.20</span> <span className="price-price-money">USD</span></label>
                </div>
              </div>
              <div className="tour-book-price margin-in-medium-top">
                <div className="adult price">
                  <label className="price-tag text-uppercase naranjaDiseno-text">Schedules:</label>
                  <label className="price-price white-text"><span className="price-price-cant">7:00</span> <span className="price-price-money">A.M <br></br>FROM CANCUN</span></label>
                  <p className="price-price-money white-text">Available from mid May to mid September.<br></br>Weather permitting.</p>
              </div>
              </div>
              <div className="tour-book-price margin-in-medium-top">
                <div className="adult price">
                  <label className="price-tag text-uppercase naranjaDiseno-text">Included: </label>
                  <div className="price-icons margin-in-small-top">
                    <img src="/img/icons/car.png" className="" />
                    <img src="/img/icons/guide.png" className="" />
                    <img src="/img/icons/snacks.png" className="" />
                    <img src="/img/icons/water.png" className="" />
                    <img src="/img/icons/swim.png" className="" />
                  </div>
              </div>
              </div>
              <div className="tour-book-price margin-in-medium-top link-more">
                  <div className="adult price">
                    <div className="price-icons margin-in-small-top">
                      <a href="#Completeinformation" className="white-text text oswald bold ">READ MORE</a>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 section1-slide margin-out-bottom">
          <img src={imgbanner} className="img img-responsive" />
        </div>
      </div>
    );
  }
  renderGallery(){
    //console.log('asdad');
    if(this.props.data.dataTour){
      return(
          <Gallery  images={this.props.data.dataTour.galleryItems}/>
      );
    }
  }
  render(){
    let haveTransItems=false;
    if(this.props.formulario.itemTrans){
      if(Object.keys(this.props.formulario.itemTrans).length>0){
        haveTransItems = true;
      }
    }
    let section1,section2,title;
    if(window.innerWidth>=1200){
      section1=this.renderBook();
      section2="";
    }else{
      section1="";
      section2=this.renderBook();
    }
    if(this.props.data.dataTour){
      title = this.props.data.dataTour.title;
    }
    let toursInfo;
    if(this.props.data.toursInfo){
      toursInfo = this.props.data.toursInfo;

    }
    return(
      <div className="tour-page" id="app-wrap">
      <Header
        toursInfo = {toursInfo}
          typeTransfers={this.props.formulario.config}
          itemsCart={this.props.data.itemsCart}
          fixed={true}
          active={0}
          items={itemsMenu}
          phone={configApp.phone}/>
        {section1}
        <div className="row galleryWrap">
          <div className="col s12 section1-gallery">
            {this.renderGallery()}
          </div>
        </div>
        {section2}
        <div className="row tour-content">
          <div className="tour-content  padding-in-medium-left padding-in-medium-right padding-in-medium-top padding-in-small-bottom azulFuerteBackground">
            <h3 id="Completeinformation" className="margin-out  text monserrat bold">{title}</h3>
            <h5 className="margin-in-large-bottom">Category : Adventure & parks </h5>
            <p className="tour-content-description text-align-justify white-text">
              {` ${this.props.data.dataTour?this.props.data.dataTour.description:""}`}
            </p>
            <p className="tour-content-description white-text margin-out">
              <span className="naranjaDiseno-text text"> Recommendations : </span><br></br>
              Don\''t forget your underwater camera. <br></br>
              Wear a hat, comfortable cotton clothing and shoes. <br></br>
              Bring your swimsuit and towel. Please wear a t-shirt instead of using sunscreen before entering the water.
            </p>
          </div>
          <div className="tour-book-price padding-in-medium-left padding-in-medium-right  azulFuerteBackground">
            <div className="adult price">
              <label className="price-tag text-uppercase naranjaDiseno-text">Included: </label>
              <div className="price-icons margin-in-small-top">
                <img src="/img/icons/car.png" className="" />
                <img src="/img/icons/guide.png" className="" />
                <img src="/img/icons/snacks.png" className="" />
                <img src="/img/icons/water.png" className="" />
                <img src="/img/icons/swim.png" className="" />
              </div>
              <ul className="price-price-money white-text padding-in-small-left">
                <li>Free round-trip transportation</li>
                <li>Guide</li>
                <li>Snacks</li>
                <li>Water and soft drinks</li>
                <li>Boat trip to whale shark area</li>
                <li>Life jackets</li>
                <li>Snorkel gear</li>
              </ul>
          </div>
        </div>
        </div>
        <div className='row section2'>
          <div className={`col s12 search margin-out-bottom azulFuerteBackground ${haveTransItems?"havetransitems":""}`} >
            <div className=" wrap-items center padding-in-small search-wrap">
              <label className="input label white-text">TOUR SEARCH</label>
              <div className="wrap-items center padding-in-medium-right padding-in-medium-left white border-rounded" style={{width:"auto !important"}}>
                {this.renderSearchTours()}
                <div className="shapes icon-magnifying-glass icon-magnifying-glass-shades-black "></div>
              </div>
            </div>
          </div>
          <div className={`row col s12 sectionItems margin-out-bottom ${haveTransItems?"havetransitems":""}`}>
              <h2 className="col s12">Related Tours</h2>
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
        <CompareComponent eventForDelete={this.props.deleteCompareItems.bind(this)} openCompare={this.state.openCompare} itemsCompare={this.props.data.itemsCompare} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {data: state.data,formulario : state.formulario};
}
export default connect(mapStateToProps, { getInfoTour,setCartItems,fetchCartItems,fetchTours,initialConfigTransfersType,getInfoTours,setCompareItems,getCompareItems,deleteCompareItems})(Tour);
