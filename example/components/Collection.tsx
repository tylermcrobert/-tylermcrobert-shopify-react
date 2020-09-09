import React from 'react'
import { Product, Collection } from '../../dist'

const Collection: React.FC<{ data: Collection }> = ({ data }) => {
  const products = data.products.map(item => item)

  return (
    <div>
      <h3>{data.handle}</h3>
      <div className="productGrid">
        {products.map(product => (
          <ProductCard data={product} key={product.handle} />
        ))}
      </div>
    </div>
  )
}

const ProductCard: React.FC<{ data: Product }> = ({ data }) => {
  return (
    <div className="productCard">
      <img src={data.images[0].src} />
      {data.title}
    </div>
  )
}

export default Collection
