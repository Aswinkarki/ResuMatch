// "use client"

// import * as React from "react"
// import { ThemeProvider as NextThemesProvider } from "next-themes"

// // Define the ThemeProviderProps directly to avoid the import issue
// type ThemeProviderProps = {
//   children: React.ReactNode
//   attribute?: string
//   defaultTheme?: string
//   enableSystem?: boolean
//   disableTransitionOnChange?: boolean
//   storageKey?: string
//   themes?: string[]
//   forcedTheme?: string
//   enableColorScheme?: boolean
// }

// export function ThemeProvider({ 
//   children, 
//   ...props 
// }: ThemeProviderProps) {
//   return (
//     <NextThemesProvider {...props}>
//       {children}
//     </NextThemesProvider>
//   )
// }


"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ 
  children, 
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}