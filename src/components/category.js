import React,{Component} from 'react';
import ReactDOM from 'react-dom';

// redux libraries
import {connect } from 'react-redux';
import {fetchTours,fetchCartItems,setCartItems,getInfoCat,setCompareItems,
  getCompareItems,deleteCompareItems} from '../actions/index';
import {initialConfigTransfersType} from '../actions/actionsTransfer';

import '../../scss/app.scss';
//import 'react-select/dist/react-select.css';


//componentes
import Header from './Header';
import Footer from './Footer';
import Gallery from './tour/gallery';
import ItemSearch from './home/item_search';
import CompareComponent from './home/container_compare_tours';

//data config
import {itemsMenu,configApp} from '../data_config';

//inputs
import SelectControl from '../inputs/selectControl';



class Category extends Component{
  constructor(props){
    super(props);
    this.state = {
      movil : false,
      bookEngine : false ,
    }
    this.isMovil = this.isMovil.bind(this);
    this.setCompareObject = this.setCompareObject.bind(this);

    window.addEventListener("resize", this.isMovil);
  }
  setCompareObject(obj,e){
    e.preventDefault();
    this.props.setCompareItems(obj);
  }
  isMovil(){

    if(window.innerWidth > 766){
      this.setState({movil : false});
    }else{
      this.setState({movil : true});
    }

  }
   componentWillMount(){
     this.props.fetchTours();
     this.props.fetchCartItems();
     this.props.initialConfigTransfersType();
     this.isMovil();
     this.props.getInfoCat();
     this.props.getCompareItems();
   }

   renderSearchTours(){
    if(this.props.data.tours != null){
      return <SelectControl  optionsTours={this.props.data.tours.items} />;
    }else{
        return <span className="Select-loading margin-in-medium" ></span>;
    }
   }
   renderItems(){

     if(this.props.data.tours){
       if(Object.keys(this.props.data.tours.items).length>0){
         return this.props.data.tours.items.map((item,id)=>{
            return  <ItemSearch eventToCompareComponent={this.setCompareObject} className="" key={id} item={item}/>;
          });
        }
     }
   }
  //items={this.props.data.tours.items}
  render(){
        let marginItems=0;
    let haveTransItems=false;
    if(this.props.formulario.itemTrans){
      if(Object.keys(this.props.formulario.itemTrans).length>0){
        haveTransItems = true;
      }
    }
    if(this.props.data.tours){
      if(Object.keys(this.props.data.tours.items).length>0){
        console.dir(this.wrapItems.clientWidth);
        marginItems = (this.wrapItems.clientWidth % 290) /2;

      }
    }
    let banner,title;
    if(this.props.data.dataCat){
      banner = this.props.data.dataCat.banner;
      title = this.props.data.dataCat.title;
    }

    return(
      <div className="category-page" id="app-wrap">
      <Header
          typeTransfers={this.props.formulario.config}
          itemsCart={this.props.data.itemsCart}
          fixed={true}
          active={0}
          items={itemsMenu}
          phone={configApp.phone}/>
        <div className='row category'>
          <div className={`col s12 search margin-in-medium-bottom ${haveTransItems?"havetransitems":""}  azulFuerteBackground `} >
            <div className=" wrap-items center padding-in-small search-wrap">
              <label className="input label white-text">TOUR SEARCH</label>
              <div className="wrap-items center padding-in-medium-right padding-in-medium-left white border-rounded" style={{width:"auto !important"}}>
                {this.renderSearchTours()}
                <div className="shapes icon-magnifying-glass icon-magnifying-glass-shades-black "></div>
              </div>
            </div>
          </div>
          <div className="description col s12 row margin-out-bottom">
            <div className="col s12 description-text ">
              <h1 className="margin-out padding-out text-align-center"><span className="naranjaDiseno-text">{title}</span></h1>
              <h2 className="margin-out padding-out text-align-center "><span className="subtitle"></span></h2>
              <p>
                Explore a world of natural and historical wonders, adventures and experiences with Thomas More Travel. Don’t miss Xcaret Plus, a nature theme park for a fun-filled day out with the family. Visit a magnificent underground river with thousands of stalactites and stalagmites at Rio Secreto. Take advantage of our Whale Shark Adventure tour, and live the once in a lifetime opportunity during the summer of swimming with the worlds’ largest fish. Adventure through the jungle and visit the ancient Mayan city of Coba and enjoy zip-lining, kayaks, and rappel with our Mayan Encounter Zip-lining tour.
              </p>
            </div>
            <div className="col s12 description-slide margin-out-bottom">
              <img src={banner} className="img img-responsive" />
            </div>
          </div>
          <div className={`row col s12 sectionItems margin-out-bottom ${haveTransItems?"havetransitems":""}`}>
              <div ref={i=>this.wrapItems = i} className="wrapResults row" style={{paddingLeft : marginItems + "px"}}>
                {this.renderItems()}
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
export default connect(mapStateToProps, { setCartItems,fetchCartItems,fetchTours,initialConfigTransfersType,getInfoCat,setCompareItems,getCompareItems,deleteCompareItems})(Category);
