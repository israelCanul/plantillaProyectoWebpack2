import React,{Component} from 'react';

class CompareComponent extends Component{
  constructor(props){
    super(props);
    this.state={
      isOpen :false,
      items : 0,
    }
  }
  renderItems(){
    if(this.props.itemsCompare){
      return this.props.itemsCompare.map((item,id)=>{
        return <ItemCompare eventForDelete={this.props.eventForDelete} id={id} data={item}  key={id} />
      });
    }else{
      return;
    }
  }
  eventOpenCompareComponent(e){
    this.setState({isOpen : !this.state.isOpen});
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.itemsCompare.length>0 && this.state.items < nextProps.itemsCompare.length){
      this.setState({isOpen : true ,items : nextProps.itemsCompare.length});
    }
    return true;
  }
  render(){
    return(
      <div className={`compare_component azulFuerteBackground ${this.state.isOpen?" active":""}`}>
        <div className="sectionClose  wrap-items wrap-items-row">
          <div onClick={this.eventOpenCompareComponent.bind(this)} className={`shapes icon icon-close small  ${this.state.isOpen?"show":""} `}></div>
          <div onClick={this.eventOpenCompareComponent.bind(this)} className={`openCompare naranjaDiseno ${this.state.isOpen?"":"show"}`}><i  className={`material-icons medium  margin-in-small-left`} >remove_red_eye</i><span className="white-text text oswald margin-in-small-right margin-in-small-left ">WATCH LIST</span></div>
        </div>
      <div className="wrap-items wrap-items-row center white-text text oswald margin-in-medium-bottom">
        MY WATCH LIST
      </div>
      {this.renderItems()}
      </div>
    );
  }
}
// constante en react que renderisa los datos pasados por compareComponent
class ItemCompare extends Component{
  deleteItem(id,e){
    this.props.eventForDelete(id);
  }
  render(){
    return(
      <div className="itemCompare">
        <i onClick={this.deleteItem.bind(this,this.props.id)} className="material-icons">delete_forever</i>
        <img  src={this.props.data.img} />
        <h2>{this.props.data.label}</h2>
        <p>{this.props.data.description}</p>
        <a href={`http://www.thomasmoretravel.com/app/TourDetail.aspx?4=${this.props.data.id}`}>Read More</a>
      </div>
    );
  }
}
export default CompareComponent;
