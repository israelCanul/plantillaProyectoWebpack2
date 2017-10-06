import React,{Component} from 'react';


class ItemSearch extends Component{

  constructor(props){
    super(props);

  }
  render(){
    let {item,style,className,eventToCompareComponent} = this.props;
    let title = item.label;
    let url = item.url;
    let img = item.img;
    let offer;
    if(item.offer && item.offer != ""){
      offer =<div className="item-details-offer"><label>Save<br></br> {item.offer}</label></div>;
    }
    return(
      <div className={`item ${className?className:""}`} style={style}>
        <div className="item-image" style={{"backgroundImage":"url('"+img+"')"}}>

        </div>
        <div className="item-details">
          {offer}
          <div className="item-details-description">
            <h3>{title}</h3>
            <div className="wrap-items  wrap-items-row center-vertical ">
              <a   href={`http://www.thomasmoretravel.com/app/TourDetail.aspx?4=${item.id}`}>Read More</a>
              <a className="margin-in-small-left" onClick={this.props.eventToCompareComponent.bind(this,item)} href="#">Add to Watch List</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ItemSearch;
