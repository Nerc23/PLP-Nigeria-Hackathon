import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Calendar, Users, Target } from 'lucide-react';
import { Program } from '@/types';

export default function ProgramManagement() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredSkills: '',
    criteria: '',
    maxApplicants: '',
    deadline: '',
    category: '',
    duration: '',
    level: ''
  });

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = () => {
    const savedPrograms = JSON.parse(localStorage.getItem('programs') || '[]');
    setPrograms(savedPrograms);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requiredSkills: '',
      criteria: '',
      maxApplicants: '',
      deadline: '',
      category: '',
      duration: '',
      level: ''
    });
    setEditingProgram(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const programData: Program = {
      id: editingProgram?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()).filter(s => s),
      criteria: formData.criteria,
      maxApplicants: parseInt(formData.maxApplicants) || 50,
      deadline: formData.deadline,
      createdBy: 'admin-1', // Current admin user
      category: formData.category,
      duration: formData.duration,
      level: formData.level as 'Beginner' | 'Intermediate' | 'Advanced',
      createdAt: editingProgram?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const existingPrograms = JSON.parse(localStorage.getItem('programs') || '[]');
    
    if (editingProgram) {
      const updatedPrograms = existingPrograms.map((p: Program) => 
        p.id === editingProgram.id ? programData : p
      );
      localStorage.setItem('programs', JSON.stringify(updatedPrograms));
    } else {
      existingPrograms.push(programData);
      localStorage.setItem('programs', JSON.stringify(existingPrograms));
    }

    loadPrograms();
    resetForm();
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setFormData({
      title: program.title,
      description: program.description,
      requiredSkills: program.requiredSkills.join(', '),
      criteria: program.criteria,
      maxApplicants: program.maxApplicants.toString(),
      deadline: program.deadline,
      category: program.category || '',
      duration: program.duration || '',
      level: program.level || ''
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = (programId: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      const existingPrograms = JSON.parse(localStorage.getItem('programs') || '[]');
      const updatedPrograms = existingPrograms.filter((p: Program) => p.id !== programId);
      localStorage.setItem('programs', JSON.stringify(updatedPrograms));
      loadPrograms();
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Program Management</h1>
          <p className="text-muted-foreground">Create and manage PLP/LSETF programs</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Create Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProgram ? 'Edit Program' : 'Create New Program'}</DialogTitle>
              <DialogDescription>
                {editingProgram ? 'Update program details' : 'Fill in the details to create a new program'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Program Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Full Stack Web Development"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="mobile-development">Mobile Development</SelectItem>
                      <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                      <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the program objectives, what participants will learn..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="e.g., 12 weeks, 6 months"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requiredSkills">Required Skills (comma-separated)</Label>
                <Input
                  id="requiredSkills"
                  value={formData.requiredSkills}
                  onChange={(e) => handleInputChange('requiredSkills', e.target.value)}
                  placeholder="e.g., JavaScript, React, Node.js, HTML, CSS"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="criteria">Selection Criteria *</Label>
                <Textarea
                  id="criteria"
                  value={formData.criteria}
                  onChange={(e) => handleInputChange('criteria', e.target.value)}
                  placeholder="Describe what you're looking for in candidates..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxApplicants">Max Applicants</Label>
                  <Input
                    id="maxApplicants"
                    type="number"
                    value={formData.maxApplicants}
                    onChange={(e) => handleInputChange('maxApplicants', e.target.value)}
                    placeholder="50"
                    min="1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  {editingProgram ? 'Update Program' : 'Create Program'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Programs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{program.title}</CardTitle>
                  <div className="flex gap-2">
                    {program.category && (
                      <Badge variant="secondary" className="text-xs">
                        {program.category.replace('-', ' ').toUpperCase()}
                      </Badge>
                    )}
                    {program.level && (
                      <Badge className={`text-xs ${getLevelColor(program.level)}`}>
                        {program.level}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(program)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(program.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="line-clamp-3">
                {program.description}
              </CardDescription>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Max {program.maxApplicants} applicants</span>
                </div>
                
                {program.duration && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{program.duration}</span>
                  </div>
                )}
                
                {program.deadline && (
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span>Deadline: {new Date(program.deadline).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {program.requiredSkills.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {program.requiredSkills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {program.requiredSkills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{program.requiredSkills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {programs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Programs Created</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first program
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Program
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}