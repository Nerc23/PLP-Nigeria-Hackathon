import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  Bell,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Info,
  Users,
  Calendar,
  Award,
  MessageSquare,
  Trash2,
  MarkAsUnread
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

export default function NotificationCenter() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Application Approved',
      message: 'Your application for PLP Software Development has been approved! Welcome to the program.',
      timestamp: '2025-01-17 10:30 AM',
      read: false,
      actionUrl: '/student',
      actionText: 'View Program'
    },
    {
      id: '2',
      type: 'info',
      title: 'Profile Recommendation',
      message: 'Consider adding more technical skills to your profile to increase your chances of selection.',
      timestamp: '2025-01-16 2:15 PM',
      read: false,
      actionUrl: '/profile-settings',
      actionText: 'Update Profile'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Application Deadline Reminder',
      message: 'The deadline for LSETF Data Analytics Program is approaching (3 days remaining).',
      timestamp: '2025-01-15 9:00 AM',
      read: true,
      actionUrl: '/student',
      actionText: 'Apply Now'
    },
    {
      id: '4',
      type: 'alert',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on January 20th from 2:00 AM to 4:00 AM.',
      timestamp: '2025-01-14 6:00 PM',
      read: true
    },
    {
      id: '5',
      type: 'info',
      title: 'New Program Available',
      message: 'PLP Cybersecurity Specialist Track is now open for applications.',
      timestamp: '2025-01-13 11:45 AM',
      read: true,
      actionUrl: '/student',
      actionText: 'View Program'
    }
  ];

  // Admin-specific notifications
  const adminNotifications: Notification[] = [
    {
      id: 'a1',
      type: 'alert',
      title: 'New Applications Received',
      message: '15 new applications received for PLP Software Development program requiring review.',
      timestamp: '2025-01-17 11:00 AM',
      read: false,
      actionUrl: '/candidates-management',
      actionText: 'Review Applications'
    },
    {
      id: 'a2',
      type: 'warning',
      title: 'Program Deadline Approaching',
      message: 'LSETF Digital Marketing program deadline is in 2 days. 23 applications pending review.',
      timestamp: '2025-01-16 3:30 PM',
      read: false,
      actionUrl: '/program-management',
      actionText: 'Manage Program'
    },
    {
      id: 'a3',
      type: 'success',
      title: 'AI Ranking Complete',
      message: 'AI ranking has been completed for 45 candidates in the Data Analytics program.',
      timestamp: '2025-01-15 4:20 PM',
      read: true,
      actionUrl: '/ai-ranking',
      actionText: 'View Rankings'
    },
    {
      id: 'a4',
      type: 'info',
      title: 'System Analytics Update',
      message: 'Weekly analytics report is now available with updated candidate metrics.',
      timestamp: '2025-01-14 8:00 AM',
      read: true,
      actionUrl: '/analytics-dashboard',
      actionText: 'View Analytics'
    },
    {
      id: 'a5',
      type: 'alert',
      title: 'Low Acceptance Rate Alert',
      message: 'UI/UX Design program has a 15% acceptance rate. Consider reviewing criteria.',
      timestamp: '2025-01-13 1:15 PM',
      read: true,
      actionUrl: '/program-management',
      actionText: 'Review Program'
    }
  ];

  const allNotifications = user?.role === 'admin' ? [...adminNotifications, ...notifications] : notifications;
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'alert': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredNotifications = allNotifications.filter(notification => {
    if (selectedTab === 'unread') return !notification.read;
    if (selectedTab === 'read') return notification.read;
    return true;
  });

  const unreadCount = allNotifications.filter(n => !n.read).length;

  const handleNotificationAction = (notification: Notification) => {
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const markAsRead = (notificationId: string) => {
    // In a real app, this would update the backend
    console.log('Marking notification as read:', notificationId);
  };

  const deleteNotification = (notificationId: string) => {
    // In a real app, this would delete from backend
    console.log('Deleting notification:', notificationId);
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
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Bell className="h-8 w-8" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="text-gray-600">Stay updated with your applications and system alerts</p>
          </div>
        </div>

        {/* Notification Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">
              All ({allNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="read">
              Read ({allNotifications.length - unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600">
                    {selectedTab === 'unread' 
                      ? "You're all caught up! No unread notifications." 
                      : "No notifications to display."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`transition-all hover:shadow-md ${
                      !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {notification.title}
                              </h3>
                              <Badge className={getNotificationBadge(notification.type)}>
                                {notification.type}
                              </Badge>
                              {!notification.read && (
                                <Badge variant="secondary" className="text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-700 mb-3">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {notification.timestamp}
                              </p>
                              <div className="flex items-center gap-2">
                                {notification.actionUrl && (
                                  <Button 
                                    size="sm"
                                    onClick={() => handleNotificationAction(notification)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    {notification.actionText}
                                  </Button>
                                )}
                                {!notification.read && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Mark Read
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions for Admin */}
        {user?.role === 'admin' && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Manage notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/candidates-management')}
                >
                  <Users className="h-6 w-6" />
                  Review Applications
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/ai-ranking')}
                >
                  <Award className="h-6 w-6" />
                  AI Rankings
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/analytics-dashboard')}
                >
                  <AlertTriangle className="h-6 w-6" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}