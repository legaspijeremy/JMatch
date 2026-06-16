import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Upload, Target, TrendingUp, ClipboardList, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Badge } from '../components/ui/Badge';

const features = [
  { icon: Zap, title: 'ATS Score Analysis', desc: 'Get an instant compatibility score for any job posting with detailed breakdown by category.' },
  { icon: Target, title: 'Smart Job Matching', desc: 'Paste any job description and see exactly how well your resume matches the requirements.' },
  { icon: TrendingUp, title: 'Skill Gap Detection', desc: 'Identify missing keywords and skills before you apply — not after rejection.' },
  { icon: ClipboardList, title: 'Application Tracker', desc: 'Track every application in one place with status updates and follow-up reminders.' },
  { icon: Shield, title: 'AI Recommendations', desc: 'Receive specific, actionable advice to improve your resume score and stand out.' },
  { icon: Upload, title: 'Multi-Format Support', desc: 'Upload your resume in PDF or DOCX format. Instant analysis in seconds.' },
];

const steps = [
  { step: '01', title: 'Upload Your Resume', desc: 'Drag and drop your PDF or DOCX resume. No account required to start.' },
  { step: '02', title: 'AI Analyzes Everything', desc: 'Our engine scans for ATS compatibility, keyword gaps, and formatting issues.' },
  { step: '03', title: 'Apply with Confidence', desc: 'Use tailored recommendations to fix your resume and track your applications.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-surface-base text-slate-100">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-brand-navy/40 bg-surface-base/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-glow-accent">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="font-bold text-slate-100 text-base">JMatch</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">How it works</a>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.06)_1px,transparent_1px)] bg-[size:56px_56px]" />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/5 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-navy/70 bg-surface-raised/60 text-xs text-slate-400 mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-subtle" />
            AI-Powered Resume Intelligence for Students & Grads
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-100 leading-tight mb-5 animate-fade-in-up" style={{ letterSpacing: '-0.025em' }}>
            Get Hired Faster.<br />
            <span className="accent-gradient-text">Score Higher.</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed animate-fade-in-up">
            JMatch analyzes your resume against real job descriptions, gives you an ATS score, and tells you exactly what to fix before you apply.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up">
            <Link to="/register">
              <Button size="lg" icon={<ArrowRight className="w-4 h-4" />} className="shadow-glow-accent">
                Analyze My Resume
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="secondary">View Dashboard</Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-10 text-xs text-slate-500 animate-fade-in">
            {['Results in seconds', 'ATS-tested'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-status-success" />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="relative max-w-4xl mx-auto mt-16 animate-fade-in-up">
          <div className="rounded-xl border border-brand-navy/60 bg-surface-raised shadow-modal overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-brand-navy/50 bg-surface-base/50">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-4 text-xs text-slate-500">jmatch.app/dashboard</span>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4">
              {/* ATS Score mock */}
              <div className="bg-surface-base rounded-lg border border-brand-navy/50 p-4 flex flex-col items-center gap-3">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">ATS Score</p>
                <ProgressRing score={78} size={80} strokeWidth={7} showGrade={false} />
                <Badge variant="success">Good Match</Badge>
              </div>
              {/* Skills mock */}
              <div className="col-span-2 bg-surface-base rounded-lg border border-brand-navy/50 p-4">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Skill Analysis</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['Python', 'FastAPI', 'PostgreSQL', 'REST APIs', 'Git'].map((s) => (
                    <Badge key={s} variant="success" className="text-xs">{s}</Badge>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mb-1.5">Missing from your resume:</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Docker', 'AWS', 'Redis'].map((s) => (
                    <Badge key={s} variant="danger" className="text-xs">{s}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Glow under preview */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-accent/10 blur-2xl rounded-full" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 border-t border-brand-navy/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Features</p>
            <h2 className="text-3xl font-bold text-slate-100" style={{ letterSpacing: '-0.015em' }}>Everything you need to land the job</h2>
            <p className="text-slate-400 mt-3 max-w-md mx-auto text-sm">Built specifically for students and fresh graduates competing in a tough job market.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-5 hover:border-accent/30 transition-all duration-200 group">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-4.5 h-4.5 text-accent" style={{ width: '18px', height: '18px' }} />
                </div>
                <h3 className="text-sm font-semibold text-slate-200 mb-1.5">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 border-t border-brand-navy/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">How It Works</p>
            <h2 className="text-3xl font-bold text-slate-100" style={{ letterSpacing: '-0.015em' }}>Three steps to a better resume</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-gradient-to-r from-brand-navy/50 via-accent/30 to-brand-navy/50" />
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-surface-raised border-2 border-brand-navy flex items-center justify-center mb-4 relative z-10">
                  <span className="text-sm font-bold text-accent">{step}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-200 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-brand-navy/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-xl border border-brand-navy/60 bg-surface-raised p-10">
            <h2 className="text-3xl font-bold text-slate-100 mb-3" style={{ letterSpacing: '-0.015em' }}>
              Ready to land your dream job?
            </h2>
            <p className="text-slate-400 text-sm mb-6">Start for free.</p>
            <Link to="/register">
              <Button size="lg" className="shadow-glow-accent" icon={<ArrowRight className="w-4 h-4" />}>
                Get Started Free
              </Button>
            </Link>
            <p className="text-xs text-slate-600 mt-4">Join and use JMatch today!</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-navy/30 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs">J</span>
            </div>
            <span className="font-bold text-slate-300 text-sm">JMatch</span>
          </div>
          <p className="text-xs text-slate-600">© 2026 JMatch. AI-powered job matching.</p>
          <div className="flex gap-4">
            {['GitHub', 'LinkedIn'].map((s) => (
              <a key={s} href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}