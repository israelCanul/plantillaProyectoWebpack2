import React,{Component} from 'react';

//item component
import ItemSearch from '../home/item_search';


class ListRelated extends Component{
  constructor(props){
    super(props);
    this.state={

    }
    this.renderItems = this.renderItems.bind(this);
  }
  renderItems(){
    if(this.props.items){
    return   this.props.items.map((item,id)=>{
        return <ItemSearch eventToCompareComponent={this.props.eventToCompareComponent}  key={id} item={item}  />
      });
    }
  }
  render(){
    return(
      <div className="list-items-wrap">
        {this.renderItems()}
      </div>
    );
  }
}

export default ListRelated;
