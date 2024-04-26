import { Button, Input, Spacer } from '@nextui-org/react';
import { createClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import supabase from '../supabaseClient';
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import {EyeFilledIcon} from "../assets/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../assets/EyeSlashFilledIcon";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      alert(`Registration successful! Check your email for the confirmation link. ${error.message}`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="App">
    <header>
      <Header></Header>
    </header>
    <div style={{ maxWidth: '300px', margin: 'auto' }}>
        <Input
      isClearable
      type="email"
      label="Email"
      variant="bordered"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="max-w-xs"
        />
      <Spacer y={1} />
      <Input
      label="Password"
      variant="bordered"
      placeholder="Enter your password"
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <Spacer y={1} />
      <Button
        disabled={loading}
        onClick={handleRegister}
        shadow
        auto
      >
        {loading ? 'Loading...' : 'Login'}
      </Button>
    </div>
        <Footer/>
    </div>
  );
};

export default Login;