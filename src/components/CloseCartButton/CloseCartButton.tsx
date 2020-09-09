import React from 'react'
import { useCart } from '../../hooks'

interface CloseCartButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onclick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}

const CloseCartButton: React.FC<CloseCartButtonProps> = ({
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
