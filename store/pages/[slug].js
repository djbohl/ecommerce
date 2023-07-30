import { useRouter } from 'next/router';
import data from '../utils/data';
import { useContext } from 'react';


const ProductPage = (props) => {

    const router = useRouter();
    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find((x) => x.slug == slug);
    
    if (!product) {
        return <div>Product Not Found</div>
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