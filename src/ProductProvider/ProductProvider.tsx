/* eslint-disable no-case-declarations */
import React, { createContext } from 'react'
import { Product } from '../types'
import useProductState, {
  Action,
  ProductState,
  initialProductState,
} from './useProductState'

export const ProductCtx = createContext<{
  product: Product
  productState: ProductState
  dispatch: React.Dispatch<Action>
  setOptions: (options: object) => void
  setQuantity: (quantity: number) => void
  addProductToCart: () => void
}>({
  product: (null as unknown) as Product,
  productState: initialProductState,
  dispatch: () => null,
  setOptions: () => null,
  setQuantity: () => null,
  addProductToCart: () => null,
})

// TODO: Add greyed out for sold out
// TODO: Add previous price
// TODO: add discount price

const ProductProvider: React.FC<{
  product: Product
}> = ({ product, children }) => {
  const {
    //
    dispatch,
    productState,
    setOptions,
    setQuantity,
    addProductToCart,
  } = useProductState(product)

  return (
    <ProductCtx.Provider
      value={{
        setQuantity,
        dispatch,
        product,
        productState,
        setOptions,
        addProductToCart,
      }}
    >
      {children}
    </ProductCtx.Provider>
  )
}

export default ProductProvider
