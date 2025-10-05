// Common types used across the application

export interface User {
    id: string | number
    name: string
    image?: string
    initials?: string
}

export interface Task {
    id: number
    title: string
    description: string
    status: "backlog" | "in-progress" | "completed"
    priority: "High" | "Medium" | "Low"
    assignedTo: string
    deadline: string
    linkedDocs?: Array<string>
    users: Array<User>
}

export interface Project {
    id: number
    title: string
    status: "Active" | "Completed" | "On-Hold"
    deadline?: string
    budget?: string
    contractor?: string
    warning?: string | null
    users?: Array<User>
    tasks: Array<Task>
    dockets?: Array<Docket>
}

export interface Docket {
    id: number
    name: string
    status: "Active" | "On-hold" | "Completed" | "active" | "completed"
    projects: Array<DocketProject>
}

export interface ChatMessage {
    message: string
    createdAt: string
}

export interface ChatResponse {
    response: string
    createdAt: string
}

export type MessagePair = [ChatMessage, ChatResponse]

export type SelectedModel = "OpenAI 04" | "Deepseek-R1"

export interface Chat {
    id: string
    name: string
    messages: Array<MessagePair>
    selectedModel?: SelectedModel
}

// Project Management Types
export interface ProjectCategory {
    id: number
    name: string
    projects: Array<Project>
}

// Docket Types
export interface Invoice {
    id: string
    number: string
    date: string
    amount: number
    status: "Active" | "Paid"
    fileUploaded: string
}

export interface DocketProject {
    id: number
    name: string
    status: "In-Progress" | "On-Hold" | "Active"
    contractor: string
    deadline: string
    budget: string
    budgetConsumed: number
    progress: number
    filingCapacity: number
    invoices: Array<Invoice>
}

// Directory Types
export interface Employee {
    id: number
    name: string
    email: string
    phone: string
    status: "Active" | "In-Active" | "On-hold"
    dateAdded: string
    lastActive: string
    avatar?: string
}

export interface Contractor {
    id: number
    name: string
    email: string
    phone: string
    projectCount: number
    type: "Electronics" | "Construction" | "Labor" | "Steel Work" | "Wood Work"
    status: "Active" | "In-Active" | "On-hold"
    dateAdded: string
    lastActive: string
    avatar?: string
}

export interface Team {
    id: number
    name: string
    email: string
    memberCount: number
    department:
        | "Electronics"
        | "Construction"
        | "Labor"
        | "Steel Work"
        | "Wood Work"
    status: "Active" | "In-Active" | "On-hold"
    dateAdded: string
    initials: string
}

export interface Vendor {
    id: number
    name: string
    email: string
    productType:
        | "Electronics"
        | "Construction"
        | "Labor"
        | "Steel Work"
        | "Wood Work"
    status: "Active" | "In-Active" | "On-hold"
    dateAdded: string
    initials: string
}

export interface Equipment {
    id: number
    name: string
    equipmentType: "Construction"
    dateSelected: string
}

export interface Location {
    id: number
    name: string
    address: string
    phone: string
    dateAdded: string
}

// Admin Types
export interface AdminUser {
    id: number
    name: string
    email: string
    role: string
    description: string
    dateAdded: string
    lastLogin: string
}

export interface Manager {
    id: number
    name: string
    email: string
    phone: string
    status: string
    dateAdded: string
}

export interface SubManager {
    id: number
    name: string
    email: string
    phone: string
    status: string
    dateAdded: string
}

export interface Auditor {
    id: number
    name: string
    email: string
    phone: string
    status: string
    dateAdded: string
}

export interface Role {
    id: number
    name: string
    description: string
    dateAdded: string
    userCount: number
}

export interface Notification {
    id: number
    name: string
    message: string
    time: string
    isUnread: boolean
    avatar: string
}

// Status types
export type ProjectStatus = "Active" | "Completed" | "On-Hold"
export type TaskPriority = "High" | "Medium" | "Low"
export type TaskStatus = "todo" | "in-progress" | "completed"
