import React, {createContext, useReducer} from 'react';

export const Store = createContext();

const initialState = {
    cart: { cartProducts: [] },
};

function reducer(state, action) {
    switch(action.type) {
        case 'CART_ADD_ITEM': {
            const newProduct = action.payload;
            const existingProduct = state.cart.cartProducts.find(
                (product) => product.slug === newProduct.slug
            );
            const cartProducts = existingProduct? state.cart.cartProducts.map((product) =>
            product.name === existingProduct.name? newProduct : product
            ):
            [...state.cart.cartProducts, newProduct];
            return { ...state, cart: { ...state.cart, cartProducts}}
        }
        case 'CART_REMOVE_ITEM': {
            const cartProducts = state.cart.cartProducts.filter(
                (product) => product.slug !== action.payload.slug
            );
            return { ...state, cart: { ...state.cart, cartProducts }};
        }
        default:
            return state;
    }
}


export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{children}</Store.Provider>;
    
}