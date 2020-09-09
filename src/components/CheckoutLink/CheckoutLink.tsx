import React from 'react'
import { useCart } from '../../index'

interface CheckoutProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children?: string
}

const CheckoutLink: React.FC<CheckoutProps | null> = ({
  children,
  ...props
}) => {
  const { shopifyCheckout } = useCart()

  if (!shopifyCheckout) return null

  return (
    <a {...props} href={shopifyCheckout.webUrl}>
      {children || 'Checkout'}
    </a>
  )
}

export default CheckoutLink
