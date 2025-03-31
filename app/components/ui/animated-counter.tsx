"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useSpring, useInView } from "framer-motion"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  delay?: number
  className?: string
  formatter?: (value: number) => string
}

export function AnimatedCounter({
  from,
  to,
  duration = 1,
  delay = 0,
  className,
  formatter = (value) => Math.round(value).toString(),
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const springValue = useSpring(from, {
    stiffness: 100,
    damping: 30,
    duration,
  })

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        springValue.set(to)
      }, delay * 1000)

      return () => clearTimeout(timeout)
    }
  }, [isInView, to, springValue, delay])

  useEffect(() => {
    const unsubscribe = springValue.onChange((latest) => {
      setDisplayValue(latest)
    })

    return unsubscribe
  }, [springValue])

  return (
    <motion.span ref={ref} className={className}>
      {formatter(displayValue)}
    </motion.span>
  )
}

