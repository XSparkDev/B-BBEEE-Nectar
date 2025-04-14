// Export all models for easy importing
export * from "./ownership"
export * from "./management"
export * from "./skills"
export * from "./enterprise"
export * from "./socio-economic"
export * from "./dashboard"
export * from "./company"
export * from "./user"

// Define common types used across multiple models
export type Race = "Black" | "White" | "Coloured" | "Indian" | "N/A"
export type Gender = "Male" | "Female" | "N/A"
export type VerificationStatus = "Verified" | "Pending Verification" | "Rejected"
export type DocumentStatus = "Valid" | "Expired" | "Pending"
export type Priority = "High" | "Medium" | "Low"

// Helper functions for working with models
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value}%`
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function calculateDaysRemaining(targetDate: Date): number {
  const today = new Date()
  const diffTime = targetDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function calculateScorePercentage(current: number, total: number): number {
  return Math.round((current / total) * 100)
}
