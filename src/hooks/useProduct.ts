import { useContext } from 'react'
import { ProductCtx } from '../ProductProvider/ProductProvider'

/**
 *  UseProduct data and functions
 */
export const useProduct = () => useContext(ProductCtx)
