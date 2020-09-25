import decodeBase64 from './decodeBase64'

/**
 * Gets number ID from Buy SDK's API
 * @param id base 64 product id
 */
export const parseProductId = (id: string) =>
  Number(decodeBase64(id).split('Product/')[1])
