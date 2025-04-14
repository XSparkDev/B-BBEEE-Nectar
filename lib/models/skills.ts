export interface TrainingProgram {
  id: string
  name: string
  type: "Management Training" | "Technical Training" | "Internship" | "Short Course"
  participants: number
  duration: string
  budget: number
  status: "In Progress" | "Completed" | "Planned"
  startDate: Date
  endDate: Date
}

export interface ProgramAttendee {
  id: string
  programId: string
  name: string
  position: string
  company: string
  race: "Black" | "White" | "Coloured" | "Indian"
  gender: "Male" | "Female"
  contactEmail: string
  completionStatus: "Enrolled" | "In Progress" | "Completed" | "Dropped Out"
}

export interface ProgramSpendItem {
  id: string
  programId: string
  description: string
  amount: number
  date: Date
  category: "Training" | "Materials" | "Facilities" | "Equipment" | "Other"
}

export interface ProgramDocument {
  id: string
  programId: string
  name: string
  type: string
  uploadDate: Date
  status: "Valid" | "Pending" | "Invalid"
  url: string
}

export interface SkillsScore {
  current: number
  total: number
  annualBudget: number
}

// Sample data
export const skillsScoreData: SkillsScore = {
  current: 18,
  total: 25,
  annualBudget: 3500000,
}

export const trainingProgramsData: TrainingProgram[] = [
  {
    id: "1",
    name: "Leadership Development Program",
    type: "Management Training",
    participants: 15,
    duration: "6 months",
    budget: 750000,
    status: "In Progress",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-08-01"),
  },
  {
    id: "2",
    name: "Software Development Bootcamp",
    type: "Technical Training",
    participants: 20,
    duration: "3 months",
    budget: 500000,
    status: "In Progress",
    startDate: new Date("2024-03-15"),
    endDate: new Date("2024-06-15"),
  },
  {
    id: "3",
    name: "Graduate Internship Program",
    type: "Internship",
    participants: 10,
    duration: "12 months",
    budget: 1200000,
    status: "In Progress",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2025-01-15"),
  },
  {
    id: "4",
    name: "Project Management Fundamentals",
    type: "Short Course",
    participants: 25,
    duration: "2 weeks",
    budget: 150000,
    status: "Planned",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-07-15"),
  },
]

export const programAttendeesData: Record<string, ProgramAttendee[]> = {
  "1": [
    {
      id: "1-1",
      programId: "1",
      name: "Thabo Mabena",
      position: "Team Lead",
      company: "Internal",
      race: "Black",
      gender: "Male",
      contactEmail: "thabo.m@company.co.za",
      completionStatus: "In Progress",
    },
    {
      id: "1-2",
      programId: "1",
      name: "Sarah Johnson",
      position: "Project Manager",
      company: "Internal",
      race: "White",
      gender: "Female",
      contactEmail: "sarah.j@company.co.za",
      completionStatus: "In Progress",
    },
    {
      id: "1-3",
      programId: "1",
      name: "Nomsa Dlamini",
      position: "Department Head",
      company: "Internal",
      race: "Black",
      gender: "Female",
      contactEmail: "nomsa.d@company.co.za",
      completionStatus: "In Progress",
    },
  ],
  "2": [
    {
      id: "2-1",
      programId: "2",
      name: "John Smith",
      position: "Junior Developer",
      company: "Internal",
      race: "White",
      gender: "Male",
      contactEmail: "john.s@company.co.za",
      completionStatus: "In Progress",
    },
    {
      id: "2-2",
      programId: "2",
      name: "Lerato Moloi",
      position: "Junior Developer",
      company: "Internal",
      race: "Black",
      gender: "Female",
      contactEmail: "lerato.m@company.co.za",
      completionStatus: "In Progress",
    },
    {
      id: "2-3",
      programId: "2",
      name: "Sipho Ndlovu",
      position: "IT Support",
      company: "Internal",
      race: "Black",
      gender: "Male",
      contactEmail: "sipho.n@company.co.za",
      completionStatus: "In Progress",
    },
  ],
  "3": [
    {
      id: "3-1",
      programId: "3",
      name: "Precious Nkosi",
      position: "Graduate Intern",
      company: "External - University of Pretoria",
      race: "Black",
      gender: "Female",
      contactEmail: "precious.n@gmail.com",
      completionStatus: "In Progress",
    },
    {
      id: "3-2",
      programId: "3",
      name: "David Moyo",
      position: "Graduate Intern",
      company: "External - University of Cape Town",
      race: "Black",
      gender: "Male",
      contactEmail: "david.m@gmail.com",
      completionStatus: "In Progress",
    },
    {
      id: "3-3",
      programId: "3",
      name: "Jessica Pillay",
      position: "Graduate Intern",
      company: "External - University of Johannesburg",
      race: "Indian",
      gender: "Female",
      contactEmail: "jessica.p@gmail.com",
      completionStatus: "In Progress",
    },
  ],
}

