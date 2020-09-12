import { useProduct } from '../../hooks'
import React from 'react'

const AddToCartButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  const { addProductToCart, productState } = useProduct()

  return (
    <button className="button" onClick={addProductToCart} {...props}>
      {productState.currentVariant.available ? 'Add to cart' : 'Out of Stock'}
    </button>
  )
}

export default AddToCartButton
