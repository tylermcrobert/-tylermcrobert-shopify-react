import React, {
  createContext,
  // useContext
} from 'react'
import { useProduct } from '../../hooks'
import { Option } from '../../types/shopify/Product'

const OptionsCtx = createContext<Option>((null as unknown) as Option)

const ProductOptions = () => {
  const { product } = useProduct()

  return (
    <>
      {product.options.map(option => (
        <OptionsCtx.Provider value={option} key={option.name}>
          {/* <Option /> */}
        </OptionsCtx.Provider>
      ))}
    </>
  )
}

// const Option = () => {
//   const { productState, setOptions } = useProduct()
//   const option = useContext(OptionsCtx)

//   const name = option.name

//   const isSelected = (optionName: string, optionValue: string) =>
//     productState.currentVariant.selectedOptions.filter(
//       option => option.name === optionName
//     )[0].value === optionValue

//   return (
//     <div key={option.name}>
//       {name !== 'Default' && <h2>{option.name}</h2>}

//       {option.values.map(({ value }) => {
//         const selected = isSelected(option.name, value)

//         return (
//           <div key={value}>
//             <input
//               type="radio"
//               name={option.name}
//               value={value}
//               id={value}
//               checked={selected}
//               onChange={() => setOptions({ [option.name]: value })}
//             />
//             <label htmlFor={value}>{value}</label>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

export default ProductOptions
