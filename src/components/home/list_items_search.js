import React,{Component} from 'react';
import ItemSearch from './item_search';

class ListItems extends Component{
  constructor(props){
    super(props);
    this.state={
      rows : 2,
      cols : 0,
      margin : 20,
      windowWidth : 0,
      items : 1,
      left : 300,
      bulletActive : 0,
      bulletsNumber : 0,
      timeSlide : 5000,
    }
    this.initResize = this.initResize.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.renderBullets = this.renderBullets.bind(this);
    //this.setLeftWrapListItems = this.setLeftWrapListItems.bind(this,id);
    this.gallerySliding = this.gallerySliding.bind(this);
  }

  gallerySliding(){
    let that = this;
    let itemGallerySelected = this.state.bulletActive;
    let itemsGalleryNumber = this.state.bulletsNumber;

    if(itemGallerySelected < itemsGalleryNumber){
      let nextId = itemGallerySelected + 1;
      if(nextId  == itemsGalleryNumber){
        nextId = 0;
      }
      this.setLeftWrapListItems(nextId,this);
    }
    // setTimeout(function () {
    //   that.gallerySliding();
    // }, that.state.timeSlide);
  }
  componentWillMount(){
    let cont = 1;
    let itemCount = 0;

    let colsN = Math.floor(this.props.items.length / 2);
    let mod = this.props.items.length % 2;
    if(mod !=0) {
      colsN ++;
    }
    this.setState({items: this.props.items.length ,cols : colsN });
  }
  initResize(){
    let itemsForView = 0;// variable para determinar cuantos items van por slide

    if(window.innerWidth<=1000){
      this.wrapItems.style.width = 300+"px";
      this.setState({left : 300});
      itemsForView = 300 /  300;
    }else if(window.innerWidth < 1600){
      this.wrapItems.style.width = 600+"px";
      this.setState({left : 600});
      itemsForView = 600 /  300;
    }else if((window.innerWidth >= 1600)){
      this.wrapItems.style.width = 900+"px";
      this.setState({left : 900});
      itemsForView = 900 /  300;
    }
    let widthWrap = this.state.cols * 300;
    if(this.wrapItems.childNodes[0]){
      this.wrapItems.childNodes[0].style.width = widthWrap + "px";
    }

    //se calcula cuantos bullets hay en el slide
    let bulletsN = Math.floor(this.state.cols / itemsForView );
    let mod = this.state.cols % itemsForView;
    if(mod !=0) {
      bulletsN ++;
    }
    if(bulletsN != 0){
      this.setState({bulletsNumber : bulletsN});
    }
  }
  componentDidMount(){
    this.initResize();
    this.gallerySliding();
      window.addEventListener("resize",this.initResize);
  }
  setLeftWrapListItems(id,e){
    this.setState({bulletActive : id});
    this.wrapItems.childNodes[0].style.left = -id * this.state.left+"px";
  }
  renderBullets(){

    let items = [];
    if(this.state.bulletsNumber != 0){
      for (var i = 0; i < this.state.bulletsNumber; i++) {
        items.push(<div key={i} className={`bullets shapes small icon-circle white margin-in-medium-left ${i == this.state.bulletActive? "active":""}`} onClick={this.setLeftWrapListItems.bind(this,i)} ></div>)
      }
    }
    return items;
  }
  renderItems(){
      let items = [];
      let temp = [];

      let cont = 1;
      let tours = [];

      this.props.items.map((item,id)=>{
        temp.push(item);
        cont++;
        if(cont == 3 ){
          cont = 1;
          items.push(temp);
          temp = [];
        }
      });
      if(temp.length>0){
        items.push(temp);
      }
      cont = 0;

      //this.wrapItems.childNodes[0].style.width : 300 * items.length})
      for (var i = 0; i < items.length; i++) {

        for (var y = 0; y < items[i].length; y++) {
          let top = y * 300;
          let left = i * 300;
          let margTop = "10px";
          let margIzq = "10px";
          if(i==0){
              margIzq = "0px";
          }
          if(y==0){
            margTop = "0px";
          }
           tours.push(<ItemSearch eventToCompareComponent={this.props.eventToCompareComponent.bind(this)} key={cont} item={items[i][y]} style={{"top":top+"px","left":left+"px",margin:"5px"}}   />) ;
           cont++;
        }
      }
      return tours;
  }
  render(){
    return(
      <div className="wrapResults-container">
      <div className="wrapResults-container-slide">
        <div className="list-items" ref={r=>this.wrapItems = r}>
          <div  className="list-items-wrap ">
            {this.renderItems()}
          </div>
        </div>
      </div>
      <div className="wrapResults-container-bullets white-text">
        <div className="wrap-items wrap-items-row center">
          {this.renderBullets()}
        </div>
      </div>
      </div>
    );
  }
}

export default ListItems;
