export interface Company {
  id: string
  name: string
  registrationNumber: string
  industry: string
  financialYearEnd: string
  sectorCode:
    | "generic"
    | "ict"
    | "construction"
    | "financial"
    | "tourism"
    | "transport"
    | "property"
    | "forestry"
    | "agriculture"
    | "mining"
  turnoverClassification: "eme" | "qse" | "generic"
  address: string
  website: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
  createdAt: Date
  updatedAt: Date
}

export interface VerificationDetails {
  lastVerificationDate: Date
  certificateExpiryDate: Date
  verificationAgency: string
  verificationAgencyContact: string
  reminderDays: number
  autoReminders: boolean
}

export interface DocumentTemplate {
  id: string
  name: string
  description: string
  category: "Ownership" | "Management" | "Skills" | "Enterprise" | "SED"
  url: string
}

// Sample data
export const companyData: Company = {
  id: "1",
  name: "Nectar Solutions (Pty) Ltd",
  registrationNumber: "2018/123456/07",
  industry: "ict",
  financialYearEnd: "2025-02",
  sectorCode: "ict",
  turnoverClassification: "qse",
  address: "123 Main Street, Sandton, Johannesburg",
  website: "https://www.nectarsolutions.co.za",
  contactPerson: "Thabo Mabena",
  contactEmail: "thabo.mabena@nectarsolutions.co.za",
  contactPhone: "+27 82 123 4567",
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date("2025-03-10"),
}

export const verificationDetailsData: VerificationDetails = {
  lastVerificationDate: new Date("2024-06-15"),
  certificateExpiryDate: new Date("2025-06-14"),
  verificationAgency: "BEE Verification Solutions",
  verificationAgencyContact: "contact@beeverification.co.za",
  reminderDays: 90,
  autoReminders: true,
}

export const documentTemplatesData: DocumentTemplate[] = [
  {
    id: "1",
    name: "Ownership Declaration Template",
    description: "Standard template for ownership declarations",
    category: "Ownership",
    url: "/templates/ownership-declaration.docx",
  },
  {
    id: "2",
    name: "Skills Development Report Template",
    description: "Standard template for skills development reporting",
    category: "Skills",
    url: "/templates/skills-development-report.xlsx",
  },
  {
    id: "3",
    name: "Enterprise Development Proof Template",
    description: "Standard template for enterprise development evidence",
    category: "Enterprise",
    url: "/templates/enterprise-development-proof.docx",
  },
]
