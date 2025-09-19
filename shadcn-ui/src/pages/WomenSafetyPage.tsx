import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Phone, 
  AlertTriangle, 
  Users, 
  Lock, 
  Heart,
  MessageCircle,
  UserCheck,
  Clock,
  MapPin,
  CheckCircle,
  FileText,
  Star
} from 'lucide-react';

export default function WomenSafetyPage() {
  const safetyFeatures = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "24/7 Safety Hotline",
      description: "Dedicated emergency support line staffed by trained counselors",
      status: "Active",
      color: "text-green-600"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Anonymous Reporting",
      description: "Secure, confidential reporting system for harassment or safety concerns",
      status: "Available",
      color: "text-blue-600"
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Background Verification",
      description: "Comprehensive background checks for all platform participants",
      status: "Mandatory",
      color: "text-purple-600"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure Communication",
      description: "End-to-end encrypted messaging and video calls",
      status: "Enabled",
      color: "text-indigo-600"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Safe Workspace Directory",
      description: "Verified safe co-working spaces and meeting locations",
      status: "Updated",
      color: "text-teal-600"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Mental Health Support",
      description: "Access to counseling and mental health resources",
      status: "Available",
      color: "text-pink-600"
    }
  ];

  const safetyStats = [
    { label: "Women Participants", value: "68%", icon: <Users className="h-5 w-5" /> },
    { label: "Safety Incidents", value: "0.02%", icon: <Shield className="h-5 w-5" /> },
    { label: "Response Time", value: "<5min", icon: <Clock className="h-5 w-5" /> },
    { label: "Satisfaction Rate", value: "98.7%", icon: <Star className="h-5 w-5" /> }
  ];

  const safetyGuidelines = [
    "Always meet in verified safe spaces during initial interactions",
    "Use platform communication tools instead of personal contact information",
    "Report any inappropriate behavior immediately through our reporting system",
    "Attend safety orientation sessions before starting any program",
    "Keep emergency contacts updated in your profile",
    "Use the buddy system when attending events or meetings",
    "Trust your instincts - if something feels wrong, seek help immediately"
  ];

  const emergencyContacts = [
    { service: "Platform Safety Hotline", number: "+234-800-SAFE-NOW", available: "24/7" },
    { service: "Nigeria Police Emergency", number: "199", available: "24/7" },
    { service: "Women's Rights Helpline", number: "+234-800-WOMEN-1", available: "24/7" },
    { service: "Mental Health Crisis Line", number: "+234-800-MIND-HELP", available: "24/7" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Women's Safety & Security</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive safety measures and support systems designed specifically for women in platform work
          </p>
        </div>

        {/* Safety Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {safetyStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center text-pink-600 mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Alert */}
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Emergency:</strong> If you're in immediate danger, call 199 (Nigeria Police) or use our 
            emergency button in the app. For non-emergency safety concerns, contact our 24/7 safety hotline.
          </AlertDescription>
        </Alert>

        {/* Safety Features */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-pink-600" />
              Safety Features & Protections
            </CardTitle>
            <CardDescription>
              Comprehensive safety measures designed to protect women in platform work
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyFeatures.map((feature, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {feature.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-purple-600" />
                Safety Guidelines
              </CardTitle>
              <CardDescription>
                Essential safety practices for women in platform work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {safetyGuidelines.map((guideline, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{guideline}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-6 w-6 text-red-600" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>
                Important numbers to keep handy for safety and support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-sm">{contact.service}</h4>
                        <p className="text-lg font-mono text-blue-600">{contact.number}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {contact.available}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reporting System */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-blue-600" />
              Anonymous Reporting System
            </CardTitle>
            <CardDescription>
              Safe and confidential way to report safety concerns or inappropriate behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Report Incident</h3>
                <p className="text-sm text-gray-600">Anonymous and secure reporting</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Investigation</h3>
                <p className="text-sm text-gray-600">Professional review and action</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Protection</h3>
                <p className="text-sm text-gray-600">Immediate safety measures</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Safety Concern
              </Button>
              <Button variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                Anonymous Feedback
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Resources */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-600" />
              Support Resources
            </CardTitle>
            <CardDescription>
              Additional resources and support for women's empowerment and safety
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Legal Support</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Free legal consultation for workplace harassment and discrimination cases
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Career Counseling</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Professional guidance for career development and advancement
                </p>
                <Button variant="outline" size="sm">Schedule Session</Button>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Financial Literacy</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Workshops on financial planning and economic empowerment
                </p>
                <Button variant="outline" size="sm">Join Workshop</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}