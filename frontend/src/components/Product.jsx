import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded h-100'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' className="card-img-top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title as='div' className='product-title'>
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as='div' className="product-text">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as='h3' className="mt-auto">
            ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;