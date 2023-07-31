import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import { BagHeart } from 'react-bootstrap-icons';
import { Store } from '../utils/cart';
import { useContext } from "react";


const Navbar = () => {

    const { state } = useContext(Store);

    const cartProductsLength = state.cart && state.cart.cartProducts ? state.cart.cartProducts.length : 0;
    const cartProductsCount = state.cart.cartProducts.reduce((total, product) => total + product.quantity, 0);


    return (
        <div className='navbar' 
        style={{
            position: 'fixed', 
            backgroundColor: 'white', 
            width: '100vw',
            zIndex: '2'
        }}>
            <Link href="/">
                Home
            </Link>
            <Link href="/gallery">
                Gallery
            </Link>
            <Link href="/menu">
                Menu
            </Link>
            <div className='checkout'>
                <Link href="/checkout">
                    <BagHeart color="hotpink" size={44}></BagHeart>
                    {cartProductsLength > 0 && <span>{cartProductsCount}</span>}
                </Link>
            </div>
        </div>
    );
}

export default Navbar;