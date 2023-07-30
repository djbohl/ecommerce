import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/product.module.css';
import { Store } from '../utils/cart';

export default function ProductItem({ product }) {

    const { dispatch } = useContext(Store);
    const [isAddingToCart, setIsAddingToCart] = useState(false);


    const addToCartHandler = () => {
        if (isAddingToCart) {
            return; // Prevent multiple rapid clicks
        }
        if (product.stock <= 0) {
            alert(`Sorry we are out of this donut.`);
            return;
        }

        // Update the product's stock before adding to the cart
        if (product.stock > 0) {
            product.stock -= 1;
        }

        setIsAddingToCart(true); // Set loading state

        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product } });
        dispatch({ type: 'UPDATE_TOTAL', payload: { ...product } });


        setIsAddingToCart(false); // Reset loading state after dispatch


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
                    className="btn btn-secondary " 
                    type="button"
                    onClick={addToCartHandler}>
                    Add to cart
                </button>
            </div>
        </div>
    );
}