"use client";
import NewFooter from '@/components/sections/Footer';
import LandingNavbar from '@/components/sections/LandingNavbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace this with your authentication logic
    if (username === 'admin' && password === 'password') {
      alert('Login successful');
      router.push('/dashboard'); // Navigate to the dashboard on success
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className=''>
      <LandingNavbar />
      <div className='h-[50vh] my-12 w-full flex justify-center items-center'>
        <div className='md:w-full md:flex justify-evenly'>
          <div className='items-center flex flex-col justify-center px-5'>
            <h1 className='text-5xl font-semibold text-center font-mont'>
              Make it happen
            </h1>
            <p className='text-center text-xl text-gray-500 font-mont-light'>
              Welcome back!
            </p>
            <img
              src='/logo.png'
              alt='logo'
              className=''
              width={200}
              height={100}
            />
          </div>

          {/* Custom Login Form */}
          <form
            className='w-full max-w-sm bg-white p-6 rounded shadow-md'
            onSubmit={handleLogin}
          >
            <h2 className='text-2xl font-bold mb-4'>Login</h2>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary'
                required
              />
            </div>
            <button
              type='submit'
              className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <NewFooter />
    </div>
  );
}
