import React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'ghost' | 'outline' }
export const Button: React.FC<Props> = ({variant, className='', style, ...rest}) => {
  const base: React.CSSProperties = {
    padding: '10px 14px',
    borderRadius: 8,
    background: variant==='ghost' ? 'transparent' : '#f3f4f6',
    border: variant==='outline' ? '1px solid #d1d5db' : '1px solid transparent',
    cursor: 'pointer'
  }
  return <button {...rest} style={{...base, ...style}} className={className} />
}
export default Button
