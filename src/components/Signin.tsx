'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/atoms/Input';
import { Button, CardWrapper, Row, Typography } from '@/components/atoms';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginUser } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter(); // Next.js router

  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = form.email ? '' : 'Email is required';
    const passwordError = form.password ? '' : 'Password is required';
    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      dispatch(loginUser({ email: form.email, password: form.password }));
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center md:px-4">
      <CardWrapper noBorder noShadow className="p-0 mt-2 md:px-8 w-full max-w-2xl">
        <Typography color="text-stone" align="center" weight="normal" variant="sm">
          Welcome back! Please log in.
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <Input
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            error={errors.email}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            error={errors.password}
          />

          <Row className="text-sm justify-between">
            <label className="flex items-center gap-2 text-abyss cursor-pointer">
              <input
                id="remember"
                type="checkbox"
                checked={form.remember}
                onChange={handleChange}
                className="accent-primary cursor-pointer"
              />
              Remember me
            </label>

            <a href="/forgot-password" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </Row>
          {error && <p className="text-red-600 mt-2">{error}</p>}

          <Button type="submit" className="w-full" text={loading ? 'Logging in...' : 'Sign In'} />
        </form>

        <p className="mt-6 text-center text-sm text-stone">
          Don’t have an account?{' '}
          <a href="/signup" className="text-primary hover:underline">
            Create one
          </a>
        </p>
      </CardWrapper>
    </div>
  );
}
