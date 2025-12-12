export interface Talent {
    id: string
    fullName: string
    phoneNumber: string
    state:string
    skillCategory: 'TECHNICAL' | 'NON_TECHNICAL'
    skills: string[]
    yearsExperience: number
    hourlyRate: number
    portfolioUrl?: string
    resumeUrl?: string
    bio?: string
    totalEarnings: number
    totalClients: number
    totalHours: number
    averageRating: number
    skillCheckPassed: boolean
}

export interface Client {
    id: string
    companyName: string
    country: string
    industry?: string
    budgetRangeMin?: number
    budgetRangeMax?: number
    totalProjects: number
    totalSpent: number
}

export interface Job {
    id: string
    title: string
    description: string
    requiredSkills: string[]
    hourlyRate: number
    estimatedHours?: number
    status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED'
    createdAt: string
    client: {
        name: string
        country: string
        companyName?: string
    }
}

export interface dashboardStats {
    totalEarnings?: number
    totalClients?: number
    totalHours?: number
    averageRating?: number
    totalProjects?: number
    totalSpent?: number
}