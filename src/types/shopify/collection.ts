import { Product, Image } from './.'

export type Collection = {
  /** Products in collection */
  products: Product[]
  /** Collection ID */
  id: string
  /** Collection Handle */
  handle: string
  /** Collection description */
  description: string
  /** Collection description richText HTML */
  descriptionHtml: string
  /** Collection last updated */
  updatedAt: string
  /** Collection title */
  title: string
  /** Collection Image */
  image: Image
  /** Collection GraphQl stuff */
  type: CollectionType
  /** Does collection have second page */
  hasNextPage: {
    value: boolean
  }
  /** Does collection have previous page */
  hasPreviousPage: false
  variableValues: { first: 20; productsFirst: 20 }
}

type CollectionType = {
  name: 'Collection'
  kind: 'OBJECT'
  fieldBaseTypes: {
    description: 'String'
    descriptionHtml: 'HTML'
    handle: 'String'
    id: 'ID'
    image: 'Image'
    products: 'ProductConnection'
    title: 'String'
    updatedAt: 'DateTime'
  }
  implementsNode: true
}
