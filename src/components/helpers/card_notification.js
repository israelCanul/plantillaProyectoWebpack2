import React,{Component} from 'react';

class CardNotification extends Component{
  constructor(props){
    super(props);
    this.state={
      clases : "card notification "
    }
  }
  componentDidMount(){
    var that = this;
    setTimeout(()=>{
      that.setState({clases : "card notification move"});
    },1000);
  }
  render(){
    return(
      <div ref={i=>this.cardNotification=i} className={this.state.clases} style={this.props.style} >
        <div className=""><img src="/img/carrito.gif" /></div>
        <div><p>Saving...</p></div>
      </div>
    );
  }
}

export default CardNotification;
