import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { User, Shield, Bell, LogOut, Trash2 } from 'lucide-react';

export default function ProfileSettings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ fullName: user?.full_name || '', email: user?.email || '' });
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Profile Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account information and security</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader className="flex items-center gap-2">
          <User className="w-4 h-4 text-accent" />
          <p className="text-sm font-semibold text-slate-200">Profile Information</p>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center">
              <span className="text-lg font-bold text-accent">
                {profile.fullName?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">{profile.fullName}</p>
              <p className="text-xs text-slate-500">{profile.email}</p>
            </div>
          </div>
          <Input id="fullName" label="Full Name" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} />
          <Input id="email" label="Email Address" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} hint="Changing email requires re-verification" />
          <div className="flex justify-end">
            <Button onClick={handleSaveProfile} variant={saved ? 'secondary' : 'primary'} size="sm">
              {saved ? '✓ Saved' : 'Save Changes'}
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Security Section */}
      <Card>
        <CardHeader className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent" />
          <p className="text-sm font-semibold text-slate-200">Security</p>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input id="currentPw" label="Current Password" type="password" placeholder="••••••••" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
          <Input id="newPw" label="New Password" type="password" placeholder="Min. 8 characters" value={passwords.next} onChange={(e) => setPasswords({ ...passwords, next: e.target.value })} />
          <Input id="confirmPw" label="Confirm New Password" type="password" placeholder="Repeat new password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
          <div className="flex justify-end">
            <Button size="sm">Update Password</Button>
          </div>
        </CardBody>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-accent" />
          <p className="text-sm font-semibold text-slate-200">Notifications</p>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm text-slate-300">Email notifications</p>
              <p className="text-xs text-slate-500">Job matches, application reminders</p>
            </div>
            <button className="w-10 h-5 rounded-full bg-accent relative transition-colors" aria-label="Toggle notifications">
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white shadow transition-all" />
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Danger Zone */}
      <Card className="border-status-danger/20">
        <CardHeader className="border-status-danger/20">
          <p className="text-sm font-semibold text-status-danger">Danger Zone</p>
        </CardHeader>
        <CardBody className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-300">Sign out of JMatch</p>
            <p className="text-xs text-slate-500">You can sign back in anytime</p>
          </div>
          <Button variant="ghost" size="sm" icon={<LogOut className="w-3.5 h-3.5" />} onClick={handleLogout}>
            Logout
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}