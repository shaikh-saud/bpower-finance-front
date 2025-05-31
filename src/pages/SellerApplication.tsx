
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';

const SellerApplication = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    business_type: '',
    business_address: '',
    contact_phone: '',
    business_registration_number: '',
    gst_number: '',
    bank_account_number: '',
    bank_name: '',
    ifsc_code: '',
    account_holder_name: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('seller_applications')
        .insert({
          user_id: user.id,
          ...formData
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error('You have already submitted a seller application.');
        } else {
          throw error;
        }
      } else {
        toast.success('Seller application submitted successfully! We will review your application and notify you via email.');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12 mt-[100px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-bpower-blue mb-4">Become a Seller</h1>
              <p className="text-gray-600">Fill out the application form to start selling on our marketplace</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Seller Application Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Business Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="business_name">Business Name *</Label>
                      <Input
                        id="business_name"
                        value={formData.business_name}
                        onChange={(e) => handleInputChange('business_name', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="business_type">Business Type *</Label>
                      <Select 
                        value={formData.business_type} 
                        onValueChange={(value) => handleInputChange('business_type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manufacturer">Manufacturer</SelectItem>
                          <SelectItem value="distributor">Distributor</SelectItem>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="service_provider">Service Provider</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="business_address">Business Address *</Label>
                    <Textarea
                      id="business_address"
                      value={formData.business_address}
                      onChange={(e) => handleInputChange('business_address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contact_phone">Contact Phone *</Label>
                      <Input
                        id="contact_phone"
                        value={formData.contact_phone}
                        onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="business_registration_number">Business Registration Number</Label>
                      <Input
                        id="business_registration_number"
                        value={formData.business_registration_number}
                        onChange={(e) => handleInputChange('business_registration_number', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="gst_number">GST Number</Label>
                    <Input
                      id="gst_number"
                      value={formData.gst_number}
                      onChange={(e) => handleInputChange('gst_number', e.target.value)}
                    />
                  </div>

                  {/* Bank Details */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Bank Account Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="bank_name">Bank Name *</Label>
                        <Input
                          id="bank_name"
                          value={formData.bank_name}
                          onChange={(e) => handleInputChange('bank_name', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="account_holder_name">Account Holder Name *</Label>
                        <Input
                          id="account_holder_name"
                          value={formData.account_holder_name}
                          onChange={(e) => handleInputChange('account_holder_name', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <Label htmlFor="bank_account_number">Bank Account Number *</Label>
                        <Input
                          id="bank_account_number"
                          value={formData.bank_account_number}
                          onChange={(e) => handleInputChange('bank_account_number', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="ifsc_code">IFSC Code *</Label>
                        <Input
                          id="ifsc_code"
                          value={formData.ifsc_code}
                          onChange={(e) => handleInputChange('ifsc_code', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/')}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-bpower-blue hover:bg-bpower-green"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SellerApplication;
