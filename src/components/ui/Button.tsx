'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  external?: boolean
}

const PRIMARY: React.CSSProperties = {
  backgroundColor: '#16243A',
  color: '#FFF6F2',
  padding: '16px 32px',
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  borderRadius: '999px',
  boxShadow: '0 8px 32px rgba(10,4,8,0.45)',
  transition: 'all 300ms',
}

const OUTLINE: React.CSSProperties = {
  border: '1px solid rgba(255,246,242,0.32)',
  color: 'rgba(255,246,242,0.88)',
  padding: '16px 32px',
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  borderRadius: '999px',
  transition: 'all 300ms',
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  external = false,
}: ButtonProps) {
  const style = variant === 'primary' ? PRIMARY : OUTLINE

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement
    if (variant === 'primary') {
      el.style.backgroundColor = '#1E2F4A'
      el.style.transform = 'scale(1.03)'
      el.style.boxShadow = '0 12px 40px rgba(10,4,8,0.55)'
    } else {
      el.style.backgroundColor = 'rgba(255,246,242,0.08)'
      el.style.borderColor = 'rgba(255,246,242,0.55)'
      el.style.color = '#FFF6F2'
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement
    if (variant === 'primary') {
      el.style.backgroundColor = '#16243A'
      el.style.transform = 'scale(1)'
      el.style.boxShadow = '0 8px 32px rgba(10,4,8,0.45)'
    } else {
      el.style.backgroundColor = 'transparent'
      el.style.borderColor = 'rgba(255,246,242,0.32)'
      el.style.color = 'rgba(255,246,242,0.88)'
    }
  }

  const sharedProps = {
    style,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: `inline-flex items-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`,
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...sharedProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      {...sharedProps}
    >
      {children}
    </motion.button>
  )
}
