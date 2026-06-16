import { useState } from 'react';
import { Plus, Search, ClipboardList, ExternalLink, Trash2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected', 'Saved'];

const initialApps = [
  { id: 1, company: 'Stripe', role: 'Software Engineer Intern', status: 'Interview', date: '2025-06-10', url: '#' },
  { id: 2, company: 'Notion', role: 'Product Intern', status: 'Applied', date: '2025-06-08', url: '#' },
  { id: 3, company: 'Vercel', role: 'Frontend Engineer', status: 'Saved', date: '2025-06-05', url: '#' },
  { id: 4, company: 'Linear', role: 'Design Intern', status: 'Rejected', date: '2025-06-03', url: '#' },
  { id: 5, company: 'Figma', role: 'Software Engineer', status: 'Applied', date: '2025-06-01', url: '#' },
];

const emptyForm = { company: '', role: '', url: '', status: 'Applied', date: '', notes: '' };

export default function ApplicationTracker() {
  const [apps, setApps] = useState(initialApps);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = apps.filter((a) => {
    const matchSearch = a.company.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || a.status === filter;
    return matchSearch && matchFilter;
  });

  const addApp = () => {
    if (!form.company || !form.role) return;
    setApps([{ id: Date.now(), ...form }, ...apps]);
    setForm(emptyForm);
    setModal(false);
  };

  const deleteApp = (id) => setApps(apps.filter((a) => a.id !== id));

  return (
    <div className="max-w-6xl mx-auto space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Applications</h1>
          <p className="text-sm text-slate-500 mt-0.5">{apps.length} applications tracked</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />} onClick={() => setModal(true)}>
          Add Application
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9 pr-3 rounded-md bg-surface-raised border border-brand-navy/70 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-accent/40 w-56"
          />
        </div>
        <div className="flex gap-1.5">
          {['All', ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`h-9 px-3 rounded-md text-xs font-medium transition-all duration-150 ${filter === s ? 'bg-accent text-white' : 'bg-surface-raised border border-brand-navy/60 text-slate-400 hover:text-slate-200 hover:border-accent/30'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        {filtered.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No applications found"
            description="Start tracking your job search by adding your first application."
            action={<Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => setModal(true)}>Add Application</Button>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-navy/50">
                  {['Company', 'Role', 'Status', 'Applied', 'Actions'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/30">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-surface-overlay/20 transition-colors group">
                    <td className="px-5 py-3.5 text-sm font-medium text-slate-200">{app.company}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-400">{app.role}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={app.status.toLowerCase()}>{app.status}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">{app.date}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {app.url !== '#' && (
                          <a href={app.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md text-slate-500 hover:text-accent hover:bg-accent/10 transition-all">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button onClick={() => deleteApp(app.id)} className="p-1.5 rounded-md text-slate-500 hover:text-status-danger hover:bg-status-danger/10 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add Modal */}
      <Modal
        open={modal}
        onOpenChange={setModal}
        title="Add Application"
        description="Track a new job or internship application"
        className="max-w-md"
      >
        <div className="space-y-4">
          <Input id="company" label="Company" placeholder="e.g. Stripe" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          <Input id="role" label="Role / Position" placeholder="e.g. Software Engineer Intern" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <Input id="url" label="Job URL" type="url" placeholder="https://..." value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full h-10 px-3 rounded-md bg-surface-raised border border-brand-navy/70 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <Input id="date" label="Applied Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="flex-1" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={addApp}>Save Application</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}