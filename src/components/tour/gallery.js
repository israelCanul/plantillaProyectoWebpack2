import React,{Component} from 'react';

class Gallery extends Component{
  constructor(props){
    super(props);
    this.state={
      images : [{video: false,src:'/img/tours/barco.jpg'},{ video:true,src:'https://www.youtube.com/embed/8x9IAGgQNAo?rel=0&amp;controls=0&amp;showinfo=0',thum : "/img/play.jpg"},{video: false,src:'/img/tours/cena.jpg'},{video:false,src:'/img/tours/langosrta.jpg'},{ video:true,src:'https://www.youtube.com/embed/8x9IAGgQNAo?rel=0&amp;controls=0&amp;showinfo=0',thum : "/img/play.jpg"}],
      widthGallery : 0,
      idSelected : 0,
      imageSelectedToViewer : null,
      tablet : false,
      wMay : 0,
      wMen : 0,
      video : false,
    }
      this.renderItems = this.renderItems.bind(this);
      this.resize = this.resize.bind(this);

      //this.setImageSelected = this.setImageSelected.bind(this);

      window.addEventListener("resize", this.resize);
  }
  componentDidMount(){
    this.resize();
    this.setState({images : this.props.images});
  }
  resize(){
    let w = this.galeria.clientWidth;

    if(window.innerWidth < 1200 && window.innerWidth > 766){
      let widthMayor = w * 0.6666;
      let widthMenor = w * 0.3333;
      this.setState({tablet : true, wMay : widthMayor, wMen : widthMenor});
    }else if(window.innerWidth > 1200){
      let widthMayor = w / 4;
      let widthMenor =w / 4;
      if(window.innerWidth >= 1600){
        //w = 1600 / 4;
        this.setState({tablet : true, wMay : widthMayor, wMen : widthMenor});
      }else{
        //w = window.innerWidth / 4;
        this.setState({tablet : true, wMay : widthMayor, wMen : widthMenor});
      }
      this.setState({tablet: false});
    }else{
      this.setState({tablet : false});
    }
    this.setState({widthGallery : w});
    this.setState({idSelected : 0});// set the initial selected item
  }
  renderItems(){
    let that = this;
    let cont = 1;
    let col= 0;
    return this.state.images.map((item,id)=>{
      let w = that.state.widthGallery;
      let left = id * that.state.widthGallery;
      let thumbnail;
      if(item.thum){
        thumbnail = item.thum;
      }


      if(this.state.tablet){
        let temp;
        //console.log((col * that.state.widthGallery) + that.state.wMay);
        if(cont == 1){
          left = (col * that.state.widthGallery);
            temp = <Image thum={thumbnail} eventClick={this.setImageSelected.bind(this)} video={item.video} w={that.state.wMay} h={that.state.wMay} top={0} left={left} key={id} id={id} src={item.url}  />
        }else if(cont == 2){
          left = (col * that.state.widthGallery) + that.state.wMay;
          temp = <Image thum={thumbnail} eventClick={this.setImageSelected.bind(this)} video={item.video} w={that.state.wMen} h={that.state.wMen} top={0} left={left} key={id} id={id} src={item.url}  />
        }else{
          left = (col * that.state.widthGallery) + that.state.wMay;
          temp = <Image thum={thumbnail} eventClick={this.setImageSelected.bind(this)} video={item.video} w={that.state.wMen} h={that.state.wMen} top={that.state.wMen} left={left} key={id} id={id} src={item.url}  />
        }
        cont ++;
        if(cont == 4){
          cont = 1;
          col ++;
        }
        return temp;
      }else if(window.innerWidth > 1200){
        let temp;
        if(window.innerWidth >= 1600){
          left = id * w / 4;
          return <Image thum={thumbnail} eventClick={this.setImageSelected.bind(this)} video={item.video} w={that.state.wMay} left={left} key={id} id={id} src={item.url} top={0} />
        }else{
          left = id * w / 4;
          return <Image thum={thumbnail} eventClick={this.setImageSelected.bind(this)} video={item.video} w={that.state.wMen} left={left} key={id} id={id} src={item.url} top={0}/>
        }
      }else{
        return <Image thum={thumbnail} eventClick={this.setImageSelected.bind(this)} video={item.video} w={that.state.widthGallery} left={left} key={id} id={id} src={item.url}  top={0}/>
      }
  });
  }
  setItemSelected(id,eve){
    let cols = Math.floor(Object.keys(this.state.images).length / 1);
    let modCols = Object.keys(this.state.images).length % 1;
    cols = cols + modCols;

    if(window.innerWidth < 1200 && window.innerWidth > 766){
      cols = Math.floor(Object.keys(this.state.images).length / 3);
      modCols = Object.keys(this.state.images).length % 3;
      if(modCols < 3){
        cols = cols + 1;
      }
    }
    if(window.innerWidth >= 1200){
      cols = Math.floor(Object.keys(this.state.images).length / 4);
      modCols = Object.keys(this.state.images).length % 4;
      if(modCols < 4){
        cols = cols + 1;
      }
    }
    //console.log(cols);
    if(id < 0){
      this.setState({idSelected : cols -1 });
    }else if(id >= cols){
      this.setState({idSelected : 0 });
    }else{
      this.setState({idSelected : id });
    }
  }
  setImageSelected(id,e){
    let ID = id;
    if(ID==-1){
      ID = Object.keys(this.state.images).length - 1;
    }else if(ID==(Object.keys(this.state.images).length-1) && ID!=300){
      ID = 0;
    }

    if(ID==300){
      this.setState({imageSelectedToViewer : null})
    }else{
      this.setState({imageSelectedToViewer : ID});
      if(this.state.images[ID].video){
          this.setState({video : true});
      }else{
        this.setState({video : false});
      }
    }
  }
  renderImageSelected(){
    let item = this.state.images[this.state.imageSelectedToViewer];
    if(this.state.imageSelectedToViewer!=null){
    if(this.state.video){
      if(window.innerWidth < 1200){
        return(
        <a href={`${item.src}`}><img src={item.thum}/></a>
        );
    }else{
        return(
          <iframe src={item.src}  ></iframe>
        );
      }

    }else{
      return(
        <img src={item.src} />
      );
    }
  }
  }
  render(){
    let h = this.state.widthGallery;
    if(this.state.tablet){
      h = this.state.widthGallery * 0.6666;
    }else if(window.innerWidth >= 1200){
      h = this.state.widthGallery / 4;
    }
    return(
      <div className="galeria" ref={i=>this.galeria=i} style={{ height : h + "px"}}>



        <div className="galeria-controls-left">


            <button onClick={this.setItemSelected.bind(this,(this.state.idSelected - 1))} type="button" className="image-gallery-left-nav" aria-label="Previous Slide" ></button>
          </div>
        <div className="galeria-controls-right">

                  <button onClick={this.setItemSelected.bind(this,(this.state.idSelected + 1))} type="button" className="image-gallery-right-nav" aria-label="Next Slide" ></button>
        </div>
        <div className="galeria-wrap" style={{ height : h + "px", width : (Object.keys(this.state.images).length * this.state.widthGallery)+"px",left : -this.state.idSelected * this.state.widthGallery+"px" }}>
          {this.renderItems()}
        </div>
        <div ref={i=>this.viewer=i} className={`viewer ${this.state.imageSelectedToViewer!=null?" active":""}`} >
          <div className="image-gallery-left-nav" onClick={this.setImageSelected.bind(this,(this.state.imageSelectedToViewer - 1 ))}></div>
          <div className="wrap-image">
            <div className="background-viewer" onClick={this.setImageSelected.bind(this,300)} ></div>
            {this.renderImageSelected()}
          </div>
          <div className="image-gallery-right-nav" onClick={this.setImageSelected.bind(this,(this.state.imageSelectedToViewer + 1 ))}></div>

        </div>
      </div>
    );
  }
}
const Image = (props)=>{
  let {src,w,left,video,id,thum} = props;

  //console.log(id);
  if(video){
    if(props.h){
      // return(
      //   <video width={w} height={props.h} style={{left : left +"px" , top : props.top +"px" }}  controls>
      //     <source src={src} type="video/mp4" />
      //     Your browser does not support the video tag.
      //   </video>
      // );
      if(window.innerWidth < 1200){
        return(<a href={src}><img style={{width : w,height : props.h, left : left +"px" , top : props.top +"px" }} src={thum}/></a>);
      }else{
        return(
          <iframe onClick={props.eventClick.bind(this,props.id)}  width={w} height={props.h} style={{left : left +"px",position : "absolute",borderWidth: "0px",top : props.top +"px" }}  src="https://www.youtube.com/embed/8x9IAGgQNAo?rel=0&amp;controls=1&amp;showinfo=0" allowFullScreen ></iframe>
        );
      }

    }else{
      // return(
      //   <video width={w} style={{left : left +"px"  }}  controls>
      //     <source src={src} type="video/mp4" />
      //     Your browser does not support the video tag.
      //   </video>
      // );
      if(window.innerWidth < 1200){
        return(<a href={`${src}`}><img style={{width : w, left : left +"px" , top : props.top +"px" }} src={thum}/></a>);
      }else{
        return(
          <iframe onClick={props.eventClick.bind(this,props.id) } width={w} style={{left : left +"px",position : "absolute",borderWidth: "0px", height: "100%" }}  src="https://www.youtube.com/embed/8x9IAGgQNAo?rel=0&amp;controls=1&amp;showinfo=0" allowFullScreen ></iframe>
        );
      }
    }

  }else{
    if(props.h){
      return(
        <img onClick={props.eventClick.bind(this,props.id)} src={src} style={{width : w,height : props.h, left : left +"px" , top : props.top +"px" }} />
      );
    }else{
      return(
        <img onClick={props.eventClick.bind(this,props.id)} src={src} style={{width : w, left : left +"px" }} />
      );
    }
  }
}



export default Gallery;
