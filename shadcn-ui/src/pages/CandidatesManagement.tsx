import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  ArrowLeft,
  Users, 
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Mail,
  Phone,
  Calendar,
  Award,
  TrendingUp,
  Send,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  appliedDate: string;
  status: 'Pending' | 'Under Review' | 'Shortlisted' | 'Accepted' | 'Rejected';
  score: number;
  skills: string[];
  education: string;
  experience: string;
  location: string;
}

export default function CandidatesManagement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    programs: [] as string[],
    statuses: [] as string[],
    scoreRange: { min: 0, max: 100 },
    dateRange: { start: '', end: '' },
    skills: [] as string[]
  });

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  // Mock candidate data
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+234 801 234 5678',
      program: 'PLP Software Development',
      appliedDate: '2025-01-15',
      status: 'Shortlisted',
      score: 92,
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      education: 'Computer Science Degree',
      experience: '3 years',
      location: 'Lagos, Nigeria'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+234 802 345 6789',
      program: 'LSETF Data Analytics',
      appliedDate: '2025-01-14',
      status: 'Under Review',
      score: 88,
      skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
      education: 'Statistics Masters',
      experience: '2 years',
      location: 'Abuja, Nigeria'
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+234 803 456 7890',
      program: 'PLP UI/UX Design',
      appliedDate: '2025-01-13',
      status: 'Accepted',
      score: 95,
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      education: 'Design Degree',
      experience: '4 years',
      location: 'Port Harcourt, Nigeria'
    },
    {
      id: '4',
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+234 804 567 8901',
      program: 'LSETF Digital Marketing',
      appliedDate: '2025-01-12',
      status: 'Pending',
      score: 75,
      skills: ['SEO', 'Social Media', 'Google Analytics'],
      education: 'Marketing Degree',
      experience: '1 year',
      location: 'Kano, Nigeria'
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      phone: '+234 805 678 9012',
      program: 'PLP Software Development',
      appliedDate: '2025-01-11',
      status: 'Rejected',
      score: 65,
      skills: ['HTML', 'CSS', 'JavaScript'],
      education: 'High School',
      experience: '6 months',
      location: 'Ibadan, Nigeria'
    }
  ]);

  const programs = ['PLP Software Development', 'LSETF Data Analytics', 'PLP UI/UX Design', 'LSETF Digital Marketing'];
  const statuses = ['Pending', 'Under Review', 'Shortlisted', 'Accepted', 'Rejected'];
  const allSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Tableau', 'Machine Learning', 'Figma', 'Adobe XD', 'SEO', 'HTML', 'CSS'];

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

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesProgram = programFilter === 'all' || candidate.program === programFilter;
    
    // Advanced filters
    const matchesAdvancedPrograms = advancedFilters.programs.length === 0 || advancedFilters.programs.includes(candidate.program);
    const matchesAdvancedStatuses = advancedFilters.statuses.length === 0 || advancedFilters.statuses.includes(candidate.status);
    const matchesScoreRange = candidate.score >= advancedFilters.scoreRange.min && candidate.score <= advancedFilters.scoreRange.max;
    const matchesSkills = advancedFilters.skills.length === 0 || advancedFilters.skills.some(skill => candidate.skills.includes(skill));
    
    return matchesSearch && matchesStatus && matchesProgram && matchesAdvancedPrograms && matchesAdvancedStatuses && matchesScoreRange && matchesSkills;
  });

  const handleStatusChange = (candidateId: string, newStatus: string) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId ? { ...candidate, status: newStatus as any } : candidate
      )
    );
    alert(`Candidate status updated to ${newStatus}`);
  };

  const handleViewProfile = (candidateId: string) => {
    navigate(`/candidate-profile/${candidateId}`);
  };

  const handleSendFeedback = () => {
    if (!selectedCandidate || !feedbackMessage.trim()) return;
    
    alert(`Feedback sent to ${selectedCandidate.name}: ${feedbackMessage}`);
    setFeedbackMessage('');
    setFeedbackDialog(false);
    setSelectedCandidate(null);
  };

  const handleExportCandidates = () => {
    const csvContent = [
      ['Name', 'Email', 'Program', 'Status', 'Score', 'Applied Date'],
      ...filteredCandidates.map(c => [c.name, c.email, c.program, c.status, c.score, c.appliedDate])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidates.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleApplyAdvancedFilters = () => {
    alert('Advanced filters applied successfully!');
    setAdvancedFiltersOpen(false);
  };

  const statusCounts = {
    total: candidates.length,
    pending: candidates.filter(c => c.status === 'Pending').length,
    underReview: candidates.filter(c => c.status === 'Under Review').length,
    shortlisted: candidates.filter(c => c.status === 'Shortlisted').length,
    accepted: candidates.filter(c => c.status === 'Accepted').length,
    rejected: candidates.filter(c => c.status === 'Rejected').length
  };

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
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="h-8 w-8" />
                Candidates Management
              </h1>
              <p className="text-gray-600">Manage and review candidate applications</p>
            </div>
          </div>
          
          <Button onClick={handleExportCandidates} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{statusCounts.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{statusCounts.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{statusCounts.underReview}</p>
              <p className="text-sm text-gray-600">Under Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{statusCounts.shortlisted}</p>
              <p className="text-sm text-gray-600">Shortlisted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{statusCounts.accepted}</p>
              <p className="text-sm text-gray-600">Accepted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{statusCounts.rejected}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="enhanced-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search candidates by name, email, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <select
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Programs</option>
                  {programs.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
                
                {/* Advanced Filters Dialog */}
                <Dialog open={advancedFiltersOpen} onOpenChange={setAdvancedFiltersOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Advanced Filters
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Advanced Filters</DialogTitle>
                      <DialogDescription>
                        Apply advanced filters to refine your candidate search
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-medium">Programs</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {programs.map((program) => (
                            <div key={program} className="flex items-center space-x-2">
                              <Checkbox
                                id={`program-${program}`}
                                checked={advancedFilters.programs.includes(program)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setAdvancedFilters(prev => ({
                                      ...prev,
                                      programs: [...prev.programs, program]
                                    }));
                                  } else {
                                    setAdvancedFilters(prev => ({
                                      ...prev,
                                      programs: prev.programs.filter(p => p !== program)
                                    }));
                                  }
                                }}
                              />
                              <Label htmlFor={`program-${program}`} className="text-sm">
                                {program}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Application Status</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {statuses.map((status) => (
                            <div key={status} className="flex items-center space-x-2">
                              <Checkbox
                                id={`status-${status}`}
                                checked={advancedFilters.statuses.includes(status)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setAdvancedFilters(prev => ({
                                      ...prev,
                                      statuses: [...prev.statuses, status]
                                    }));
                                  } else {
                                    setAdvancedFilters(prev => ({
                                      ...prev,
                                      statuses: prev.statuses.filter(s => s !== status)
                                    }));
                                  }
                                }}
                              />
                              <Label htmlFor={`status-${status}`} className="text-sm">
                                {status}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Score Range</Label>
                        <div className="flex gap-4 mt-2">
                          <div>
                            <Label htmlFor="minScore" className="text-sm">Min Score</Label>
                            <Input
                              id="minScore"
                              type="number"
                              min="0"
                              max="100"
                              value={advancedFilters.scoreRange.min}
                              onChange={(e) => setAdvancedFilters(prev => ({
                                ...prev,
                                scoreRange: { ...prev.scoreRange, min: parseInt(e.target.value) || 0 }
                              }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="maxScore" className="text-sm">Max Score</Label>
                            <Input
                              id="maxScore"
                              type="number"
                              min="0"
                              max="100"
                              value={advancedFilters.scoreRange.max}
                              onChange={(e) => setAdvancedFilters(prev => ({
                                ...prev,
                                scoreRange: { ...prev.scoreRange, max: parseInt(e.target.value) || 100 }
                              }))}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Skills</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {allSkills.map((skill) => (
                            <div key={skill} className="flex items-center space-x-2">
                              <Checkbox
                                id={`skill-${skill}`}
                                checked={advancedFilters.skills.includes(skill)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setAdvancedFilters(prev => ({
                                      ...prev,
                                      skills: [...prev.skills, skill]
                                    }));
                                  } else {
                                    setAdvancedFilters(prev => ({
                                      ...prev,
                                      skills: prev.skills.filter(s => s !== skill)
                                    }));
                                  }
                                }}
                              />
                              <Label htmlFor={`skill-${skill}`} className="text-sm">
                                {skill}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setAdvancedFiltersOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleApplyAdvancedFilters}>
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table */}
        <Card className="enhanced-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Candidates ({filteredCandidates.length})
            </CardTitle>
            <CardDescription>
              Manage candidate applications and review their profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {candidate.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{candidate.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {candidate.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {candidate.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {candidate.program}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Applied: {candidate.appliedDate}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {candidate.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{candidate.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-lg font-bold px-3 py-1 rounded-full ${getScoreColor(candidate.score)}`}>
                          {candidate.score}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Score</p>
                      </div>
                      
                      <div className="text-center">
                        <Badge className={getStatusColor(candidate.status)}>
                          {candidate.status}
                        </Badge>
                        <select
                          value={candidate.status}
                          onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                          className="mt-1 text-xs border rounded px-2 py-1"
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProfile(candidate.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        <Dialog open={feedbackDialog && selectedCandidate?.id === candidate.id} onOpenChange={setFeedbackDialog}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCandidate(candidate)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Send Feedback to {candidate.name}</DialogTitle>
                              <DialogDescription>
                                Provide personalized feedback and recommendations
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Textarea
                                placeholder="Enter your feedback and recommendations..."
                                value={feedbackMessage}
                                onChange={(e) => setFeedbackMessage(e.target.value)}
                                rows={4}
                              />
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setFeedbackDialog(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleSendFeedback}>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Feedback
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredCandidates.length === 0 && (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">No candidates found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}