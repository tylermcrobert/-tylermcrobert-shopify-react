import decodeBase64 from './decodeBase64'

/**
 * Gets Variant ID from Buy SDK's API
 * @param id base 64 product variant
 */

export const parseProductVariant = (inputBase64: string): number => {
  const decoded = decodeBase64(inputBase64)
  const str = decoded.replace('gid://shopify/ProductVariant/', '')
  return parseFloat(str)
}
