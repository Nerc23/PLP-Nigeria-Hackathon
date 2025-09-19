import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  ArrowLeft,
  BarChart3, 
  Trophy,
  TrendingUp,
  Users,
  Star,
  Target,
  Brain,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Award,
  ExternalLink
} from 'lucide-react';

export default function AIRanking() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState('all');

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  // Mock AI-generated candidate rankings with accuracy scores
  const candidateRankings = [
    {
      id: '1',
      rank: 1,
      name: 'Sarah Johnson',
      program: 'PLP Software Development',
      score: 95,
      accuracyScore: 97.2,
      strengths: ['JavaScript', 'React', 'Problem Solving', 'Team Leadership'],
      improvements: [],
      recommendation: 'Excellent candidate with strong technical foundation and leadership potential.',
      status: 'Recommended for Acceptance',
      profileCompleteness: 98
    },
    {
      id: '2',
      rank: 2,
      name: 'Michael Chen',
      program: 'LSETF Data Analytics',
      score: 92,
      accuracyScore: 95.8,
      strengths: ['Python', 'Statistics', 'Data Visualization', 'Analytical Thinking'],
      improvements: [],
      recommendation: 'Strong analytical skills with excellent potential for data science roles.',
      status: 'Recommended for Acceptance',
      profileCompleteness: 95
    },
    {
      id: '3',
      rank: 3,
      name: 'Emily Davis',
      program: 'PLP UI/UX Design',
      score: 89,
      accuracyScore: 93.4,
      strengths: ['Design Thinking', 'Figma', 'User Research', 'Creativity'],
      improvements: [],
      recommendation: 'Creative designer with strong user-centered approach.',
      status: 'Recommended for Acceptance',
      profileCompleteness: 92
    },
    {
      id: '4',
      rank: 4,
      name: 'James Wilson',
      program: 'LSETF Digital Marketing',
      score: 84,
      accuracyScore: 89.6,
      strengths: ['Marketing Strategy', 'Social Media', 'Content Creation'],
      improvements: [],
      recommendation: 'Good marketing foundation with growth potential.',
      status: 'Recommended for Acceptance',
      profileCompleteness: 88
    },
    {
      id: '5',
      rank: 5,
      name: 'Lisa Anderson',
      program: 'PLP Software Development',
      score: 78,
      accuracyScore: 84.2,
      strengths: ['HTML/CSS', 'Basic JavaScript', 'Eagerness to Learn'],
      improvements: ['JavaScript Fundamentals', 'Backend Development', 'Database Knowledge', 'Project Experience'],
      recommendation: 'Shows potential but needs strengthening in core programming concepts.',
      status: 'Conditional Acceptance',
      profileCompleteness: 82
    },
    {
      id: '6',
      rank: 6,
      name: 'David Brown',
      program: 'LSETF Data Analytics',
      score: 75,
      accuracyScore: 81.7,
      strengths: ['Excel', 'Basic Statistics', 'Attention to Detail'],
      improvements: ['Python Programming', 'Advanced Statistics', 'Data Visualization', 'SQL Skills'],
      recommendation: 'Basic analytical skills present, requires significant skill development.',
      status: 'Conditional Acceptance',
      profileCompleteness: 79
    },
    {
      id: '7',
      rank: 7,
      name: 'Jennifer Lee',
      program: 'PLP UI/UX Design',
      score: 72,
      accuracyScore: 78.9,
      strengths: ['Creativity', 'Basic Design Principles', 'Communication'],
      improvements: ['Design Tools Proficiency', 'User Research Methods', 'Prototyping Skills', 'Portfolio Development'],
      recommendation: 'Creative potential exists but needs technical skill development.',
      status: 'Needs Improvement',
      profileCompleteness: 75
    },
    {
      id: '8',
      name: 'Robert Taylor',
      rank: 8,
      program: 'LSETF Digital Marketing',
      score: 69,
      accuracyScore: 76.3,
      strengths: ['Communication', 'Social Media Awareness', 'Enthusiasm'],
      improvements: ['Marketing Strategy', 'Analytics Tools', 'Content Strategy', 'Campaign Management'],
      recommendation: 'Enthusiastic but lacks fundamental marketing knowledge and skills.',
      status: 'Needs Improvement',
      profileCompleteness: 71
    }
  ];

  // Smart Recommendation Engine for candidates
  const getSmartRecommendations = (candidate: any) => {
    if (candidate.score >= 80) {
      return {
        type: 'congratulatory',
        message: `🎉 Congratulations ${candidate.name}! Your application shows excellent potential.`,
        recommendations: [
          {
            type: 'Advanced Course',
            title: 'Advanced React Patterns',
            description: 'Take your React skills to the next level',
            provider: 'PLP Africa',
            difficulty: 'Advanced'
          },
          {
            type: 'Hackathon',
            title: 'Lagos Tech Hackathon 2025',
            description: 'Compete with top developers',
            provider: 'Tech Community',
            difficulty: 'Intermediate'
          },
          {
            type: 'Certification',
            title: 'AWS Certified Developer',
            description: 'Get certified in cloud development',
            provider: 'Amazon Web Services',
            difficulty: 'Advanced'
          }
        ]
      };
    } else {
      return {
        type: 'improvement',
        message: `📈 ${candidate.name}, we've identified areas where you can strengthen your application.`,
        recommendations: [
          {
            type: 'Foundation Course',
            title: 'JavaScript Fundamentals',
            description: 'Master the basics of JavaScript programming',
            provider: 'PLP Africa',
            difficulty: 'Beginner'
          },
          {
            type: 'Project',
            title: 'Build 5 JavaScript Projects',
            description: 'Hands-on projects to strengthen your portfolio',
            provider: 'FreeCodeCamp',
            difficulty: 'Beginner'
          },
          {
            type: 'Mentorship',
            title: 'One-on-One Coding Mentorship',
            description: 'Get personalized guidance from experienced developers',
            provider: 'PLP Africa',
            difficulty: 'All Levels'
          }
        ]
      };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recommended for Acceptance': return 'bg-green-100 text-green-800';
      case 'Conditional Acceptance': return 'bg-yellow-100 text-yellow-800';
      case 'Needs Improvement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredCandidates = selectedProgram === 'all' 
    ? candidateRankings 
    : candidateRankings.filter(c => c.program.includes(selectedProgram));

  const programs = ['PLP Software Development', 'LSETF Data Analytics', 'PLP UI/UX Design', 'LSETF Digital Marketing'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/admin')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Brain className="h-8 w-8 text-purple-600" />
                AI Ranking System
              </h1>
              <p className="text-gray-600">AI-powered candidate evaluation and ranking with personalized recommendations</p>
            </div>
          </div>
        </div>

        {/* AI System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="enhanced-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Processed Profiles</p>
                  <p className="text-2xl font-bold text-gray-900">100</p>
                  <p className="text-sm text-green-600 font-medium">In 30 seconds</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="enhanced-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900">94.2%</p>
                  <p className="text-sm text-green-600 font-medium">High confidence</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="enhanced-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Top Candidates</p>
                  <p className="text-2xl font-bold text-gray-900">{candidateRankings.filter(c => c.score >= 80).length}</p>
                  <p className="text-sm text-blue-600 font-medium">Score ≥ 80</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="enhanced-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recommendations</p>
                  <p className="text-2xl font-bold text-gray-900">{candidateRankings.length * 3}</p>
                  <p className="text-sm text-purple-600 font-medium">Generated</p>
                </div>
                <Lightbulb className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rankings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="rankings">AI Rankings</TabsTrigger>
            <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          </TabsList>

          {/* Rankings Tab */}
          <TabsContent value="rankings" className="space-y-6">
            {/* Filter Controls */}
            <Card className="enhanced-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Filter by Program:</label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Programs</option>
                    {programs.map(program => (
                      <option key={program} value={program.split(' ')[0]}>{program}</option>
                    ))}
                  </select>
                  <Badge className="bg-blue-100 text-blue-800">
                    {filteredCandidates.length} candidates
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Candidate Rankings */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  AI-Generated Candidate Rankings
                </CardTitle>
                <CardDescription>
                  Candidates ranked by AI algorithm with accuracy scores and personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCandidates.map((candidate) => (
                    <div key={candidate.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white font-bold text-lg">
                            #{candidate.rank}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{candidate.name}</h3>
                            <p className="text-sm text-gray-600">{candidate.program}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getStatusColor(candidate.status)}>
                                {candidate.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className={`text-2xl font-bold px-4 py-2 rounded-full ${getScoreColor(candidate.score)}`}>
                              {candidate.score}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">Application Score</p>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">
                              {candidate.accuracyScore}%
                            </div>
                            <p className="text-xs text-gray-600">AI Accuracy</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Strengths
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {candidate.strengths.map((strength, index) => (
                              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {candidate.improvements.length > 0 && (
                          <div>
                            <h4 className="font-medium text-orange-800 mb-2 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              Areas for Improvement
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {candidate.improvements.map((improvement, index) => (
                                <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                                  {improvement}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">AI Recommendation:</h4>
                        <p className="text-sm text-gray-700">{candidate.recommendation}</p>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Profile Completeness</span>
                          <span className="text-sm text-gray-600">{candidate.profileCompleteness}%</span>
                        </div>
                        <Progress value={candidate.profileCompleteness} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Smart Recommendation Engine
                </CardTitle>
                <CardDescription>
                  Personalized learning paths and recommendations for each candidate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {candidateRankings.slice(0, 4).map((candidate) => {
                    const recommendations = getSmartRecommendations(candidate);
                    return (
                      <div key={candidate.id} className="border rounded-lg p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {candidate.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                            <p className="text-sm text-gray-600">Score: {candidate.score}/100</p>
                          </div>
                        </div>

                        <div className={`p-4 rounded-lg mb-4 ${
                          recommendations.type === 'congratulatory' 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-orange-50 border border-orange-200'
                        }`}>
                          <p className={`font-medium ${
                            recommendations.type === 'congratulatory' ? 'text-green-800' : 'text-orange-800'
                          }`}>
                            {recommendations.message}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Recommended Learning Path:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {recommendations.recommendations.map((rec, index) => (
                              <Card key={index} className="border-l-4 border-l-blue-500">
                                <CardHeader className="pb-3">
                                  <Badge variant="outline" className="w-fit mb-2">
                                    {rec.type}
                                  </Badge>
                                  <CardTitle className="text-sm">{rec.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex items-center gap-2">
                                      <Award className="h-3 w-3 text-gray-500" />
                                      <span>{rec.provider}</span>
                                    </div>
                                    <Badge className="text-xs" variant="secondary">
                                      {rec.difficulty}
                                    </Badge>
                                  </div>
                                  <Button size="sm" className="w-full mt-3 text-xs">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    View Details
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  AI Performance Analytics
                </CardTitle>
                <CardDescription>
                  System performance metrics and accuracy analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Score Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">90-100 (Excellent)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '37.5%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">3</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">80-89 (Good)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">2</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">70-79 (Fair)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">2</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">60-69 (Needs Improvement)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: '12.5%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">1</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">AI Accuracy Metrics</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Overall Accuracy</span>
                          <span className="text-sm font-medium">94.2%</span>
                        </div>
                        <Progress value={94.2} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Prediction Confidence</span>
                          <span className="text-sm font-medium">91.8%</span>
                        </div>
                        <Progress value={91.8} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Processing Speed</span>
                          <span className="text-sm font-medium">98.5%</span>
                        </div>
                        <Progress value={98.5} className="h-2" />
                      </div>
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
