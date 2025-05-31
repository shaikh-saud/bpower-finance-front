
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Store, Upload, FileText } from 'lucide-react';

const SellerApplication = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [applicationForm, setApplicationForm] = useState({
    businessName: '',
    businessType: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    gstNumber: '',
    panNumber: '',
    bankAccount: '',
    ifscCode: '',
    businessDescription: '',
    productCategories: [] as string[],
    yearEstablished: '',
    expectedMonthlyVolume: '',
    agreeToTerms: false
  });

  const businessTypes = [
    'Sole Proprietorship',
    'Partnership',
    'Private Limited Company',
    'Public Limited Company',
    'LLP',
    'One Person Company'
  ];

  const productCategories = [
    'Electronics',
    'Fashion & Apparel',
    'Home & Kitchen',
    'Sports & Fitness',
    'Books & Education',
    'Beauty & Personal Care',
    'Automotive',
    'Industrial Supplies',
    'Food & Beverages',
    'Health & Wellness'
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setApplicationForm(prev => ({
        ...prev,
        productCategories: [...prev.productCategories, category]
      }));
    } else {
      setApplicationForm(prev => ({
        ...prev,
        productCategories: prev.productCategories.filter(cat => cat !== category)
      }));
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicationForm.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    if (applicationForm.productCategories.length === 0) {
      toast.error('Please select at least one product category');
      return;
    }

    setIsLoading(true);
    
    try {
      // Here you would submit the application to your backend
      // For demo purposes, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Seller application submitted successfully! You will be notified once approved.');
      navigate('/');
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-[100px]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-bpower-blue rounded-full flex items-center justify-center mb-4">
              <Store className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-bpower-blue mb-2">
              Become a Seller
            </h1>
            <p className="text-gray-600">
              Join our marketplace and start selling your products to thousands of customers
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Seller Application Form</CardTitle>
              <CardDescription>
                Please provide accurate information about your business. All applications are reviewed by our admin team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        value={applicationForm.businessName}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, businessName: e.target.value }))}
                        placeholder="Enter your business name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select 
                        value={applicationForm.businessType}
                        onValueChange={(value) => setApplicationForm(prev => ({ ...prev, businessType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="businessAddress">Business Address *</Label>
                    <Textarea
                      id="businessAddress"
                      value={applicationForm.businessAddress}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, businessAddress: e.target.value }))}
                      placeholder="Enter complete business address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessPhone">Business Phone *</Label>
                      <Input
                        id="businessPhone"
                        value={applicationForm.businessPhone}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, businessPhone: e.target.value }))}
                        placeholder="Enter business phone number"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="businessEmail">Business Email *</Label>
                      <Input
                        id="businessEmail"
                        type="email"
                        value={applicationForm.businessEmail}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, businessEmail: e.target.value }))}
                        placeholder="Enter business email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="yearEstablished">Year Established</Label>
                      <Input
                        id="yearEstablished"
                        type="number"
                        value={applicationForm.yearEstablished}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, yearEstablished: e.target.value }))}
                        placeholder="e.g., 2020"
                        min="1900"
                        max={new Date().getFullYear()}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="expectedMonthlyVolume">Expected Monthly Volume</Label>
                      <Select 
                        value={applicationForm.expectedMonthlyVolume}
                        onValueChange={(value) => setApplicationForm(prev => ({ ...prev, expectedMonthlyVolume: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select expected volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 orders</SelectItem>
                          <SelectItem value="11-50">11-50 orders</SelectItem>
                          <SelectItem value="51-100">51-100 orders</SelectItem>
                          <SelectItem value="100+">100+ orders</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Legal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Legal & Financial Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gstNumber">GST Number</Label>
                      <Input
                        id="gstNumber"
                        value={applicationForm.gstNumber}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, gstNumber: e.target.value }))}
                        placeholder="Enter GST number"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="panNumber">PAN Number *</Label>
                      <Input
                        id="panNumber"
                        value={applicationForm.panNumber}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, panNumber: e.target.value }))}
                        placeholder="Enter PAN number"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bankAccount">Bank Account Number *</Label>
                      <Input
                        id="bankAccount"
                        value={applicationForm.bankAccount}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, bankAccount: e.target.value }))}
                        placeholder="Enter bank account number"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ifscCode">IFSC Code *</Label>
                      <Input
                        id="ifscCode"
                        value={applicationForm.ifscCode}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, ifscCode: e.target.value }))}
                        placeholder="Enter IFSC code"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Product Categories */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Product Categories *</h3>
                  <p className="text-sm text-gray-600">Select the categories of products you plan to sell</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {productCategories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={applicationForm.productCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <Label htmlFor={category} className="text-sm">{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Description */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Business Description</h3>
                  
                  <div>
                    <Label htmlFor="businessDescription">Tell us about your business</Label>
                    <Textarea
                      id="businessDescription"
                      value={applicationForm.businessDescription}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, businessDescription: e.target.value }))}
                      placeholder="Describe your business, products, and what makes you unique..."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={applicationForm.agreeToTerms}
                      onCheckedChange={(checked) => setApplicationForm(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm">
                      I agree to the{' '}
                      <Button variant="link" className="p-0 h-auto text-bpower-blue">
                        Terms and Conditions
                      </Button>
                      {' '}and{' '}
                      <Button variant="link" className="p-0 h-auto text-bpower-blue">
                        Seller Policies
                      </Button>
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-bpower-blue hover:bg-bpower-green text-lg py-6"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting Application...' : 'Submit Seller Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerApplication;
