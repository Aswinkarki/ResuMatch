// components/ui/badge.tsx
import React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "outline" | "filled" | "subtle" // Define the variants as needed
  className?: string
}

export function Badge({ children, variant = "outline", className }: BadgeProps) {
  const variantClasses = {
    outline: "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
    filled: "bg-gray-700 text-white hover:bg-gray-800",
    subtle: "bg-gray-100 text-gray-600 hover:bg-gray-200",
  }

  return (
    <span
      className={`inline-flex items-center justify-center text-xs font-medium rounded-full px-3 py-1 space-x-1 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
