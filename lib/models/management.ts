import type { Race, Gender, VerificationStatus } from "./index"

export interface BoardMember {
  id: string
  name: string
  position: string
  race: Race
  gender: Gender
  votingRights: number
  status: VerificationStatus
}

export interface Executive {
  id: string
  name: string
  position: string
  race: Race
  gender: Gender
  yearsOfService: number
  status: VerificationStatus
}

export interface ManagementScore {
  current: number
  total: number
  blackExecutives: number
  blackBoardMembers: number
}

// Sample data
export const managementScoreData: ManagementScore = {
  current: 15,
  total: 20,
  blackExecutives: 60,
  blackBoardMembers: 55,
}

export const boardMembersData: BoardMember[] = [
  {
    id: "1",
    name: "Thabo Mabena",
    position: "Chairperson",
    race: "Black",
    gender: "Male",
    votingRights: 20,
    status: "Verified",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "Non-Executive Director",
    race: "White",
    gender: "Female",
    votingRights: 15,
    status: "Verified",
  },
  {
    id: "3",
    name: "Nomsa Dlamini",
    position: "Non-Executive Director",
    race: "Black",
    gender: "Female",
    votingRights: 15,
    status: "Verified",
  },
  {
    id: "4",
    name: "Michael van der Merwe",
    position: "Non-Executive Director",
    race: "White",
    gender: "Male",
    votingRights: 15,
    status: "Verified",
  },
  {
    id: "5",
    name: "Lerato Moloi",
    position: "Non-Executive Director",
    race: "Black",
    gender: "Female",
    votingRights: 15,
    status: "Pending",
  },
  {
    id: "6",
    name: "Rajesh Patel",
    position: "Non-Executive Director",
    race: "Indian",
    gender: "Male",
    votingRights: 10,
    status: "Verified",
  },
  {
    id: "7",
    name: "David Nkosi",
    position: "Non-Executive Director",
    race: "Black",
    gender: "Male",
    votingRights: 10,
    status: "Verified",
  },
]

export const executivesData: Executive[] = [
  {
    id: "1",
    name: "Sipho Ndlovu",
    position: "Chief Executive Officer",
    race: "Black",
    gender: "Male",
    yearsOfService: 5,
    status: "Verified",
  },
  {
    id: "2",
    name: "Jessica Smith",
    position: "Chief Financial Officer",
    race: "White",
    gender: "Female",
    yearsOfService: 3,
    status: "Verified",
  },
  {
    id: "3",
    name: "Themba Khumalo",
    position: "Chief Operations Officer",
    race: "Black",
    gender: "Male",
    yearsOfService: 4,
    status: "Verified",
  },
  {
    id: "4",
    name: "Priya Naidoo",
    position: "Chief Technology Officer",
    race: "Indian",
    gender: "Female",
    yearsOfService: 2,
    status: "Verified",
  },
  {
    id: "5",
    name: "John Williams",
    position: "Chief Marketing Officer",
    race: "White",
    gender: "Male",
    yearsOfService: 3,
    status: "Verified",
  },
  {
    id: "6",
    name: "Nomfundo Mthembu",
    position: "Head of Human Resources",
    race: "Black",
    gender: "Female",
    yearsOfService: 4,
    status: "Pending",
  },
  {
    id: "7",
    name: "Trevor Davids",
    position: "Head of Legal",
    race: "Coloured",
    gender: "Male",
    yearsOfService: 2,
    status: "Verified",
  },
]

// Board demographics data
export const boardDemographicsData = {
  race: {
    black: 55,
    white: 30,
    indian: 10,
    coloured: 5,
  },
  gender: {
    male: 60,
    female: 40,
  },
}

// Executive demographics data
export const executiveDemographicsData = {
  race: {
    black: 45,
    white: 30,
    indian: 15,
    coloured: 10,
  },
  gender: {
    male: 60,
    female: 40,
  },
}

// Impact metrics data
export const managementImpactMetricsData = {
  boardEffectiveness: {
    overall: 82,
    categories: {
      strategicDirection: 85,
      riskManagement: 80,
      governance: 88,
      stakeholderEngagement: 75,
    },
  },
  executivePerformance: {
    overall: 78,
    categories: {
      leadershipEffectiveness: 80,
      strategicExecution: 75,
      teamDevelopment: 82,
      innovationCulture: 76,
    },
  },
  transformationProgress: {
    overall: 68,
    categories: {
      blackRepresentation: 72,
      genderDiversity: 65,
      skillsDevelopment: 70,
      successionPlanning: 65,
    },
  },
  governanceCompliance: {
    overall: 92,
    categories: {
      regulatoryCompliance: 95,
      ethicsManagement: 90,
      transparencyReporting: 92,
      riskMitigation: 90,
    },
  },
}
