import Head from 'next/head'
import Link from 'next/link'
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
      
    <div className={styles.coverContainer}>
        <div>
      <main className={styles.main}>
        <h1 className={styles.h1}>Donut Shop</h1>
        <p className={styles.lead}>Delicious specialty donuts.</p>
        <Link href="/menu">
          <button type='button' role='button' className="btn btn-secondary" aria-disabled="false">Order Now</button>
        </Link>
      </main>
      </div>
      </div>
    </>
  )
}
