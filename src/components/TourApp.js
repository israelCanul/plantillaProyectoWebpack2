import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class TourApp extends Component{
  render(){
    <div>
      este es el texto del header
      {this.props.children}
    </div>
  }
}

export default TourApp;
