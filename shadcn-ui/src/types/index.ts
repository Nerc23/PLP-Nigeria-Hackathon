export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student';
  profileComplete: boolean;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  education: string;
  skills: string[];
  experience: string;
  bio: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  updatedAt: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  criteria: string;
  maxApplicants: number;
  deadline: string;
  createdBy: string;
  category?: string;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt?: string;
  updatedAt?: string;
}

export interface Application {
  id: string;
  userId: string;
  programId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  score?: number;
  submittedAt: string;
  documents: UploadedDocument[];
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface RankingResult {
  userId: string;
  userProfile: UserProfile;
  score: number;
  matchingSkills: string[];
  reasoning: string;
  rank: number;
  selected?: boolean;
}

export interface AnalyticsData {
  totalApplicants: number;
  totalPrograms: number;
  acceptanceRate: number;
  averageScore: number;
  topSkills: { skill: string; count: number }[];
  applicationTrends: { month: string; applications: number }[];
  scoreDistribution: { range: string; count: number }[];
}
