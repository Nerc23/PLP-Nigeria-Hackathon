import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Star, 
  TrendingUp, 
  Award,
  Eye,
  MessageSquare,
  Filter,
  Search
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  program: string;
  score: number;
  rank: number;
  skills: string[];
  status: 'Pending' | 'Reviewed' | 'Shortlisted';
}

export default function CandidateRanking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');

  // Mock candidate data
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      program: 'PLP Software Development',
      score: 95,
      rank: 1,
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      status: 'Shortlisted'
    },
    {
      id: '2',
      name: 'Michael Chen',
      program: 'LSETF Data Analytics',
      score: 92,
      rank: 2,
      skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
      status: 'Reviewed'
    },
    {
      id: '3',
      name: 'Emily Davis',
      program: 'PLP UI/UX Design',
      score: 89,
      rank: 3,
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      status: 'Pending'
    },
    {
      id: '4',
      name: 'James Wilson',
      program: 'LSETF Digital Marketing',
      score: 87,
      rank: 4,
      skills: ['SEO', 'Social Media', 'Google Analytics', 'Content Marketing'],
      status: 'Reviewed'
    }
  ];

  const programs = ['PLP Software Development', 'LSETF Data Analytics', 'PLP UI/UX Design', 'LSETF Digital Marketing'];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shortlisted': return 'bg-green-100 text-green-800';
      case 'Reviewed': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesProgram = selectedProgram === 'all' || candidate.program === selectedProgram;
    return matchesSearch && matchesProgram;
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="md:w-64">
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Programs</option>
            {programs.map(program => (
              <option key={program} value={program}>{program}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900">{candidates.length}</p>
            <p className="text-sm text-gray-600">Total Candidates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900">{candidates.filter(c => c.score >= 90).length}</p>
            <p className="text-sm text-gray-600">Top Performers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900">{candidates.filter(c => c.status === 'Shortlisted').length}</p>
            <p className="text-sm text-gray-600">Shortlisted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900">{Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length)}</p>
            <p className="text-sm text-gray-600">Average Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Rankings */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    #{candidate.rank}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {candidate.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-600">{candidate.program}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`text-xl font-bold px-3 py-1 rounded-full ${getScoreColor(candidate.score)}`}>
                      {candidate.score}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">AI Score</p>
                  </div>
                  
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status}
                  </Badge>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}