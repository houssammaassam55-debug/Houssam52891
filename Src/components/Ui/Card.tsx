import React from 'react'
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className='', style, ...props}) => {
  const base: React.CSSProperties = {
    border: '1px solid #eee',
    borderRadius: 12,
    background: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,.06)',
    padding: 12
  }
  return <div {...props} style={{...base, ...style}} className={className} />
}
export default Card
