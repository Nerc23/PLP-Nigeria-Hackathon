import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Download,
  Eye,
  Star,
  CheckCircle,
  XCircle,
  MessageSquare
} from 'lucide-react';

export default function CandidateProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  // Mock candidate data - in real app, fetch by ID
  const candidate = {
    id: id || '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    program: 'PLP Software Development',
    appliedDate: '2025-01-15',
    status: 'Shortlisted',
    score: 92,
    avatar: null,
    
    // Personal Information
    dateOfBirth: '1995-03-15',
    gender: 'Female',
    nationality: 'Nigerian',
    
    // Education
    education: [
      {
        institution: 'University of Lagos',
        degree: 'Bachelor of Science in Computer Science',
        year: '2017',
        grade: 'First Class'
      },
      {
        institution: 'Lagos State Model College',
        degree: 'Senior Secondary Certificate',
        year: '2013',
        grade: 'Distinction'
      }
    ],
    
    // Experience
    experience: [
      {
        company: 'TechCorp Nigeria',
        position: 'Frontend Developer',
        duration: '2020 - Present',
        description: 'Developed responsive web applications using React and TypeScript. Led a team of 3 junior developers.'
      },
      {
        company: 'StartupHub Lagos',
        position: 'Junior Developer',
        duration: '2018 - 2020',
        description: 'Built web applications using HTML, CSS, JavaScript, and PHP. Collaborated with design team.'
      }
    ],
    
    // Skills
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'TypeScript'],
    
    // Documents
    documents: [
      {
        name: 'Resume.pdf',
        type: 'Resume',
        size: '245 KB',
        uploadDate: '2025-01-15'
      },
      {
        name: 'Portfolio.pdf',
        type: 'Portfolio',
        size: '1.2 MB',
        uploadDate: '2025-01-15'
      },
      {
        name: 'Certificates.pdf',
        type: 'Certificates',
        size: '890 KB',
        uploadDate: '2025-01-15'
      },
      {
        name: 'Transcript.pdf',
        type: 'Academic Transcript',
        size: '567 KB',
        uploadDate: '2025-01-15'
      }
    ],
    
    // Application Details
    motivation: `I am passionate about software development and have been coding for over 5 years. I believe the PLP Software Development program will help me advance my skills in modern web technologies and prepare me for leadership roles in tech. I am particularly interested in learning about cloud computing, DevOps practices, and advanced JavaScript frameworks. My goal is to become a full-stack developer who can contribute to building scalable and impactful software solutions.`,
    
    // Assessment
    strengths: ['Strong technical foundation', 'Leadership experience', 'Good communication skills', 'Problem-solving abilities'],
    improvements: ['Could benefit from more backend experience', 'Needs exposure to cloud technologies', 'Should develop project management skills'],
    
    // References
    references: [
      {
        name: 'John Adebayo',
        position: 'Senior Developer at TechCorp',
        email: 'john.adebayo@techcorp.ng',
        phone: '+234 802 123 4567'
      },
      {
        name: 'Mary Okafor',
        position: 'Project Manager at StartupHub',
        email: 'mary.okafor@startuphub.ng',
        phone: '+234 803 234 5678'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Shortlisted': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleDownloadDocument = (document: any) => {
    // In a real app, this would download the actual file
    alert(`Downloading ${document.name}...`);
  };

  const handleViewDocument = (document: any) => {
    // In a real app, this would open the document in a viewer
    alert(`Opening ${document.name} for viewing...`);
  };

  const handleStatusChange = (newStatus: string) => {
    alert(`Candidate status changed to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Candidate Profile</h1>
            <p className="text-gray-600">Detailed view of candidate information and documents</p>
          </div>
        </div>

        {/* Candidate Header */}
        <Card className="enhanced-card mb-8">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{candidate.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {candidate.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {candidate.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Applied: {candidate.appliedDate}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                    <div className={`px-3 py-1 rounded-full text-lg font-bold ${getScoreColor(candidate.score)}`}>
                      Score: {candidate.score}/100
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Send Message
                </Button>
                <select
                  value={candidate.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="enhanced-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Date of Birth</p>
                      <p className="text-gray-900">{candidate.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Gender</p>
                      <p className="text-gray-900">{candidate.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Nationality</p>
                      <p className="text-gray-900">{candidate.nationality}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Program</p>
                      <p className="text-gray-900">{candidate.program}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="enhanced-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Motivation Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{candidate.motivation}</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Educational Background
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {candidate.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>Year: {edu.year}</span>
                        <span>Grade: {edu.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>References</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.references.map((ref, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-900">{ref.name}</h4>
                      <p className="text-sm text-gray-600">{ref.position}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>{ref.email}</p>
                        <p>{ref.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Uploaded Documents
                </CardTitle>
                <CardDescription>
                  View and download candidate's submitted documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.documents.map((doc, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-600">{doc.type}</p>
                        </div>
                        <Badge variant="outline">{doc.size}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">Uploaded: {doc.uploadDate}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDocument(doc)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(doc)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessment Tab */}
          <TabsContent value="assessment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="enhanced-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {candidate.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="enhanced-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-orange-600" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {candidate.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <span className="text-gray-700">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Overall Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Technical Skills</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Communication</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Problem Solving</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Leadership Potential</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}