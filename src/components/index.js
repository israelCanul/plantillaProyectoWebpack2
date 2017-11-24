import React,{Component} from 'react';

import * as firebase from "firebase";
import Bodymovin from 'bodymovin';

// redux libraries
import {connect } from 'react-redux';
import {fetchTours,uploadImageToSection,deleteImage} from '../actions/index';

//importamos los estilos
import '../../scss/app.scss';



//componentes
import Header from './Header';
import Footer from './Footer';


//data config
import {itemsMenu,configApp,prodCodeAnalitics} from '../data_config';



class Index extends Component{

  constructor(props){
    super(props);
    this.state={
      classImageIndex : "firstIndex",
      indexSelected : 0,
      openCompare : false,
      linkTourBanner : "#",
    }
    this.inputFileChange = this.inputFileChange.bind(this);
    this.inputFileChange2 = this.inputFileChange2.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
  }
  componentDidMount(){

  }
  deleteElement(elem,event){
    console.log(elem);
    this.props.deleteImage(elem);
  }
   componentWillMount(){
     this.props.fetchTours();
   }
   inputFileChange(event){

    this.props.uploadImageToSection(event.target.files,"tours/756A/homeGallery","-Kz5edxuFYokkAVTxZNl",1);
   }
   inputFileChange2(event){

    this.props.uploadImageToSection(event.target.files,"tours/756A/home","-KzA_3srlLEVX_lmTSri",0);
   }
   renderImages(){
     let that = this;
     if(this.props.data.item){
       if(this.props.data.item.images){
         if(this.props.data.item.images.homeGallery){
           
           return Object.keys(this.props.data.item.images.homeGallery).map(function(key) {
              return (
              <div className="col s12 m3" style={{position : "relative"}}>
                <div style={{position : "absolute",top:0,right:0,width:"100%",height:"30px",textAlign:"right"}} >
                    <i onClick={that.deleteElement.bind(this,that.props.data.item.images.homeGallery[key].ref)} className="material-icons red-text">delete_forever</i>
                </div>
                <img style={{width : "100%"}} src={that.props.data.item.images.homeGallery[key].url} />
              </div>
            )
           });
         }
       }


     }
   }
   render(){

    return(
      <div className="index-page" id="app-wrap">
      <Header
          itemsCart={this.props.data.itemsCart}
          fixed={true}
          active={0}
          items={itemsMenu}
          phone={configApp.phone}/>
        <div className="indexPage row margin-out-bottom">

          <input ref={i=>this.inputFile= i } onChange={this.inputFileChange} name="myFile" type="file" multiple/>
          <input ref={i=>this.inputFile2= i } onChange={this.inputFileChange2} name="myFile" type="file" />
          <div className="row">
            <div className="col s12 row">
              {this.renderImages()}
            </div>
          </div>
        </div>
      <Footer
            logo="http://www.thomasmoretravel.com/img/logoTMT.png"
            items={itemsMenu}
            socialLinks={[
              {link:"#",img:"http://www.thomasmoretravel.com/img/facebook-logo-2.png",active:true},
              {link:"#",img:"http://www.thomasmoretravel.com/img/twitter-logo.png"}]}
            rights="&#169; 2017 Los Murales All rights reserved" />
    </div>
    );
  }
}
function mapStateToProps(state) {
  return {data: state.data,formulario : state.formulario};
}
export default connect(mapStateToProps, {fetchTours,uploadImageToSection,deleteImage})(Index);
