// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fetch user data from user.json file
    fetch('/user.json')
      .then((response) => response.json())
      .then((data) => {
        // Find user in the JSON data
        const user = data.find(
          (u: { username: string; password: string }) =>
            u.username === username && u.password === password
        );

        if (user) {
          // If user is found and credentials are correct
          login();
          navigate('/home'); // Redirect to Home page
        } else {
          setError('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError('Failed to authenticate');
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
