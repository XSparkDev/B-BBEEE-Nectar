"use client"

import { useState, useEffect } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  delay?: number
}

export function AnimatedCounter({
  value,
  duration = 1000,
  decimals = 0,
  prefix = "",
  suffix = "",
  delay = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      // Calculate the current count based on progress
      const percentage = Math.min(progress / duration, 1)
      // Use easeOutQuart for a nice animation curve
      const easing = 1 - Math.pow(1 - percentage, 4)
      const currentCount = easing * value

      setCount(currentCount)

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount)
      } else {
        setCount(value)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration, isVisible])

  const formattedCount = count.toFixed(decimals)

  return (
    <span>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}
