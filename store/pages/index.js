import Head from 'next/head'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <>
      <Head>
        <title>E-Commerce</title>
        <meta name="description" content="E-Commerce Site by Donna-Jo Bohl" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/shop.ico" />
      </Head>
      <main className={styles.main}>
        <div className='hero-section'>
          <div className='hero'>
            <h1>Donut Shop</h1>
            <p>Lots of donuts</p>
            <button className='cta-bttn' type='button'>Shop Now</button>
          </div>
        </div>
      </main>
    </>
  )
}
