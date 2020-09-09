/* eslint-disable no-case-declarations */
import React, { createContext } from 'react'
import { Variant, Product } from '../index'
import useProductState, { Action } from './useProductState'

export type ProductState = {
  currentVariant: Variant
  quantity: number
  isSubnav: boolean
  currentColor: {
    name: string | null
    hex: string | null
  }
}

export const initialProductState: ProductState = {
  currentVariant: (null as unknown) as Variant,
  quantity: 1,
  isSubnav: false,
  currentColor: {
    name: null,
    hex: null,
  },
}

export const ProductCtx = createContext<{
  product: Product
  productState: ProductState
  dispatch: React.Dispatch<Action>
  setOptions: (options: object) => void
  setQuantity: (quantity: number) => void
  setSubnav: (bool: boolean) => void
}>({
  product: (null as unknown) as Product,
  productState: initialProductState,
  dispatch: () => null,
  setOptions: () => null,
  setQuantity: () => null,
  setSubnav: () => null,
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
    setSubnav,
  } = useProductState(product)

  return (
    <ProductCtx.Provider
      value={{
        setQuantity,
        dispatch,
        product,
        productState,
        setOptions,
        setSubnav,
      }}
    >
      {children}
    </ProductCtx.Provider>
  )
}

export default ProductProvider
