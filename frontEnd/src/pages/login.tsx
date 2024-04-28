import React, { useState } from 'react';
import {Link,useNavigate } from 'react-router-dom';
import Button from '../components/button';
import { LoginSchema } from '../utils/validation';
import api from '../services/api';
import { ZodError } from 'zod';
import Layout from '../components/Layout';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await LoginSchema.parseAsync({ email, password });
      const response = await api.post('auth/login', { email, password });
        const user = await response.data;
        console.log(user)
      if (user.user.authentication.sessionToken) {
        localStorage.setItem('token', user.authentication.sessionToken);
        localStorage.setItem('isAdmin', user.user.isAdmin);
        if (user.user.isAdmin) {
           navigate('/adminDashboard');
        } else {
          navigate('/userDashboard');
        }
      }
      alert(response.data.message);
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach(err => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        if (errorTimeout) clearTimeout(errorTimeout);
        setErrorTimeout(setTimeout(() => {
          setErrors({});
          setErrorTimeout(null);
        }, 3000));
      }
    }
  };

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <Layout isLoggedIn={false}>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="max-w-md w-full">
          <h2 className="text-2xl mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-3 py-2 border rounded border-gray-600"
            />
            {errors['email'] && <p className='text-red-500'>{errors['email']}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-3 py-2 border rounded border-gray-600"
            />
            {errors['password'] && <p className='text-red-500'>{errors['password']}</p>}
          </div>
          <Button type="submit" disabled={!isFormValid}>Login</Button>
          <p className="mt-2 text-sm">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
