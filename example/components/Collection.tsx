import React from 'react'
import { Collection, ProductProvider, useProduct } from '../../dist'

const Collection: React.FC<{ data: Collection }> = ({ data }) => {
  const products = data.products.map(item => item)

  return (
    <div>
      <h3>{data.handle}</h3>
      <div className="productGrid">
        {products.map(product => (
          <ProductProvider product={product} key={product.handle}>
            <ProductCard key={product.handle} />
          </ProductProvider>
        ))}
      </div>
    </div>
  )
}

const ProductCard: React.FC = () => {
  const { product } = useProduct()

  return (
    <div className="productCard">
      <img src={product.images[0].src} />
      {product.title}
    </div>
  )
}

export default Collection
