"use client"

import type React from "react"
import { createContext, useContext, useState, forwardRef } from "react"
import { cn } from "../../lib/utils"

type TabsContextValue = {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider")
  }
  return context
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value, onValueChange, children, className, ...props }, ref) => {
    const [tabValue, setTabValue] = useState(value || defaultValue || "")

    const handleValueChange = (newValue: string) => {
      setTabValue(newValue)
      onValueChange?.(newValue)
    }

    return (
      <TabsContext.Provider value={{ value: tabValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  },
)
Tabs.displayName = "Tabs"

const TabsList = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
)
TabsList.displayName = "TabsList"

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(({ className, value, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = useTabs()
  const isSelected = selectedValue === value

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-background text-foreground shadow-sm": isSelected,
          "text-muted-foreground hover:bg-muted hover:text-foreground": !isSelected,
        },
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(({ className, value, children, ...props }, ref) => {
  const { value: selectedValue } = useTabs()
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
