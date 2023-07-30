import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/cart";
import Image from 'next/image';
import { CircleFill, XCircle } from 'react-bootstrap-icons';
import styles from '../styles/checkout.module.css';
import Link from "next/link";
import data from "../utils/data";
import { get } from "http";

const Checkout = () => {

    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartProducts },
    } = state;
    const totalPrice = state.totalPrice; // Assuming 'totalPrice' is the key in the state where you store the calculated subtotal


    const removeProduct = (product) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: product, quantity: 0 });
        dispatch({ type: 'UPDATE_TOTAL', payload: { ...product } });

        console.log('product removed');
    }

   
    return (
        <div className={styles.checkout}>
            <h1>Your Order</h1>
            <div className={styles.orderDetails}>
                <div>
                    {cartProducts.length === 0 ? (
                        <h1>Your Cart Is Empty</h1>
                    ) : (
                        <div className={styles.cartProducts}>
                            <table className={styles.table}>
                                <thead>
                                    <tr className={styles.tableTitles}>
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody className={styles.tableBody}>
                                    {cartProducts.map((product) => (
                                        <tr key={product.slug}>
                                            <td>
                                                <Link href={`/product/${product.slug}`}>
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        width={75}
                                                        height={100}
                                                    ></Image>
                                                </Link>
                                                &nbsp;
                                            </td>
                                            <td>
                                            {product.name}
                                            </td>
                                            <td> {product.quantity} </td>
                                            <td>{product.price * product.quantity}</td>
                                            <td>
                                                <button onClick={() => removeProduct(product)} className={styles.button}>
                                                    <XCircle size={22} className={styles.circle}></XCircle></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className={styles.total}>
                            <h3> Subtotal : {totalPrice} </h3>
                        </div>
                        </div>
                    )
                    }
                    

                </div>
            </div>
        </div>
    );
}
export default Checkout;