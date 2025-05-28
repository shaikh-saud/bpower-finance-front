import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SellerDocumentUploadSection: React.FC = () => {
  const [panCardFile, setPanCardFile] = useState<File | null>(null);
  const [businessDocFile, setBusinessDocFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handlePanCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG or PDF file",
        variant: "destructive"
      });
      return;
    }

    setPanCardFile(file);
    toast({
      title: "PAN Card uploaded",
      description: "Your PAN Card has been uploaded successfully",
    });
  };

  const handleBusinessDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG or PDF file",
        variant: "destructive"
      });
      return;
    }

    setBusinessDocFile(file);
    toast({
      title: "Business Document uploaded",
      description: "Your Business Document has been uploaded successfully",
    });
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-4">Document Upload</h2>

      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium">PAN Card</p>
            {panCardFile && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Uploaded</span>
              </div>
            )}
          </div>

          {!panCardFile ? (
            <div className="border-dashed border-2 border-gray-300 p-6 rounded-md text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 mb-2">Upload PAN Card (Required)</p>
              <Button
                variant="outline"
                className="relative"
                onClick={() => document.getElementById('panCardUpload')?.click()}
              >
                Select File
                <Input
                  id="panCardUpload"
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handlePanCardUpload}
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              </Button>
              <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
            </div>
          ) : (
            <div className="bg-green-50 p-3 rounded-md">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{panCardFile.name}</p>
                  <p className="text-xs text-gray-500">{(panCardFile.size / 1024).toFixed(1)} KB</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setPanCardFile(null)}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium">Business Registration Document</p>
            {businessDocFile && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Uploaded</span>
              </div>
            )}
          </div>

          {!businessDocFile ? (
            <div className="border-dashed border-2 border-gray-300 p-6 rounded-md text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 mb-2">Upload Business Registration Document (Required)</p>
              <Button
                variant="outline"
                className="relative"
                onClick={() => document.getElementById('businessDocUpload')?.click()}
              >
                Select File
                <Input
                  id="businessDocUpload"
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleBusinessDocUpload}
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              </Button>
              <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
            </div>
          ) : (
            <div className="bg-green-50 p-3 rounded-md">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{businessDocFile.name}</p>
                  <p className="text-xs text-gray-500">{(businessDocFile.size / 1024).toFixed(1)} KB</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setBusinessDocFile(null)}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDocumentUploadSection;
