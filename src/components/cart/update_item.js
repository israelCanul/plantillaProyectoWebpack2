import React,{Component} from 'react';

class ItemUpdate extends Component{
  constructor(props){
    super(props);
    this.state={
      clase: '',
    }
    this.renderItems = this.renderItems.bind(this);
  }
  componentDidMount(){
    let that = this;
    setTimeout(()=>{
      that.setState({clase: 'active'});
    },400);
  }
  close(){
    this.setState({clase:''});
    setTimeout(()=>{
      this.props.eventReset();
    },400);
  }
  render(){
    return(
      <div   className={`white-text modalTransUpdated ${this.state.clase}`} >
        <div className="modalTransUpdated-close">
          <div onClick={this.close.bind(this)} className="shapes icon-close small after-white before-white" ></div>
        </div>
        <div className="modalTransUpdated-close text-align-center">
          <label>{` ${Object.keys(this.props.items).length==1?"CHOOSE":"CHOOSE ONE"}`}</label>
        </div>
        <div className="modalTransUpdated-wrapItems">
          {this.renderItems()}
        </div>
      </div>
    );
  }
  renderItems(){
    let that = this;
    if(this.props.items){
       return this.props.items.map((item,id)=>{
        return (
          <div  key={id} className={`modalTransUpdated-wrapItems-item ${that.props.typeActual == item.ItemTypeCode?"azulFuerteDiseno white-text":" white azulFuerteDiseno-text"}`}>
            <h3>{`${item.ItemTypeCode} - ${item.attributeTypes}`}</h3>
            <h4>{` ${parseFloat(item.TotalPriceUSD).toFixed(2)} USD ${item.ItemTypeCode=='PRIVATE'?" Per Vehicle / Taxes included ":" Per passenger(s) / Taxes included "}`}</h4>
            <button className="margin-in-small-top" onClick={this.props.setItemTransToCart.bind(this,item)} >SELECT</button>
          </div>
        );
      });
    }
  }
}

export default ItemUpdate;
