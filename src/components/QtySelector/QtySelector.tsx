import React from 'react'

const QtySelector: React.FC<React.HTMLAttributes<HTMLDivElement> & {
  onUpdate: (qty: number) => void
  value: number
}> = ({ onUpdate, value, ...props }) => {
  const inc = () => onUpdate(value + 1)
  const dec = () => value > 1 && onUpdate(value - 1)

  return (
    <div {...props} className={['qtySelect', props.className].join(' ')}>
      <button onClick={dec}>－</button>
      <span>{value}</span>
      <button onClick={inc}>＋</button>
    </div>
  )
}

export default QtySelector
