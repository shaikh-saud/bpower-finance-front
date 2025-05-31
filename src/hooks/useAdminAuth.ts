
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
}

export const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in via localStorage
    const adminData = localStorage.getItem('admin_user');
    if (adminData) {
      setAdminUser(JSON.parse(adminData));
    }
    setLoading(false);
  }, []);

  const adminLogin = async (email: string, password: string) => {
    try {
      // For demo purposes, we'll use simple credential check
      // In production, implement proper password hashing
      if (email === 'admin@bpower.com' && password === 'admin123') {
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', email)
          .single();

        if (error) throw error;
        
        const adminUserData = {
          id: data.id,
          email: data.email,
          full_name: data.full_name,
          is_active: data.is_active
        };

        setAdminUser(adminUserData);
        localStorage.setItem('admin_user', JSON.stringify(adminUserData));
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const adminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('admin_user');
  };

  return {
    adminUser,
    loading,
    adminLogin,
    adminLogout
  };
};
