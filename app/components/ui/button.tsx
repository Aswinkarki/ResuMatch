// components/ui/button.tsx
import React from "react"
import { cn } from "../../lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "icon"
  variant?: "default" | "outline" | "secondary" | "ghost"
}

export function Button({
  children,
  className = "",
  size = "md",
  variant = "default",
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "p-2", // Icon size class
  }[size]

  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    ghost: "text-gray-600 hover:bg-gray-100", // Ghost button style
  }[variant]

  return (
    <button
      className={cn(
        "rounded-lg transition font-medium flex items-center",
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
