import React from 'react';
import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/react';

const ComponentGuard = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the current session once on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for changes in auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Render conditionally based on session state
  if (isLoading) {
    return null; // Or loading indicator if preferred
  }

  if (!session) {
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
