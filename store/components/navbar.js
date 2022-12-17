import Link from 'next/link';

const Navbar = () => {
    return ( 
        <div className='navbar'>
            <Link href="/">
                Home
            </Link>
            <Link href="/gallery">
                Gallery
            </Link>
        </div>
     );
}
 
export default Navbar;