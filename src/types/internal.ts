import React from 'react'

export type ExtendableButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  onclick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}
