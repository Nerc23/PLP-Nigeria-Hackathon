AI-Driven Applicant Selection Tool - MVP Implementation Plan
Core Features to Implement:
Authentication System - Sign up/Sign in functionality
Role-based Dashboards - Admin and Student/Graduate dashboards
User Profiles - Editable profiles for both user types
Document Upload - Support for PDF, DOCS, CSV, etc.
AI Candidate Ranking - Core selection algorithm
Responsive Design - All features functional and responsive
Files to Create/Modify:
1. Authentication & Routing
src/contexts/AuthContext.tsx - Authentication state management
src/components/auth/SignIn.tsx - Sign in form
src/components/auth/SignUp.tsx - Sign up form
src/pages/Dashboard.tsx - Main dashboard router
src/pages/AdminDashboard.tsx - Admin-specific dashboard
src/pages/StudentDashboard.tsx - Student/Graduate dashboard
2. Core Components
src/components/profile/ProfileEditor.tsx - Editable user profiles
src/components/upload/DocumentUpload.tsx - File upload component
src/components/ranking/CandidateRanking.tsx - AI ranking display
src/components/layout/Navbar.tsx - Navigation component
3. Data & Utils
src/lib/mockData.ts - Synthetic applicant data
src/lib/aiRanking.ts - AI ranking algorithm
src/types/index.ts - TypeScript interfaces
4. Updated Files
src/App.tsx - Updated routing with authentication
src/pages/Index.tsx - Landing page with auth options
index.html - Updated title and meta tags
Implementation Priority:
Authentication system and routing
Basic dashboards and navigation
Profile management
Document upload functionality
AI ranking algorithm
UI polish and responsiveness
Technical Approach:
Use React Context for authentication state
localStorage for data persistence (since Supabase not enabled)
File API for document uploads
Simple scoring algorithm for AI ranking
Responsive design with Tailwind CSS
