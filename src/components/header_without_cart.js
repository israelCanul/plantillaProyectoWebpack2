import React from 'react';
import Header from './Header';

import SearchComponent from './tour/search_tours';
import '../../scss/app2.scss';


class HeaderApp extends Header{
  constructor(props){
    super(props);
    this.state={
      openSearch : false,
      openMenu : false,
      openCart : false,
      window : {
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
      },
      cart : {
        x:0,
        y:0,
        w:0,
        h:0
      }
    }
  }
  openSearch(e){
    e.preventDefault();
    //if(window.innerWidth > 767){
        this.setState({openSearch : !this.state.openSearch});
    //}
  }
  renderItems(){
    let that = this;
    return this.props.items.map((item,id)=>{
      if(item.type){
        if(item.type=="search"){
          return (<li key={id} className={`menu-item searchMenu `}>
            <div className="wrap-link">
              <a onClick={this.openSearch.bind(this)} className={`link-item ${that.props.active==id?"active":""}`} href={item.link}>
                <i className="material-icons ">{item.icon}</i>
              </a>
            </div>
            <SearchComponent open={this.state.openSearch} itemsToSearch={this.props.itemsForSearch} />
          </li>);
        }
        return ;
      }
      return <li key={id} className={`menu-item  ${item.bookAction?"book-action":""}`}><div className="wrap-link"><a className={`link-item ${that.props.active==id?"active":""}`} href={item.link}><i className="material-icons ">{item.icon}</i><span>{item.label}</span></a></div></li>;
    });
  }

}

export default HeaderApp;
