import React,{Component} from 'react';

class ListCartItems extends Component{
  constructor(props){
    super(props);
     this.viewMore = this.viewMore.bind(this);
     this.state = {
       transTypeText:[],
     }
     this.renderItems = this.renderItems.bind(this);
  }
  viewMore(){
    if(Object.keys(this.props.items).length > 5){
        return(<div className="Cart-wrap-more">
                <a href="/cart-items.html" onclick={this.moreHandleClick.bind(this)} > View All </a>
              </div>);
    }
  }
  componentWillReceiveProps(nextProps){
    let that = this;
    let temp = [];
    if(nextProps.transferTypes){
      nextProps.transferTypes.map((item,id)=>{
         temp[item.pkTransferTypeID] = {tipo:item.sTransferTypeCode,clase:item.ItemClassCode};
      });
    }
    this.setState({transTypeText : temp});
  }
  componentDidMount(){
    // se ejecuta cuando el componente ya a sido montado en el DOM del documento
  }
  moreHandleClick(event){
    //event.prevenDefault();

  }
  renderItems(){
    let that = this;

   let cartItems = this.props.items.map((item,id)=>{

     if(id > (Object.keys(this.props.items).length - 6)){


       if(item.codeTrans && item.transferType && this.state.transTypeText[item.transferType]!=undefined){ // que sea trans y que ya esten inicializados los tipos de trans desde la configuracion del webservice
         let descriptionText;
         switch (this.state.transTypeText[item.transferType].tipo) {
           case "ARRIVAL":
             descriptionText = item.arrivalHotelName;
             break;
           case "DEPARTURE":
             descriptionText = item.arrivalHotelName;
             break;
           case "ROUNDTRIP":
             descriptionText = item.arrivalHotelName + " - "+ item.departureHotelName;
             break;
           default:
         }

         // se renderiza el tranfer con las variables
         return <ItemCart key={id} date={`${item.arrivalDate}`} titleOne={this.state.transTypeText[item.transferType].tipo} titleTwo="Transportation" description={descriptionText}  trans={true}  />
       }else if(!item.codeTrans){

       }
     }
   });
   return cartItems;
  }
  render(){
    return(
      <div className={`Cart ${this.props.open?"active":""}`}>
        <span className="Cart-flechita"></span>
        <div className="Cart-wrap">
          <h3>Last Cart Items </h3>
          <div className="Cart-wrap-items">
            {this.renderItems()}
          </div>
          {this.viewMore()}
        </div>
      </div>
    );
  }
}

const ItemCart = ({description,titleOne,titleTwo,date})=>{
  //date={item.arrivalDate} titleOne={this.state.transTypeText[item.transferType]} titleTwo="Transportation" description={item.ItemClassCode}
  return(
    <div className="CartItem">
      <div className="CartItem-title">
        <div className="text-align-left CartItem-title-left text-uppercase">{titleOne}</div>
        <div className="text-align-right CartItem-title-right">{titleTwo}</div>
      </div>
      <div className="CartItem-description">
        <div className="text-align-left CartItem-description-left">
          {description}
        </div>
        <div className="text-align-right CartItem-description-left">
        <span className="red-text">Date :  </span>{date}
        </div>
      </div>
    </div>
  );
}


export default ListCartItems;
