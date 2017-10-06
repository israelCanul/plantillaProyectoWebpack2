import React from 'react';
import ImageGallery from 'react-image-gallery';
import Swipeable from 'react-swipeable';

class CustomGallery extends  ImageGallery{
  constructor(props){
    super(props);
    this.state = {...this.state,mivalor:"sss"}
    this.renderItemsNews = this.renderItemsNews.bind(this);
  }
  _renderItem(item) {
    const onImageError = this.props.onImageError || this._handleImageError;

    return (
      <div className='image-gallery-image'>
        <img
            src={item.original}
            alt={item.originalAlt}
            srcSet={item.srcSet}
            sizes={item.sizes}
            onLoad={this.props.onImageLoad}
            onError={onImageError.bind(this)}
        />
        {
          item.link &&
            <div className='descriptionWrap'>
              <h1 className="descriptionWrap-title">{item.title}</h1>
              <h2 className="descriptionWrap-subtitle">{item.subtitle}</h2>
              <div className="descriptionWrap-link">
                <a href={item.link}>Book Now</a>
              </div>
            </div>
        }
      </div>
    );
  }

  render() {
    const {
      currentIndex,
      isFullscreen,
      modalFullscreen,
      isPlaying
    } = this.state;

    const thumbnailStyle = this._getThumbnailStyle();
    const thumbnailPosition = this.props.thumbnailPosition;

    const slideLeft = this._slideLeft.bind(this);
    const slideRight = this._slideRight.bind(this);

    let slides = [];
    let thumbnails = [];
    let bullets = [];

    this.props.items.map((item, index) => {
      const alignment = this._getAlignmentClassName(index);
      const originalClass = item.originalClass ?
        ` ${item.originalClass}` : '';
      const thumbnailClass = item.thumbnailClass ?
        ` ${item.thumbnailClass}` : '';

      const renderItem = item.renderItem ||
        this.props.renderItem || this._renderItem.bind(this);

      const showItem = !this.props.lazyLoad || alignment || this._lazyLoaded[index];
      if (showItem && this.props.lazyLoad) {
          this._lazyLoaded[index] = true;
      }

      const slide = (
        <div
          key={index}
          className={'image-gallery-slide' + alignment + originalClass}
          style={Object.assign(this._getSlideStyle(index), this.state.style)}
          onClick={this.props.onClick}
        >
          {showItem ? renderItem(item) : <div style={{ height: '100%' }}></div>}
        </div>
      );

      slides.push(slide);

      let onThumbnailError = this._handleImageError;
      if (this.props.onThumbnailError) {
        onThumbnailError = this.props.onThumbnailError;
      }

      if (this.props.showThumbnails) {
        thumbnails.push(
          <a
            onMouseOver={this._handleMouseOverThumbnails.bind(this, index)}
            onMouseLeave={this._handleMouseLeaveThumbnails.bind(this, index)}
            key={index}
            role='button'
            aria-pressed={currentIndex === index ? 'true' : 'false'}
            aria-label={`Go to Slide ${index + 1}`}
            className={
              'image-gallery-thumbnail' +
              (currentIndex === index ? ' active' : '') +
              thumbnailClass
            }

            onClick={event => this.slideToIndex.call(this, index, event)}>
              <img
                src={item.thumbnail}
                alt={item.thumbnailAlt}
                onError={onThumbnailError.bind(this)}/>
              <div className='image-gallery-thumbnail-label'>
                {item.thumbnailLabel}
              </div>
          </a>
        );
      }

      if (this.props.showBullets) {
        bullets.push(
          <button
            key={index}
            type='button'
            className={
              'image-gallery-bullet ' + (
                currentIndex === index ? 'active' : '')}

            onClick={event => this.slideToIndex.call(this, index, event)}
            aria-pressed={currentIndex === index ? 'true' : 'false'}
            aria-label={`Go to Slide ${index + 1}`}
          >
          </button>
        );
      }
    });

    const slideWrapper = (
      <div
        ref={i => this._imageGallerySlideWrapper = i}
        className={`image-gallery-slide-wrapper ${thumbnailPosition}`}
      >

        {this.props.renderCustomControls && this.props.renderCustomControls()}

        {
          this.props.showFullscreenButton &&
            this.props.renderFullscreenButton(this._toggleFullScreen.bind(this), isFullscreen)
        }

        {
          this.props.showPlayButton &&
            this.props.renderPlayPauseButton(this._togglePlay.bind(this), isPlaying)
        }

        {
          this._canNavigate() ?
            [
              this.props.showNav &&
                <span key='navigation'>
                  {this.props.renderLeftNav(slideLeft, !this._canSlideLeft())}
                  {this.props.renderRightNav(slideRight, !this._canSlideRight())}
                </span>,

                this.props.disableSwipe ?
                  <div className='image-gallery-slides' key='slides'>
                    {slides}
                  </div>
                :
                  <Swipeable
                    className='image-gallery-swipe'
                    key='swipeable'
                    delta={1}
                    onSwipingLeft={this._handleSwiping.bind(this, -1)}
                    onSwipingRight={this._handleSwiping.bind(this, 1)}
                    onSwiped={this._handleOnSwiped.bind(this)}
                    onSwipedLeft={this._handleOnSwipedTo.bind(this, 1)}
                    onSwipedRight={this._handleOnSwipedTo.bind(this, -1)}
                  >
                    <div className='image-gallery-slides'>
                      {slides}
                    </div>
                </Swipeable>
            ]
          :
            <div className='image-gallery-slides'>
              {slides}
            </div>
        }
        {
          this.props.showBullets &&
            <div className='image-gallery-bullets'>
              <ul
                className='image-gallery-bullets-container'
                role='navigation'
                aria-label='Bullet Navigation'
              >
                {bullets}
              </ul>
            </div>
        }
        {
          this.props.showIndex &&
            <div className='image-gallery-index'>
              <span className='image-gallery-index-current'>
                {this.state.currentIndex + 1}
              </span>
              <span className='image-gallery-index-separator'>
                {this.props.indexSeparator}
              </span>
              <span className='image-gallery-index-total'>
                {this.props.items.length}
              </span>
            </div>
        }
      </div>
    );

    return (
      <section
        ref={i => this._imageGallery = i}
        className={
          `image-gallery${modalFullscreen ? ' fullscreen-modal' : ''}`}
        aria-live='polite'
      >

        <div
          className={`image-gallery-content${isFullscreen ? ' fullscreen' : ''}`}
        >
          <div className="wrap-news">
              <h2 className="wrap-news-title">An Outstanding Selection of Tours in Cancun Mexico</h2>
              <div className="wrap-items">
                <div className="container-items" id="container-items">
                    {this.renderItemsNews()}
                </div>
              </div>
          </div>







          {
            (thumbnailPosition === 'bottom' || thumbnailPosition === 'right') &&
              slideWrapper
          }
          {
            this.props.showThumbnails &&
              <div
                className={`image-gallery-thumbnails-wrapper ${thumbnailPosition}`}
                style={this._getThumbnailBarHeight()}
              >
                <div
                  className='image-gallery-thumbnails'
                  ref={i => this._thumbnailsWrapper = i}
                >
                  <div
                    ref={t => this._thumbnails = t}
                    className='image-gallery-thumbnails-container'
                    style={thumbnailStyle}
                    role='navigation'
                    aria-label='Thumbnail Navigation'
                  >
                    {thumbnails}
                  </div>
                </div>
              </div>
          }
          {
            (thumbnailPosition === 'top' || thumbnailPosition === 'left') &&
              slideWrapper
          }
        </div>
      </section>
    );
  }
  renderItemsNews(){
    let {
      currentIndex
    } = this.state;
    let list = []
    this.props.items.map((item, index) => {
        if(currentIndex==index){
          list =[item,...list];
        }else{
          list.push(item);
        }
    });

    return this.props.items.map((item, index)=>{
      return(
        <div key={index} onClick={event => this.slideToIndex.call(this, index, event)} id={`item_${index}`} className={`item ${index==currentIndex?"active":""}`} >
          <div className={`bg ${index==currentIndex?"active":""}`}></div>
          <h2 className="item-title">{item.title}</h2>
          <h3 className="item-category"><span>Category: </span>{item.category}</h3>
        </div>
      );
    });
    //console.log(list);
  }

  slideToIndex(index, event) {
    console.log(this.props.items.length);
    let item = document.getElementById('item_'+index);
    let wrapItems = document.getElementById('container-items');
    if(index > 0 && this.props.items.length > index){

      wrapItems.style.top = ((item.clientHeight)+(-item.offsetTop))+"px";

    }else{
      wrapItems.style.top = "0px";
      console.log(  wrapItems.style.top);
    }

    const {currentIndex} = this.state;
    if (event) {
      if (this._intervalId) {
        // user triggered event while ImageGallery is playing, reset interval
        this.pause(false);
        this.play(false);
      }
    }
    let slideCount = this.props.items.length - 1;
    let nextIndex = index;
    if (index < 0) {
      nextIndex = slideCount;
    } else if (index > slideCount) {
      nextIndex = 0;
    }
    this.setState({
      previousIndex: currentIndex,
      currentIndex: nextIndex,
      offsetPercentage: 0,
      style: {
        transition: `all ${this.props.slideDuration}ms ease-out`
      }
    });
  }


}
export default CustomGallery;
