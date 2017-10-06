import React,{Component} from 'react';

//inputs
import SelectControl from '../../inputs/selectControl';


class PersonalInformation extends Component{
  constructor(props){
    super(props);
    this.state={
      name : "",
      lastname  : "",
      country : this.props.country,
      countryApi : this.props.countryApi,
      zipCode : "",
      telephone : "",
      AreaCode : "",
      Email : "",
      ConfirmEmail : "",
    }
    this.setCountry = this.setCountry.bind(this);
    //this.soloNum = this.soloNum.bind(this);
  }
  soloNum(e){
    let Re = /[0-9]+/;
    let myArray = Re.exec(e.target.value);
    if(myArray!=null){
      e.target.value =myArray[0];
    }else{
      e.target.value= "";
    }
  }
  componentWillReceiveProps(nextProps){

    this.setState({country: nextProps.country,countryApi: nextProps.countryApi});
  }
  setCountry(val,valApi){
    this.setState({country: val,countryApi: valApi});
  }
  keyName(e){
     this.nameInput.value=e.currentTarget.value;
     this.setState({name : e.currentTarget.value.trim()});
     //this.validar();
     if(e.currentTarget.value==""){
       e.target.className='error';
     }else{
       e.target.className='';
     }
   }
   keyNameLast(e){
    this.lastnameInput.value=e.currentTarget.value;
    this.setState({lastname : e.currentTarget.value.trim()});
    //this.validar();
    if(e.currentTarget.value==""){
      e.target.className='error';
    }else{
      e.target.className='';
    }
  }
  itemsCountry(){// funcion que renderiza el control para seleccionar el pais en el formulario
    var that = this;// contexto de la aplicacion
    let selectCountry;
    // si existe la variable y  esta definida se  renderiza
    if(this.props.formulario.configTrans){
      var selectCountryItems = this.props.formulario.configTrans[2];
      if( typeof selectCountryItems != 'undefined'){
        if(selectCountryItems.length>0){
          selectCountry = <SelectControl
              ref="selectCountry"
              name="SP"
              setCountry = {this.setCountry}
              valueKey="CountryCode"
              labelKey="Description"
              value ={this.props.country}
              valueApi={this.props.countryApi}
              optionsTours={this.props.formulario.configTrans[2]}
              onChange={this.selectPeople}/>;
        }
      }
    }

    return selectCountry;
  }
  keyZipCOde(e){
    this.setState({zipCode : e.currentTarget.value.trim()});
  }
  keyTelephone(e){
    this.setState({telephone : e.currentTarget.value.trim()});
  }
  keyAreaCOde(e){
    this.setState({AreaCode : e.currentTarget.value.trim()});
  }
  keyEmail(e){
    let Re = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let myArray = Re.exec(e.target.value);
    let email = this.state.ConfirmEmail;

    if(myArray!=null){
      e.target.value = myArray[0];
      this.setState({Email : myArray[0] });
      // por cada cambio se pregnta si hay igualdad en email y su conrmacion si hay diferencia se deja en blanco ConfirmEmail
      if(email != myArray[0]){
        this.ConfirmEmailInput.value="";
        this.setState({ConfirmEmail : ""});
      }
    }else{
      e.target.value = "";
      this.setState({Email : ""});
      //se elimina la informacion del confirm email y se quita del satet
      this.ConfirmEmailInput.value = "";
      this.setState({ConfirmEmail : ""});
    }
  }
  keyConfirmEmail(e){
    let Re = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let myArray = Re.exec(e.target.value);
    let email = this.state.Email;

    if(myArray!=null){
      if(email==myArray[0]){
        e.target.value = myArray[0];
        this.setState({ConfirmEmail : myArray[0] });
      }else{
        e.target.value = "";
        this.setState({ConfirmEmail : ""});
      }
    }else{
      e.target.value = "";
      this.setState({ConfirmEmail : ""});
    }
  }
  render(){
    return(
      <div id="personalInformation" className= "row personalInfo ">
        <div className="col s12 personalInfo-description">
          <div className="row without-margin-bottom personalInfo-description-line">
              <div className="wrap-items wrap-items-column-reverse center-horizontal s12 m4 l4 col margin-top">
                  <input ref={elm=>{this.nameInput=elm}}  onBlur={this.keyName.bind(this)}  id="SName"  type="text"   />
                  <label htmlFor="SName" id="firstname">Name</label>
              </div>
              <div className="wrap-items wrap-items-column-reverse center-horizontal s12 m4 l4 col margin-top">
                  <input ref={elm=>{this.lastnameInput=elm}}   onBlur={this.keyNameLast.bind(this)}   type="text"   />
                  <label  className="">Last Name</label>
              </div>
              <div className="wrap-items wrap-items-column-reverse center-horizontal s12 m4 l4 col margin-top">
                  {this.itemsCountry()}
                  <label  className="">Last Name</label>
              </div>
          </div>
          <div className="row without-margin-bottom personalInfo-description-line">
            <div className="wrap-items wrap-items-column-reverse center-horizontal s12 m4 l4 col margin-top">
                <input ref={elm=>{this.numberInput=elm}} type="text"  onBlur={this.keyZipCOde.bind(this)} onChange={this.soloNum} id="SZipCode"   />
                <label >Zip Code</label>
            </div>
            <div className="wrap-items wrap-items-column-reverse center-horizontal s12 m4 l4 col margin-top">
                <input ref={elm=>{this.numberInputArea=elm}} className="ejemplo"   onBlur={this.keyAreaCOde.bind(this)} onChange={this.soloNum}  id="SACode" type="text"  />
                <label>Area Code</label>
            </div>
            <div className="wrap-items wrap-items-column-reverse center-horizontal s12 m4 l4 col margin-top">
              <input  ref={elm=>{this.telephoneInput=elm}}  onBlur={this.keyTelephone.bind(this)}  onChange={this.soloNum}  id="STel" type="text"  />
              <label>Telephone (Only Numbers)</label>
            </div>



             <div className="wrap-items wrap-items-column-reverse center-horizontal s12 m4 l4 col margin-top">
                 <input ref={elm=>{this.emailInput=elm}} onBlur={this.keyEmail.bind(this)}    />
                 <label>Email address</label>
             </div>
             <div className="wrap-items wrap-items-column-reverse center-horizontal s12 m4 l4 col margin-top">
                 <input ref={elm=>{this.ConfirmEmailInput=elm}}   onBlur={this.keyConfirmEmail.bind(this)}    />
                 <label>Confirm Email address</label>
             </div>



          </div>
        </div>
      </div>
    );
  }
}

export default PersonalInformation;
