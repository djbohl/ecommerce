import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import { BagHeart } from 'react-bootstrap-icons';
import { Store } from '../utils/cart';
import { useContext } from "react";


const Navbar = () => {

    const { state, dispatch } = useContext(Store);

    const { cart } = state;

    return (
        <div className='navbar'>
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
                    {
                        cart.cartProducts.length > 0 && (
                            <span>
                                {cart.cartProducts.reduce((a, c) => a + c.quantity, 0)}
                            </span>
                        )
                    }
                </Link>
            </div>
        </div>
    );
}

export default Navbar;