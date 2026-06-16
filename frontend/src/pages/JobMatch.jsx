import { useState } from 'react';
import { Textarea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Target, Sparkles } from 'lucide-react';

const mockResult = {
  score: 71,
  matchingSkills: ['Python', 'FastAPI', 'PostgreSQL', 'REST APIs', 'Git', 'Agile'],
  missingSkills: ['Docker', 'AWS', 'Redis', 'Kubernetes'],
  summary: 'Your resume is a strong match for this role. Your backend experience with FastAPI and PostgreSQL aligns well with the core requirements. To improve your match score, consider adding containerization and cloud platform experience.',
};

export default function JobMatch() {
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!jobDesc.trim()) return;
    setLoading(true);
    // Replace with: await jobAPI.match({ job_description: jobDesc })
    await new Promise((r) => setTimeout(r, 1800));
    setResult(mockResult);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Job Match</h1>
        <p className="text-sm text-slate-500 mt-1">Paste a job description to see how well your resume matches</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              <p className="text-sm font-semibold text-slate-200">Job Description</p>
            </CardHeader>
            <CardBody className="space-y-4">
              <Textarea
                id="jobDesc"
                placeholder="Paste the full job description here..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                className="min-h-[280px]"
              />
              <Button
                className="w-full"
                onClick={handleMatch}
                loading={loading}
                disabled={!jobDesc.trim()}
                icon={<Sparkles className="w-4 h-4" />}
              >
                {loading ? 'Analyzing...' : 'Analyze Match'}
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          {!result && !loading && (
            <Card className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-surface-overlay flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-slate-600" />
                </div>
                <p className="text-sm font-semibold text-slate-500">Results will appear here</p>
                <p className="text-xs text-slate-600 mt-1">Paste a job description and click Analyze</p>
              </div>
            </Card>
          )}

          {result && (
            <div className="space-y-4 animate-fade-in-up">
              {/* Score */}
              <Card>
                <CardBody className="flex items-center gap-6 py-6">
                  <ProgressRing score={result.score} size={110} />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Match Score</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{result.summary}</p>
                  </div>
                </CardBody>
              </Card>

              {/* Matching Skills */}
              <Card>
                <CardHeader>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Matching Skills</p>
                </CardHeader>
                <CardBody className="flex flex-wrap gap-2">
                  {result.matchingSkills.map((s) => (
                    <Badge key={s} variant="success">{s}</Badge>
                  ))}
                </CardBody>
              </Card>

              {/* Missing Skills */}
              <Card>
                <CardHeader>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Missing from Resume</p>
                </CardHeader>
                <CardBody className="flex flex-wrap gap-2">
                  {result.missingSkills.map((s) => (
                    <Badge key={s} variant="danger">{s}</Badge>
                  ))}
                </CardBody>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="primary" className="flex-1">Apply Now</Button>
                <Button variant="secondary" className="flex-1">Save Job</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}