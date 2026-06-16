import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(30,58,95,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.08)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="w-full max-w-sm animate-fade-in-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-3 shadow-glow-accent">
            <span className="text-white font-bold text-lg">J</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">Welcome back</h2>
          <p className="text-sm text-slate-500 mt-1">Sign in to your JMatch account</p>
        </div>

        {/* Card */}
        <div className="card p-6 space-y-4">
          {error && (
            <div className="px-3 py-2.5 rounded-md bg-status-danger/10 border border-status-danger/30 text-sm text-status-danger">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <div className="space-y-1.5">
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <div className="flex justify-end">
                <a href="#" className="text-xs text-slate-500 hover:text-accent transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>
            <Button type="submit" className="w-full" loading={loading}>
              Sign in
            </Button>
          </form>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-navy/50" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs text-slate-600 bg-surface-raised">or</span>
            </div>
          </div>

          <button className="w-full h-9 flex items-center justify-center gap-2 rounded-md border border-brand-navy/70 text-sm text-slate-300 hover:border-accent/30 hover:text-white transition-all duration-150">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-accent hover:text-accent-hover font-medium transition-colors">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}