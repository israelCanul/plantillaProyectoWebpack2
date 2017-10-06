import React,{Component} from 'react';

class GoogleApi extends Component{
  constructor(props){
    super(props);
    this.state = {
      auth2:{},
      conectedGoogle : false,
      errorConect :'' ,
      profile : '',
    }
    this.profile = this.profile.bind(this);
    this.updateSignIn = this.updateSignIn.bind(this);
    this.disconnect = this.disconnect.bind(this)
  }
  profile(){
    var that = this;
    gapi.client.plus.people.get({
      'userId': 'me'
    }).then(function(res) {
      that.setState({profile:res.result});
      //console.log(res.result);
      that.props.changeCountry();
    }, function(err) {
      var error = err.result;
      that.setState({errorConect : "In profile : "+error});
    });
  } 
  disconnect() {
    var that = this;
    if(this.state.auth2.isSignedIn.get()){
      this.state.auth2.disconnect();
      gapi.load('auth2', function() {
        gapi.client.load('plus','v1').then(function() {
          gapi.signin2.render('signin-button', {
              scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
              fetch_basic_profile: false });
          gapi.auth2.init({fetch_basic_profile: false,
              scope:'https://www.googleapis.com/auth/plus.login'}).then(
                function (){
                  that.state.auth2 = gapi.auth2.getAuthInstance();
                  that.state.auth2.isSignedIn.listen(that.updateSignIn);
                  that.state.auth2.then(that.updateSignIn);
                });
        });
      });
    }else{
      this.setState({errorConect : "In disconnect : No estas Conectado"});
    }
  }

  componentDidMount(){
    var that = this;
    gapi.load('auth2', function() {
      gapi.client.load('plus','v1').then(function() {
        gapi.signin2.render('signin-button', {
            scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
            fetch_basic_profile: false,
           });
        gapi.auth2.init({fetch_basic_profile: false,
            scope:'https://www.googleapis.com/auth/plus.login'}).then(
              function (){
                that.state.auth2 = gapi.auth2.getAuthInstance();
                that.state.auth2.isSignedIn.listen(that.updateSignIn);
                that.state.auth2.then(that.updateSignIn);
              });
      });
    }.bind(this));
  }
  updateSignIn() {
    if (this.state.auth2.isSignedIn.get()) {
      this.setState({conectedGoogle : true});
      this.onSignInCallback(gapi.auth2.getAuthInstance());
    }else{
      this.setState({conectedGoogle : false});
      this.setState({profile:''});
      this.onSignInCallback(gapi.auth2.getAuthInstance());
    }
  }
  onSignInCallback(authResult) {
      if (authResult.isSignedIn.get()) {
        this.setState({conectedGoogle : true});
        this.profile();
      } else {
          if (authResult['error'] || authResult.currentUser.get().getAuthResponse() == null) {
            // There was an error, which means the user is not signed in.
            // As an example, you can handle by writing to the console:
            console.log('There was an error: ' + authResult['error']);
          }
      }
    }
  render(){
    if(this.state.conectedGoogle){
      return <button id="singOut-button" className="padding-in-small" onClick={this.disconnect}><i className="fa fa-google-plus" aria-hidden="true"></i> Sign Out</button>;
    }else{
      return <div id="signin-button"></div>;
    }

  }
}

export default GoogleApi;
