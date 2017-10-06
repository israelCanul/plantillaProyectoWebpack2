import React,{Component} from 'react';

//inputs
import Select from 'react-select';

class SearchComponent extends Component{
  constructor(props){
    super(props);
    this.state={
      valueSelected :"",
      openSearch : false,
    }
  }
  onChangeControlSearch(val){
    
    let url;
    //http://wdev.royalresorts.local/thomasmoretravel.com.mx/
    if(location.hostname == "www.thomasmoretravel.com.mx" || location.pathname == "/htmlHeaderESP.html" || location.pathname == "/thomasmoretravel.com.mx/"){
        url = "http://www.thomasmoretravel.com.mx/app/TourDetail.aspx?4=";
    }else{
        url = "http://www.thomasmoretravel.com/app/TourDetail.aspx?4=";
    }
    if(val!=null){
      window.location = url+val.ItemCode;
    }
  }
  renderControlSearch(){

    return <Select
          ref="selectCountry"
          name="SP"
          valueKey="ItemCode"
          labelKey="ItemAttributeNAME"
          options={this.props.itemsToSearch}
          onChange={this.onChangeControlSearch}/>

  }
  openSearch(e){
    e.preventDefault();
    this.setState({openSearch : !this.state.openSearch});
  }
  render(){
    return (<li  className={`menu-item searchMenu `}>
      <div className="wrap-link">
        <a onClick={this.openSearch.bind(this)} className={`link-item `} href="#">
          <i className="material-icons ">search</i>
        </a>
      </div>
      <div className={`Search ${this.state.openSearch?"active":""}`}>
        {this.renderControlSearch()}
      </div>
    </li>);
  }
}

export default SearchComponent;
