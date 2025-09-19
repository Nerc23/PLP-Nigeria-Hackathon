import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  Users, 
  BarChart3, 
  Award, 
  TrendingUp,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Plus,
  Settings,
  Bell,
  Calendar,
  MapPin,
  Upload,
  FileText,
  Loader2
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadingDataset, setUploadingDataset] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  // Mock data for recent applications
  const recentApplications = [
    {
      id: '1',
      name: 'Sarah Johnson',
      program: 'PLP Software Development',
      appliedDate: '2025-01-15',
      status: 'Pending',
      score: 92
    },
    {
      id: '2',
      name: 'Michael Chen',
      program: 'LSETF Data Analytics',
      appliedDate: '2025-01-14',
      status: 'Under Review',
      score: 88
    },
    {
      id: '3',
      name: 'Emily Davis',
      program: 'PLP UI/UX Design',
      appliedDate: '2025-01-13',
      status: 'Shortlisted',
      score: 95
    },
    {
      id: '4',
      name: 'James Wilson',
      program: 'LSETF Digital Marketing',
      appliedDate: '2025-01-12',
      status: 'Accepted',
      score: 87
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      program: 'PLP Cybersecurity',
      appliedDate: '2025-01-11',
      status: 'Pending',
      score: 79
    }
  ];

  // Comprehensive list of all programs from PLP Africa and LSETF
  const allPrograms = [
    // PLP Africa Programs
    {
      id: '1',
      name: 'Software Development Cohort 6',
      organization: 'PLP Africa',
      duration: '6 months',
      applications: 156,
      accepted: 45,
      status: 'Active',
      deadline: '2025-02-15',
      description: 'Full-stack web development program covering JavaScript, React, Node.js, and databases',
      location: 'Online & Lagos Hub',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git']
    },
    {
      id: '2',
      name: 'UI/UX Design Track',
      organization: 'PLP Africa',
      duration: '5 months',
      applications: 72,
      accepted: 22,
      status: 'Active',
      deadline: '2025-02-20',
      description: 'Comprehensive design program covering user research, prototyping, and design systems',
      location: 'Online & Abuja Hub',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems']
    },
    {
      id: '3',
      name: 'Cybersecurity Fundamentals',
      organization: 'PLP Africa',
      duration: '4 months',
      applications: 43,
      accepted: 15,
      status: 'Active',
      deadline: '2025-03-01',
      description: 'Essential cybersecurity skills including network security, ethical hacking, and compliance',
      location: 'Online',
      skills: ['Network Security', 'Ethical Hacking', 'Compliance', 'Risk Assessment']
    },
    {
      id: '4',
      name: 'Mobile App Development',
      organization: 'PLP Africa',
      duration: '6 months',
      applications: 67,
      accepted: 20,
      status: 'Active',
      deadline: '2025-03-10',
      description: 'Cross-platform mobile development using React Native and Flutter',
      location: 'Online & Port Harcourt Hub',
      skills: ['React Native', 'Flutter', 'Mobile UI/UX', 'App Store Deployment']
    },
    {
      id: '5',
      name: 'Data Science & Analytics',
      organization: 'PLP Africa',
      duration: '5 months',
      applications: 84,
      accepted: 28,
      status: 'Active',
      deadline: '2025-02-28',
      description: 'Python-based data science program covering machine learning and data visualization',
      location: 'Online & Kano Hub',
      skills: ['Python', 'Machine Learning', 'Data Visualization', 'Statistics', 'Pandas']
    },
    {
      id: '6',
      name: 'DevOps Engineering',
      organization: 'PLP Africa',
      duration: '4 months',
      applications: 39,
      accepted: 14,
      status: 'Opening Soon',
      deadline: '2025-03-20',
      description: 'Cloud infrastructure, CI/CD pipelines, and containerization with Docker and Kubernetes',
      location: 'Online',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Infrastructure as Code']
    },
    {
      id: '7',
      name: 'Blockchain Development',
      organization: 'PLP Africa',
      duration: '5 months',
      applications: 52,
      accepted: 18,
      status: 'Active',
      deadline: '2025-03-05',
      description: 'Smart contract development and blockchain application building',
      location: 'Online',
      skills: ['Solidity', 'Web3.js', 'Smart Contracts', 'DeFi', 'NFTs']
    },
    {
      id: '8',
      name: 'AI/Machine Learning',
      organization: 'PLP Africa',
      duration: '6 months',
      applications: 91,
      accepted: 30,
      status: 'Active',
      deadline: '2025-02-12',
      description: 'Advanced AI and machine learning with deep learning frameworks',
      location: 'Online & Lagos Hub',
      skills: ['TensorFlow', 'PyTorch', 'Deep Learning', 'Computer Vision', 'NLP']
    },
    
    // LSETF Programs
    {
      id: '9',
      name: 'Data Analytics Specialist',
      organization: 'LSETF',
      duration: '4 months',
      applications: 89,
      accepted: 28,
      status: 'Active',
      deadline: '2025-02-10',
      description: 'Business intelligence and data analytics using SQL, Tableau, and Power BI',
      location: 'Lagos Training Centers',
      skills: ['SQL', 'Tableau', 'Power BI', 'Excel', 'Business Intelligence']
    },
    {
      id: '10',
      name: 'Digital Marketing Professional',
      organization: 'LSETF',
      duration: '3 months',
      applications: 64,
      accepted: 18,
      status: 'Active',
      deadline: '2025-02-25',
      description: 'Comprehensive digital marketing including SEO, social media, and Google Ads',
      location: 'Lagos & Ikeja Centers',
      skills: ['SEO', 'Social Media Marketing', 'Google Ads', 'Content Marketing', 'Analytics']
    },
    {
      id: '11',
      name: 'Business Analytics',
      organization: 'LSETF',
      duration: '5 months',
      applications: 38,
      accepted: 12,
      status: 'Active',
      deadline: '2025-03-05',
      description: 'Advanced business analytics and strategic decision-making tools',
      location: 'Victoria Island Center',
      skills: ['Business Intelligence', 'Strategic Analysis', 'KPI Development', 'Reporting']
    },
    {
      id: '12',
      name: 'Project Management Professional',
      organization: 'LSETF',
      duration: '3 months',
      applications: 54,
      accepted: 16,
      status: 'Active',
      deadline: '2025-03-15',
      description: 'PMP certification preparation and project management methodologies',
      location: 'Yaba Training Center',
      skills: ['PMP', 'Agile', 'Scrum', 'Risk Management', 'Project Planning']
    },
    {
      id: '13',
      name: 'Financial Technology (FinTech)',
      organization: 'LSETF',
      duration: '4 months',
      applications: 76,
      accepted: 24,
      status: 'Active',
      deadline: '2025-02-18',
      description: 'Financial services technology, blockchain, and payment systems',
      location: 'Lagos Island Center',
      skills: ['FinTech', 'Payment Systems', 'Blockchain', 'Financial Modeling', 'Compliance']
    },
    {
      id: '14',
      name: 'E-commerce Management',
      organization: 'LSETF',
      duration: '3 months',
      applications: 45,
      accepted: 15,
      status: 'Opening Soon',
      deadline: '2025-03-25',
      description: 'Online business management, marketplace optimization, and logistics',
      location: 'Surulere Training Center',
      skills: ['E-commerce', 'Marketplace Management', 'Logistics', 'Customer Service', 'Analytics']
    },
    {
      id: '15',
      name: 'Cloud Computing Specialist',
      organization: 'LSETF',
      duration: '4 months',
      applications: 63,
      accepted: 20,
      status: 'Active',
      deadline: '2025-02-22',
      description: 'AWS, Azure, and Google Cloud platform administration and architecture',
      location: 'Lagos Training Centers',
      skills: ['AWS', 'Azure', 'Google Cloud', 'Cloud Architecture', 'Security']
    },
    {
      id: '16',
      name: 'Software Quality Assurance',
      organization: 'LSETF',
      duration: '3 months',
      applications: 41,
      accepted: 14,
      status: 'Active',
      deadline: '2025-03-08',
      description: 'Manual and automated testing methodologies for software quality assurance',
      location: 'Ikeja Training Center',
      skills: ['Manual Testing', 'Automation Testing', 'Selenium', 'Test Planning', 'Bug Tracking']
    }
  ];

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

  const getProgramStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Opening Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewCandidateProfile = (candidateId: string) => {
    navigate(`/candidate-profile/${candidateId}`);
  };

  const handleExportReports = () => {
    const reportData = {
      totalApplications: allPrograms.reduce((sum, prog) => sum + prog.applications, 0),
      totalAccepted: allPrograms.reduce((sum, prog) => sum + prog.accepted, 0),
      programs: allPrograms.length,
      recentApplications: recentApplications.length,
      generatedAt: new Date().toISOString()
    };

    const csvContent = [
      ['Admin Dashboard Report'],
      ['Generated:', new Date().toLocaleString()],
      [''],
      ['Summary Statistics'],
      ['Total Applications', reportData.totalApplications],
      ['Total Accepted', reportData.totalAccepted],
      ['Active Programs', allPrograms.filter(p => p.status === 'Active').length],
      ['Recent Applications', reportData.recentApplications],
      [''],
      ['Recent Applications'],
      ['Name', 'Program', 'Status', 'Score', 'Applied Date'],
      ...recentApplications.map(app => [app.name, app.program, app.status, app.score, app.appliedDate]),
      [''],
      ['All Programs'],
      ['Program', 'Organization', 'Applications', 'Accepted', 'Status', 'Deadline', 'Duration', 'Location'],
      ...allPrograms.map(prog => [prog.name, prog.organization, prog.applications, prog.accepted, prog.status, prog.deadline, prog.duration, prog.location])
    ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin_dashboard_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert('Dashboard report exported successfully!');
  };

  const handleDatasetUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid file type: PDF, DOC, DOCX, CSV, XLS, XLSX, JPG, PNG');
      return;
    }

    setUploadingDataset(true);
    setUploadProgress(0);

    // Simulate processing 100 sample applicant profiles
    const totalProfiles = 100;
    const processingTime = 30000; // 30 seconds
    const intervalTime = processingTime / totalProfiles;

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= totalProfiles) {
          clearInterval(interval);
          // Generate ranked list with accuracy scores
          setTimeout(() => {
            setUploadingDataset(false);
            setUploadDialogOpen(false);
            alert(`Dataset processed successfully! 
            
✅ Processed: ${totalProfiles} applicant profiles
⏱️ Processing time: 30 seconds
🎯 Generated ranked list with accuracy scores
📊 Average accuracy score: 94.2%

The AI ranking system has analyzed all profiles and generated personalized recommendations based on candidate scores and skill gaps.`);
            
            // Navigate to AI ranking page to show results
            navigate('/ai-ranking');
          }, 1000);
          return totalProfiles;
        }
        return prev + 1;
      });
    }, intervalTime);
  };

  // Separate programs by organization for better display
  const plpPrograms = allPrograms.filter(p => p.organization === 'PLP Africa');
  const lsetfPrograms = allPrograms.filter(p => p.organization === 'LSETF');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}. Manage your programs and candidates.</p>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Dataset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Applicant Dataset</DialogTitle>
                  <DialogDescription>
                    Upload a dataset of applications to process and generate AI rankings. 
                    Supports PDF, DOC, DOCX, CSV, XLS, XLSX, JPG, PNG files.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {uploadingDataset ? (
                    <div className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                      <p className="text-lg font-semibold">Processing Dataset...</p>
                      <p className="text-sm text-gray-600 mb-4">
                        Processing {uploadProgress}/100 applicant profiles
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(uploadProgress / 100) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        AI system analyzing profiles and generating ranked list...
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Upload Applicant Dataset
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        The system will process 100 sample profiles within 30 seconds
                      </p>
                      <input
                        type="file"
                        onChange={handleDatasetUpload}
                        accept=".pdf,.doc,.docx,.csv,.xls,.xlsx,.jpg,.jpeg,.png"
                        className="hidden"
                        id="dataset-upload"
                      />
                      <label
                        htmlFor="dataset-upload"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Supported formats: PDF, DOC, DOCX, CSV, XLS, XLSX, JPG, PNG
                      </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={() => navigate('/notifications')}>
              <Bell className="h-4 w-4 mr-2" />
              <Badge className="bg-red-500 text-white ml-1">5</Badge>
            </Button>
            <Button variant="outline" onClick={() => navigate('/profile-settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="ai-ranking" onClick={() => navigate('/ai-ranking')}>AI Ranking</TabsTrigger>
            <TabsTrigger value="candidates" onClick={() => navigate('/candidates-management')}>Candidates</TabsTrigger>
            <TabsTrigger value="analytics" onClick={() => navigate('/analytics-dashboard')}>Analytics</TabsTrigger>
            <TabsTrigger value="profile" onClick={() => navigate('/profile-settings')}>Profile</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="enhanced-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Applications</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {allPrograms.reduce((sum, prog) => sum + prog.applications, 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600 font-medium">+12% from last month</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="enhanced-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Programs</p>
                      <p className="text-2xl font-bold text-gray-900">{allPrograms.filter(p => p.status === 'Active').length}</p>
                      <p className="text-sm text-blue-600 font-medium">PLP Africa & LSETF</p>
                    </div>
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="enhanced-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Acceptance Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round((allPrograms.reduce((sum, prog) => sum + prog.accepted, 0) / 
                          allPrograms.reduce((sum, prog) => sum + prog.applications, 0)) * 100)}%
                      </p>
                      <p className="text-sm text-green-600 font-medium">+5% improvement</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="enhanced-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Accepted</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {allPrograms.reduce((sum, prog) => sum + prog.accepted, 0)}
                      </p>
                      <p className="text-sm text-green-600 font-medium">Across all programs</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Applications */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Applications
                </CardTitle>
                <CardDescription>Latest candidate applications requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {application.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{application.name}</h3>
                          <p className="text-sm text-gray-600">{application.program}</p>
                          <p className="text-xs text-gray-500">Applied: {application.appliedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900">{application.score}</p>
                          <p className="text-xs text-gray-600">Score</p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCandidateProfile(application.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used admin functions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/candidates-management')}
                  >
                    <Users className="h-6 w-6" />
                    Manage Candidates
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/ai-ranking')}
                  >
                    <BarChart3 className="h-6 w-6" />
                    AI Rankings
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate('/analytics-dashboard')}
                  >
                    <TrendingUp className="h-6 w-6" />
                    View Analytics
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={handleExportReports}
                  >
                    <Download className="h-6 w-6" />
                    Export Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Programs Tab - Show all available programs organized by provider */}
          <TabsContent value="programs" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Available Programs</h2>
                <p className="text-gray-600">Complete list of programs from PLP Africa and LSETF ({allPrograms.length} total programs)</p>
              </div>
              <Button onClick={() => navigate('/program-management')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Program
              </Button>
            </div>

            {/* PLP Africa Programs */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  PLP Africa Programs ({plpPrograms.length} programs)
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {plpPrograms.map((program) => (
                    <Card key={program.id} className="enhanced-card">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{program.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {program.organization}
                              </Badge>
                              <Badge className={getProgramStatusColor(program.status)}>
                                {program.status}
                              </Badge>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{program.applications}</p>
                            <p className="text-sm text-gray-600">Applications</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{program.accepted}</p>
                            <p className="text-sm text-gray-600">Accepted</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Duration: {program.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>Location: {program.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Deadline: {program.deadline}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Key Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {program.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>Acceptance Rate: {Math.round((program.accepted / program.applications) * 100)}%</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="h-4 w-4 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* LSETF Programs */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  LSETF Programs ({lsetfPrograms.length} programs)
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {lsetfPrograms.map((program) => (
                    <Card key={program.id} className="enhanced-card">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{program.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {program.organization}
                              </Badge>
                              <Badge className={getProgramStatusColor(program.status)}>
                                {program.status}
                              </Badge>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{program.applications}</p>
                            <p className="text-sm text-gray-600">Applications</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{program.accepted}</p>
                            <p className="text-sm text-gray-600">Accepted</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Duration: {program.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>Location: {program.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Deadline: {program.deadline}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Key Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {program.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>Acceptance Rate: {Math.round((program.accepted / program.applications) * 100)}%</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="h-4 w-4 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Programs Summary */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Programs Summary</CardTitle>
                <CardDescription>Overview of all available programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{allPrograms.length}</p>
                    <p className="text-sm text-gray-600">Total Programs</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{allPrograms.filter(p => p.status === 'Active').length}</p>
                    <p className="text-sm text-gray-600">Active Programs</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">{allPrograms.filter(p => p.status === 'Opening Soon').length}</p>
                    <p className="text-sm text-gray-600">Opening Soon</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {allPrograms.reduce((sum, prog) => sum + prog.applications, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Applications</p>
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