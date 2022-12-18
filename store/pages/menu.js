import ProductItem from "../components/product";
import data from "../utils/data";
import styles from '../styles/menu.module.css'

const Menu = () => {
    return ( 
        <div className={styles.menu}>
            {data.products.map((product) => (
                <ProductItem 
                    product={product}
                    key={product.slug}>
                </ProductItem>
            ))}
        </div>
     );
}
 
export default Menu;