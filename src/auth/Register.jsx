import { Button, Input, Spacer } from '@nextui-org/react';
import React, { useState } from 'react';
import supabase from '../supabaseClient';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import {EyeFilledIcon} from "../assets/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../assets/EyeSlashFilledIcon";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseClient';

function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nachname, setNachname] = useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      const user = data.user;
      if (user) {
        await setDoc(doc(db, 'users', user.id), {
          email: email,
          generationsLeft: 50,
          profilePicture: null,
          userId: user.id,
          userTier: 'user',
          name: name,
          nachname: nachname,
        });
      }
      alert('Registration successful! Check your email for the confirmation link.');
      navigate('/Home');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
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
      onClear={() => setEmail("")}
      className="max-w-xs"
        />
     <Spacer y={1} />
        <Input
          label="Name"
          variant="bordered"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="max-w-xs"
        />
        <Spacer y={1} />
        <Input
          label="Nachname"
          variant="bordered"
          placeholder="Enter your nachname"
          value={nachname}
          onChange={(e) => setNachname(e.target.value)}
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
        {loading ? 'Loading...' : 'Register'}
      </Button>
    </div>
        <Footer/>
    </div>
  );
};

export default Register;