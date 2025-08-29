import React from 'react'
export const ScrollArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({style, className='', ...rest}) => {
  return <div {...rest} style={{overflowY:'auto', maxHeight: '60vh', ...style}} className={className} />
}
export default ScrollArea