export const programSpendItemsData: Record<string, ProgramSpendItem[]> = {
  "1": [
    {
      id: "1-1",
      programId: "1",
      description: "External Facilitator Fees",
      amount: 200000,
      date: new Date("2024-02-15"),
      category: "Training",
    },
    {
      id: "1-2",
      programId: "1",
      description: "Training Materials",
      amount: 50000,
      date: new Date("2024-02-10"),
      category: "Materials",
    },
    {
      id: "1-3",
      programId: "1",
      description: "Venue Rental",
      amount: 100000,
      date: new Date("2024-02-05"),
      category: "Facilities",
    },
  ],
  "2": [
    {
      id: "2-1",
      programId: "2",
      description: "Instructor Fees",
      amount: 150000,
      date: new Date("2024-03-20"),
      category: "Training",
    },
    {
      id: "2-2",
      programId: "2",
      description: "Development Equipment",
      amount: 120000,
      date: new Date("2024-03-18"),
      category: "Equipment",
    },
    {
      id: "2-3",
      programId: "2",
      description: "Software Licenses",
      amount: 80000,
      date: new Date("2024-03-16"),
      category: "Materials",
    },
  ],
  "3": [
    {
      id: "3-1",
      programId: "3",
      description: "Stipends - Month 1",
      amount: 100000,
      date: new Date("2024-01-31"),
      category: "Other",
    },
    {
      id: "3-2",
      programId: "3",
      description: "Stipends - Month 2",
      amount: 100000,
      date: new Date("2024-02-29"),
      category: "Other",
    },
    {
      id: "3-3",
      programId: "3",
      description: "Stipends - Month 3",
      amount: 100000,
      date: new Date("2024-03-31"),
      category: "Other",
    },
    {
      id: "3-4",
      programId: "3",
      description: "Training Materials",
      amount: 50000,
      date: new Date("2024-01-20"),
      category: "Materials",
    },
  ],
}

export const programDocumentsData: Record<string, ProgramDocument[]> = {
  "1": [
    {
      id: "1-1",
      programId: "1",
      name: "Leadership Program Curriculum.pdf",
      type: "Curriculum",
      uploadDate: new Date("2024-01-15"),
      status: "Valid",
      url: "/documents/leadership-program-curriculum.pdf",
    },
    {
      id: "1-2",
      programId: "1",
      name: "Facilitator Agreement.pdf",
      type: "Agreement",
      uploadDate: new Date("2024-01-20"),
      status: "Valid",
      url: "/documents/facilitator-agreement.pdf",
    },
    {
      id: "1-3",
      programId: "1",
      name: "Attendance Register - Module 1.pdf",
      type: "Attendance",
      uploadDate: new Date("2024-02-20"),
      status: "Valid",
      url: "/documents/attendance-register-module-1.pdf",
    },
  ],
  "2": [
    {
      id: "2-1",
      programId: "2",
      name: "Software Development Bootcamp Outline.pdf",
      type: "Curriculum",
      uploadDate: new Date("2024-03-10"),
      status: "Valid",
      url: "/documents/software-development-bootcamp-outline.pdf",
    },
    {
      id: "2-2",
      programId: "2",
      name: "Equipment Purchase Invoice.pdf",
      type: "Invoice",
      uploadDate: new Date("2024-03-18"),
      status: "Valid",
      url: "/documents/equipment-purchase-invoice.pdf",
    },
  ],
  "3": [
    {
      id: "3-1",
      programId: "3",
      name: "Internship Program Framework.pdf",
      type: "Framework",
      uploadDate: new Date("2024-01-10"),
      status: "Valid",
      url: "/documents/internship-program-framework.pdf",
    },
    {
      id: "3-2",
      programId: "3",
      name: "Intern Contracts.pdf",
      type: "Contracts",
      uploadDate: new Date("2024-01-15"),
      status: "Valid",
      url: "/documents/intern-contracts.pdf",
    },
    {
      id: "3-3",
      programId: "3",
      name: "Month 1 Progress Report.pdf",
      type: "Report",
      uploadDate: new Date("2024-02-15"),
      status: "Valid",
      url: "/documents/month-1-progress-report.pdf",
    },
    {
      id: "3-4",
      programId: "3",
      name: "Month 2 Progress Report.pdf",
      type: "Report",
      uploadDate: new Date("2024-03-15"),
      status: "Valid",
      url: "/documents/month-2-progress-report.pdf",
    },
  ],
}

// Learner demographics data
export const learnerDemographicsData = {
  race: {
    black: 65,
    white: 15,
    coloured: 10,
    indian: 10,
  },
  gender: {
    male: 55,
    female: 45,
  },
}

// Impact metrics data
export const skillsImpactMetricsData = {
  completionRate: {
    overall: 87,
    byProgram: {
      "1": 92,
      "2": 85,
      "3": 90,
      "4": 0, // Not started yet
    },
  },
  employmentRate: {
    overall: 78,
    byProgram: {
      "1": 100, // Internal employees
      "2": 100, // Internal employees
      "3": 65, // Interns
      "4": 0, // Not started yet
    },
  },
  skillsImprovement: {
    overall: 42,
    byProgram: {
      "1": 38,
      "2": 55,
      "3": 40,
      "4": 0, // Not started yet
    },
  },
  promotionRate: {
    overall: 25,
    byProgram: {
      "1": 40,
      "2": 15,
      "3": 0,
      "4": 0, // Not started yet
    },
  },
  returnOnInvestment: {
    overall: 3.2,
    byProgram: {
      "1": 3.5,
      "2": 4.1,
      "3": 2.8,
      "4": 0, // Not started yet
    },
  },
}
