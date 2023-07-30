import React, { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
    cart: { cartProducts: [] },
    totalPrice: 0
};

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            const newProduct = action.payload;
            const cart = state.cart || {}; // Check if cart object exists
            const cartProducts = cart.cartProducts || []; // Check if cartProducts array exists
            const existingProduct = state.cart.cartProducts.find(
                (product) => product.slug === newProduct.slug
            );

            if (existingProduct) {
                // Product already exists, update the quantity
                const cartProducts = state.cart.cartProducts.map((product) =>
                    product.slug === existingProduct.slug
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                );

                return { ...state, cart: { ...state.cart, cartProducts } };
            } else {
                // Add a new product to the cart with an initial quantity of 1
                const updatedCartProducts = [...cartProducts, { ...newProduct, quantity: 1 }];

                return { ...state, cart: { ...cart, cartProducts: updatedCartProducts } };
            }
        }
        case 'CART_REMOVE_ITEM': {
            const cartProducts = state.cart.cartProducts.filter(
                (product) => product.slug !== action.payload.slug
            );

            return { ...state, cart: { ...state.cart, cartProducts } };
        }
        case 'UPDATE_TOTAL': {
            const cartProducts = state.cart.cartProducts;

            // Calculate the total price for each individual product (price * quantity)
            const individualProductTotals = cartProducts.map((product) => product.price * product.quantity);
          
            // Calculate the overall cart total by summing up the individual product totals
            const totalPrice = individualProductTotals.reduce((total, productTotal) => total + productTotal, 0).toFixed(2);
          
            return { ...state, totalPrice };
        }
    }
}


export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;

}