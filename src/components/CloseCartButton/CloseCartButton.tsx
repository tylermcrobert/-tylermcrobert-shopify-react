import React from 'react'
import { useCart } from '../../hooks'
import { ExtendableButtonProps } from '../../types/internal'

const CloseCartButton: React.FC<ExtendableButtonProps> = ({
  children,
  onClick: handleClick,
  ...props
}) => {
  const { closeCart } = useCart()

  return (
    <button
      tabIndex={0}
      {...props}
      aria-label="close cart"
      onClick={e => {
        closeCart()
        if (handleClick) handleClick(e)
      }}
    >
      {children || '✕'}
    </button>
  )
}

export default CloseCartButton
