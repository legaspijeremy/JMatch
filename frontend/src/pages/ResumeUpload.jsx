import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | uploading | done | error
  const navigate = useNavigate();

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) { setFile(accepted[0]); setStatus('idle'); }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!file) return;
    setStatus('uploading');
    // Simulate upload — replace with: await resumeAPI.upload(formData)
    await new Promise((r) => setTimeout(r, 2000));
    setStatus('done');
    setTimeout(() => navigate('/resume/analysis'), 800);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Upload Resume</h1>
        <p className="text-sm text-slate-500 mt-1">Upload a PDF or DOCX — we'll analyze it instantly</p>
      </div>

      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-200',
          isDragActive
            ? 'border-accent bg-accent/5 shadow-glow-accent'
            : 'border-brand-navy/70 hover:border-accent/50 hover:bg-surface-raised/50'
        )}
      >
        <input {...getInputProps()} />
        <div className={cn(
          'w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-200',
          isDragActive ? 'bg-accent/20' : 'bg-surface-overlay'
        )}>
          <Upload className={cn('w-7 h-7 transition-colors', isDragActive ? 'text-accent' : 'text-slate-500')} />
        </div>
        {isDragActive ? (
          <p className="text-base font-semibold text-accent">Drop it here!</p>
        ) : (
          <>
            <p className="text-base font-semibold text-slate-200">Drag & drop your resume</p>
            <p className="text-sm text-slate-500 mt-1">or click to browse files</p>
            <p className="text-xs text-slate-600 mt-3">PDF or DOCX — max 5 MB</p>
          </>
        )}
      </div>

      {/* File Preview */}
      {file && (
        <Card className="animate-fade-in-up">
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-10 h-12 rounded-lg bg-surface-overlay flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB · {file.name.split('.').pop().toUpperCase()}</p>
            </div>
            {status === 'idle' && (
              <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="p-1.5 rounded-md text-slate-500 hover:text-status-danger hover:bg-status-danger/10 transition-all">
                <X className="w-4 h-4" />
              </button>
            )}
            {status === 'uploading' && <Loader2 className="w-5 h-5 text-accent animate-spin" />}
            {status === 'done' && <CheckCircle className="w-5 h-5 text-status-success" />}
          </div>
          {status === 'uploading' && (
            <div className="h-1 bg-surface-overlay rounded-b-xl overflow-hidden">
              <div className="h-full bg-accent rounded-full animate-pulse-subtle w-2/3" />
            </div>
          )}
        </Card>
      )}

      {/* Analyze Button */}
      {file && status !== 'done' && (
        <Button
          className="w-full"
          size="lg"
          onClick={handleAnalyze}
          loading={status === 'uploading'}
          icon={<Upload className="w-4 h-4" />}
        >
          {status === 'uploading' ? 'Analyzing...' : 'Analyze Resume'}
        </Button>
      )}
    </div>
  );
}