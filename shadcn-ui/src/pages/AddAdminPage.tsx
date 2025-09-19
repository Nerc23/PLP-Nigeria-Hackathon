import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  UserPlus,
  Shield,
  CheckCircle,
  AlertCircle,
  Settings,
  Users,
  BarChart3,
  FileText
} from 'lucide-react';

export default function AddAdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    privileges: {
      managePrograms: false,
      manageCandidates: false,
      viewAnalytics: false,
      manageAdmins: false,
      exportData: false,
      systemSettings: false
    }
  });

  const [errors, setErrors] = useState<any>({});

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const privileges = [
    {
      key: 'managePrograms',
      label: 'Manage Programs',
      description: 'Create, edit, and delete programs',
      icon: <FileText className="h-4 w-4" />
    },
    {
      key: 'manageCandidates',
      label: 'Manage Candidates',
      description: 'View, evaluate, and manage candidate applications',
      icon: <Users className="h-4 w-4" />
    },
    {
      key: 'viewAnalytics',
      label: 'View Analytics',
      description: 'Access analytics dashboard and reports',
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      key: 'manageAdmins',
      label: 'Manage Administrators',
      description: 'Add, edit, and remove admin accounts',
      icon: <Shield className="h-4 w-4" />
    },
    {
      key: 'exportData',
      label: 'Export Data',
      description: 'Export candidate data and reports',
      icon: <FileText className="h-4 w-4" />
    },
    {
      key: 'systemSettings',
      label: 'System Settings',
      description: 'Modify system configuration and settings',
      icon: <Settings className="h-4 w-4" />
    }
  ];

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    const hasPrivileges = Object.values(formData.privileges).some(Boolean);
    if (!hasPrivileges) {
      newErrors.privileges = 'At least one privilege must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful creation
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          department: '',
          privileges: {
            managePrograms: false,
            manageCandidates: false,
            viewAnalytics: false,
            manageAdmins: false,
            exportData: false,
            systemSettings: false
          }
        });
        navigate('/profile-settings');
      }, 2000);

    } catch (error) {
      setErrors({ submit: 'Failed to create admin account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrivilegeChange = (privilege: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      privileges: {
        ...prev.privileges,
        [privilege]: checked
      }
    }));
  };

  const selectedPrivilegesCount = Object.values(formData.privileges).filter(Boolean).length;

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Created Successfully!</h2>
            <p className="text-gray-600 mb-4">
              The new administrator account has been created and an invitation email has been sent.
            </p>
            <Button onClick={() => navigate('/profile-settings')} className="w-full">
              Back to Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/profile-settings')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Settings
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <UserPlus className="h-6 w-6 text-green-600" />
                Add New Administrator
              </h1>
              <p className="text-gray-600">Create a new admin account with custom privileges</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details for the new administrator
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    placeholder="e.g., IT, HR, Operations"
                    className={errors.department ? 'border-red-500' : ''}
                  />
                  {errors.department && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.department}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter password"
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm password"
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privileges */}
            <Card className="enhanced-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Administrator Privileges
                    </CardTitle>
                    <CardDescription>
                      Select the permissions for this administrator
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {selectedPrivilegesCount} selected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {privileges.map((privilege) => (
                    <div key={privilege.key} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <Checkbox
                        id={privilege.key}
                        checked={formData.privileges[privilege.key as keyof typeof formData.privileges]}
                        onCheckedChange={(checked) => handlePrivilegeChange(privilege.key, checked as boolean)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {privilege.icon}
                          <Label htmlFor={privilege.key} className="font-medium cursor-pointer">
                            {privilege.label}
                          </Label>
                        </div>
                        <p className="text-sm text-gray-600">{privilege.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.privileges && (
                  <p className="text-sm text-red-600 flex items-center gap-1 mt-4">
                    <AlertCircle className="h-3 w-3" />
                    {errors.privileges}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/profile-settings')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  'Creating Administrator...'
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Administrator
                  </>
                )}
              </Button>
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {errors.submit}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}