
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserData = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string>('buyer');
  const [sellerStatus, setSellerStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get user role from metadata
        const role = user.user_metadata?.role || 'buyer';
        setUserRole(role);

        // If user is a seller, check their application status
        if (role === 'seller') {
          const { data: sellerApp } = await supabase
            .from('seller_applications')
            .select('status')
            .eq('user_id', user.id)
            .single();

          setSellerStatus(sellerApp?.status || null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return { userRole, sellerStatus, loading };
};
