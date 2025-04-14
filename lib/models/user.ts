export interface User {
  id: string
  fullName: string
  email: string
  jobTitle: string
  phone: string
  profileImage?: string
  role: "admin" | "editor" | "viewer"
  createdAt: Date
  lastLogin: Date
}

export interface NotificationPreference {
  emailDocuments: boolean
  emailReports: boolean
  emailUpdates: boolean
  appDeadlines: boolean
  appScoreChanges: boolean
  appDocuments: boolean
}

export interface Session {
  id: string
  device: string
  location: string
  browser: string
  os: string
  isActive: boolean
  lastActive: Date
}

// Sample data
export const userData: User = {
  id: "1",
  fullName: "Thabo Mabena",
  email: "thabo.mabena@nectarsolutions.co.za",
  jobTitle: "Chief Compliance Officer",
  phone: "+27 82 123 4567",
  profileImage: "/profile-image.jpg",
  role: "admin",
  createdAt: new Date("2023-01-15"),
  lastLogin: new Date("2025-04-07"),
}

export const notificationPreferencesData: NotificationPreference = {
  emailDocuments: true,
  emailReports: true,
  emailUpdates: true,
  appDeadlines: true,
  appScoreChanges: true,
  appDocuments: true,
}

export const sessionsData: Session[] = [
  {
    id: "1",
    device: "Desktop",
    location: "Johannesburg, South Africa",
    browser: "Chrome",
    os: "Windows",
    isActive: true,
    lastActive: new Date("2025-04-07"),
  },
  {
    id: "2",
    device: "Mobile",
    location: "Johannesburg, South Africa",
    browser: "B-BBEE Nectar App",
    os: "iPhone",
    isActive: true,
    lastActive: new Date("2025-04-06"),
  },
]
