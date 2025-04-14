export interface Initiative {
  id: string
  name: string
  category: "Education" | "Healthcare" | "Technology" | "Skills Development"
  beneficiaries: string
  duration: string
  annualBudget: number
  status: "Active" | "Planning" | "Completed"
  startDate: Date
  description: string
  impact: string
  contactPerson: string
}

export interface SocioEconomicScore {
  current: number
  total: number
  annualBudget: number
}

// Sample data
export const socioEconomicScoreData: SocioEconomicScore = {
  current: 12,
  total: 15,
  annualBudget: 2500000,
}

export const initiativesData: Initiative[] = [
  {
    id: "1",
    name: "Soweto Education Fund",
    category: "Education",
    beneficiaries: "250 students",
    duration: "Ongoing",
    annualBudget: 750000,
    status: "Active",
    startDate: new Date("2023-01-15"),
    description:
      "Scholarship program providing educational support to underprivileged students in Soweto, covering school fees, books, and uniforms.",
    impact:
      "Improved matriculation pass rates by 28% among beneficiaries, with 65% of supported students continuing to tertiary education.",
    contactPerson: "Thabo Molefe",
  },
  {
    id: "2",
    name: "Alexandra Healthcare Clinic",
    category: "Healthcare",
    beneficiaries: "5,000+ community members",
    duration: "Ongoing",
    annualBudget: 950000,
    status: "Active",
    startDate: new Date("2022-06-10"),
    description:
      "Support for a community healthcare clinic in Alexandra township, providing primary healthcare services and health education.",
    impact:
      "Increased healthcare access by 65% in the community, with significant improvements in maternal health outcomes and vaccination rates.",
    contactPerson: "Dr. Nomsa Dlamini",
  },
  {
    id: "3",
    name: "Rural Digital Access",
    category: "Technology",
    beneficiaries: "5 rural communities",
    duration: "2 years",
    annualBudget: 600000,
    status: "Active",
    startDate: new Date("2023-08-01"),
    description:
      "Initiative to provide internet connectivity and digital literacy training to rural communities in Limpopo province.",
    impact:
      "Established internet connectivity in 5 previously unconnected communities, trained 120 community members in digital literacy.",
    contactPerson: "Sipho Ndlovu",
  },
  {
    id: "4",
    name: "Youth Employment Initiative",
    category: "Skills Development",
    beneficiaries: "100 youth",
    duration: "18 months",
    annualBudget: 800000,
    status: "Planning",
    startDate: new Date("2025-01-15"),
    description: "Comprehensive skills development and job placement program for unemployed youth in urban areas.",
    impact: "Expected to achieve 70% employment rate among participants within 6 months of program completion.",
    contactPerson: "Lerato Moloi",
  },
]

// Sample data for initiative spend items
export const initiativeSpendItemsData = {
  "1": [
    // Soweto Education Fund
    {
      id: "1-1",
      initiativeId: "1",
      description: "Scholarship Payments",
      amount: 500000,
      date: new Date("2024-02-15"),
      category: "Scholarships",
    },
    {
      id: "1-2",
      initiativeId: "1",
      description: "Administrative Costs",
      amount: 100000,
      date: new Date("2024-03-10"),
      category: "Administration",
    },
    {
      id: "1-3",
      initiativeId: "1",
      description: "Educational Materials",
      amount: 150000,
      date: new Date("2024-04-05"),
      category: "Materials",
    },
  ],
  "2": [
    // Alexandra Healthcare Clinic
    {
      id: "2-1",
      initiativeId: "2",
      description: "Medical Equipment",
      amount: 350000,
      date: new Date("2024-03-15"),
      category: "Equipment",
    },
    {
      id: "2-2",
      initiativeId: "2",
      description: "Staff Training",
      amount: 100000,
      date: new Date("2024-04-10"),
      category: "Training",
    },
    {
      id: "2-3",
      initiativeId: "2",
      description: "Medical Supplies",
      amount: 200000,
      date: new Date("2024-02-20"),
      category: "Supplies",
    },
    {
      id: "2-4",
      initiativeId: "2",
      description: "Community Health Education",
      amount: 150000,
      date: new Date("2024-01-25"),
      category: "Education",
    },
  ],
  "3": [
    // Rural Digital Access
    {
      id: "3-1",
      initiativeId: "3",
      description: "Internet Infrastructure",
      amount: 250000,
      date: new Date("2024-06-20"),
      category: "Infrastructure",
    },
    {
      id: "3-2",
      initiativeId: "3",
      description: "Digital Literacy Training",
      amount: 100000,
      date: new Date("2024-07-15"),
      category: "Training",
    },
    {
      id: "3-3",
      initiativeId: "3",
      description: "Computer Equipment",
      amount: 150000,
      date: new Date("2024-05-10"),
      category: "Equipment",
    },
  ],
  "4": [
    // Youth Employment Initiative
    {
      id: "4-1",
      initiativeId: "4",
      description: "Planning and Development",
      amount: 50000,
      date: new Date("2025-04-15"),
      category: "Planning",
    },
  ],
}

