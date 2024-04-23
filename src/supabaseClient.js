import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wdaheabfdpxciadluqxu.supabase.co'; // Ersetzen Sie 'Ihre-Supabase-URL' mit Ihrer tatsächlichen Supabase URL.
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkYWhlYWJmZHB4Y2lhZGx1cXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTg1NjgsImV4cCI6MjAyNzE5NDU2OH0.In_V1liF0XhlYtumVtkNRn3W5czsh0eY8ES009dT_fg'; // Ersetzen Sie 'Ihr-geheimer-Supabase-Schlüssel' mit Ihrem tatsächlichen Supabase Schlüssel.
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;