import React,{Component} from 'react';
import ReactDOM from 'react-dom';

// redux libraries
import {connect } from 'react-redux';
import {fetchCartItems,setCartItems} from '../actions/index';
import {initialConfigTransfers,initialConfigTransfersType,getCatalogItemsTransfer,clearSearch} from '../actions/actionsTransfer';

import '../../scss/app.scss';
//import 'react-select/dist/react-select.css';


//componentes
import Header from './Header';
import Footer from './Footer';
import ListItems from './home/list_items_search';
import Formulario from '../transferEngine/form_search';


//data config
import {itemsMenu,configApp} from '../data_config';



class Index extends Component{
  constructor(props){
    super(props);
    this.state={
      classImageIndex : "firstIndex",

    }
  }
   componentWillMount(){
     this.props.initialConfigTransfers();
     this.props.initialConfigTransfersType();
     this.props.fetchCartItems();
     //

     AFRAME.registerComponent('change-on-hover', {
       schema: {
         to: {default: '2.5 2.5 2.5'}
       },
       init: function () {
         let data = this.data;
         let child = this.el.children[0];

         if(child.tagName == "A-TEXT"){
           child.addEventListener('click', function () {
             console.dir(this.getAttribute('source'));
             window.location=this.getAttribute('source');
           });
         }

         this.el.addEventListener('mouseenter', function () {
           if(child.tagName=="A-VIDEO"){
             child.setAttribute('visible', true);
             //document.getElementById('penguin-sledding').currentTime = 0;
             document.getElementById('penguin-sledding').play();
           }else{
             child.setAttribute('visible', true);
           }
         });
         this.el.addEventListener("mouseleave",  function () {
           if(child.tagName=="A-VIDEO"){
             child.setAttribute('visible', false);
             document.getElementById('penguin-sledding').pause();
           }else{
             child.setAttribute('visible', false);
           }
         });
       }
     });
   }
   componentDidMount(){

   }
   //asset
   //<video id="penguin-sledding"  loop="true" src="/gallery/img/pirata.mp4"></video>

   //  <a-box src="#texture1" position="10 2 -20" rotation="0 -30 0" height="8" width="8" change-on-hover="to: #texture1;from:#texture3;target:cylinderText">
   //    <a-video src="#penguin-sledding" visible="false" height="7.9" width="7.9" position="0 0 1"></a-video>
   //  </a-box>
  //  <a-plane src="#homeIcon" height="0.4" width="0.4" position="0.4 -1 0" rotation="-90 0 0"></a-plane>
  //  <a-plane src="#backIcon" height="0.4" width="0.4" position="-0.4 -1 0" rotation="-90 0 0"></a-plane>
  // <img id="homeIcon" src="/gallery/img/home.png"/>
  // <img id="backIcon" src="/gallery/img/frame.png"/>
  // <a-entity light="type: ambient; color: #fff;intensity: 0.5;"></a-entity>
  // <a-entity light=" type: spot; color: #Fff; intensity: 1; angle: 25"  rotation="-45 0 0" position="0 10 -12"></a-entity>
//light="defaultLightsEnabled: false"
  render(){
    // se valida que la informacion del formulario sea correcta
    return(
      <div className="gallery-page" >
      <Header
          typeTransfers={this.props.formulario.config}
          itemsCart={this.props.data.itemsCart}
          fixed={true}
          active={0}
          items={itemsMenu}
          phone={configApp.phone}/>
          <a-scene height="500" >
            <a-assets>
              <img id="bgblue" src="/gallery/img/bg-blue.jpg"/>
              <img id="backIcon" src="/gallery/img/frame2.png"/>
              <img id="texture1" src="/gallery/img/xcaret.jpg"/>
              <img id="texture2" src="/gallery/img/tour.jpg"/>
              <img id="texture3" src="/gallery/img/tirolesa.jpg"/>
            </a-assets>

            <a-plane src="#backIcon" height="8.8" width="8.8aw" position="0 2 -20" rotation="0 0 0"></a-plane>
             <a-box src="#texture1" position="0 2 -20" height="7.5" width="7.5" change-on-hover="to: #texture3;from:#texture2">
                <a-text id="cylinderText3" source="/gallery/xcaret_vr.html" value="Xcaret" align="center" color="#FFF" visible="false" position="0 -3 1"
                        geometry="primitive: plane; width: 3.75" width="15" material="color: #333">
                </a-text>
             </a-box>
             <a-plane src="#backIcon" height="8.8" width="8.8" position="-10 2 -20 " rotation="0 10 0"></a-plane>
             <a-box src="#texture3" position="-10 2 -20 " rotation="0 10 0" height="7.5" width="7.5" change-on-hover="to: #texture3;from:#texture2">
               <a-text id="cylinderText3" source="/gallery/xplor_vr.html" value="Xplor" align="center" color="#FFF" visible="false" position="0 -3 1"
                       geometry="primitive: plane; width: 3.75" width="15" material="color: #333">
               </a-text>
             </a-box>

             <a-plane src="#backIcon" height="8.8" width="8.8" position="10 2 -20" rotation="0 -10 0"></a-plane>
             <a-box src="#texture2" position="10 2 -20" rotation="0 -10 0" height="7.5" width="7.5" change-on-hover="to: #texture3;from:#texture2">
               <a-text id="cylinderText3" source="/gallery/catamaran_vr.html"  value="Catamaran" align="center" color="#FFF" visible="false" position="0 -3 1"
                       geometry="primitive: plane; width: 3.75" width="15" material="color: #333">
               </a-text>
             </a-box>


           <a-camera look-controls><a-cursor></a-cursor></a-camera>
           <a-sky src="#bgblue"  id="image-360" ></a-sky>
         </a-scene>
    </div>
    );
  }
}
function mapStateToProps(state) {
  return {data: state.data,formulario : state.formulario};
}
export default connect(mapStateToProps, { setCartItems,fetchCartItems,initialConfigTransfers,initialConfigTransfersType,getCatalogItemsTransfer,clearSearch})(Index);
