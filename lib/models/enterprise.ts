export interface Beneficiary {
  id: string
  companyName: string
  industry: string
  ownership: string
  supportType:
    | "Financial"
    | "Mentorship"
    | "Financial & Mentorship"
    | "Financial & Equipment"
    | "Mentorship & Equipment"
  annualValue: number
  status: "Active" | "Pending" | "Completed"
  startDate: Date
  contactPerson: string
  contactEmail: string
  contactPhone: string
}

export interface SpendItem {
  id: string
  beneficiaryId: string
  description: string
  amount: number
  date: Date
  category: string
}

export interface BeneficiaryDocument {
  id: string
  beneficiaryId: string
  name: string
  type: string
  uploadDate: Date
  status: "Valid" | "Pending" | "Invalid"
  url: string
}

export interface EnterpriseScore {
  current: number
  total: number
  annualBudget: number
}

// Sample data
export const enterpriseScoreData: EnterpriseScore = {
  current: 15,
  total: 20,
  annualBudget: 5000000,
}

export const beneficiariesData: Beneficiary[] = [
  {
    id: "1",
    companyName: "TechStart Solutions",
    industry: "Technology",
    ownership: "100% Black Owned",
    supportType: "Financial & Mentorship",
    annualValue: 750000,
    status: "Active",
    startDate: new Date("2024-01-15"),
    contactPerson: "Thabo Molefe",
    contactEmail: "thabo@techstart.co.za",
    contactPhone: "071 234 5678",
  },
  {
    id: "2",
    companyName: "GreenGrow Farming",
    industry: "Agriculture",
    ownership: "51% Black Women Owned",
    supportType: "Financial & Equipment",
    annualValue: 1200000,
    status: "Active",
    startDate: new Date("2023-08-10"),
    contactPerson: "Nomsa Dlamini",
    contactEmail: "nomsa@greengrow.co.za",
    contactPhone: "082 345 6789",
  },
  {
    id: "3",
    companyName: "BuildRight Construction",
    industry: "Construction",
    ownership: "75% Black Owned",
    supportType: "Mentorship & Equipment",
    annualValue: 850000,
    status: "Pending",
    startDate: new Date("2024-03-01"),
    contactPerson: "Sipho Ndlovu",
    contactEmail: "sipho@buildright.co.za",
    contactPhone: "083 456 7890",
  },
]

export const beneficiarySpendItemsData: Record<string, SpendItem[]> = {
  "1": [
    {
      id: "1-1",
      beneficiaryId: "1",
      description: "Software Development Tools",
      amount: 150000,
      date: new Date("2024-02-15"),
      category: "Equipment",
    },
    {
      id: "1-2",
      beneficiaryId: "1",
      description: "Marketing Support",
      amount: 100000,
      date: new Date("2024-03-10"),
      category: "Marketing",
    },
    {
      id: "1-3",
      beneficiaryId: "1",
      description: "Office Space Rental Subsidy",
      amount: 120000,
      date: new Date("2024-04-05"),
      category: "Facilities",
    },
  ],
  "2": [
    {
      id: "2-1",
      beneficiaryId: "2",
      description: "Farming Equipment",
      amount: 350000,
      date: new Date("2023-09-15"),
      category: "Equipment",
    },
    {
      id: "2-2",
      beneficiaryId: "2",
      description: "Irrigation System",
      amount: 280000,
      date: new Date("2023-10-20"),
      category: "Infrastructure",
    },
    {
      id: "2-3",
      beneficiaryId: "2",
      description: "Agricultural Training",
      amount: 150000,
      date: new Date("2024-01-10"),
      category: "Training",
    },
  ],
  "3": [
    {
      id: "3-1",
      beneficiaryId: "3",
      description: "Initial Planning Support",
      amount: 100000,
      date: new Date("2024-03-15"),
      category: "Consulting",
    },
  ],
}

export const beneficiaryDocumentsData: Record<string, BeneficiaryDocument[]> = {
  "1": [
    {
      id: "1-1",
      beneficiaryId: "1",
      name: "Enterprise Development Agreement.pdf",
      type: "Agreement",
      uploadDate: new Date("2024-01-20"),
      status: "Valid",
      url: "/documents/enterprise-development-agreement.pdf",
    },
    {
      id: "1-2",
      beneficiaryId: "1",
      name: "Business Plan.pdf",
      type: "Plan",
      uploadDate: new Date("2024-01-25"),
      status: "Valid",
      url: "/documents/business-plan.pdf",
    },
    {
      id: "1-3",
      beneficiaryId: "1",
      name: "Progress Report Q1.pdf",
      type: "Report",
      uploadDate: new Date("2024-04-10"),
      status: "Pending",
      url: "/documents/progress-report-q1.pdf",
    },
  ],
  "2": [
    {
      id: "2-1",
      beneficiaryId: "2",
      name: "Equipment Purchase Invoice.pdf",
      type: "Invoice",
      uploadDate: new Date("2023-09-20"),
      status: "Valid",
      url: "/documents/equipment-purchase-invoice.pdf",
    },
    {
      id: "2-2",
      beneficiaryId: "2",
      name: "Training Completion Certificate.pdf",
      type: "Certificate",
      uploadDate: new Date("2024-01-15"),
      status: "Valid",
      url: "/documents/training-completion-certificate.pdf",
    },
  ],
  "3": [
    {
      id: "3-1",
      beneficiaryId: "3",
      name: "Mentorship Agreement.pdf",
      type: "Agreement",
      uploadDate: new Date("2024-03-05"),
      status: "Pending",
      url: "/documents/mentorship-agreement.pdf",
    },
  ],
}

// Support type distribution data
export const supportDistributionData = {
  financial: 45,
  mentorship: 25,
  equipmentResources: 20,
  marketAccess: 10,
}

// Impact metrics data
export const impactMetricsData = {
  revenueGrowth: {
    overall: 23,
    byBeneficiary: {
      "1": 28,
      "2": 15,
      "3": 5,
    },
  },
  jobsCreated: {
    overall: 42,
    byBeneficiary: {
      "1": 12,
      "2": 25,
      "3": 5,
    },
  },
  marketExpansion: {
    overall: 3,
    byBeneficiary: {
      "1": 2,
      "2": 1,
      "3": 0,
    },
  },
  roi: {
    overall: 2.4,
    byBeneficiary: {
      "1": 2.8,
      "2": 2.1,
      "3": 1.2,
    },
  },
  sustainabilityScore: {
    overall: 78,
    byBeneficiary: {
      "1": 82,
      "2": 75,
      "3": 60,
    },
  },
}
