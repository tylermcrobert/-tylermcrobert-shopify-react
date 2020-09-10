import React, { useEffect, useState } from 'react'
import {
  ProductProvider,
  useProduct,
  Collection as CollectionType,
  AddToCartButton,
} from '../../.'
import { client } from '../index'
import { Link } from 'react-router-dom'

export const Collection: React.FC<{ handle: string }> = ({ handle }) => {
  const [collection, setCollection] = useState<CollectionType | null>(null)

  useEffect(() => {
    client.collection.fetchByHandle(handle).then(collection => {
      setCollection((collection as unknown) as CollectionType)
    })
  }, [handle])

  if (!collection) return <div>Loading...</div>
  return (
    <div>
      <h1>{collection.title}</h1>
      <div className="productGrid">
        {collection.products.map(product => (
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
    <Link to={`/product/${product.handle}`}>
      <div className="productCard">
        <img src={product.images[0]?.src} />
        <div>{product.title}</div>
        <AddToCartButton className="button" />
      </div>
    </Link>
  )
}

export default Collection
