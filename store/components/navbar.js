import Link from 'next/link'

const Navbar = () => {
    return ( 
        <div>
            <Link href="/">
                Home
            </Link>
            <Link href="/menu">
                Menu
            </Link>
        </div>
     );
}
 
export default Navbar;