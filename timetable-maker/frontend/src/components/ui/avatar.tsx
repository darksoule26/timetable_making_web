import React from 'react'

interface AvatarProps {
  children: React.ReactNode
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${className}`}>
      {children}
    </div>
  )
}

interface AvatarFallbackProps {
  children: React.ReactNode
}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children }) => {
  return (
    <span className="font-medium text-gray-600 dark:text-gray-300">
      {children}
    </span>
  )
}