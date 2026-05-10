import React from 'react';
import { 
  LayoutDashboard, 
  Zap, 
  Users, 
  Settings, 
  MessageSquare, 
  Menu,
  ChevronRight
} from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const navItems: { label: ViewType; icon: React.ReactNode }[] = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Automations', icon: <Zap size={20} /> },
  { label: 'Contacts', icon: <Users size={20} /> },
  { label: 'Settings', icon: <Settings size={20} /> },
];

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-72 h-screen bg-white text-primary flex flex-col fixed left-0 top-0 border-r border-outline-variant z-50">
      <div className="p-10 flex flex-col">
        <div className="w-4 h-4 border border-primary mb-3" />
        <span className="text-xl font-extrabold uppercase tracking-tighter leading-none">Business<br/>Systems</span>
      </div>
      
      <nav className="flex-1 mt-6">
        {navItems.map((item) => (
          <button
            key={item.label}
            id={`nav-${item.label.toLowerCase()}`}
            onClick={() => onViewChange(item.label)}
            className={`w-full flex items-center justify-between px-10 py-5 transition-all group border-b border-outline-variant/50 ${
              currentView === item.label ? 'bg-zinc-50 text-primary border-l-4 border-l-primary' : 'text-zinc-400 hover:text-primary hover:bg-zinc-50/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`transition-colors ${currentView === item.label ? 'text-primary' : 'text-zinc-300 group-hover:text-primary'}`}>
                {item.icon}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em]">{item.label}</span>
            </div>
            {currentView === item.label && <div className="w-1.5 h-1.5 bg-primary" />}
          </button>
        ))}
      </nav>
      
      <div className="p-10 border-t border-outline-variant bg-zinc-50/50">
        <div className="text-[10px] font-mono text-zinc-300 mb-4 tracking-widest uppercase">
          v4.12.0 // STABLE
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-none border border-outline bg-white overflow-hidden p-0.5">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-tight truncate w-32">Ops Manager</p>
            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Enterprise</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
