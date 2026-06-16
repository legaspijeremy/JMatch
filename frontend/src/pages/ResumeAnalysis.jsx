import * as Tabs from '@radix-ui/react-tabs';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { CheckCircle, XCircle, Lightbulb, Zap } from 'lucide-react';

const mockData = {
  score: 78,
  breakdown: [
    { label: 'Keywords', score: 82 },
    { label: 'Formatting', score: 90 },
    { label: 'Experience', score: 75 },
    { label: 'Education', score: 85 },
    { label: 'Impact', score: 60 },
  ],
  strengths: [
    'Clear project descriptions with measurable outcomes',
    'Relevant technical stack listed (Python, FastAPI, PostgreSQL)',
    'Education section is properly formatted',
    'Contact information is complete and professional',
  ],
  weaknesses: [
    'No mention of version control workflows (Git branching)',
    'Summary section is too generic — lacks value proposition',
    'Work experience bullet points don\'t start with action verbs',
  ],
  missingSkills: ['Docker', 'CI/CD', 'AWS', 'Redis', 'Kubernetes', 'GraphQL', 'TypeScript'],
  recommendations: [
    'Add a targeted professional summary (2–3 sentences max)',
    'Start each bullet point with a strong action verb (Built, Reduced, Improved)',
    'Include Docker/containerization experience if applicable',
    'Add a "Projects" section if work experience is limited',
    'Quantify achievements with numbers and percentages',
  ],
};

export default function ResumeAnalysis() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Resume Analysis</h1>
        <p className="text-sm text-slate-500 mt-1">JaneSmith_Resume.pdf · Analyzed Jun 12</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Panel */}
        <div className="space-y-4">
          <Card>
            <CardBody className="flex flex-col items-center py-6">
              <ProgressRing score={mockData.score} size={150} />
              <p className="text-xs text-slate-500 mt-4 text-center">ATS Compatibility Score</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Score Breakdown</p>
            </CardHeader>
            <CardBody className="space-y-3">
              {mockData.breakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-slate-400">{item.label}</span>
                    <span className="text-xs font-semibold text-slate-300">{item.score}</span>
                  </div>
                  <div className="h-1.5 bg-surface-overlay rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${item.score}%`,
                        backgroundColor: item.score >= 75 ? '#10B981' : item.score >= 55 ? '#F59E0B' : '#EF4444',
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Detail Panel */}
        <Card className="lg:col-span-2">
          <Tabs.Root defaultValue="strengths">
            <Tabs.List className="flex border-b border-brand-navy/50 px-2 pt-2 gap-1">
              {[
                { value: 'strengths', label: 'Strengths', icon: CheckCircle },
                { value: 'weaknesses', label: 'Weaknesses', icon: XCircle },
                { value: 'missing', label: 'Missing Skills', icon: Zap },
                { value: 'recommendations', label: 'Recommendations', icon: Lightbulb },
              ].map(({ value, label, icon: Icon }) => (
                <Tabs.Trigger
                  key={value}
                  value={value}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-slate-500 border-b-2 border-transparent -mb-px transition-all duration-150 data-[state=active]:text-accent data-[state=active]:border-accent data-[state=active]:bg-accent/5 rounded-t-md"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <Tabs.Content value="strengths" className="p-5 space-y-3 animate-fade-in">
              {mockData.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-status-success/5 border border-status-success/10">
                  <CheckCircle className="w-4 h-4 text-status-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300">{s}</p>
                </div>
              ))}
            </Tabs.Content>

            <Tabs.Content value="weaknesses" className="p-5 space-y-3 animate-fade-in">
              {mockData.weaknesses.map((w, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-status-danger/5 border border-status-danger/10">
                  <XCircle className="w-4 h-4 text-status-danger flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300">{w}</p>
                </div>
              ))}
            </Tabs.Content>

            <Tabs.Content value="missing" className="p-5 animate-fade-in">
              <p className="text-xs text-slate-500 mb-4">Skills commonly expected for roles matching your profile that are absent from your resume:</p>
              <div className="flex flex-wrap gap-2">
                {mockData.missingSkills.map((skill) => (
                  <Badge key={skill} variant="danger" className="text-sm px-3 py-1">{skill}</Badge>
                ))}
              </div>
            </Tabs.Content>

            <Tabs.Content value="recommendations" className="p-5 space-y-3 animate-fade-in">
              {mockData.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
                  <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">{i + 1}</span>
                  <p className="text-sm text-slate-300">{rec}</p>
                </div>
              ))}
            </Tabs.Content>
          </Tabs.Root>
        </Card>
      </div>
    </div>
  );
}