// Sample data for initiative documents
export const initiativeDocumentsData = {
  "1": [
    {
      id: "1-1",
      initiativeId: "1",
      name: "Scholarship Program Framework.pdf",
      type: "Framework",
      uploadDate: new Date("2023-01-10"),
      status: "Valid",
      url: "/documents/scholarship-program-framework.pdf",
    },
    {
      id: "1-2",
      initiativeId: "1",
      name: "Student Selection Criteria.pdf",
      type: "Criteria",
      uploadDate: new Date("2023-01-15"),
      status: "Valid",
      url: "/documents/student-selection-criteria.pdf",
    },
    {
      id: "1-3",
      initiativeId: "1",
      name: "Annual Impact Report 2023.pdf",
      type: "Report",
      uploadDate: new Date("2024-01-20"),
      status: "Valid",
      url: "/documents/annual-impact-report-2023.pdf",
    },
    {
      id: "1-4",
      initiativeId: "1",
      name: "Q1 2024 Financial Statement.pdf",
      type: "Financial",
      uploadDate: new Date("2024-04-10"),
      status: "Pending",
      url: "/documents/q1-2024-financial-statement.pdf",
    },
  ],
  "2": [
    {
      id: "2-1",
      initiativeId: "2",
      name: "Healthcare Clinic MOU.pdf",
      type: "Agreement",
      uploadDate: new Date("2022-06-05"),
      status: "Valid",
      url: "/documents/healthcare-clinic-mou.pdf",
    },
    {
      id: "2-2",
      initiativeId: "2",
      name: "Medical Equipment Invoice.pdf",
      type: "Invoice",
      uploadDate: new Date("2024-03-20"),
      status: "Valid",
      url: "/documents/medical-equipment-invoice.pdf",
    },
    {
      id: "2-3",
      initiativeId: "2",
      name: "Community Health Impact Assessment.pdf",
      type: "Assessment",
      uploadDate: new Date("2023-12-15"),
      status: "Valid",
      url: "/documents/community-health-impact-assessment.pdf",
    },
  ],
  "3": [
    {
      id: "3-1",
      initiativeId: "3",
      name: "Digital Access Project Plan.pdf",
      type: "Plan",
      uploadDate: new Date("2023-07-25"),
      status: "Valid",
      url: "/documents/digital-access-project-plan.pdf",
    },
    {
      id: "3-2",
      initiativeId: "3",
      name: "Community Agreement.pdf",
      type: "Agreement",
      uploadDate: new Date("2023-08-05"),
      status: "Valid",
      url: "/documents/community-agreement.pdf",
    },
    {
      id: "3-3",
      initiativeId: "3",
      name: "Digital Literacy Training Materials.pdf",
      type: "Training",
      uploadDate: new Date("2023-09-10"),
      status: "Valid",
      url: "/documents/digital-literacy-training-materials.pdf",
    },
  ],
  "4": [
    {
      id: "4-1",
      initiativeId: "4",
      name: "Youth Employment Initiative Proposal.pdf",
      type: "Proposal",
      uploadDate: new Date("2024-12-10"),
      status: "Pending",
      url: "/documents/youth-employment-initiative-proposal.pdf",
    },
  ],
}

// Initiative distribution data
export const initiativeDistributionData = {
  education: 30,
  healthcare: 38,
  technology: 24,
  skillsDevelopment: 8,
}

// Impact metrics data
export const socioEconomicImpactMetricsData = {
  beneficiariesReached: {
    overall: 5350,
    byInitiative: {
      "1": 250,
      "2": 5000,
      "3": 100,
      "4": 0, // Not started yet
    },
  },
  educationImprovement: {
    overall: 28,
    byInitiative: {
      "1": 28,
      "2": 0,
      "3": 0,
      "4": 0,
    },
  },
  healthcareAccess: {
    overall: 65,
    byInitiative: {
      "1": 0,
      "2": 65,
      "3": 0,
      "4": 0,
    },
  },
  digitalLiteracy: {
    overall: 45,
    byInitiative: {
      "1": 0,
      "2": 0,
      "3": 45,
      "4": 0,
    },
  },
  communityFeedback: {
    overall: 4.2, // Out of 5
    byInitiative: {
      "1": 4.5,
      "2": 4.3,
      "3": 3.8,
      "4": 0,
    },
  },
  sustainabilityScore: {
    overall: 72,
    byInitiative: {
      "1": 75,
      "2": 80,
      "3": 60,
      "4": 0,
    },
  },
}
