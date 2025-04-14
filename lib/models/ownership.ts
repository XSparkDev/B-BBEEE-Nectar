export interface Shareholder {
  id: string
  name: string
  type: "Individual" | "Company" | "Trust"
  race: "Black" | "White" | "Coloured" | "Indian" | "N/A"
  gender: "Male" | "Female" | "N/A"
  ownershipPercentage: number
  votingRightsPercentage: number
  status: "Verified" | "Pending Verification" | "Rejected"
  verificationDate?: Date
  documents?: Document[]
}

export interface OwnershipScore {
  current: number
  total: number
  blackOwnership: number
  blackWomenOwnership: number
  blackDesignatedGroup?: number
  lastUpdated: Date
}

export interface Document {
  id: string
  name: string
  type: string
  uploadDate: Date
  expiryDate?: Date
  status: "Valid" | "Expired" | "Pending"
  url: string
}

// Sample data
export const ownershipScoreData: OwnershipScore = {
  current: 23,
  total: 25,
  blackOwnership: 51,
  blackWomenOwnership: 25,
  lastUpdated: new Date("2025-03-15"),
}

export const shareholdersData: Shareholder[] = [
  {
    id: "1",
    name: "Thabo Mabena",
    type: "Individual",
    race: "Black",
    gender: "Male",
    ownershipPercentage: 26,
    votingRightsPercentage: 26,
    status: "Verified",
    verificationDate: new Date("2024-12-10"),
  },
  {
    id: "2",
    name: "Nomsa Dlamini",
    type: "Individual",
    race: "Black",
    gender: "Female",
    ownershipPercentage: 25,
    votingRightsPercentage: 25,
    status: "Verified",
    verificationDate: new Date("2024-12-10"),
  },
  {
    id: "3",
    name: "Empowerment Trust",
    type: "Trust",
    race: "Black",
    gender: "N/A",
    ownershipPercentage: 15,
    votingRightsPercentage: 15,
    status: "Pending Verification",
  },
  {
    id: "4",
    name: "Global Investments Ltd",
    type: "Company",
    race: "White",
    gender: "N/A",
    ownershipPercentage: 34,
    votingRightsPercentage: 34,
    status: "Verified",
    verificationDate: new Date("2024-12-15"),
  },
]

// Calculate black ownership percentages
export function calculateOwnershipPercentages(shareholders: Shareholder[]): {
  blackOwnership: number
  blackWomenOwnership: number
  blackVotingRights: number
} {
  let totalBlackOwnership = 0
  let totalBlackWomenOwnership = 0
  let totalBlackVotingRights = 0

  shareholders.forEach((shareholder) => {
    if (shareholder.race === "Black") {
      totalBlackOwnership += shareholder.ownershipPercentage
      totalBlackVotingRights += shareholder.votingRightsPercentage

      if (shareholder.gender === "Female") {
        totalBlackWomenOwnership += shareholder.ownershipPercentage
      }
    }
  })

  return {
    blackOwnership: Number.parseFloat(totalBlackOwnership.toFixed(2)),
    blackWomenOwnership: Number.parseFloat(totalBlackWomenOwnership.toFixed(2)),
    blackVotingRights: Number.parseFloat(totalBlackVotingRights.toFixed(2)),
  }
}

// Determine if the company qualifies for automatic recognition as QSE
export function qualifiesForAutomaticRecognition(
  blackOwnership: number,
  blackWomenOwnership: number,
): {
  qualifies: boolean
  level?: number
  reason?: string
} {
  if (blackOwnership >= 100) {
    return { qualifies: true, level: 1, reason: "100% Black Owned" }
  }

  if (blackOwnership >= 51 && blackWomenOwnership >= 30) {
    return { qualifies: true, level: 1, reason: "At least 51% Black Owned and 30% Black Women Owned" }
  }

  if (blackOwnership >= 51) {
    return { qualifies: true, level: 2, reason: "At least 51% Black Owned" }
  }

  return { qualifies: false }
}
