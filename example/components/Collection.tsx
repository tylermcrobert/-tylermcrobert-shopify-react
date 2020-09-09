import React, { useEffect, useState } from 'react'
import {
  ProductProvider,
  useProduct,
  Collection as CollectionType,
  AddToCartButton,
} from '../../.'
import { client } from '../index'

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
    <div className="productCard">
      <img src={product.images[0].src} />
      {product.title}
      <AddToCartButton className="button" />
    </div>
  )
}

export default Collection
