import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  ArrowLeft,
  Brain,
  BookOpen,
  Award,
  Code,
  TrendingUp,
  Star,
  ExternalLink,
  CheckCircle,
  Target,
  Lightbulb,
  Trophy,
  AlertTriangle
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'course' | 'hackathon' | 'certification' | 'skill-building';
  title: string;
  provider: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  relevanceScore: number;
  skills: string[];
  url?: string;
}

export default function SmartRecommendations() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!user) {
    navigate('/signin');
    return null;
  }

  // Mock user score for demonstration
  const userScore = 75; // This would come from actual user data
  const isHighScoring = userScore >= 80;

  // Mock recommendations based on user profile
  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'course',
      title: 'Advanced React Development',
      provider: 'Coursera',
      description: 'Master advanced React concepts including hooks, context, and performance optimization',
      duration: '6 weeks',
      difficulty: 'Advanced',
      rating: 4.8,
      relevanceScore: 95,
      skills: ['React', 'JavaScript', 'Frontend Development'],
      url: 'https://coursera.org/react-advanced'
    },
    {
      id: '2',
      type: 'hackathon',
      title: 'Lagos Tech Hackathon 2025',
      provider: 'TechLagos',
      description: 'Build innovative solutions for urban challenges in Lagos',
      duration: '48 hours',
      difficulty: 'Intermediate',
      rating: 4.6,
      relevanceScore: 88,
      skills: ['Problem Solving', 'Team Collaboration', 'Innovation'],
      url: 'https://techlagos.com/hackathon'
    },
    {
      id: '3',
      type: 'certification',
      title: 'AWS Cloud Practitioner',
      provider: 'Amazon Web Services',
      description: 'Foundational understanding of AWS Cloud concepts and services',
      duration: '3 months',
      difficulty: 'Beginner',
      rating: 4.7,
      relevanceScore: 82,
      skills: ['Cloud Computing', 'AWS', 'Infrastructure'],
      url: 'https://aws.amazon.com/certification'
    },
    {
      id: '4',
      type: 'skill-building',
      title: 'Data Structures & Algorithms',
      provider: 'LeetCode',
      description: 'Strengthen your problem-solving skills with coding challenges',
      duration: 'Self-paced',
      difficulty: 'Intermediate',
      rating: 4.5,
      relevanceScore: 90,
      skills: ['Algorithms', 'Data Structures', 'Problem Solving'],
      url: 'https://leetcode.com'
    },
    {
      id: '5',
      type: 'course',
      title: 'UI/UX Design Fundamentals',
      provider: 'Udemy',
      description: 'Learn the principles of user interface and user experience design',
      duration: '4 weeks',
      difficulty: 'Beginner',
      rating: 4.4,
      relevanceScore: 75,
      skills: ['UI Design', 'UX Research', 'Prototyping'],
      url: 'https://udemy.com/ui-ux-design'
    },
    {
      id: '6',
      type: 'hackathon',
      title: 'FinTech Innovation Challenge',
      provider: 'Nigerian FinTech Association',
      description: 'Develop financial technology solutions for the Nigerian market',
      duration: '72 hours',
      difficulty: 'Advanced',
      rating: 4.9,
      relevanceScore: 85,
      skills: ['FinTech', 'Blockchain', 'Financial Services'],
      url: 'https://nfta.ng/challenge'
    }
  ];

  // Improvement recommendations for lower scores
  const improvementAreas = [
    {
      skill: 'Technical Skills',
      currentLevel: 65,
      targetLevel: 80,
      recommendations: [
        'Complete a full-stack development bootcamp',
        'Practice coding challenges daily on HackerRank',
        'Build 3-5 portfolio projects using modern frameworks'
      ]
    },
    {
      skill: 'Communication',
      currentLevel: 70,
      targetLevel: 85,
      recommendations: [
        'Join Toastmasters International for public speaking',
        'Write technical blog posts to improve written communication',
        'Participate in tech meetups and networking events'
      ]
    },
    {
      skill: 'Problem Solving',
      currentLevel: 75,
      targetLevel: 90,
      recommendations: [
        'Solve algorithmic problems on LeetCode daily',
        'Participate in competitive programming contests',
        'Work on open-source projects to tackle real-world problems'
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'hackathon': return <Code className="h-4 w-4" />;
      case 'certification': return <Award className="h-4 w-4" />;
      case 'skill-building': return <Target className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800';
      case 'hackathon': return 'bg-purple-100 text-purple-800';
      case 'certification': return 'bg-green-100 text-green-800';
      case 'skill-building': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/student')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="h-8 w-8 text-purple-600" />
              Smart Recommendations
            </h1>
            <p className="text-gray-600">Personalized learning paths and opportunities tailored for you</p>
          </div>
        </div>

        {/* Score-based Message */}
        {isHighScoring ? (
          <Card className="enhanced-card mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Excellent Performance!</h3>
                  <p className="text-green-700">
                    Your score of {userScore} demonstrates strong capabilities. Here are advanced opportunities to further excel:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="bg-green-100 text-green-800">Leadership Skills</Badge>
                    <Badge className="bg-green-100 text-green-800">Advanced Technologies</Badge>
                    <Badge className="bg-green-100 text-green-800">Industry Recognition</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="enhanced-card mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">Growth Opportunities</h3>
                  <p className="text-yellow-700">
                    Your score of {userScore} shows great potential. Focus on these areas for improvement:
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Improvement Areas (for scores below 80) */}
        {!isHighScoring && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Areas for Improvement</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {improvementAreas.map((area, index) => (
                <Card key={index} className="enhanced-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{area.skill}</CardTitle>
                    <CardDescription>
                      Current: {area.currentLevel}% → Target: {area.targetLevel}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{area.currentLevel}%</span>
                      </div>
                      <Progress value={area.currentLevel} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Recommendations:</h4>
                      {area.recommendations.map((rec, recIndex) => (
                        <div key={recIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            size="sm"
          >
            All Recommendations
          </Button>
          <Button
            variant={selectedCategory === 'course' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('course')}
            size="sm"
          >
            Courses
          </Button>
          <Button
            variant={selectedCategory === 'hackathon' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('hackathon')}
            size="sm"
          >
            Hackathons
          </Button>
          <Button
            variant={selectedCategory === 'certification' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('certification')}
            size="sm"
          >
            Certifications
          </Button>
          <Button
            variant={selectedCategory === 'skill-building' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('skill-building')}
            size="sm"
          >
            Skill Building
          </Button>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecommendations
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .map((recommendation) => (
            <Card key={recommendation.id} className="enhanced-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getTypeIcon(recommendation.type)}
                      {recommendation.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {recommendation.provider} • {recommendation.duration}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{recommendation.rating}</span>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">
                      {recommendation.relevanceScore}% match
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{recommendation.description}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={getTypeColor(recommendation.type)}>
                    {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}
                  </Badge>
                  <Badge className={getDifficultyColor(recommendation.difficulty)}>
                    {recommendation.difficulty}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Skills you'll gain:</h4>
                  <div className="flex flex-wrap gap-1">
                    {recommendation.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Save for Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <Card className="enhanced-card">
            <CardContent className="text-center py-8">
              <Brain className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">No recommendations found for the selected category.</p>
            </CardContent>
          </Card>
        )}

        {/* Learning Path Summary */}
        <Card className="enhanced-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Personalized Learning Path
            </CardTitle>
            <CardDescription>
              Based on your profile and goals, here's your recommended learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-blue-800">Foundation</p>
                <p className="text-sm text-blue-600">Complete core courses</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Code className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-purple-800">Practice</p>
                <p className="text-sm text-purple-600">Join hackathons & challenges</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-green-800">Certification</p>
                <p className="text-sm text-green-600">Earn industry credentials</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
