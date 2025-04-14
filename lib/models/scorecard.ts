import { ownershipScoreData } from "./ownership"
import { managementScoreData } from "./management"
import { skillsScoreData } from "./skills"
import { enterpriseScoreData } from "./enterprise"
import { socioEconomicScoreData } from "./socio-economic"

// B-BBEE Scorecard Element Definitions
export interface ScoreElement {
  name: string
  current: number
  target: number
  isPriority: boolean
  subMinimum?: number // Only needed for priority elements
  meetSubMinimum?: boolean // Calculated value
}

export interface BbbeeScorecard {
  elements: ScoreElement[]
  totalScore: number
  level: number
  levelText: string
  blackOwnership: number
  blackWomenOwnership: number
  isDiscounted: boolean // Whether level was discounted due to priority elements
  levelBeforeDiscount?: number
  validFrom?: Date
  validUntil?: Date
  daysRemaining?: number
  verificationAgency?: string
}

// Determines B-BBEE level based on points
export function getBbbeeLevel(score: number): { level: number; levelText: string } {
  if (score >= 100) return { level: 1, levelText: "Level 1" }
  if (score >= 95) return { level: 2, levelText: "Level 2" }
  if (score >= 90) return { level: 3, levelText: "Level 3" }
  if (score >= 80) return { level: 4, levelText: "Level 4" }
  if (score >= 75) return { level: 5, levelText: "Level 5" }
  if (score >= 70) return { level: 6, levelText: "Level 6" }
  if (score >= 55) return { level: 7, levelText: "Level 7" }
  if (score >= 40) return { level: 8, levelText: "Level 8" }
  return { level: 9, levelText: "Non-compliant" }
}

// Calculate days remaining until next verification
export function calculateDaysRemaining(verificationDate: Date): number {
  const today = new Date()
  const diffTime = verificationDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Check priority elements sub-minimum
export function checkPriorityElements(elements: ScoreElement[]): boolean {
  const priorityElements = elements.filter((element) => element.isPriority)
  for (const element of priorityElements) {
    // Priority elements must reach at least 40% of their target
    const minimumRequired = element.subMinimum || element.target * 0.4
    if (element.current < minimumRequired) {
      return false
    }
  }
  return true
}

// Calculate the total scorecard
export function calculateScorecard(): BbbeeScorecard {
  // Create scorecard elements based on current data from each area
  const elements: ScoreElement[] = [
    {
      name: "Ownership",
      current: ownershipScoreData.current,
      target: ownershipScoreData.total,
      isPriority: true,
      subMinimum: ownershipScoreData.total * 0.4,
    },
    {
      name: "Management Control",
      current: managementScoreData.current,
      target: managementScoreData.total,
      isPriority: false,
    },
    {
      name: "Skills Development",
      current: skillsScoreData.current,
      target: skillsScoreData.total,
      isPriority: true,
      subMinimum: skillsScoreData.total * 0.4,
    },
    {
      name: "Enterprise Development",
      current: enterpriseScoreData.current,
      target: enterpriseScoreData.total,
      isPriority: true,
      subMinimum: enterpriseScoreData.total * 0.4,
    },
    {
      name: "Socio-Economic Development",
      current: socioEconomicScoreData.current,
      target: socioEconomicScoreData.total,
      isPriority: false,
    },
  ]

  // Calculate total score
  const totalScore = elements.reduce((sum, element) => sum + element.current, 0)

  // Determine level
  const { level, levelText } = getBbbeeLevel(totalScore)

  // Check priority elements
  const meetsPriorityElements = checkPriorityElements(elements)

  // If priority elements are not met, discount the level by one
  const levelBeforeDiscount = level
  const finalLevel = meetsPriorityElements ? level : Math.min(level + 1, 9)
  const finalLevelText = meetsPriorityElements ? levelText : getBbbeeLevel(finalLevel).levelText

  // Verify date logic
  const verificationDate = new Date()
  verificationDate.setFullYear(verificationDate.getFullYear() + 1)

  return {
    elements,
    totalScore,
    level: finalLevel,
    levelText: finalLevelText,
    blackOwnership: ownershipScoreData.blackOwnership,
    blackWomenOwnership: ownershipScoreData.blackWomenOwnership,
    isDiscounted: !meetsPriorityElements,
    levelBeforeDiscount: !meetsPriorityElements ? levelBeforeDiscount : undefined,
    validFrom: new Date(),
    validUntil: verificationDate,
    daysRemaining: calculateDaysRemaining(verificationDate),
    verificationAgency: "BEE Verification Solutions",
  }
}

// Sample scorecard data
export const scorecardData: BbbeeScorecard = calculateScorecard()
