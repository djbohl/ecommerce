import React, { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
    cart: { cartProducts: [] },
    total: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            const newProduct = action.payload;
            const existingProduct = state.cart.cartProducts.find(
                (product) => product.slug === newProduct.slug
            );
            const cartProducts = existingProduct ? state.cart.cartProducts.map((product) =>
                product.name === existingProduct.name ? newProduct : product
            ) :
                [...state.cart.cartProducts, newProduct];

            let totalItems = 1;
            for (const product of state.cart.cartProducts) {
                totalItems += product.quantity;
            }

            const price = 3.99;

            const subtotal = totalItems * price;

            return { ...state, cart: { ...state.cart, cartProducts }, total: subtotal }
        }
        case 'CART_REMOVE_ITEM': {
            const cartProducts = state.cart.cartProducts.filter(
                (product) => product.slug !== action.payload.slug
            );

            return { ...state, cart: { ...state.cart, cartProducts } };
        }

        default:
            return state;
    }
}


export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;

}