import React,{Component} from 'react';

import {connect } from 'react-redux';
import SearchComponent from './tour/search_tours';
import {fetchCartItems,getInfoTours} from '../actions/index';
import {initialConfigTransfers,initialConfigTransfersType} from '../actions/actionsTransfer';

import '../../scss/app2.scss';
//import 'react-select/dist/react-select.css';
//data config
import {itemsMenu,configApp} from '../data_config';

class DivHeader extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  componentWillMount(){
    this.props.initialConfigTransfers();
    this.props.initialConfigTransfersType();
    this.props.fetchCartItems();
    this.props.getInfoTours();
  }
  componentDidMount(){

  }

  render(){
    let toursInfo;
    if(this.props.data.toursInfo){
      console.dir(this.props.data.toursInfo);
      toursInfo = this.props.data.toursInfo;
    }
    return(
      <SearchComponent open={this.state.openSearch} itemsToSearch={toursInfo} />
    );
  }
}

function mapStateToProps(state) {
  return {data: state.data,formulario : state.formulario};
}
export default connect(mapStateToProps, { fetchCartItems,initialConfigTransfers,initialConfigTransfersType,getInfoTours})(DivHeader);
