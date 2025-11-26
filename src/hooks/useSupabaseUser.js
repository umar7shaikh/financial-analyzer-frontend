// src/hooks/useSupabaseUser.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function useSupabaseUser() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const updateUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    updateUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => { authListener?.subscription.unsubscribe(); };
  }, []);

  return user;
}
