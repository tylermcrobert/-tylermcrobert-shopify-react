import { useContext } from 'react'
import { CartCtx } from '../CartProvider/CartProvider'

export const useCart = () => useContext(CartCtx)
