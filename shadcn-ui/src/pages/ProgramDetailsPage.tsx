import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Target,
  Award,
  BookOpen,
  ExternalLink,
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function ProgramDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isApplying, setIsApplying] = useState(false);

  // Mock program data based on ID
  const programData = {
    '1': {
      title: "PLP Software Development Cohort 5",
      organization: "PLP Africa",
      description: "Comprehensive 6-month software development program covering full-stack development, mobile apps, and cloud technologies. This intensive program is designed to transform beginners into job-ready software developers.",
      duration: "6 months",
      deadline: "2025-02-01",
      startDate: "2025-02-15",
      requirements: ["Basic programming knowledge", "Computer/laptop", "Internet connection", "Commitment to full-time learning"],
      skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "AWS"],
      spots: 150,
      applied: 89,
      difficulty: "Intermediate",
      status: "Under Review",
      applicationDate: "2025-01-15",
      curriculum: [
        "Week 1-4: Programming Fundamentals (JavaScript, Python)",
        "Week 5-8: Frontend Development (HTML, CSS, React)",
        "Week 9-12: Backend Development (Node.js, Express, Databases)",
        "Week 13-16: Full-Stack Projects & Deployment",
        "Week 17-20: Mobile Development (React Native)",
        "Week 21-24: Final Capstone Project & Job Preparation"
      ],
      instructors: ["John Doe - Senior Software Engineer at Google", "Jane Smith - Full-Stack Developer at Microsoft"],
      outcomes: ["95% job placement rate", "Average salary increase of 300%", "Access to PLP Alumni Network"],
      officialLink: "https://plpafrica.org/software-development"
    },
    '2': {
      title: "LSETF Data Analytics Program",
      organization: "LSETF",
      description: "Advanced data analytics program covering machine learning, business intelligence, and data visualization techniques for career advancement in data science.",
      duration: "4 months",
      deadline: "2025-01-25",
      startDate: "2025-02-05",
      requirements: ["Mathematics background", "Basic statistics", "Excel proficiency", "Analytical mindset"],
      skills: ["Python", "R", "SQL", "Tableau", "Power BI", "Machine Learning", "Statistics"],
      spots: 80,
      applied: 67,
      difficulty: "Advanced",
      status: "Shortlisted",
      applicationDate: "2025-01-10",
      curriculum: [
        "Week 1-2: Data Analytics Fundamentals",
        "Week 3-4: Python for Data Analysis",
        "Week 5-6: Statistical Analysis & Modeling",
        "Week 7-8: Data Visualization (Tableau, Power BI)",
        "Week 9-12: Machine Learning & Predictive Analytics",
        "Week 13-16: Capstone Project & Industry Case Studies"
      ],
      instructors: ["Dr. Sarah Johnson - Data Scientist at Netflix", "Michael Chen - Analytics Manager at Uber"],
      outcomes: ["90% completion rate", "Industry-recognized certification", "Direct job placement assistance"],
      officialLink: "https://lsetf.gov.ng/data-analytics"
    }
  };

  const program = programData[id as keyof typeof programData] || programData['1'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'Shortlisted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApply = async () => {
    setIsApplying(true);
    // Simulate application process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsApplying(false);
    alert('Application submitted successfully! You will receive a confirmation email shortly.');
  };

  const handleAccessProgram = () => {
    window.open(program.officialLink, '_blank');
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{program.title}</h1>
            <p className="text-gray-600">Detailed program information and application status</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Program Overview */}
            <Card className="enhanced-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{program.title}</CardTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline">{program.organization}</Badge>
                      <Badge className={getDifficultyColor(program.difficulty)}>
                        {program.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={getStatusColor(program.status)}>
                    {program.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {program.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="font-medium">{program.duration}</p>
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="font-medium">{program.startDate}</p>
                    <p className="text-sm text-gray-600">Start Date</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <p className="font-medium">{program.spots}</p>
                    <p className="text-sm text-gray-600">Available Spots</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Target className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <p className="font-medium">{program.applied}</p>
                    <p className="text-sm text-gray-600">Applications</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Application Progress</h4>
                  <Progress value={(program.applied / program.spots) * 100} className="mb-2" />
                  <p className="text-sm text-gray-600">
                    {program.applied} of {program.spots} spots filled ({Math.round((program.applied / program.spots) * 100)}%)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Card className="enhanced-card">
              <CardContent className="p-0">
                <Tabs defaultValue="curriculum" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                    <TabsTrigger value="instructors">Instructors</TabsTrigger>
                    <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="curriculum" className="p-6">
                    <h3 className="font-semibold mb-4">Program Curriculum</h3>
                    <div className="space-y-3">
                      {program.curriculum.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="requirements" className="p-6">
                    <h3 className="font-semibold mb-4">Program Requirements</h3>
                    <div className="space-y-3">
                      {program.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600" />
                          <p className="text-gray-700">{req}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="instructors" className="p-6">
                    <h3 className="font-semibold mb-4">Program Instructors</h3>
                    <div className="space-y-3">
                      {program.instructors.map((instructor, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <p className="font-medium text-gray-900">{instructor}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="outcomes" className="p-6">
                    <h3 className="font-semibold mb-4">Expected Outcomes</h3>
                    <div className="space-y-3">
                      {program.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Award className="h-5 w-5 text-yellow-600" />
                          <p className="text-gray-700">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Status */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusColor(program.status)}>
                    {program.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Applied:</span>
                  <span className="font-medium">{program.applicationDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="font-medium">{program.deadline}</span>
                </div>
              </CardContent>
            </Card>

            {/* Skills Required */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Skills You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {program.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {program.status === 'Accepted' ? (
                  <Button 
                    onClick={handleAccessProgram}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Access Program
                  </Button>
                ) : (
                  <Button 
                    onClick={handleApply}
                    disabled={isApplying}
                    className="w-full"
                  >
                    {isApplying ? 'Applying...' : 'Apply Now'}
                  </Button>
                )}
                
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Brochure
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleAccessProgram}
                  className="w-full"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Visit Official Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}