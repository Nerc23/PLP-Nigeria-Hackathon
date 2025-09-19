import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  ArrowLeft,
  User, 
  Settings,
  Shield,
  Bell,
  Lock,
  Download,
  Save,
  Plus,
  UserPlus,
  Eye,
  Trash2,
  Edit,
  Check,
  X
} from 'lucide-react';

export default function ProfileSettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || 'John',
    lastName: user?.name?.split(' ')[1] || 'Admin',
    email: user?.email || 'admin@example.com',
    phone: '+234 801 234 5678',
    bio: 'Experienced administrator managing educational programs and candidate selection processes.',
    organization: user?.role === 'admin' ? 'PLP Africa & LSETF' : 'Student',
    location: 'Lagos, Nigeria',
    skills: ['Program Management', 'Data Analysis', 'Team Leadership', 'Strategic Planning']
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    applicationUpdates: true,
    systemAlerts: true,
    weeklyReports: true,
    marketingEmails: false
  });

  // Mock admin data including newly added admins
  const [admins, setAdmins] = useState([
    {
      id: '1',
      name: 'John Admin',
      email: 'john.admin@example.com',
      role: 'Super Admin',
      privileges: ['All Access', 'User Management', 'System Settings'],
      lastActive: '2025-01-17',
      status: 'Active',
      addedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Manager',
      email: 'sarah.manager@example.com',
      role: 'Program Manager',
      privileges: ['Program Management', 'Candidate Review', 'Analytics View'],
      lastActive: '2025-01-16',
      status: 'Active',
      addedDate: '2024-03-20'
    },
    {
      id: '3',
      name: 'Mike Analyst',
      email: 'mike.analyst@example.com',
      role: 'Data Analyst',
      privileges: ['Analytics View', 'Report Generation', 'Data Export'],
      lastActive: '2025-01-15',
      status: 'Active',
      addedDate: '2024-06-10'
    },
    {
      id: '4',
      name: 'Lisa Coordinator',
      email: 'lisa.coordinator@example.com',
      role: 'Program Coordinator',
      privileges: ['Candidate Review', 'Communication Management'],
      lastActive: '2025-01-14',
      status: 'Active',
      addedDate: '2024-09-05'
    },
    {
      id: '5',
      name: 'David Reviewer',
      email: 'david.reviewer@example.com',
      role: 'Senior Reviewer',
      privileges: ['Candidate Review', 'AI Ranking Access'],
      lastActive: '2025-01-13',
      status: 'Inactive',
      addedDate: '2024-11-12'
    }
  ]);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Profile updated successfully!');
    setIsLoading(false);
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Notification preferences saved successfully!');
    setIsLoading(false);
  };

  const handleAddAdmin = () => {
    navigate('/add-admin');
  };

  const handleEditAdmin = (adminId: string) => {
    const admin = admins.find(a => a.id === adminId);
    alert(`Edit admin functionality for ${admin?.name}. This would open an edit form with current admin details.`);
  };

  const handleDeleteAdmin = (adminId: string) => {
    const admin = admins.find(a => a.id === adminId);
    if (confirm(`Are you sure you want to delete admin "${admin?.name}"? This action cannot be undone.`)) {
      setAdmins(prev => prev.filter(admin => admin.id !== adminId));
      alert(`Admin "${admin?.name}" has been successfully deleted!`);
    }
  };

  const handleToggleAdminStatus = (adminId: string) => {
    setAdmins(prev => prev.map(admin => 
      admin.id === adminId 
        ? { ...admin, status: admin.status === 'Active' ? 'Inactive' : 'Active' }
        : admin
    ));
    const admin = admins.find(a => a.id === adminId);
    const newStatus = admin?.status === 'Active' ? 'Inactive' : 'Active';
    alert(`Admin "${admin?.name}" status changed to ${newStatus}`);
  };

  const handleExportData = () => {
    const userData = {
      profile: profileData,
      notifications: notificationSettings,
      adminCount: admins.length,
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `profile_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('Profile data exported successfully!');
  };

  const handleChangePassword = () => {
    alert('Password change form would be displayed here with current password, new password, and confirm password fields.');
  };

  const handleEnable2FA = () => {
    alert('Two-factor authentication setup would be initiated here with QR code and verification steps.');
  };

  const handleViewSessions = () => {
    alert('Active login sessions would be displayed here with device info, location, and last activity.');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.')) {
      alert('Account deletion process would be initiated here with final confirmation steps.');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin': return 'bg-red-100 text-red-800';
      case 'Program Manager': return 'bg-blue-100 text-blue-800';
      case 'Data Analyst': return 'bg-green-100 text-green-800';
      case 'Program Coordinator': return 'bg-purple-100 text-purple-800';
      case 'Senior Reviewer': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            {user?.role === 'admin' && <TabsTrigger value="admin-management">Admin Management</TabsTrigger>}
            <TabsTrigger value="data">Data & Privacy</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={profileData.organization}
                      onChange={(e) => setProfileData(prev => ({ ...prev, organization: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Skill
                  </Button>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isLoading}>
                    {isLoading ? (
                      'Saving...'
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Application Updates</h4>
                      <p className="text-sm text-gray-600">Get notified about application status changes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.applicationUpdates}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, applicationUpdates: e.target.checked }))}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">System Alerts</h4>
                      <p className="text-sm text-gray-600">Important system notifications and alerts</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.systemAlerts}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, systemAlerts: e.target.checked }))}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Weekly Reports</h4>
                      <p className="text-sm text-gray-600">Receive weekly analytics and summary reports</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyReports}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, weeklyReports: e.target.checked }))}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Marketing Emails</h4>
                      <p className="text-sm text-gray-600">Promotional content and program updates</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.marketingEmails}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                      className="rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications} disabled={isLoading}>
                    {isLoading ? (
                      'Saving...'
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Preferences
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Password</h4>
                        <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                      </div>
                      <Button variant="outline" onClick={handleChangePassword}>
                        Change Password
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" onClick={handleEnable2FA}>
                        Enable 2FA
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Login Sessions</h4>
                        <p className="text-sm text-gray-600">Manage your active sessions</p>
                      </div>
                      <Button variant="outline" onClick={handleViewSessions}>
                        View Sessions
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-red-900">Delete Account</h4>
                        <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" onClick={handleDeleteAccount}>
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Management Tab */}
          {user?.role === 'admin' && (
            <TabsContent value="admin-management" className="space-y-6">
              <Card className="enhanced-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Admin Management
                      </CardTitle>
                      <CardDescription>
                        Manage admin users and their privileges ({admins.length} total admins)
                      </CardDescription>
                    </div>
                    <Button onClick={handleAddAdmin}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Admin
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {admins.map((admin) => (
                      <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {admin.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{admin.name}</h4>
                            <p className="text-sm text-gray-600">{admin.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getRoleColor(admin.role)}>
                                {admin.role}
                              </Badge>
                              <Badge className={admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {admin.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Added: {admin.addedDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right text-sm text-gray-600 mr-4">
                            <p>Last active: {admin.lastActive}</p>
                            <p className="text-xs">Privileges: {admin.privileges.slice(0, 2).join(', ')}{admin.privileges.length > 2 ? '...' : ''}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" onClick={() => handleEditAdmin(admin.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleToggleAdminStatus(admin.id)}
                              className={admin.status === 'Active' ? 'text-orange-600' : 'text-green-600'}
                            >
                              {admin.status === 'Active' ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteAdmin(admin.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold text-gray-900 mb-4">Admin Statistics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{admins.length}</p>
                        <p className="text-sm text-gray-600">Total Admins</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{admins.filter(a => a.status === 'Active').length}</p>
                        <p className="text-sm text-gray-600">Active</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-600">{admins.filter(a => a.status === 'Inactive').length}</p>
                        <p className="text-sm text-gray-600">Inactive</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">{new Set(admins.map(a => a.role)).size}</p>
                        <p className="text-sm text-gray-600">Unique Roles</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Data & Privacy Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Data & Privacy
                </CardTitle>
                <CardDescription>
                  Manage your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Export Data</h4>
                        <p className="text-sm text-gray-600">Download a copy of your personal data</p>
                      </div>
                      <Button variant="outline" onClick={handleExportData}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Data Usage</h4>
                        <p className="text-sm text-gray-600">View how your data is being used</p>
                      </div>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Usage
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                        <p className="text-sm text-gray-600">Control who can see your information</p>
                      </div>
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Privacy
                      </Button>
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