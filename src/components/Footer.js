import React,{Component} from 'react';

class Footer extends Component{
  constructor(props){
    super(props);

    this.renderSocial = this.renderSocial.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }
  renderMenu(){
    return  this.props.items.map((item, id)=>{
      return (
        <div key={id} className="col s12 m6 l6 footer-items-item">
          <a className={`${item.active?"active":""}`} href={item.link}>{item.label}</a>
        </div>);
    });
  }
  renderSocial(){
    return  this.props.socialLinks.map((social, id)=>{
      return <img key={id} src={social.img} />;
    });
  }
  render(){
    return(
      <footer className="footer">
          <div className="footer-lateral logo ">
            <img src={this.props.logo} alt="" />
          </div>
          <div className="footer-main">
            <div className="footer-main-section1">
              <img src="http://www.thomasmoretravel.com/img/cards-type.png" alt=""/>
              <p>
                <span>
                  Office hours :
                </span>
                <br></br>
                Monday to Friday: 8 a.m. to 7 p.m.<br></br>
                Saturday &amp; Sunday: 9 a.m. to 5 p.m.
              </p>

            </div>
            <div className="footer-main-section1">
              <p>
                  <span>From US or Canada:</span> <a className="phone" href="tel:1 866 733 7715">1 866 733 7715</a><br></br>
                  <span>From Mexico:</span> <a className="phone" href="01-800-888-6627">01-800-888-6627</a> <br></br>
                  <span>Other countries:</span> <a className="phone" href="tel:+52 998-885-17-41">+52 998-885-17-41</a>
              </p>
            </div>
            <div className="footer-main-section2">
              <p>
                Thomas More Travel Km. 16 Blvd. Kukulcán,  Hotel Zone, Cancún Q. Roo Mexico 77500 © Thomas More Travel. All rights reserved
              </p>
            </div>
          </div>
          <div className="footer-lateral redes">
            <a href="https://www.facebook.com/thomasmoretravel"> <i className="fa fa-facebook" aria-hidden="true"></i></a>
            <a href="https://twitter.com/ThomasMTravel"><i className="fa fa-twitter" aria-hidden="true"></i></a>
            <a href="https://www.instagram.com/thomasmoretravel/"><i className="fa fa-instagram" aria-hidden="true"></i></a>
          </div>
        </footer>
    );
  }
}

export default Footer;
