import React, { useContext, useState } from "react";
import { Store } from "../utils/cart";
import Image from 'next/image';
import { XCircle } from 'react-bootstrap-icons';
import styles from '../styles/checkout.module.css';
import { formatCurrency } from "../utils/currencyFormatter";

export default function Checkout({ id, name, price, image, description }) {

    const { state, dispatch } = useContext(Store);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const {
        cart: { cartProducts },
    } = state;
    const totalPrice = state.totalPrice;

     // Find the product stock for the specific product being displayed
     const productStock = state.stock.find((product) => product.id === id)?.stock || 0;


    const removeProduct = (id) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: { id } });
        console.log('product removed');
    }

    const decreaseQuantityHandler = (id) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id } });
        dispatch({ type: 'UPDATE_TOTAL', payload: productInCart });

    }

 
       //the function for the add to cart button
       const addToCartHandler = (id) => {
        if (isAddingToCart) {
            return; // Prevent multiple rapid clicks
        }

        setIsAddingToCart(true); // Set loading state

       
            dispatch({ type: 'CART_ADD_ITEM', payload: { id } });
            dispatch({ type: 'UPDATE_TOTAL', payload: { id } });

        

        setIsAddingToCart(false); // Reset loading state after dispatch
    };

    const productInCart = cartProducts.find((product) => product.id === id);

    // Use the quantity from the productInCart instead of state.quantity
    const productQuantity = productInCart ? productInCart.quantity : 0;

    
    


    return (
        <div className={styles.checkout}>
            <h1>Your Order</h1>
            <div className={styles.orderDetails}>
                {cartProducts.length === 0 ? (
                    <h1>Your Cart Is Empty</h1>
                ) : (
                    <div className={styles.card}>
                        <div className={styles.cardbody}>
                            {cartProducts.map((product) => (
                                <div key={product.id} className={styles.cardwrapper}>
                                    <div className={styles.cardcontainer}>
                                        <div className={styles.cardimage}>
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={150}
                                                height={175}
                                            />
                                        </div>
                                        <div className={styles.wrapper}>
                                            <div className={styles.body}>
                                                <h5 className={styles.name}>{product.name}</h5>
                                                <p className={styles.name}>Quantity: {product.quantity}</p>
                                                <p className={styles.name}>Price: {formatCurrency(product.price * product.quantity)}</p>
                                                <div className={styles.quantityButtonWrapper}>
                                                    <button
                                                        className={styles.button}
                                                        onClick={() => decreaseQuantityHandler(product.id, product.quantity - 1)}
                                                    >-</button>
                                                    <div>
                                                        <span>{product.quantity}</span>
                                                        <p>in cart</p>
                                                    </div>
                                                    <button
                                                        className={styles.button}
                                                        onClick={() => addToCartHandler(product.id, product.quantity + 1)}
                                                    >+</button>
                                                </div>
                                                <button onClick={() => removeProduct(product.id)} className="btn btn-danger">
                                                    <XCircle size={22} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className={styles.total}>
                                <h3>Subtotal: {formatCurrency(totalPrice)}</h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
