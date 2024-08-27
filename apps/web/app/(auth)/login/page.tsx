'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@repo/ui/components/button';
import { errorToast } from '@/lib/toast';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;



const LoginPage = () => {
  const router = useRouter();
 

  const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        console.error('Login error:', result.error);
        errorToast(result.error);
      } else {
        console.log('Login successful:', result);
        router.push('/user');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <section className="h-screen w-full flex justify-center items-center bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`mt-1 block w-full p-2 border rounded-md bg-gray-700 text-white ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className={`mt-1 block w-full p-2 border rounded-md bg-gray-700 text-white ${errors.password ? 'border-red-500' : 'border-gray-600'}`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition" disabled={isSubmitting} isLoading={isSubmitting}>Login</Button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>

        <div className="mt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/user' })}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition mb-2 flex items-center justify-center"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => signIn('github', { callbackUrl: '/user' })}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition flex items-center justify-center"
          >
            <FaGithub className="mr-2" /> Sign in with GitHub
          </button>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;
