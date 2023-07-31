import ProductItem from "../components/product";
import storeItems from "../utils/data.json";
import styles from '../styles/menu.module.css'

const Menu = () => {
    //this is where the products are being rendered 
    return ( 
        <div className={styles.menu}>
            {storeItems.map(item => (
               <div key={item.id}>
                <ProductItem {...item} />  
               </div>
            ))}
        </div>
     );
}
 
export default Menu;