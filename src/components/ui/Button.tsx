'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  external?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  external = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-ink text-surface hover:bg-accent hover:text-ink',
    secondary: 'border border-ink text-ink hover:bg-ink hover:text-surface',
    ghost: 'text-ink hover:text-accent underline-offset-4 hover:underline',
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-sm rounded-full',
    md: 'px-7 py-3.5 text-sm rounded-full',
    lg: 'px-9 py-4 text-base rounded-full',
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <motion.span
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="inline-block"
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block">
      {content}
    </button>
  )
}
