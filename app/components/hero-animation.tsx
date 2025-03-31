"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { FileText, CheckCircle, BarChart2 } from "lucide-react"

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  }

  const percentageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.5,
      },
    },
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md h-[300px] md:h-[400px]">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Connection lines */}
        <motion.path
          d="M100 150 L200 200 L300 150"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="text-muted-foreground/50"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M200 200 L200 300"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="text-muted-foreground/50"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Resume icon */}
        <motion.g variants={iconVariants} initial="hidden" animate="visible">
          <circle cx="100" cy="150" r="40" className="fill-primary/10" />
          <foreignObject x="70" y="120" width="60" height="60">
            <div className="flex items-center justify-center h-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </foreignObject>
        </motion.g>

        {/* Job description icon */}
        <motion.g variants={iconVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
          <circle cx="300" cy="150" r="40" className="fill-primary/10" />
          <foreignObject x="270" y="120" width="60" height="60">
            <div className="flex items-center justify-center h-full">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </foreignObject>
        </motion.g>

        {/* Analysis icon */}
        <motion.g variants={iconVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
          <circle cx="200" cy="200" r="50" className="fill-primary/10" />
          <foreignObject x="160" y="160" width="80" height="80">
            <div className="flex items-center justify-center h-full">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v18" stroke="currentColor" strokeWidth="2" className="text-primary" />
                <path d="M3 12h18" stroke="currentColor" strokeWidth="2" className="text-primary" />
                <path
                  d="M12 3 L21 12 L12 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                  fill="none"
                />
                <path
                  d="M12 3 L3 12 L12 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                  fill="none"
                />
              </svg>
            </div>
          </foreignObject>
        </motion.g>

        {/* Results icon */}
        <motion.g variants={iconVariants} initial="hidden" animate="visible" transition={{ delay: 0.9 }}>
          <circle cx="200" cy="300" r="40" className="fill-primary/10" />
          <foreignObject x="170" y="270" width="60" height="60">
            <div className="flex items-center justify-center h-full">
              <BarChart2 className="h-8 w-8 text-primary" />
            </div>
          </foreignObject>
        </motion.g>

        {/* Percentage indicator */}
        <motion.g variants={percentageVariants} initial="hidden" animate="visible">
          <circle
            cx="200"
            cy="300"
            r="60"
            stroke="currentColor"
            strokeWidth="4"
            className="text-primary"
            fill="transparent"
            strokeDasharray="302"
            strokeDashoffset="75"
          />
          <foreignObject x="180" y="320" width="40" height="30">
            <div className="flex items-center justify-center h-full">
              <span className="text-sm font-bold text-primary">76%</span>
            </div>
          </foreignObject>
        </motion.g>
      </svg>
    </div>
  )
}

