import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  ArrowLeft,
  BarChart3, 
  TrendingUp,
  Users,
  Target,
  Award,
  Download,
  Filter
} from 'lucide-react';

interface AnalyticsData {
  totalApplications: number;
  averageScore: number;
  acceptanceRate: number;
  programCompletion: number;
}

export default function AnalyticsDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    programs: [] as string[],
    statuses: [] as string[],
    scoreRange: { min: 0, max: 100 }
  });

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  // Dynamic analytics data based on time period
  const getAnalyticsData = (period: string): AnalyticsData => {
    const baseData = {
      '7days': { totalApplications: 45, averageScore: 82.1, acceptanceRate: 28, programCompletion: 89 },
      '30days': { totalApplications: 250, averageScore: 84.2, acceptanceRate: 32, programCompletion: 91 },
      '90days': { totalApplications: 680, averageScore: 83.7, acceptanceRate: 35, programCompletion: 88 },
      '1year': { totalApplications: 2840, averageScore: 85.1, acceptanceRate: 38, programCompletion: 92 }
    };
    return baseData[period as keyof typeof baseData] || baseData['30days'];
  };

  const analyticsData = getAnalyticsData(selectedPeriod);

  const programs = ['PLP Software Development', 'LSETF Data Analytics', 'PLP UI/UX Design', 'LSETF Digital Marketing'];
  const statuses = ['Pending', 'Under Review', 'Shortlisted', 'Accepted', 'Rejected'];

  const handleExportReport = () => {
    const reportData = {
      period: selectedPeriod,
      analytics: analyticsData,
      filters: filters,
      generatedAt: new Date().toISOString()
    };

    const csvContent = [
      ['Analytics Report - ' + selectedPeriod],
      ['Generated:', new Date().toLocaleString()],
      [''],
      ['Key Metrics'],
      ['Total Applications', analyticsData.totalApplications],
      ['Average Score', analyticsData.averageScore],
      ['Acceptance Rate', analyticsData.acceptanceRate + '%'],
      ['Program Completion', analyticsData.programCompletion + '%'],
      [''],
      ['Applied Filters'],
      ['Programs', filters.programs.join(', ') || 'All'],
      ['Statuses', filters.statuses.join(', ') || 'All'],
      ['Score Range', `${filters.scoreRange.min} - ${filters.scoreRange.max}`]
    ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_report_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert('Analytics report exported successfully!');
  };

  const handleApplyFilters = () => {
    alert('Advanced filters applied successfully! Data has been refreshed with selected criteria.');
    setAdvancedFiltersOpen(false);
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case '7days': return 'Last 7 days';
      case '30days': return 'Last 30 days';
      case '90days': return 'Last 90 days';
      case '1year': return 'Last year';
      default: return 'Last 30 days';
    }
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
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-8 w-8 text-green-600" />
                Analytics Dashboard
              </h1>
              <p className="text-gray-600">Comprehensive analytics and insights for {getPeriodLabel(selectedPeriod)}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="block w-40 p-2 border border-gray-300 rounded-md"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Dialog open={advancedFiltersOpen} onOpenChange={setAdvancedFiltersOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Advanced Filters</DialogTitle>
                  <DialogDescription>
                    Apply advanced filters to customize your analytics view
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Programs</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {programs.map((program) => (
                        <div key={program} className="flex items-center space-x-2">
                          <Checkbox
                            id={program}
                            checked={filters.programs.includes(program)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters(prev => ({
                                  ...prev,
                                  programs: [...prev.programs, program]
                                }));
                              } else {
                                setFilters(prev => ({
                                  ...prev,
                                  programs: prev.programs.filter(p => p !== program)
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={program} className="text-sm">
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
                            id={status}
                            checked={filters.statuses.includes(status)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters(prev => ({
                                  ...prev,
                                  statuses: [...prev.statuses, status]
                                }));
                              } else {
                                setFilters(prev => ({
                                  ...prev,
                                  statuses: prev.statuses.filter(s => s !== status)
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={status} className="text-sm">
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
                        <input
                          id="minScore"
                          type="number"
                          min="0"
                          max="100"
                          value={filters.scoreRange.min}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            scoreRange: { ...prev.scoreRange, min: parseInt(e.target.value) || 0 }
                          }))}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxScore" className="text-sm">Max Score</Label>
                        <input
                          id="maxScore"
                          type="number"
                          min="0"
                          max="100"
                          value={filters.scoreRange.max}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            scoreRange: { ...prev.scoreRange, max: parseInt(e.target.value) || 100 }
                          }))}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setAdvancedFiltersOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleApplyFilters}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="enhanced-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.totalApplications.toLocaleString()}</p>
                  <p className="text-sm text-green-600 font-medium">
                    {selectedPeriod === '7days' ? '+5% from previous week' :
                     selectedPeriod === '30days' ? '+12% from previous month' :
                     selectedPeriod === '90days' ? '+8% from previous quarter' :
                     '+15% from previous year'}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-50">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="enhanced-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.averageScore}</p>
                  <p className="text-sm text-green-600 font-medium">
                    {selectedPeriod === '7days' ? '+1.2 from previous week' :
                     selectedPeriod === '30days' ? '+2.1 from previous month' :
                     selectedPeriod === '90days' ? '+1.8 from previous quarter' :
                     '+3.2 from previous year'}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-50">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="enhanced-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Acceptance Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.acceptanceRate}%</p>
                  <p className="text-sm text-green-600 font-medium">
                    {selectedPeriod === '7days' ? '+2% from previous week' :
                     selectedPeriod === '30days' ? '+5% from previous month' :
                     selectedPeriod === '90days' ? '+3% from previous quarter' :
                     '+8% from previous year'}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-50">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="enhanced-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Program Completion</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.programCompletion}%</p>
                  <p className="text-sm text-green-600 font-medium">
                    {selectedPeriod === '7days' ? '+1% from previous week' :
                     selectedPeriod === '30days' ? '+3% from previous month' :
                     selectedPeriod === '90days' ? '+2% from previous quarter' :
                     '+5% from previous year'}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-50">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Analytics Overview - {getPeriodLabel(selectedPeriod)}</CardTitle>
                <CardDescription>
                  Key performance indicators and metrics for the selected time period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Application Volume</h3>
                    <p className="text-2xl font-bold text-blue-700">{analyticsData.totalApplications}</p>
                    <p className="text-sm text-blue-600">Total applications received</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Quality Score</h3>
                    <p className="text-2xl font-bold text-green-700">{analyticsData.averageScore}/100</p>
                    <p className="text-sm text-green-600">Average candidate score</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Selection Rate</h3>
                    <p className="text-2xl font-bold text-purple-700">{analyticsData.acceptanceRate}%</p>
                    <p className="text-sm text-purple-600">Candidates accepted</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-orange-900 mb-2">Success Rate</h3>
                    <p className="text-2xl font-bold text-orange-700">{analyticsData.programCompletion}%</p>
                    <p className="text-sm text-orange-600">Program completion rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Program Performance</CardTitle>
                <CardDescription>
                  Performance metrics by program for {getPeriodLabel(selectedPeriod)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programs.map((program, index) => (
                    <div key={program} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{program}</h3>
                        <span className="text-sm text-gray-600">
                          {Math.floor(analyticsData.totalApplications / programs.length * (1 + index * 0.2))} applications
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Acceptance Rate</p>
                          <p className="font-semibold">{analyticsData.acceptanceRate + index * 2}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Avg Score</p>
                          <p className="font-semibold">{(analyticsData.averageScore + index * 1.5).toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Completion</p>
                          <p className="font-semibold">{analyticsData.programCompletion + index}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Trends Analysis</CardTitle>
                <CardDescription>
                  Historical trends and patterns for {getPeriodLabel(selectedPeriod)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Key Trends</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Application Growth</span>
                        <span className="font-semibold text-green-600">↗ +{selectedPeriod === '1year' ? '15' : selectedPeriod === '90days' ? '8' : '12'}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Score Improvement</span>
                        <span className="font-semibold text-blue-600">↗ +{selectedPeriod === '1year' ? '3.2' : selectedPeriod === '90days' ? '1.8' : '2.1'} points</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Acceptance Rate</span>
                        <span className="font-semibold text-purple-600">↗ +{selectedPeriod === '1year' ? '8' : selectedPeriod === '90days' ? '3' : '5'}%</span>
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