import React,{Component} from 'react';

import * as firebase from "firebase";
import Bodymovin from 'bodymovin';

// redux libraries
import {connect } from 'react-redux';
import {fetchTours,uploadImageToSection} from '../actions/index';

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
  }
  componentDidMount(){

  }
   componentWillMount(){
     this.props.fetchTours();
   }
   inputFileChange(event){

    this.props.uploadImageToSection(event.target.files,"tours/756A/homeGallery","-Kz5edxuFYokkAVTxZNl",1);
   }
   inputFileChange2(event){

    this.props.uploadImageToSection(event.target.files,"tours/756A/home","-Kz5edxuFYokkAVTxZNl",0);
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
export default connect(mapStateToProps, {fetchTours,uploadImageToSection})(Index);
