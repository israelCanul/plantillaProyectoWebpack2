import React,{Component} from 'react';


class FacebookApi extends Component{
  constructor(props){
    super(props);
    this.state={
      isLogin : '',
      conectedFB : '',
      name : '',
      lastname : '',
      Email : '',
      countryApi : ''
    }
    this.loginStatus = this.loginStatus.bind(this);
  }
  loginStatus(){//funcion para la recoleccion de datos desde la api de facebook
    var that = this;// contexto de la aplicacion
    
    FB.getLoginStatus(function(response) {// verificacion del estatus de las variables de facebook
      if(response.status === 'connected'){
        FB.api('/me', 'GET', {fields: 'first_name,last_name,email,location,birthday'}, function(response2) {
         //console.log(response2);
         that.setState({conectedFB : true});
           if(response2.first_name){
             //that.nameInput.value = response2.first_name;
             that.setState({name : response2.first_name});
           }
           if(response2.last_name){
             //that.lastnameInput.value = response2.last_name;
             that.setState({lastname : response2.last_nam});
           }
           if(response2.email){
              //that.emailInput.value = response2.email;
              that.setState({Email:response2.email});
           }
           if(response2.location){

             var namePais = response2.location.name;
             namePais = namePais.split(',');
             var pais = namePais[1];
              that.setState({countryApi : pais.trim()});
             //that.checkCountry(pais.trim());
           }
        });
      }else if(response.status === 'not_authorized'){
        console.log('no autorizado');
      }else{
        console.log('No estas logeado');
      }
    });
  }
  componentDidMount(){
    var that = this;// contexto de la aplicacion
    // se inicializa la variable de fb
    window.fbAsyncInit = function(){
      FB.init({
        appId      : '1450784598283751',
        xfbml      : true,
        version    : 'v2.8'
      });
      that.loginStatus();
    }.bind(this);
    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
  }
  login(){
    let that = this;

    FB.login(function(response){
      if(response.status === 'connected'){
        that.loginStatus();
      }else if(response.status === 'not_authorized'){
        console.log('no autorizado');
      }else{
        console.log('No estas logeado');
      }
    },{scope: 'email,user_location,user_birthday'});
  }
  logout(){
    var that = this;
    FB.logout(function(response){

        that.loginStatus();
        that.setState({conectedFB: false});
    });
  }
  render(){
    if(!this.state.conectedFB){
          return <button className="facebook loged padding-in-small azulFuerteDiseno  naranjaDiseno-text" onClick={this.login.bind(this)}><i className="fa fa-facebook naranjaDiseno-text" aria-hidden="true"></i>Login with Facebook</button>;
    }else{
          return <button className="facebook login  padding-in-small azulFuerteDiseno-text  naranjaDiseno" onClick={this.logout.bind(this)}><i className="fa fa-facebook" aria-hidden="true"></i>Logout Facebook</button>;
    }
  }
}

export default FacebookApi;
