import Link from "next/link";
import styles from '../styles/product.module.css';

export default function ProductItem({ product }) {
    return (
        <div className={styles.productcard}>
            <Link href={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded shadow"
                    width={300}
                />
            </Link>
            <div>
                <h2 className="text-lg">
                    {product.name}
                </h2>
                <p className="mb-2">{product.description}</p>
                <p>{product.price}</p>
                <button className="primary-button" type="button">
                    Add to cart
                </button>
            </div>
        </div>
    );
}