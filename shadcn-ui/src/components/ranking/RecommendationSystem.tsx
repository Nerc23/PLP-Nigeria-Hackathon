import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Trophy, Users, ExternalLink, Target, TrendingUp } from 'lucide-react';
import { RankingResult } from '@/types';

interface RecommendationSystemProps {
  candidate: RankingResult;
}

interface Recommendation {
  type: 'course' | 'hackathon' | 'skill' | 'certification';
  title: string;
  description: string;
  provider: string;
  url?: string;
  duration?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  priority: 'High' | 'Medium' | 'Low';
}

export default function RecommendationSystem({ candidate }: RecommendationSystemProps) {
  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    const profile = candidate.userProfile;
    const score = candidate.score;

    // Technical Skills Recommendations
    const hasBasicTech = profile.skills.some(skill => 
      ['html', 'css', 'javascript', 'python', 'java'].some(tech => 
        skill.toLowerCase().includes(tech)
      )
    );

    if (!hasBasicTech || score < 60) {
      recommendations.push({
        type: 'course',
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB from scratch',
        provider: 'Udemy / freeCodeCamp',
        url: 'https://freecodecamp.org',
        duration: '3-6 months',
        level: 'Beginner',
        priority: 'High'
      });

      recommendations.push({
        type: 'course',
        title: 'Python for Everybody Specialization',
        description: 'Learn Python programming fundamentals and data structures',
        provider: 'Coursera (University of Michigan)',
        duration: '2-4 months',
        level: 'Beginner',
        priority: 'High'
      });
    }

    // Data Science Recommendations
    const hasDataSkills = profile.skills.some(skill => 
      ['data', 'analysis', 'sql', 'excel', 'tableau', 'power bi'].some(data => 
        skill.toLowerCase().includes(data)
      )
    );

    if (!hasDataSkills && score < 70) {
      recommendations.push({
        type: 'course',
        title: 'Google Data Analytics Certificate',
        description: 'Learn data analysis, visualization, and SQL from industry experts',
        provider: 'Coursera (Google)',
        duration: '3-6 months',
        level: 'Beginner',
        priority: 'Medium'
      });

      recommendations.push({
        type: 'course',
        title: 'Data Science with Python',
        description: 'Master pandas, NumPy, matplotlib, and machine learning basics',
        provider: 'DataCamp / Kaggle Learn',
        duration: '2-3 months',
        level: 'Intermediate',
        priority: 'Medium'
      });
    }

    // Hackathon Recommendations
    if (score < 80) {
      recommendations.push({
        type: 'hackathon',
        title: 'Nigeria Developer Community Hackathons',
        description: 'Participate in local hackathons to build projects and network',
        provider: 'DevC Lagos, GDG Nigeria, Facebook Developer Circles',
        duration: '2-3 days each',
        level: 'Intermediate',
        priority: 'High'
      });

      recommendations.push({
        type: 'hackathon',
        title: 'Global Virtual Hackathons',
        description: 'Join international hackathons to gain exposure and experience',
        provider: 'MLH, DevPost, HackerEarth',
        duration: '1-7 days',
        level: 'Intermediate',
        priority: 'Medium'
      });
    }

    // Professional Development
    if (!profile.experience || profile.experience.length < 100) {
      recommendations.push({
        type: 'skill',
        title: 'Build a Professional Portfolio',
        description: 'Create 3-5 projects showcasing your skills and host them on GitHub',
        provider: 'GitHub Pages, Netlify, Vercel',
        duration: '1-2 months',
        level: 'Beginner',
        priority: 'High'
      });

      recommendations.push({
        type: 'skill',
        title: 'Contribute to Open Source Projects',
        description: 'Start contributing to open source to gain real-world experience',
        provider: 'GitHub, GitLab, Good First Issues',
        duration: 'Ongoing',
        level: 'Intermediate',
        priority: 'Medium'
      });
    }

    // Certification Recommendations
    if (score < 75) {
      recommendations.push({
        type: 'certification',
        title: 'AWS Cloud Practitioner',
        description: 'Get certified in cloud computing fundamentals',
        provider: 'Amazon Web Services',
        duration: '1-2 months',
        level: 'Beginner',
        priority: 'Medium'
      });

      recommendations.push({
        type: 'certification',
        title: 'Microsoft Azure Fundamentals',
        description: 'Learn cloud services and Microsoft Azure basics',
        provider: 'Microsoft Learn',
        duration: '1-2 months',
        level: 'Beginner',
        priority: 'Low'
      });
    }

    // Sort by priority
    const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
    return recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };

  const recommendations = generateRecommendations();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'hackathon': return <Trophy className="h-4 w-4" />;
      case 'skill': return <Target className="h-4 w-4" />;
      case 'certification': return <TrendingUp className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'secondary';
    }
  };

  if (candidate.score >= 80) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Excellent Candidate!
          </CardTitle>
          <CardDescription className="text-green-700">
            This candidate shows strong potential and meets most requirements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-green-800">
              <strong>Strengths:</strong> {candidate.matchingSkills.join(', ')}
            </p>
            <p className="text-sm text-green-700">
              Consider this candidate for advanced programs or leadership roles.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-orange-800 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Development Recommendations
        </CardTitle>
        <CardDescription className="text-orange-700">
          Personalized suggestions to help this candidate improve their profile and skills
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="space-y-2">
          <h4 className="font-semibold text-orange-800">Current Assessment</h4>
          <p className="text-sm text-orange-700">
            Score: {candidate.score}/100 - There's room for improvement in several areas.
          </p>
          {candidate.matchingSkills.length > 0 && (
            <div>
              <span className="text-sm font-medium">Existing Strengths: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {candidate.matchingSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Recommendations */}
        <div className="space-y-4">
          <h4 className="font-semibold text-orange-800">Recommended Learning Path</h4>
          
          {recommendations.map((rec, index) => (
            <div key={index} className="border border-orange-200 rounded-lg p-4 bg-white">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(rec.type)}
                  <h5 className="font-medium">{rec.title}</h5>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getPriorityColor(rec.priority)} className="text-xs">
                    {rec.priority} Priority
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {rec.level}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span><strong>Provider:</strong> {rec.provider}</span>
                {rec.duration && <span><strong>Duration:</strong> {rec.duration}</span>}
              </div>
              
              {rec.url && (
                <Button variant="outline" size="sm" className="mt-2 h-8" asChild>
                  <a href={rec.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Learn More
                  </a>
                </Button>
              )}
            </div>
          ))}
        </div>

        <Separator />

        {/* Action Items */}
        <div className="space-y-2">
          <h4 className="font-semibold text-orange-800">Immediate Action Items</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Complete at least 2 high-priority recommendations</li>
            <li>• Build a portfolio with 3-5 projects</li>
            <li>• Update your profile with new skills and experience</li>
            <li>• Participate in at least one hackathon or coding challenge</li>
            <li>• Connect with the Nigerian tech community</li>
          </ul>
        </div>

        {/* Encouragement */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>💡 Remember:</strong> Every expert was once a beginner. These recommendations 
            will help you build the skills needed for future PLP programs. Stay consistent 
            and keep learning!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}