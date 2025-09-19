import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  ArrowLeft,
  Upload,
  FileText,
  Image,
  CheckCircle,
  X,
  Download,
  Eye,
  AlertCircle
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'uploading' | 'processing' | 'verified' | 'failed';
}

export default function DocumentUpload() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Resume_StudentUser.pdf',
      type: 'PDF',
      size: '2.3 MB',
      uploadDate: '2025-01-15',
      status: 'verified'
    },
    {
      id: '2',
      name: 'Academic_Transcript.pdf',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2025-01-14',
      status: 'verified'
    }
  ]);

  if (!user) {
    navigate('/signin');
    return null;
  }

  const requiredDocuments = [
    {
      id: 'resume',
      title: 'Resume/CV',
      description: 'Upload your current resume or curriculum vitae',
      required: true,
      formats: 'PDF, DOC, DOCX'
    },
    {
      id: 'transcript',
      title: 'Academic Transcript',
      description: 'Official or unofficial academic transcripts',
      required: true,
      formats: 'PDF, JPG, PNG'
    },
    {
      id: 'certificate',
      title: 'Certificates',
      description: 'Professional certificates, diplomas, or degrees',
      required: false,
      formats: 'PDF, JPG, PNG'
    },
    {
      id: 'portfolio',
      title: 'Portfolio/Work Samples',
      description: 'Showcase your previous work or projects',
      required: false,
      formats: 'PDF, JPG, PNG, DOC, DOCX'
    },
    {
      id: 'identification',
      title: 'Government ID',
      description: 'Valid government-issued identification',
      required: true,
      formats: 'JPG, PNG, PDF'
    }
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid file type: PDF, DOC, DOCX, CSV, XLS, XLSX, JPG, PNG');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    const fileId = Date.now().toString();
    
    // Create new file entry
    const newFile: UploadedFile = {
      id: fileId,
      name: file.name,
      type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document',
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'uploading'
    };
    
    setUploadedFiles(prev => [...prev, newFile]);
    
    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
    
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[fileId] || 0;
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          
          // Update file status to processing
          setUploadedFiles(prev => 
            prev.map(f => f.id === fileId ? { ...f, status: 'processing' } : f)
          );
          
          // Simulate processing completion
          setTimeout(() => {
            setUploadedFiles(prev => 
              prev.map(f => f.id === fileId ? { ...f, status: 'verified' } : f)
            );
          }, 2000);
          
          return { ...prev, [fileId]: 100 };
        }
        return { ...prev, [fileId]: currentProgress + 10 };
      });
    }, 200);
  };

  const handleDeleteFile = (fileId: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });
      alert('File deleted successfully!');
    }
  };

  const handleViewFile = (file: UploadedFile) => {
    alert(`Viewing ${file.name} - This would open the file in a new window or viewer`);
  };

  const handleDownloadFile = (file: UploadedFile) => {
    alert(`Downloading ${file.name} - This would initiate file download`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'uploading': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Upload className="h-4 w-4" />;
      case 'uploading': return <Upload className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/student')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Upload</h1>
            <p className="text-gray-600">Upload required documents to complete your profile</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                  Please upload all required documents to proceed with your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {requiredDocuments.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          {doc.title}
                          {doc.required && <span className="text-red-500">*</span>}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Accepted formats: {doc.formats}</p>
                      </div>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Drag and drop your file here, or click to browse
                        </p>
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(e, doc.id)}
                          accept=".pdf,.doc,.docx,.csv,.xls,.xlsx,.jpg,.jpeg,.png"
                          className="hidden"
                          id={`upload-${doc.id}`}
                        />
                        <label
                          htmlFor={`upload-${doc.id}`}
                          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                        >
                          Choose File
                        </label>
                        <p className="text-xs text-gray-500 mt-2">Maximum file size: 10MB</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Uploaded Files Section */}
          <div className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
                <CardDescription>
                  Your uploaded documents and their verification status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {file.type === 'PDF' ? (
                            <FileText className="h-4 w-4 text-red-500" />
                          ) : (
                            <Image className="h-4 w-4 text-blue-500" />
                          )}
                          <div>
                            <p className="font-medium text-sm text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size} • {file.uploadDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewFile(file)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadFile(file)}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFile(file.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusIcon(file.status)}
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(file.status)}`}>
                          {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                        </span>
                      </div>
                      
                      {uploadProgress[file.id] !== undefined && uploadProgress[file.id] < 100 && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Uploading...</span>
                            <span>{uploadProgress[file.id]}%</span>
                          </div>
                          <Progress value={uploadProgress[file.id]} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {uploadedFiles.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">No documents uploaded yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upload Summary */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle>Upload Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Documents:</span>
                    <span className="font-medium">{uploadedFiles.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Verified:</span>
                    <span className="font-medium text-green-600">
                      {uploadedFiles.filter(f => f.status === 'verified').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing:</span>
                    <span className="font-medium text-yellow-600">
                      {uploadedFiles.filter(f => f.status === 'processing').length}
                    </span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Profile Completion:</span>
                      <span className="text-blue-600">
                        {Math.round((uploadedFiles.filter(f => f.status === 'verified').length / requiredDocuments.filter(d => d.required).length) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}