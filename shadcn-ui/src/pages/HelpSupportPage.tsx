import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  ArrowLeft,
  Mail,
  Phone,
  MessageCircle,
  HelpCircle,
  BookOpen,
  Video,
  FileText,
  Send,
  Clock,
  CheckCircle
} from 'lucide-react';

export default function HelpSupportPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate ticket submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Support ticket submitted successfully! You will receive a response within 24 hours.');
    setTicketForm({ subject: '', category: '', message: '' });
    setIsSubmitting(false);
  };

  const supportContacts = [
    {
      type: "General Support",
      email: "support@aiselectiontool.com",
      phone: "+234 801 234 5678",
      hours: "Mon-Fri, 9AM-6PM WAT"
    },
    {
      type: "Technical Issues",
      email: "tech@aiselectiontool.com",
      phone: "+234 801 234 5679",
      hours: "24/7 Support"
    },
    {
      type: "Account Issues",
      email: "accounts@aiselectiontool.com",
      phone: "+234 801 234 5680",
      hours: "Mon-Fri, 8AM-8PM WAT"
    }
  ];

  const faqs = [
    {
      question: "How do I apply to a program?",
      answer: "To apply to a program, navigate to the 'Available Programs' tab in your dashboard, find the program you're interested in, and click 'Apply Now'. Fill out the application form completely and submit all required documents."
    },
    {
      question: "How can I track my application status?",
      answer: "You can track your application status in the 'My Applications' tab on your dashboard. Each application will show its current status: Under Review, Shortlisted, Accepted, or Rejected."
    },
    {
      question: "What should I do if I forgot my password?",
      answer: "Click on 'Forgot Password' on the sign-in page. Enter your email address and you'll receive instructions to reset your password."
    },
    {
      question: "How do I update my profile information?",
      answer: "Go to 'Profile Management' in your dashboard or click 'Profile Settings' in the navigation bar. You can edit your personal information, skills, and upload documents there."
    },
    {
      question: "When will I hear back about my application?",
      answer: "Application review times vary by program. Typically, you'll hear back within 2-4 weeks of the application deadline. Check your email regularly and monitor your dashboard for updates."
    },
    {
      question: "Can I apply to multiple programs?",
      answer: "Yes, you can apply to multiple programs. However, make sure you meet the requirements for each program and can commit to the time requirements if accepted."
    },
    {
      question: "How do I download my application data?",
      answer: "In your dashboard, go to Settings > Account Settings and click 'Download My Data'. This will generate a file containing your profile, applications, and feedback."
    },
    {
      question: "What browsers are supported?",
      answer: "Our platform works best on Chrome, Firefox, Safari, and Edge. Make sure your browser is updated to the latest version for the best experience."
    }
  ];

  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn how to set up your profile and navigate the platform",
      icon: <BookOpen className="h-6 w-6" />,
      link: "#"
    },
    {
      title: "Application Process",
      description: "Step-by-step guide to applying for programs",
      icon: <FileText className="h-6 w-6" />,
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Watch video guides for common tasks",
      icon: <Video className="h-6 w-6" />,
      link: "#"
    }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
            <p className="text-gray-600">Get help with using the AI Selection Tool platform</p>
          </div>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="guides">User Guides</TabsTrigger>
            <TabsTrigger value="ticket">Submit Ticket</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find answers to common questions about using our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Support Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportContacts.map((contact, index) => (
                <Card key={index} className="enhanced-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{contact.type}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{contact.email}</p>
                        <p className="text-sm text-gray-600">Email Support</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">{contact.phone}</p>
                        <p className="text-sm text-gray-600">Phone Support</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium">{contact.hours}</p>
                        <p className="text-sm text-gray-600">Support Hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
                <CardDescription>
                  For urgent technical issues or account problems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-bold text-red-800">Emergency Hotline: +234 800 HELP NOW</p>
                      <p className="text-red-600">Available 24/7 for critical issues</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide, index) => (
                <Card key={index} className="enhanced-card cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {guide.icon}
                      </div>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{guide.description}</p>
                    <Button variant="outline" className="w-full">
                      View Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Platform Navigation Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Dashboard Navigation</p>
                      <p className="text-gray-600 text-sm">Use the tabs at the top to switch between different sections of your dashboard.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Profile Completion</p>
                      <p className="text-gray-600 text-sm">Complete your profile to increase your chances of being selected for programs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Application Tracking</p>
                      <p className="text-gray-600 text-sm">Monitor your application status regularly and respond promptly to any requests.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Ticket Tab */}
          <TabsContent value="ticket" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Submit Support Ticket
                </CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Submit a support ticket and we'll get back to you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, category: e.target.value }))}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account Problem</option>
                      <option value="application">Application Issue</option>
                      <option value="profile">Profile Management</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue in detail..."
                      rows={6}
                      value={ticketForm.message}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Ticket
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 font-medium mb-2">Response Time</p>
                  <p className="text-blue-600 text-sm">
                    We typically respond to support tickets within 24 hours during business days. 
                    For urgent issues, please use our emergency contact information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}