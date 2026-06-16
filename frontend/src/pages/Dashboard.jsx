import { useAuth } from '../context/AuthContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Link } from 'react-router-dom';
import { Upload, Target, ClipboardList, ArrowRight, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

// Mock data
const mockApplications = [
  { id: 1, company: 'Stripe', role: 'Software Engineer Intern', status: 'interview', date: 'Jun 10' },
  { id: 2, company: 'Notion', role: 'Product Intern', status: 'applied', date: 'Jun 8' },
  { id: 3, company: 'Vercel', role: 'Frontend Engineer', status: 'saved', date: 'Jun 5' },
  { id: 4, company: 'Linear', role: 'Design Intern', status: 'rejected', date: 'Jun 3' },
];

const mockInsights = [
  { type: 'success', text: 'Strong Python and FastAPI experience detected' },
  { type: 'warning', text: 'Missing: Docker and CI/CD keywords' },
  { type: 'success', text: 'Clear project descriptions with impact metrics' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.full_name?.split(' ')[0] || 'there';
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Good evening, {firstName} 👋</h1>
          <p className="text-sm text-slate-500 mt-0.5">{today}</p>
        </div>
        <Link to="/resume/upload">
          <Button icon={<Upload className="w-4 h-4" />}>Upload Resume</Button>
        </Link>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ATS Score Card */}
        <Card className="md:col-span-1 flex flex-col items-center py-6 px-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">ATS Score</p>
          <ProgressRing score={78} size={130} />
          <p className="text-xs text-slate-500 mt-3 text-center">Resume analyzed · Jun 12</p>
        </Card>

        {/* Resume Status */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resume</p>
          </CardHeader>
          <CardBody className="flex-1 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-10 rounded bg-surface-overlay flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-accent">PDF</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">JaneSmith_Resume.pdf</p>
                <p className="text-xs text-slate-500">Uploaded Jun 12 · 1.2 MB</p>
              </div>
            </div>
            <Badge variant="success">Analysis Complete</Badge>
          </CardBody>
          <div className="px-5 pb-4">
            <Link to="/resume/analysis" className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 transition-colors">
              View full analysis <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quick Actions</p>
          </CardHeader>
          <CardBody className="space-y-2">
            <Link to="/resume/upload">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-300 hover:text-white hover:bg-surface-overlay transition-all duration-150">
                <Upload className="w-4 h-4 text-accent" />
                Upload New Resume
              </button>
            </Link>
            <Link to="/job-match">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-300 hover:text-white hover:bg-surface-overlay transition-all duration-150">
                <Target className="w-4 h-4 text-accent" />
                Match to a Job
              </button>
            </Link>
            <Link to="/applications">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-300 hover:text-white hover:bg-surface-overlay transition-all duration-150">
                <ClipboardList className="w-4 h-4 text-accent" />
                Track Applications
              </button>
            </Link>
          </CardBody>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-200">Recent Applications</p>
            <Link to="/applications" className="text-xs text-accent hover:text-accent-hover transition-colors">
              View all
            </Link>
          </CardHeader>
          <div className="divide-y divide-brand-navy/40">
            {mockApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between px-5 py-3 hover:bg-surface-overlay/30 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-200">{app.role}</p>
                  <p className="text-xs text-slate-500">{app.company} · {app.date}</p>
                </div>
                <Badge variant={app.status}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Resume Insights */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <p className="text-sm font-semibold text-slate-200">Resume Insights</p>
          </CardHeader>
          <CardBody className="space-y-3">
            {mockInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2.5">
                {insight.type === 'success'
                  ? <CheckCircle className="w-4 h-4 text-status-success flex-shrink-0 mt-0.5" />
                  : <AlertCircle className="w-4 h-4 text-status-warning flex-shrink-0 mt-0.5" />
                }
                <p className="text-xs text-slate-400 leading-relaxed">{insight.text}</p>
              </div>
            ))}
            <Link to="/resume/analysis">
              <Button variant="ghost" size="sm" className="w-full mt-2 justify-center">
                Full Analysis <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}