import React,{Component} from 'react';


class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      openMenu : false,
      openCart : false,
      window : {
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
      },

    }
    this.onResizeComponent = this.onResizeComponent.bind(this);
    this.renderMenuMovil = this.renderMenuMovil.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.renderItems = this.renderItems.bind(this);
    window.addEventListener("resize",this.onResizeComponent);// se agrega un listener que lea el tamaño de la ventana


    //handlers eventos
    this.getPositionItems = this.getPositionItems.bind(this);
  }
  onResizeComponent(e){
    this.setState({window : {
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight
    }});
    if(document.documentElement.clientWidth<= 1199){
      this.setState({openMenu : false});
    }
  }
  openMenu(e){
    e.preventDefault();
    if(this.state.window.width <= 1199){
      this.setState({openMenu : !this.state.openMenu});
    }
  }
  renderMenuMovil(){
    if(this.state.window.width <= 1199){
      return(
        <div className="wrap-menuMovil">
          <div onClick={this.openMenu} className={`shapes icon burger  ${this.state.openMenu ? "open":""}`} >
              <div className="square bg-color-black item1 black"></div>
              <div className="square bg-color-black item2 black"></div>
              <div className="square bg-color-black item3 black"></div>
          </div>
        </div>
      )
    }
  }
  componentDidMount(){
    //window.addEventListener("resize", this.getPositionItems);
    //this.getPositionItems();
  }
  getPositionItems(){
    //this.setState({cart : {h:this.cartItems.clientHeight,w:this.cartItems.clientWidth,x:this.cartItems.offsetTop,y:this.cartItems.offsetLeft}});
  }
  renderItems(){
    let that = this;
    return this.props.items.map((item,id)=>{
      return <li key={id} className={`menu-item  ${item.bookAction?"book-action":""}`}><div className="wrap-link"><a className={`link-item ${that.props.active==id?"active":""}`} href={item.link}><i className="material-icons ">{item.icon}</i><span>{item.label}</span></a></div></li>;
    });
  }
  render(){
    let setPhone;
    let wall;
    if(this.props.phone){
      setPhone = <li>
          <div className="wrap-link"><a href={`tel:${this.props.phone}`}><i className='material-icons'>call</i><span>{this.props.phone}</span></a></div>

        </li>;
    }
    if(this.state.window.width <= 1199){
      wall = <div className="wall-movil" onClick={this.openMenu}></div>;
    }
    return(
      <header className={`${this.props.fixed?"fixed":""}`}>
            <div className="container">
            <nav className="nav">
              <div className="nav-wrap-logo">
                <div className="wrap-logo"><img className="logo" src="http://www.thomasmoretravel.com/img/logoTMT.png" alt="logo" /></div>
                {this.renderMenuMovil()}
              </div>
              <div className={`nav-wrap-items ${this.state.openMenu ? "open":""}`} >
                  {wall}
                  <ul className="menu lista">
                    {this.renderItems()}
                  </ul>
                  <ul  className="secondmenu lista">
                    {setPhone}
                  </ul>
              </div>
            </nav>
          </div>
      </header>
    );

  }
}
export default Header;
//                    <li><div  className="shopping-cart " ><img style={{width:"40px"}} src="img/shopping-cart.svg"></img></div></li>
