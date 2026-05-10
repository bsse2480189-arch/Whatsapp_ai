import { Zap, MoreVertical, Play, Pause, AlertCircle } from 'lucide-react';
import { Automation } from '../types';
import { motion } from 'motion/react';

interface AutomationCardProps {
  automation: Automation;
  onToggle: (id: string) => void;
}

export default function AutomationCard({ automation, onToggle }: AutomationCardProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active': return 'border-zinc-800 text-zinc-800';
      case 'Paused': return 'border-zinc-400 text-zinc-400';
      case 'Failed': return 'border-red-500 text-red-600';
      default: return 'border-zinc-300 text-zinc-400';
    }
  };

  return (
    <motion.div 
      layout
      className="card group"
      id={`automation-${automation.id}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 border border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Zap size={20} />
          </div>
          <div>
            <h4 className="font-bold text-lg leading-tight uppercase tracking-tight">{automation.title}</h4>
            <div className="mt-2 flex items-center gap-2">
              <span className={`status-chip ${getStatusStyles(automation.status)}`}>
                {automation.status}
              </span>
            </div>
          </div>
        </div>
        <button className="p-1 hover:bg-zinc-100 transition-colors text-primary">
          <MoreVertical size={20} />
        </button>
      </div>

      <p className="text-on-surface-variant text-sm mb-8 font-medium leading-relaxed">
        {automation.description}
      </p>

      <div className="grid grid-cols-3 gap-0 mb-8 border border-outline-variant">
        <div className="p-4 text-left border-r border-outline-variant">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Sent</p>
          <p className="font-bold text-xl leading-none">{automation.metrics.sent}</p>
        </div>
        <div className="p-4 text-left border-r border-outline-variant bg-zinc-50/50">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Res</p>
          <p className="font-bold text-xl leading-none">{automation.metrics.responded}</p>
        </div>
        <div className="p-4 text-left">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Conv</p>
          <p className="font-bold text-xl leading-none">{automation.metrics.conversion}%</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-zinc-50 -mx-8 -mb-8 px-8 py-5 border-t border-outline-variant">
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
          SYNC // {automation.lastRun}
        </span>
        <button 
          onClick={() => onToggle(automation.id)}
          className={`flex items-center gap-2 py-2 px-6 text-[10px] font-bold uppercase tracking-widest transition-all border ${
            automation.status === 'Active' 
              ? 'border-zinc-300 text-zinc-400 hover:bg-zinc-100' 
              : 'bg-primary text-white hover:bg-zinc-800'
          }`}
        >
          {automation.status === 'Active' ? (
            <><Pause size={14} /> Pause</>
          ) : (
            <><Play size={14} /> Active</>
          )}
        </button>
      </div>
      
      {automation.status === 'Failed' && (
        <div className="mt-8 flex items-center gap-2 text-[10px] text-red-600 font-bold uppercase tracking-widest p-3 border border-red-100 bg-red-50/30">
          <AlertCircle size={14} />
          EXECUTION_ERROR: TIMEOUT
        </div>
      )}
    </motion.div>
  );
}
