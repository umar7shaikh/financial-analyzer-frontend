import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Login = ({ switchToSignup, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else {
      if (onClose) onClose();  // Close the modal
      navigate('/home');       // Navigate to home page after login
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <h2 className="text-white text-3xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-400">{error}</div>}
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
      />
      <button className="w-full bg-blue-600 text-white p-3 rounded font-bold">Login</button>
      <div className="text-gray-400 text-center">
        No account?{' '}
        <button type="button" onClick={switchToSignup} className="text-blue-400 underline">
          Sign up
        </button>
      </div>
      <button type="button" className="mt-3 text-sm text-gray-400" onClick={onClose}>Close</button>
    </form>
  );
};

export default Login;
