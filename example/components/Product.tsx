import React, { useEffect, useState } from 'react'
import { client } from '..'
import {
  Product,
  ProductProvider,
  useProduct,
  AddToCartButton,
  QtySelector,
} from '../../.'

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
  const { product, productState, setOptions, setQuantity } = useProduct()

  return (
    <div className="productPage">
      <div>
        <img src={productState.currentVariant.image.src} alt={product.title} />
      </div>

      <div>
        <h1>{product.title}</h1>

        <Option />
        <QtySelector
          onUpdate={num => setQuantity(num)}
          value={productState.quantity}
        />

        <AddToCartButton className="button" />
        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
      </div>
    </div>
  )
}

const Option = () => {
  const { product, productState, setOptions } = useProduct()

  const isSelected = (optionName, optionValue) =>
    productState.currentVariant.selectedOptions.filter(
      option => option.name === optionName
    )[0].value === optionValue

  return (
    <>
      {product.options.map(option => (
        <div key={option.name}>
          <h2>{option.name}</h2>

          {option.values.map(({ value }) => {
            const selected = isSelected(option.name, value)

            return (
              <div key={value}>
                <input
                  type="radio"
                  name={option.name}
                  value={value}
                  id={value}
                  checked={selected}
                  onChange={() => setOptions({ [option.name]: value })}
                />
                <label htmlFor={value}>{value}</label>
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}
export default ProductWrapper
