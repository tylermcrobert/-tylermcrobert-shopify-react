/* eslint-disable no-case-declarations */
import { useReducer, useEffect } from 'react'
import { Product } from '../index'
import { ProductState, initialProductState } from './ProductProvider'
import { useCart } from '../hooks'

export type Action =
  | { type: 'changeOptions'; options: any }
  | { type: 'changeQuantity'; quantity: number }
  | { type: 'resetDefault' }
  | { type: 'changeSubnav'; payload: boolean }

const useProductState = (product: Product) => {
  const { client } = useCart()

  const defaultVariant = {
    currentVariant: product.variants[0],
  }

  const counterReducer = (
    state: ProductState,
    action: Action
  ): ProductState => {
    switch (action.type) {
      case 'changeOptions':
        return {
          ...state,
          currentVariant: client.product.helpers.variantForOptions(
            product,
            action.options
          ),
        }
      case 'resetDefault':
        return { ...state, quantity: 1, ...defaultVariant }
      case 'changeQuantity':
        return { ...state, quantity: action.quantity }
      case 'changeSubnav':
        return { ...state, isSubnav: action.payload }
      default:
        return state
    }
  }

  const [productState, dispatch] = useReducer(counterReducer, {
    ...initialProductState,
    ...defaultVariant,
  })

  // resets state on page change
  useEffect(() => {
    dispatch({ type: 'resetDefault' })
  }, [product])

  /**
   * Helpers
   */

  const setQuantity = (quantity: number) =>
    dispatch({
      type: 'changeQuantity',
      quantity,
    })

  const setOptions = (options: object) => {
    const current = productState.currentVariant.selectedOptions.reduce(
      (acc, option) => ({ ...acc, [option.name]: option.value }),
      {}
    )

    dispatch({ type: 'changeOptions', options: { ...current, ...options } })
  }

  const setSubnav = (bool: boolean) =>
    dispatch({ type: 'changeSubnav', payload: bool })

  return {
    setOptions,
    dispatch,
    productState,
    setQuantity,
    setSubnav,
  }
}

export default useProductState
