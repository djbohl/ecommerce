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
        total,
    } = state;

    const removeProduct = (product) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: product, quantity: 0 });
        console.log('product removed');
    }


    const tax = 0.06;


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
                                            <td>{product.quantity} </td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button onClick={() => removeProduct(product)} className={styles.button}>
                                                    <XCircle size={22} className={styles.circle}></XCircle></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className={styles.total}>
                            <h3> Subtotal : ${total.toFixed(2)} </h3>
                            <h4> Total After Tax: ${((total * tax) + total).toFixed(2)}</h4>
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