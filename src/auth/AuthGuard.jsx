import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../supabaseClient'
import { app, db } from '../firebaseClient';
import { doc, addDoc, getDoc } from 'firebase/firestore';

const AuthGuard = ({ children, requiredTier }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [userTier, setUserTier] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const tierPriority = {
    'user': 1,
    'abo': 2,
    'author': 3,
    'admin': 4
  };

  useEffect(() => {
    const sessionCheck = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        await checkUserTier(session.user.id);
      } else {
        navigate('/login');
      }
    };

    sessionCheck();

    const checkUserTier = async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const tier = userDoc.data().userTier; 
          setUserTier(tier);
          if (tierPriority[tier] < tierPriority[requiredTier]) {
            navigate('/unauthorized');
          }
        } else {
          console.log("User not found");
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching user tier: ", error);
        navigate('/login');
      } finally {
        setCheckingAuth(false);
      }
    };

    // Listen for changes in auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkUserTier(session.user.id);
      } else {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, requiredTier]);

  if (checkingAuth) {
    return null; // Or a loading spinner, if preferred
  }

  return session && (tierPriority[userTier] >= tierPriority[requiredTier]) ? children : null;
};

export default AuthGuard;
