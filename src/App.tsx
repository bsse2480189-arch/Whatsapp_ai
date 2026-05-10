import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Sparkles, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReChartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import AutomationCard from './components/AutomationCard';
import ChatPreview from './components/ChatPreview';
import { suggestAutomationRules } from './services/geminiService';
import { ViewType, Automation, DashboardMetric } from './types';

const INITIAL_METRICS: DashboardMetric[] = [
  { id: '1', label: 'Active Automations', value: 24, trend: 12, trendLabel: 'vs last month' },
  { id: '2', label: 'Total Messages Sent', value: '128,432', trend: 8.4, trendLabel: 'vs last month' },
  { id: '3', label: 'Response Rate', value: '62.4%', trend: 4.2, trendLabel: 'vs last month' },
  { id: '4', label: 'Leads Generated', value: 1842, trend: 15.1, trendLabel: 'vs last month' },
];

const INITIAL_AUTOMATIONS: Automation[] = [
  {
    id: 'a1',
    title: 'Lead Qualifier Bot',
    description: 'Automatically qualifies inbound inquiries based on budget and requirements before passing to sales.',
    status: 'Active',
    lastRun: '2 mins ago',
    metrics: { sent: 1240, responded: 840, conversion: 68 },
    rules: ['Budget > $500', 'Immediate interest']
  },
  {
    id: 'a2',
    title: 'Post-Purchase Survey',
    description: 'Sends a feedback request 24 hours after a customer makes a purchase to gauge satisfaction.',
    status: 'Paused',
    lastRun: '1 day ago',
    metrics: { sent: 450, responded: 120, conversion: 26 },
    rules: ['Trigger after 24h', 'Item count > 0']
  },
  {
    id: 'a3',
    title: 'Abandonment Recovery',
    description: 'Targets users who stopped during the checkout process within the catalog.',
    status: 'Failed',
    lastRun: '5 mins ago',
    metrics: { sent: 89, responded: 12, conversion: 13 },
    rules: ['Cart item exists', 'Session duration > 5m']
  },
];

const CHART_DATA = [
  { name: 'Mon', sent: 400, response: 240 },
  { name: 'Tue', sent: 300, response: 139 },
  { name: 'Wed', sent: 200, response: 980 },
  { name: 'Thu', sent: 278, response: 390 },
  { name: 'Fri', sent: 189, response: 480 },
  { name: 'Sat', sent: 450, response: 380 },
  { name: 'Sun', sent: 349, response: 430 },
];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('Dashboard');
  const [automations, setAutomations] = useState<Automation[]>(INITIAL_AUTOMATIONS);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(a => 
      a.id === id ? { ...a, status: a.status === 'Active' ? 'Paused' : 'Active' } : a
    ));
  };

  const fetchSuggestions = async () => {
    setIsSuggesting(true);
    const suggestions = await suggestAutomationRules("customer retention and cross-selling");
    setAiSuggestions(suggestions);
    setIsSuggesting(false);
  };

  useEffect(() => {
    if (currentView === 'Automations') {
      fetchSuggestions();
    }
  }, [currentView]);

  return (
    <div className="min-h-screen flex bg-surface">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-1 ml-72">
        <header className="layout-header">
          <div>
            <h1 className="text-xl font-extrabold uppercase tracking-widest text-primary">
              {currentView === 'Dashboard' ? 'Central_Ops' : currentView}
            </h1>
            <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">
              Live // Systems_Stable // v4.12.0
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300 group-hover:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="SEARCH_QUERY..." 
                className="pl-10 pr-4 py-2 bg-zinc-50 border border-outline-variant rounded-none text-[10px] font-bold tracking-widest focus:outline-none focus:border-primary transition-all w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-primary flex items-center gap-3">
              <Plus size={14} /> NEW_ACTION
            </button>
          </div>
        </header>

        <div className="p-10 overflow-y-auto">

        <AnimatePresence mode="wait">
          {currentView === 'Dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                {INITIAL_METRICS.map((metric, idx) => (
                  <StatCard key={metric.id} metric={metric} index={idx} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
                <div className="lg:col-span-2 card h-[400px] flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Message Performance</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1"><div className="w-3 h-3 bg-primary-container rounded-full" /> Sent</span>
                      <span className="flex items-center gap-1"><div className="w-3 h-3 bg-secondary-container rounded-full" /> Responded</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CHART_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} />
                        <ReChartsTooltip 
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="sent" fill="#1A1A1A" radius={[0, 0, 0, 0]} barSize={24} />
                        <Bar dataKey="response" fill="#E2E8F0" radius={[0, 0, 0, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="card flex flex-col gap-6 bg-zinc-50/50">
                  <h3 className="stat-label">Bot_Terminal_Preview</h3>
                  <div className="flex-1 flex items-center justify-center">
                    <ChatPreview />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'Automations' && (
            <motion.div
              key="automations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center bg-white p-10 border-2 border-primary relative overflow-hidden">
                <div className="flex items-start gap-6 relative z-10">
                  <div className="p-4 bg-primary text-white">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold uppercase tracking-tighter">AI_Ruleset_Inference</h3>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Suggested logic gates for production environment.</p>
                  </div>
                </div>
                <button 
                  onClick={fetchSuggestions}
                  disabled={isSuggesting}
                  className="p-3 border border-outline hover:bg-zinc-50 transition-colors text-primary relative z-10"
                >
                  <RefreshCw size={20} className={isSuggesting ? 'animate-spin' : ''} />
                </button>
                <div className="grid-pattern opacity-5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isSuggesting ? (
                  [1, 2, 3].map(i => (
                    <div key={i} className="h-32 border border-outline-variant bg-zinc-50 animate-pulse" />
                  ))
                ) : (
                  aiSuggestions.map((suggestion, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white border border-outline-variant p-6 flex flex-col gap-4 relative group cursor-pointer hover:border-primary transition-all"
                    >
                      <div className="w-1.5 h-1.5 bg-primary absolute top-0 left-0" />
                      <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        <Zap size={10} /> Rule_Proposal_{idx + 1}
                      </div>
                      <p className="text-[13px] font-bold uppercase tracking-tight pr-6">{suggestion}</p>
                      <span className="text-[9px] uppercase font-bold text-primary mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
                        DEPLOY_RULE <ChevronRight size={10} />
                      </span>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="flex items-center gap-4 py-6 border-b border-outline-variant">
                <button className="flex items-center gap-2 px-6 py-2 border border-primary text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-50 transition-all">
                  <Filter size={14} /> Table_Filters
                </button>
                <div className="h-4 w-px bg-outline-variant mx-2" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">QUERY_RESULTS: {automations.length} RECORDS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {automations.map((automation) => (
                  <AutomationCard 
                    key={automation.id} 
                    automation={automation} 
                    onToggle={handleToggleAutomation} 
                  />
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'Contacts' && (
            <motion.div
              key="contacts"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center h-[60vh] text-on-surface-variant flex-col gap-4"
            >
              <Users size={64} className="opacity-20" />
              <p className="text-lg font-medium">Contacts feature coming soon</p>
            </motion.div>
          )}

          {currentView === 'Settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center h-[60vh] text-on-surface-variant flex-col gap-4"
            >
              <Settings size={64} className="opacity-20" />
              <p className="text-lg font-medium">Settings feature coming soon</p>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
