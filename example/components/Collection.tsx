import React, { useEffect, useState } from 'react'
import {
  ProductProvider,
  useProduct,
  Collection as CollectionType,
  useCart,
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
  const { product, ...prod } = useProduct()
  const { addToCart } = useCart()

  return (
    <div className="productCard">
      <img src={product.images[0].src} />
      {product.title}
      <button
        className="button"
        onClick={() =>
          addToCart(prod.productState.currentVariant.id.toString(), 1)
        }
      >
        Add to cart
      </button>
    </div>
  )
}

export default Collection
