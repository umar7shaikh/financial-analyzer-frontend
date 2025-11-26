import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const Signup = ({ switchToLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else {
      setMessage('Check your email to confirm your account!');
      setTimeout(() => {
        setMessage('');
        switchToLogin && switchToLogin();
      }, 3000);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSignup}>
      <h2 className="text-white text-3xl font-bold mb-4">Sign Up</h2>
      {error && <div className="text-red-400">{error}</div>}
      {message && <div className="text-green-400">{message}</div>}
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 rounded bg-gray-800 text-white"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 rounded bg-gray-800 text-white"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <button className="w-full bg-blue-600 text-white p-3 rounded font-bold">Sign Up</button>
      <div className="text-gray-400 text-center">
        Already have an account?{' '}
        <button type="button" onClick={switchToLogin} className="text-blue-400 underline">
          Login
        </button>
      </div>
      <button type="button" className="mt-3 text-sm text-gray-400" onClick={onClose}>Close</button>
    </form>
  );
};

export default Signup;
