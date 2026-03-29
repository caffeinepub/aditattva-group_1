import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    role: string;
    quote: string;
    author: string;
    company: string;
}
export type Time = bigint;
export interface ContactSubmission {
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface TeamMember {
    bio: string;
    name: string;
    role: string;
}
export interface Service {
    title: string;
    description: string;
    iconName: string;
}
export interface Project {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
}
export interface CompanyStats {
    employees: bigint;
    projects: bigint;
    offices: bigint;
    years: bigint;
}
export interface backendInterface {
    getAllContactFormSubmissions(): Promise<Array<ContactSubmission>>;
    getCompanyStats(): Promise<CompanyStats>;
    getProjects(): Promise<Array<Project>>;
    getServices(): Promise<Array<Service>>;
    getTeamMembers(): Promise<Array<TeamMember>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    submitContactForm(name: string, email: string, subject: string, message: string): Promise<void>;
}
