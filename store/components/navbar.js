import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import { BagHeart } from 'react-bootstrap-icons';

const Navbar = () => {
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
                <Link href="/cart"><BagHeart color="hotpink" size={44} /></Link>
            </div>
        </div>
    );
}

export default Navbar;