import Head from 'next/head'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <>
      <Head>
        <title>E-Commerce</title>
        <meta name="description" content="E-Commerce Site by Donna-Jo Bohl" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h1>Testing</h1>
          <p1>sweet</p1>
          <h2>Next is way better than React</h2>
        </div>
      </main>
    </>
  )
}
