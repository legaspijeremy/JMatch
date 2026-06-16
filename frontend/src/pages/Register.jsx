import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const colors = ['bg-status-danger', 'bg-status-warning', 'bg-yellow-400', 'bg-status-success'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex gap-1 flex-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : 'bg-surface-overlay'}`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">{labels[score - 1] || ''}</span>
    </div>
  );
}

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.includes('@')) errs.email = 'Enter a valid email';
    if (form.password.length < 8) errs.password = 'At least 8 characters required';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setApiError('');
    try {
      await register(form.fullName, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(30,58,95,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.08)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="w-full max-w-sm animate-fade-in-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-3 shadow-glow-accent">
            <span className="text-white font-bold text-lg">J</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">Create your account</h2>
          <p className="text-sm text-slate-500 mt-1">Start your AI-powered job search</p>
        </div>

        <div className="card p-6 space-y-4">
          {apiError && (
            <div className="px-3 py-2.5 rounded-md bg-status-danger/10 border border-status-danger/30 text-sm text-status-danger">
              {apiError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input id="fullName" label="Full Name" placeholder="Jane Smith" value={form.fullName} onChange={set('fullName')} error={errors.fullName} required />
            <Input id="email" label="Email Address" type="email" placeholder="jane@example.com" value={form.email} onChange={set('email')} error={errors.email} required />
            <div>
              <Input id="password" label="Password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={set('password')} error={errors.password} required />
              <PasswordStrength password={form.password} />
            </div>
            <Input id="confirmPassword" label="Confirm Password" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={set('confirmPassword')} error={errors.confirmPassword} required />
            <Button type="submit" className="w-full" loading={loading}>
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:text-accent-hover font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}