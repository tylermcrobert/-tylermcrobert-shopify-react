import React, { useEffect, useState } from 'react'
import { client } from '..'
import { Product, ProductProvider, useProduct, AddToCartButton } from '../../.'

const ProductWrapper: React.FC<{ handle: string }> = ({ handle }) => {
  const [product, setProduct] = useState<Product | null>(null)
  useEffect(() => {
    client.product.fetchByHandle(handle).then((product: Product) => {
      setProduct(product)
    })
  }, [handle])

  return (
    <div>
      {product ? (
        <ProductProvider product={product}>
          <Product />
        </ProductProvider>
      ) : (
        'loading...'
      )}
    </div>
  )
}

const Product = () => {
  const { product, productState } = useProduct()

  console.log(productState.currentVariant)

  return (
    <div className="productPage">
      <div>
        <img src={productState.currentVariant.image.src} alt={product.title} />
      </div>
      <div>
        <h1>{product.title}</h1>
        <AddToCartButton className="button" />
      </div>
    </div>
  )
}
export default ProductWrapper
