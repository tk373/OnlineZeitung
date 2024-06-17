import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { db } from '../firebaseClient';
import { doc, getDoc } from 'firebase/firestore';
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/react';

const ComponentGuard = ({ children, requiredTier }) => {
  const [session, setSession] = useState(null);
  const [userTier, setUserTier] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const tierPriority = {
    'user': 1,
    'abo': 2,
    'author': 3,
    'admin': 4
  };

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        await fetchUserTier(session.user.id);
      }
      setIsLoading(false);
    };

    const fetchUserTier = async (userId) => {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const tier = userDoc.data().userTier;
        setUserTier(tier);
      } else {
        console.log("User not found or has no tier set");
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserTier(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return null; // Or loading indicator if preferred
  }

  if (!session || (userTier && tierPriority[userTier] < tierPriority[requiredTier])) {
    return (
      <Card>
        <CardHeader>Liebe Leserin, lieber Leser,</CardHeader>
        <CardBody css={{ p: "$10" }}>
          <h4>Sofort Weiterlesen mit Abo</h4>
          <p>Um vollen Zugang zu den exklusiven Inhalten von "d'poscht" zu erhalten, laden wir Sie herzlich ein, unser Abonnement zu erwerben. Für nur 3 Franken bieten wir Ihnen unbegrenzten Zugriff auf all unsere Artikel und Berichte. Mit Ihrem Abonnement unterstützen Sie nicht nur qualitativen Journalismus, sondern bleiben auch stets bestens informiert.</p>
        </CardBody>
        <CardFooter>
          <h4>Vielen Dank für Ihr Interesse an "d'poscht". Wir freuen uns darauf, Sie als Abonnenten begrüßen zu dürfen!</h4>
        </CardFooter>
      </Card>
    );
  }

  return children;
};

export default ComponentGuard;
