import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/product.module.css';
import { Store } from '../utils/cart';
import { formatCurrency } from "../utils/currencyFormatter";

export default function ProductItem({ id, name, price, image, description }) {


    //this is the component for the product with functionality

    const { state, dispatch } = useContext(Store);
    const [isAddingToCart, setIsAddingToCart] = useState(false);


    const {
        cart: { cartProducts },
        stock,
        quantity
    } = state;
    const totalPrice = state.totalPrice;

    // Find the product stock for the specific product being displayed
    const productStock = state.stock.find((product) => product.id === id)?.stock || 0;



    //the function for the add to cart button
    const addToCartHandler = () => {
        if (isAddingToCart) {
            return; // Prevent multiple rapid clicks
        }

        setIsAddingToCart(true); // Set loading state

        // Check if the product is in stock before adding to cart
        if (productStock > 0) {
            const productToAdd = {
                id,
                name,
                price,
                image,
                description,
                quantity: 1,
            };
            dispatch({ type: 'CART_ADD_ITEM', payload: productToAdd });
            dispatch({ type: 'UPDATE_TOTAL', payload: productToAdd });

        } else {
            alert('Sorry, the stock for this product is unavailable.');
        }

        setIsAddingToCart(false); // Reset loading state after dispatch
    };

    //the function for the remove from cart button
    const removeFromCartHandler = () => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: { id } });
        dispatch({ type: 'UPDATE_TOTAL', payload: productInCart }); // Use productToAdd instead of product
    };

    const decreaseQuantityHandler = () => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id } });
        dispatch({ type: 'UPDATE_TOTAL', payload: productInCart });

    }

    const productInCart = cartProducts.find((product) => product.id === id);

    // Use the quantity from the productInCart instead of state.quantity
    const productQuantity = productInCart ? productInCart.quantity : 0;

    const productImageStyle = {
        backgroundImage: `url(${image})`,

    };




    return (
        <div className={styles.productcard}>
            <div className={styles.imageContainer} style={productImageStyle}>
            </div>
            <div>
                <h2 className="text-lg">
                    {name}
                </h2>
                <p className="mb-2">{description}</p>
                <p>{formatCurrency(price)}</p>
                <div className={styles.buttonContainer}>
                    {productQuantity <= 0 ? 
                    <button
                        className="btn btn-secondary "
                        type="button"
                        onClick={addToCartHandler}>
                        Add to cart
                    </button> :

                        <div className={styles.quantityButtonWrapper}>
                            <button
                                className={styles.button}
                                onClick={decreaseQuantityHandler}
                            >-</button>
                            <div>
                                <span>{productQuantity}</span>
                                <p>in cart</p>
                            </div>
                            <button
                                className={styles.button}
                                onClick={addToCartHandler}
                            >+</button>
                        </div>
                    }
                    <div className={styles.removeButtonWrapper}>

                        <button className={styles.buttonRemove}
                            onClick={removeFromCartHandler}>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}