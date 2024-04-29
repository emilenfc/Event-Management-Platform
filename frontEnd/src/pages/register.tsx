import React, { useState } from 'react';
import {Link,useNavigate } from 'react-router-dom';
import Button from '../components/button';
import { RegisterSchema } from '../utils/validation';
import api from '../services/api';
import { ZodError } from 'zod';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await RegisterSchema.parseAsync({ firstName, secondName, email, password, confirmPassword });
      const response = await api.post('auth/register', { firstName, secondName, email, password });
      navigate('/login');
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
      alert(error)
    }
  };

  const isFormValid = Object.keys(errors).length === 0;

  return (
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="max-w-md w-full">
          <h2 className="text-2xl mb-4">Hello, welcome to the registration page</h2>
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-1">First name</label>
            <input 
              type="string" 
              id="firstname" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="w-full px-3 py-2 border rounded border-gray-600"
            />
            {errors['firstName'] && <p className='text-red-500'>{errors['firstName']}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="secondName" className="block mb-1">Second name</label>
            <input 
              type="string" 
              id="secondName" 
              value={secondName} 
              onChange={(e) => setSecondName(e.target.value)} 
              className="w-full px-3 py-2 border rounded border-gray-600"
            />
            {errors['secondName'] && <p className='text-red-500'>{errors['secondName']}</p>}
          </div>

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

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
            <input 
              type="confirmPassword" 
              id="confirmPassword" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="w-full px-3 py-2 border rounded border-gray-600"
            />
            {errors['confirmPassword'] && <p className='text-red-500'>{errors['confirmPassword']}</p>}
          </div>
          <Button type="submit" disabled={!isFormValid}>Register</Button>
          <p className="mt-2 text-sm">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
        </form>
      </div>
  );
};

export default Register;
