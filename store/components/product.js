import Link from "next/link";
import React, { useContext, useEffect } from "react";
import styles from '../styles/product.module.css';
import { Store } from '../utils/cart';

export default function ProductItem({ product }) {

    const { state, dispatch } = useContext(Store);

    const addToCartHandler = () => {
        dispatch({ type: 'CART_ADD_ITEM', payload: {...product, quantity: 1 }});
        console.log(`${product} added`);
    };

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
                <button 
                    className="primary-button" 
                    type="button"
                    onClick={addToCartHandler}>
                    Add to cart
                </button>
            </div>
        </div>
    );
}