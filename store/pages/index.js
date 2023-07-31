import Head from 'next/head'
import Link from 'next/link';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from '../styles/Home.module.css'
import { ArrowLeftCircle, ArrowRightCircle, Cart } from 'react-bootstrap-icons';




export default function Home() {
  //this is the home page

  const featured = "/sprinkledonut.jpg";

  const buttonStyle = {
    width: "66px",
    background: 'none',
    border: '0px'
  };

  const properties = {
    prevArrow: <button style={{ ...buttonStyle }}><ArrowLeftCircle color='white' size={44} /></button>,
    nextArrow: <button style={{ ...buttonStyle }}><ArrowRightCircle color='white' size={44} /></button>
  }

 

  return (
    <>
      <Head>
        <title>E-Commerce</title>
        <meta name="description" content="E-Commerce Site by Donna-Jo Bohl" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/shop.ico" />
      </Head>

      <div className={styles.coverContainer}>
        <div>
          <main>
            <Slide {...properties} autoplay={false}>
              <div className='slide-effect' canswipe="true" infinite="false">
                <div className={styles.intro}>
                  <div className={styles.box}>
                    <h1 className={styles.h1}>Donut Shop</h1>
                    <p className={styles.lead}>Delicious specialty donuts.</p>
                    <Link href="/menu">
                      <button type='button' role='button' className="btn btn-secondary " aria-disabled="false">Order Now</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='slide-effect' canswipe="true" infinite="false">
                <div className={styles.intro}>
                  <div className={styles.featured}>
                    <div className={styles.box}>
                      <h1 className={styles.h1}>Featured</h1>
                      <div className={styles.image} alt="Sprinkle Donut" style={{ 'backgroundImage': `url(${featured})` }}>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </Slide>
          </main>
        </div>
      </div>
    </>
  )
}
