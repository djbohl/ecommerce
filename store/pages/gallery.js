import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import style from '../styles/gallery.module.css';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-bootstrap-icons';

const Gallery = () => {
    //this is the gallery page

const images = [
    "/bluedonut.jpg",
    "/carameldonut.jpg",
    "/chocodonut.jpg",
    "/sprinkledonut.jpg",
    "/regdonut.jpg"
];

const buttonStyle = {
    width: "66px",
    background: 'none',
    border: '0px'
  };

  const properties = {
    prevArrow: <button style={{ ...buttonStyle }}><ArrowLeftCircle color='hotpink' size={44} /></button>,
    nextArrow: <button style={{ ...buttonStyle }}><ArrowRightCircle color='hotpink' size={44} /></button>
  }

 

    return ( 
        <div className={style.container}>
            <Slide {...properties}>
                <div className='slide-effect'>
                    <div className={style.image} alt="Blue Donut" style={{ 'backgroundImage' : `url(${images[0]})` }}>
                    </div>
                </div>
                <div className='slide-effect'>
                    <div className={style.image} alt="Caramel Donut" style={{ 'backgroundImage' : `url(${images[1]})`}}>
                    </div>
                </div>
                <div className='slide-effect'>
                    <div className={style.image} alt="Chocolate Donut" style={{ 'backgroundImage' : `url(${images[2]})` }}>
                    </div>
                </div>
                <div className='slide-effect'>
                    <div className={style.image} alt="Sprinkle Donut" style={{ 'backgroundImage' : `url(${images[3]})` }}>
                    </div>
                </div>
                <div className='slide-effect'>
                    <div className={style.image} alt="Frosted Donut" style={{ 'backgroundImage' : `url(${images[4]})` }}>
                    </div>
                </div>
            </Slide>
        </div>
     );
}
 
export default Gallery;