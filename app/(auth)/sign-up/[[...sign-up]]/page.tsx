"use client";

import NewFooter from '@/components/sections/Footer';
import LandingNavbar from '@/components/sections/LandingNavbar';
import { useState } from 'react';

export default function Page() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace this with your signup logic (e.g., API call)
    if (formData.username && formData.email && formData.password) {
      alert('Signup successful!'); // Simulate success
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className=''>
      <LandingNavbar />
      <div className='h-screen md:h-[70vh] my-12 w-full flex justify-center items-center'>
        <div className='w-full md:flex justify-evenly'>
          <div className='items-center flex flex-col justify-center px-5'>
            <h1 className='text-5xl font-semibold text-center font-mont'>
              Join Us
            </h1>
            <p className='text-center text-xl text-gray-500 font-mont-light'>
              Create your account and start your journey with us.
            </p>
            <img
              src='/logo.png'
              alt='logo'
              className='my-4'
              width={200}
              height={100}
            />
          </div>

          {/* Custom Signup Form */}
          <form
            className='w-full max-w-sm bg-white p-6 rounded shadow-md'
            onSubmit={handleSignUp}
          >
            <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-gray-700'
              >
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
                className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary'
                required
              />
            </div>
            <button
              type='submit'
              className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <NewFooter />
    </div>
  );
}
