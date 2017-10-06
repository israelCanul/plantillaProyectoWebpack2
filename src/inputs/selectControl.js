import React,{Component} from 'react';
import Select from 'react-select';

class SelectControl extends Component{
  constructor(props){
    super(props);
    this.state={
      value : parseInt(this.props.value),
      valueApi : "",
      item : {}
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(val){
    console.log(val);
    if(this.props.valueKey && this.props.labelKey && val != null){
      this.setState({value : val.CountryCode,valueApi : val.Description, item : val });
      if(this.props.setCountry){// para l el checkout y la propagacion del country
        this.props.setCountry(val.CountryCode,val.Description);
      }
    }else if(val != null){
      this.setState({value : val.value, item : val });
    }else{
      this.setState({value : "", item : {} });
      if(this.props.setCountry){// para l el checkout y la propagacion del country
        this.props.setCountry("","");
      }
    }
    if(this.props.event){
      this.props.event();
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({value : nextProps.value,valueApi : nextProps.valueApi });
    // if(this.props.setCountry){
    //   this.props.setCountry(nextProps.value,nextProps.valueApi);
    // }

    return true;
  }
  componentWillMount(){

    //this.state({value : this.props.value});
  }
  // valueKey="CountryCode"
  // labelKey="Description"
  render(){
    let w={width : "250px"};
    if(this.props.autoWidth){
      w = {};
    }
    if(this.props.valueKey && this.props.labelKey){
      return(
        <Select style={w} valueKey={this.props.valueKey} labelKey={this.props.labelKey} className="padding-in-small"  onChange={this.onChange} value={this.state.value} options={this.props.optionsTours} />
      )
    }else{
      return(
        <Select style={w} className="padding-in-small"  onChange={this.onChange} value={this.state.value} options={this.props.optionsTours} />
      )
    }
  }
}

export default SelectControl;
