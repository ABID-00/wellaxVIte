
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4090';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const googleApiUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
      try {
        const response = await fetch(googleApiUrl, {
          headers: { 'Authorization': `Bearer ${tokenResponse.access_token}` }
        });
        const userInfo = await response.json();
        
        // Now, send this info to your backend to create/login the user
        const backendResponse = await fetch(`${API_URL}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
            googleId: userInfo.sub
          })
        });
        const data = await backendResponse.json();
        if (data.user) {
          onLogin(data.user);
        }
      } catch (error) {
        console.error('Google login failed:', error);
      }
    },
    onError: () => {
      console.error('Google login failed');
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'signup';
    try {
      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.user) {
        onLogin(data.user);
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-blur rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center my-4">OR</div>
        <button onClick={() => googleLogin()} className="w-full py-2 bg-blue-600 text-white rounded-lg">
          Continue with Google
        </button>
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 ml-2">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
