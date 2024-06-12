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
    'admin': 3
  };

  useEffect(() => {
    const checkUserTier = async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const userTier = userDoc.data().userTier;
          setUserTier(userTier);
          if (tierPriority[userTier] < tierPriority[requiredTier]) {
            navigate('/unauthorized');
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching user tier: ", error);
        navigate('/login');
      } finally {
        setCheckingAuth(false);
      }
    };

    // Fetch the current session once on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkUserTier(session.user.id);
      } else {
        navigate('/login');
      }
    });

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

  // Render children if session exists and user tier is correct
  return session && (tierPriority[userTier] >= tierPriority[requiredTier]) ? children : null;
};

export default AuthGuard;
