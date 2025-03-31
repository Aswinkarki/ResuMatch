
"use client"

import { useState, useEffect } from "react"

type ToastVariant = "default" | "destructive" | "success"

type ToastProps = {
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

type Toast = ToastProps & {
  id: string
  visible: boolean
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  // Function to add a toast
  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const duration = props.duration || 5000
    
    // Add the toast to the array
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, visible: true, ...props },
    ])
    
    // Set a timeout to remove the toast
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== id)
      )
    }, duration)
  }

  // Function to dismiss a toast
  const dismiss = (id: string) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== id)
    )
  }

  return {
    toast,
    dismiss,
    toasts,
  }
}

// Create a ToastProvider component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, dismiss } = useToast()

  return (
    <>
      {children}
      <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-md border p-4 shadow-md ${
              toast.variant === "destructive"
                ? "bg-red-100 border-red-200 text-red-800"
                : toast.variant === "success"
                ? "bg-green-100 border-green-200 text-green-800"
                : "bg-white border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            }`}
          >
            {toast.title && <h3 className="font-medium mb-1">{toast.title}</h3>}
            {toast.description && <p className="text-sm">{toast.description}</p>}
            <button
              onClick={() => dismiss(toast.id)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </>
  )
}