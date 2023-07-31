import React, { createContext, useReducer } from 'react';
import Data from '../utils/data.json';

export const Store = createContext();

// Create an array of objects with references to item.stock and item.id
const originalProducts = Data.map((item) => ({
    id: item.id,
    stock: item.stock,
}));


const initialState = {
    cart: { cartProducts: [] },
    quantity: 0,
    totalPrice: 0,
    stock: [...originalProducts], // Store the original products in the state

};

function reducer(state, action) {
    const newProduct = action.payload;
    const cart = state.cart || {}; // Check if cart object exists
    const cartProducts = cart.cartProducts || []; // Check if cartProducts array exists
    const existingProduct = state.cart.cartProducts.find((product) => product.id === (newProduct?.id || ""));


    switch (action.type) {
        case 'CART_ADD_ITEM': {
            if (existingProduct) {
              const originalProduct = state.stock.find((product) => product.id === newProduct.id);
          
              // Check if the existing product and the original product in stock exist
              if (existingProduct && originalProduct && originalProduct.stock > 0) {
                const productQuantity = existingProduct.quantity + 1;
                const updatedProduct = { ...existingProduct, quantity: productQuantity };
          
                const existingProductIndex = cartProducts.findIndex((product) => product.id === existingProduct.id);
                const updatedCartProducts = [...cartProducts];
                updatedCartProducts[existingProductIndex] = updatedProduct;
          
                const updatedStock = state.stock.map((product) =>
                  product.id === newProduct.id ? { ...product, stock: product.stock - 1 } : product
                );
          
                return {
                  ...state,
                  cart: { ...cart, cartProducts: updatedCartProducts },
                  stock: updatedStock,
                  quantity: state.quantity + 1,
                };
              } else {
                alert('Sorry, the stock for this product is unavailable.');
                return state;
              }
            } else {
              const originalProduct = state.stock.find((product) => product.id === newProduct.id);
          
              if (originalProduct && originalProduct.stock > 0) {
                const updatedCartProducts = [...cartProducts, { ...newProduct, quantity: 1 }];
                const updatedStock = state.stock.map((product) =>
                  product.id === newProduct.id ? { ...product, stock: product.stock - 1 } : product
                );
          
                return { ...state, cart: { ...cart, cartProducts: updatedCartProducts }, stock: updatedStock, quantity: state.quantity + 1 };
              } else {
                alert('Sorry, the stock for this product is unavailable.');
                return state;
              }
            }
          }
          
          
        case 'CART_REMOVE_ITEM': {
            const existingProduct = state.cart.cartProducts.find((product) => product.id === action.payload.id);
        
            if (existingProduct) {
                // Get the original product from the state's stock
                const originalProduct = originalProducts.find((product) => product.id === action.payload.id);
        
                if (originalProduct) {
                    // Reset the stock of the corresponding product to its original stock
                    const updatedStock = state.stock.map((product) =>
                    product.id === action.payload.id ? { ...product, stock: originalProduct.stock } : product
                );
        
                    // Remove the product item from the cart
                    const updatedCartProducts = state.cart.cartProducts.filter((product) => product.id !== action.payload.id);
        
                    return { ...state, cart: { ...state.cart, cartProducts: updatedCartProducts }, stock: updatedStock };
                } else {
                    alert('Error: Product not found in stock.');
                    return state;
                }
            } else {
                return state; // Return the state as it is if the product is not found in the cart
            }
        }
        
        case 'UPDATE_TOTAL': {
            

            // Calculate the total price for each individual product (price * quantity)
            const individualProductTotals = cartProducts.map((product) => product.price * product.quantity);

            // Calculate the overall cart total by summing up the individual product totals
            const totalPrice = individualProductTotals.reduce((total, productTotal) => total + productTotal, 0);

            console.log("total price is:" + totalPrice);
            return { ...state, totalPrice };

        }

        case 'UPDATE_QUANTITY': {
            const existingProduct = state.cart.cartProducts.find((product) => product.id === action.payload.id);
          
            if (existingProduct && existingProduct.quantity > 1) {
              // Decrease the quantity of the corresponding product by one
              const updatedCartProducts = state.cart.cartProducts.map((product) =>
                product.id === action.payload.id ? { ...product, quantity: product.quantity - 1 } : product
              );
          
              return {
                ...state,
                cart: { ...state.cart, cartProducts: updatedCartProducts },
                quantity: state.quantity - 1, // Update cart's total quantity by decrementing by one
              };
            } else {
              return state; // Return the state as it is if the product is not found in the cart or its quantity is already 1
            }
          }
          
          
    }
}
export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;

}
