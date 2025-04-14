export interface BbbeeLevel {
  level: number
  validUntil: Date
  previousLevel?: number
  changeDate?: Date
}

export interface ScoreCard {
  totalScore: number
  maxScore: number
  previousScore?: number
  changeAmount: number
  lastUpdated: Date
}

export interface OwnershipSummary {
  blackOwnership: number
  blackWomenOwned: number
  lastUpdated: Date
}

export interface VerificationInfo {
  daysRemaining: number
  dueDate: Date
  verificationAgency: string
  contactPerson: string
}

export interface ElementScore {
  element: string
  current: number
  total: number
  percentage: number
  lastUpdated: Date
  actionRequired: boolean
}

export interface Document {
  id: string
  name: string
  type: string
  uploadDate: Date
  status: "Valid" | "Expired" | "Pending"
}

export interface MissingDocument {
  id: string
  name: string
  type: string
  requiredBy: Date
  priority: "High" | "Medium" | "Low"
}

export interface RecommendedAction {
  id: string
  title: string
  description: string
  potentialImpact: number
  category: "Ownership" | "Management" | "Skills" | "Enterprise" | "SED"
  difficulty: "Easy" | "Medium" | "Hard"
}

// Sample data
export const bbbeeLevelData: BbbeeLevel = {
  level: 4,
  validUntil: new Date("2025-06-15"),
  previousLevel: 5,
  changeDate: new Date("2024-06-15"),
}

export const scoreCardData: ScoreCard = {
  totalScore: 78.5,
  maxScore: 100,
  previousScore: 76,
  changeAmount: 2.5,
  lastUpdated: new Date("2025-03-15"),
}

export const ownershipSummaryData: OwnershipSummary = {
  blackOwnership: 51,
  blackWomenOwned: 25,
  lastUpdated: new Date("2025-03-15"),
}

export const verificationInfoData: VerificationInfo = {
  daysRemaining: 120,
  dueDate: new Date("2025-08-15"),
  verificationAgency: "BEE Verification Solutions",
  contactPerson: "Sarah Johnson",
}

export const elementScoresData: ElementScore[] = [
  {
    element: "Ownership",
    current: 23,
    total: 25,
    percentage: 92,
    lastUpdated: new Date("2025-03-15"),
    actionRequired: false,
  },
  {
    element: "Management Control",
    current: 15,
    total: 19,
    percentage: 79,
    lastUpdated: new Date("2025-02-28"),
    actionRequired: false,
  },
  {
    element: "Skills Development",
    current: 12,
    total: 20,
    percentage: 60,
    lastUpdated: new Date("2025-03-20"),
    actionRequired: true,
  },
  {
    element: "Enterprise Development",
    current: 18,
    total: 25,
    percentage: 72,
    lastUpdated: new Date("2025-02-15"),
    actionRequired: false,
  },
  {
    element: "Socio-Economic Development",
    current: 10.5,
    total: 11,
    percentage: 95,
    lastUpdated: new Date("2025-03-25"),
    actionRequired: false,
  },
]

export const recentDocumentsData: Document[] = [
  {
    id: "1",
    name: "Skills Development Plan 2025.pdf",
    type: "Plan",
    uploadDate: new Date("2025-04-02"),
    status: "Valid",
  },
  {
    id: "2",
    name: "Ownership Certificate.pdf",
    type: "Certificate",
    uploadDate: new Date("2025-03-23"),
    status: "Valid",
  },
  {
    id: "3",
    name: "SED Initiative Report Q1.xlsx",
    type: "Report",
    uploadDate: new Date("2025-03-18"),
    status: "Valid",
  },
]

export const missingDocumentsData: MissingDocument[] = [
  {
    id: "1",
    name: "Skills Development Expenditure Report",
    type: "Report",
    requiredBy: new Date("2025-05-15"),
    priority: "High",
  },
  {
    id: "2",
    name: "Training Certificates",
    type: "Certificate",
    requiredBy: new Date("2025-05-30"),
    priority: "Medium",
  },
  {
    id: "3",
    name: "Supplier Development Proof of Payment",
    type: "Financial",
    requiredBy: new Date("2025-06-15"),
    priority: "Medium",
  },
]

export const recommendedActionsData: RecommendedAction[] = [
  {
    id: "1",
    title: "Increase Enterprise Development Spend",
    description: "Increasing your Enterprise Development spend by R250,000 would improve your score by 3 points.",
    potentialImpact: 3,
    category: "Enterprise",
    difficulty: "Medium",
  },
  {
    id: "2",
    title: "Add Black Female Board Member",
    description: "Adding a Black Female Board Member would improve your Management Control score by 4 points.",
    potentialImpact: 4,
    category: "Management",
    difficulty: "Hard",
  },
  {
    id: "3",
    title: "Implement Skills Development Program",
    description:
      "Implementing a structured Skills Development program for Black employees would improve your score by 5 points.",
    potentialImpact: 5,
    category: "Skills",
    difficulty: "Medium",
  },
]
