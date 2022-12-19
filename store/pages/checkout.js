import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/cart";
import Image from 'next/image';
import { XCircle } from 'react-bootstrap-icons';
import styles from '../styles/checkout.module.css';
import Link from "next/link";
import data from "../utils/data";

const Checkout = () => {

    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartProducts },
    } = state;

    const removeProduct = (product) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: product, quantity: 0 });
        console.log('product removed');
    }

    const updateCart = (product, qty) => {
        const quantity = Number(qty);
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
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
                                        <th>Action</th>
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
                                                {product.name}
                                            </td>
                                            <td>{product.quantity} </td>
                                            <td><select value={product.quantity} onChange={(e) => updateCart
                                                (product, e.target.value)}>
                                                {[...Array(product.stock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select></td>
                                            <td> ${product.price * product.quantity }</td>
                                            <td>
                                                <button onClick={() => removeProduct(product)}>
                                                    <XCircle size={22}></XCircle></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                    }
                </div>
            </div>
            {cartProducts.length === 0 ? (
                <div></div>
            ) : (
                <div className="checkoutForm">
                    <h2>
                        Checkout
                    </h2>
                    <form>
                        <label >
                            Name:
                            <input type="text" name="name" />
                        </label>
                        <label >
                            Zip Code:
                            <input type={Number} name="zipcode" />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    <h1>Total Cost After Taxes</h1>
                    <p></p>
                </div>
            )}
        </div>
    );
}

export default Checkout;