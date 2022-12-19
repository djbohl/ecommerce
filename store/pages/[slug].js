import { useRouter } from 'next/router';
import data from '../utils/data';

const ProductPage = (props) => {

    const router = useRouter();
    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find((x) => x.slug == slug);
    
    if (!product) {
        return <div>Product Not Found</div>
    }

    const addToCartHandler = () => {
        const existingProduct = state.cart.cartProducts.find((x) => x.slug === product.slug);
        const quantity = existingProduct ? existingProduct.quantity + 1 : 1;
    

        if (product.stock < quantity) {
            Alert(`Sorry we are out of ${quantity} many donuts.`);
            return;
        }

        dispatchEvent({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        router.push('/cart');
    }
    return (
        <div className='productpage'>
            <div>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                ></Image>
            </div>
            <ul>
                <li>
                    {product.price}
                </li>
                <li>
                    {product.description}
                </li>
            </ul>
        </div>
    );
}

export default ProductPage;