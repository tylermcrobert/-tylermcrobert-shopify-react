import React from 'react'

import { CheckoutLineItem } from '../../types'
import { useCart } from '../../hooks'
import QtySelector from '../QtySelector/QtySelector'

const LineItemCtx = React.createContext<CheckoutLineItem>(
  (null as unknown) as CheckoutLineItem
)

type ReactEl<T, P> = React.FC<React.HTMLAttributes<T> & P>

const CartLineItem: ReactEl<HTMLDivElement, { data: CheckoutLineItem }> = ({
  data: lineItem,
  children,
  ...props
}) => {
  return (
    <LineItemCtx.Provider value={lineItem}>
      <div className="lineItem" {...props}>
        {children ? (
          children
        ) : (
          <>
            <Image />
            <div>
              <div className="lineItem__row">
                <Title />
                <Price />
              </div>
              <div className="lineItem__row bottom">
                <Quantity />
              </div>
            </div>
          </>
        )}
      </div>
    </LineItemCtx.Provider>
  )
}

const Quantity: ReactEl<HTMLDivElement, {}> = ({ ...props }) => {
  const lineItem = React.useContext(LineItemCtx)
  const { updateLineItem } = useCart()

  return (
    <QtySelector
      {...props}
      value={lineItem.quantity}
      onUpdate={num => updateLineItem(lineItem.id, { quantity: num })}
    />
  )
}

const Title: ReactEl<HTMLHeadingElement, {}> = ({ ...props }) => {
  const lineItem = React.useContext(LineItemCtx)
  return <h3 {...props}>{lineItem.title}</h3>
}

const Price: ReactEl<HTMLSpanElement, {}> = ({ ...props }) => {
  const lineItem = React.useContext(LineItemCtx)
  return <span {...props}>${lineItem.variant.price}</span>
}

const Image: ReactEl<HTMLImageElement, {}> = ({ ...props }) => {
  const lineItem = React.useContext(LineItemCtx)
  return (
    <img {...props} src={lineItem.variant.image.src} alt={lineItem.title} />
  )
}

/** Compound component  */
export const LineItem = {
  Wrapper: CartLineItem,
  Quantity,
  Title,
  Price,
  Image,
}

export default CartLineItem
