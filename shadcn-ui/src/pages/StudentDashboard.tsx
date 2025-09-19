import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  User,
  Upload,
  FileText,
  Award,
  Calendar,
  TrendingUp,
  BookOpen,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Brain,
  Settings,
  Bell
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'student') {
    navigate('/signin');
    return null;
  }

  // Mock student data
  const studentData = {
    profileCompletion: 75,
    documentsUploaded: 3,
    totalDocuments: 5,
    applications: [
      {
        id: '1',
        program: 'PLP Software Development',
        status: 'Under Review',
        appliedDate: '2025-01-15',
        score: 85
      },
      {
        id: '2',
        program: 'LSETF Data Analytics',
        status: 'Pending',
        appliedDate: '2025-01-12',
        score: null
      }
    ],
    upcomingDeadlines: [
      {
        program: 'PLP UI/UX Design',
        deadline: '2025-02-15',
        daysLeft: 28
      },
      {
        program: 'LSETF Digital Marketing',
        deadline: '2025-02-20',
        daysLeft: 33
      }
    ],
    recentActivity: [
      {
        action: 'Document uploaded',
        item: 'Academic Transcript',
        date: '2025-01-16'
      },
      {
        action: 'Application submitted',
        item: 'PLP Software Development',
        date: '2025-01-15'
      },
      {
        action: 'Profile updated',
        item: 'Skills section',
        date: '2025-01-14'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUploadDocuments = () => {
    navigate('/upload-documents');
  };

  const handleSmartRecommendations = () => {
    navigate('/smart-recommendations');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}. Track your applications and progress.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleSmartRecommendations}>
              <Brain className="h-4 w-4 mr-2" />
              Smart Recommendations
            </Button>
            <Button variant="outline" onClick={() => navigate('/notifications')}>
              <Bell className="h-4 w-4 mr-2" />
              <Badge className="bg-red-500 text-white ml-1">3</Badge>
            </Button>
            <Button variant="outline" onClick={() => navigate('/profile-settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Completion */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Completion
                </CardTitle>
                <CardDescription>
                  Complete your profile to improve your application chances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">{studentData.profileCompletion}%</span>
                  </div>
                  <Progress value={studentData.profileCompletion} className="h-3" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Basic Information</p>
                        <p className="text-sm text-green-600">Complete</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Skills & Experience</p>
                        <p className="text-sm text-green-600">Complete</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Documents</p>
                        <p className="text-sm text-yellow-600">{studentData.documentsUploaded}/{studentData.totalDocuments} uploaded</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-800">Portfolio</p>
                        <p className="text-sm text-gray-600">Optional</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button onClick={handleUploadDocuments} className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/profile-settings')}>
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Applications */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  My Applications
                </CardTitle>
                <CardDescription>
                  Track the status of your program applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentData.applications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{application.program}</h3>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Applied: {application.appliedDate}</span>
                        {application.score && (
                          <span className="font-medium">Score: {application.score}/100</span>
                        )}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {application.status === 'Pending' && (
                          <Button variant="outline" size="sm">
                            Edit Application
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {studentData.applications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">No applications submitted yet</p>
                      <Button className="mt-3" onClick={() => navigate('/programs')}>
                        Browse Programs
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}:</span> {activity.item}
                        </p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Applications</span>
                  </div>
                  <span className="font-semibold">{studentData.applications.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Documents</span>
                  </div>
                  <span className="font-semibold">{studentData.documentsUploaded}/{studentData.totalDocuments}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Profile</span>
                  </div>
                  <span className="font-semibold">{studentData.profileCompletion}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-yellow-800">{deadline.program}</h4>
                      <p className="text-sm text-yellow-600">Due: {deadline.deadline}</p>
                      <p className="text-xs text-yellow-600 font-medium">{deadline.daysLeft} days left</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleUploadDocuments} className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/programs')}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Programs
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleSmartRecommendations}>
                  <Brain className="h-4 w-4 mr-2" />
                  Get Recommendations
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/profile-settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
