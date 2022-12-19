import "bootstrap/dist/css/bootstrap.min.css";
import Layout from '../components/layout';
import '../styles/globals.css';
import { useEffect } from "react";
import { StoreProvider } from '../utils/cart';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <StoreProvider>
      <Layout>
        
        <Component {...pageProps} />
        
      </Layout>
      </StoreProvider>
  )
}
