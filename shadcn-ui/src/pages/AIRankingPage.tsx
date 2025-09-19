import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Upload, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Shield,
  Eye,
  CheckCircle,
  Scale,
  UserCheck,
  FileText,
  BarChart3,
  ArrowLeft,
  Home,
  Settings,
  Bell
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  score: number;
  program: string;
  gender: string;
  age: number;
  location: string;
  experience: number;
  education: string;
  biasFlags: string[];
  safetyScore: number;
  transparencyScore: number;
}

export default function AIRankingPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [biasReport, setBiasReport] = useState<any>(null);
  const [showBiasAnalysis, setShowBiasAnalysis] = useState(false);

  const mockCandidates: Candidate[] = [
    {
      id: '1',
      name: 'Amina Hassan',
      email: 'amina.hassan@email.com',
      score: 94.5,
      program: 'Software Development',
      gender: 'Female',
      age: 24,
      location: 'Lagos, Nigeria',
      experience: 2,
      education: 'Computer Science BSc',
      biasFlags: [],
      safetyScore: 98,
      transparencyScore: 95
    },
    {
      id: '2',
      name: 'Kemi Adebayo',
      email: 'kemi.adebayo@email.com',
      score: 91.2,
      program: 'UI/UX Design',
      gender: 'Female',
      age: 26,
      location: 'Abuja, Nigeria',
      experience: 3,
      education: 'Design BSc',
      biasFlags: ['location_bias'],
      safetyScore: 96,
      transparencyScore: 92
    },
    {
      id: '3',
      name: 'Fatima Musa',
      email: 'fatima.musa@email.com',
      score: 89.8,
      program: 'Data Science',
      gender: 'Female',
      age: 28,
      location: 'Kano, Nigeria',
      experience: 4,
      education: 'Mathematics MSc',
      biasFlags: ['age_bias', 'regional_bias'],
      safetyScore: 94,
      transparencyScore: 88
    },
    {
      id: '4',
      name: 'Grace Okafor',
      email: 'grace.okafor@email.com',
      score: 87.3,
      program: 'Cybersecurity',
      gender: 'Female',
      age: 30,
      location: 'Port Harcourt, Nigeria',
      experience: 5,
      education: 'Computer Engineering BSc',
      biasFlags: ['experience_bias'],
      safetyScore: 99,
      transparencyScore: 90
    }
  ];

  const mockBiasReport = {
    overallBiasScore: 15.2,
    genderBias: 8.1,
    ageBias: 12.3,
    locationBias: 18.7,
    educationBias: 6.5,
    experienceBias: 14.2,
    recommendations: [
      'Implement gender-blind initial screening',
      'Normalize location-based scoring adjustments',
      'Review age-related criteria for relevance',
      'Ensure equal representation across regions'
    ],
    safetyMetrics: {
      womenSafetyScore: 96.8,
      platformSecurityScore: 94.2,
      harassmentPreventionScore: 98.1,
      reportingSystemScore: 92.5
    }
  };

  const handleProcessDataset = async () => {
    setIsProcessing(true);
    setProgress(0);
    setShowBiasAnalysis(false);

    // Simulate processing with bias detection
    const intervals = [
      { progress: 20, message: 'Loading candidate profiles...' },
      { progress: 40, message: 'Running AI analysis...' },
      { progress: 60, message: 'Detecting potential biases...' },
      { progress: 80, message: 'Analyzing safety metrics...' },
      { progress: 100, message: 'Generating transparency report...' }
    ];

    for (const interval of intervals) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(interval.progress);
    }

    setCandidates(mockCandidates);
    setBiasReport(mockBiasReport);
    setIsProcessing(false);
    setShowBiasAnalysis(true);
  };

  const getBiasColor = (score: number) => {
    if (score < 10) return 'text-green-600';
    if (score < 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSafetyColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Enhanced Navigation Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left Navigation */}
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate('/admin')} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <Button variant="ghost" onClick={() => navigate('/admin')} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
              <Button variant="ghost" onClick={() => navigate('/bias-detection')} className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Bias Detection
              </Button>
              <Button variant="ghost" onClick={() => navigate('/analytics-dashboard')} className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
            </div>

            {/* Center Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-600" />
                AI Ranking & Bias Detection
              </h1>
              <p className="text-sm text-gray-600">Advanced AI-powered candidate analysis</p>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate('/notifications')} className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline" onClick={() => navigate('/profile-settings')} className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button onClick={() => navigate('/admin')} className="hover:text-blue-600">Admin Dashboard</button>
          <span>/</span>
          <span className="text-gray-900 font-medium">AI Ranking & Bias Detection</span>
        </nav>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-gray-600">Total Candidates</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">94.2%</div>
              <div className="text-sm text-gray-600">AI Accuracy</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">92%</div>
              <div className="text-sm text-gray-600">Bias-Free Score</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">28.5s</div>
              <div className="text-sm text-gray-600">Processing Time</div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-6 w-6 text-blue-600" />
              Dataset Upload & AI Processing
            </CardTitle>
            <CardDescription>
              Upload candidate datasets for comprehensive AI analysis with bias detection and safety evaluation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isProcessing && candidates.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Candidate Dataset</h3>
                <p className="text-gray-600 mb-4">
                  Supports CSV, Excel, JSON formats. Our AI will analyze for bias and safety concerns.
                </p>
                <Button onClick={handleProcessDataset} className="bg-gradient-to-r from-blue-600 to-green-600">
                  <Brain className="h-4 w-4 mr-2" />
                  Process Demo Dataset
                </Button>
              </div>
            )}

            {isProcessing && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-blue-600 animate-pulse" />
                  <span className="text-lg font-medium">Processing with AI Bias Detection...</span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-gray-600">
                  Analyzing {mockCandidates.length} candidates for bias patterns and safety metrics...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {showBiasAnalysis && (
          <Tabs defaultValue="results" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="results">Ranking Results</TabsTrigger>
              <TabsTrigger value="bias">Bias Analysis</TabsTrigger>
              <TabsTrigger value="safety">Women's Safety</TabsTrigger>
              <TabsTrigger value="transparency">Transparency</TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    Candidate Rankings
                  </CardTitle>
                  <CardDescription>
                    AI-generated rankings with bias flags and safety scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidates.map((candidate, index) => (
                      <div key={candidate.id} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{candidate.name}</h3>
                              <p className="text-gray-600">{candidate.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{candidate.score}%</div>
                            <div className="text-sm text-gray-600">AI Score</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Program:</span>
                            <p className="font-medium">{candidate.program}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Location:</span>
                            <p className="font-medium">{candidate.location}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Experience:</span>
                            <p className="font-medium">{candidate.experience} years</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Safety Score:</span>
                            <p className={`font-medium ${getSafetyColor(candidate.safetyScore)}`}>
                              {candidate.safetyScore}%
                            </p>
                          </div>
                        </div>

                        {candidate.biasFlags.length > 0 && (
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm text-gray-600">Bias Flags:</span>
                            <div className="flex gap-2">
                              {candidate.biasFlags.map((flag, i) => (
                                <Badge key={i} variant="outline" className="text-yellow-700 border-yellow-300">
                                  {flag.replace('_', ' ')}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bias" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="h-6 w-6 text-purple-600" />
                      Bias Detection Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Overall Bias Score</span>
                        <span className={`font-bold ${getBiasColor(biasReport.overallBiasScore)}`}>
                          {biasReport.overallBiasScore}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Gender Bias</span>
                        <span className={`font-bold ${getBiasColor(biasReport.genderBias)}`}>
                          {biasReport.genderBias}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Age Bias</span>
                        <span className={`font-bold ${getBiasColor(biasReport.ageBias)}`}>
                          {biasReport.ageBias}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Location Bias</span>
                        <span className={`font-bold ${getBiasColor(biasReport.locationBias)}`}>
                          {biasReport.locationBias}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Education Bias</span>
                        <span className={`font-bold ${getBiasColor(biasReport.educationBias)}`}>
                          {biasReport.educationBias}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      Bias Mitigation Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {biasReport.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Bias Alert:</strong> Location bias detected at 18.7%. Consider implementing regional 
                  adjustment factors to ensure fair evaluation across all Nigerian states.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="safety" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-6 w-6 text-pink-600" />
                      Women's Safety Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Overall Women's Safety</span>
                        <span className={`font-bold ${getSafetyColor(biasReport.safetyMetrics.womenSafetyScore)}`}>
                          {biasReport.safetyMetrics.womenSafetyScore}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Platform Security</span>
                        <span className={`font-bold ${getSafetyColor(biasReport.safetyMetrics.platformSecurityScore)}`}>
                          {biasReport.safetyMetrics.platformSecurityScore}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Harassment Prevention</span>
                        <span className={`font-bold ${getSafetyColor(biasReport.safetyMetrics.harassmentPreventionScore)}`}>
                          {biasReport.safetyMetrics.harassmentPreventionScore}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Reporting System</span>
                        <span className={`font-bold ${getSafetyColor(biasReport.safetyMetrics.reportingSystemScore)}`}>
                          {biasReport.safetyMetrics.reportingSystemScore}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="h-6 w-6 text-green-600" />
                      Safety Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">24/7 Safety Hotline</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Anonymous Reporting System</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Background Verification</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Safe Workspace Guidelines</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Emergency Contact System</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Gender-Inclusive Policies</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert className="border-pink-200 bg-pink-50">
                <Shield className="h-4 w-4 text-pink-600" />
                <AlertDescription className="text-pink-800">
                  <strong>Safety Priority:</strong> All women candidates are automatically enrolled in our 
                  enhanced safety program with dedicated support and secure communication channels.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="transparency" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-6 w-6 text-blue-600" />
                    Algorithmic Transparency Report
                  </CardTitle>
                  <CardDescription>
                    Detailed explanation of AI decision-making process and fairness measures
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">94.2%</div>
                      <div className="text-sm text-gray-600">Algorithm Accuracy</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Scale className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">92.8%</div>
                      <div className="text-sm text-gray-600">Fairness Score</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">96.5%</div>
                      <div className="text-sm text-gray-600">Transparency Rating</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Algorithm Explanation</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <strong>Skills Assessment (40%):</strong> Technical skills, problem-solving abilities, 
                          and domain expertise evaluated through standardized assessments.
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <strong>Experience Relevance (25%):</strong> Work experience relevance to program 
                          requirements, with bias adjustments for career gaps.
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <strong>Learning Potential (20%):</strong> Adaptability, growth mindset, and 
                          continuous learning indicators.
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <strong>Cultural Fit (15%):</strong> Alignment with program values and collaborative 
                          working style, evaluated bias-free.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Fairness Measures Implemented:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Gender-blind initial screening process</li>
                      <li>• Regional scoring normalization</li>
                      <li>• Age bias detection and correction</li>
                      <li>• Socioeconomic background adjustments</li>
                      <li>• Continuous bias monitoring and retraining</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
