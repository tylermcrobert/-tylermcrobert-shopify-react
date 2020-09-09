import React from 'react'
import { useCart, useProduct } from '../../hooks'
import { ExtendableButtonProps } from '../../types/internal'

const AddToCartButton: React.FC<ExtendableButtonProps> = ({
  children,
  onClick: handleClick,
  ...props
}) => {
  const { addToCart } = useCart()
  const { productState } = useProduct()

  return (
    <button
      {...props}
      onClick={e => {
        addToCart(
          productState.currentVariant.id.toString(),
          productState.quantity
        )
        if (handleClick) handleClick(e)
      }}
    >
      {children || 'Add to cart'}
    </button>
  )
}

export default AddToCartButton
