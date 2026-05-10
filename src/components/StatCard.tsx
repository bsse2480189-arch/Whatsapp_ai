import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DashboardMetric } from '../types';
import { motion } from 'motion/react';

interface StatCardProps {
  metric: DashboardMetric;
  index: number;
}

export default function StatCard({ metric, index }: StatCardProps) {
  const isPositive = metric.trend > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card flex flex-col justify-between overflow-hidden"
      id={`stat-card-${metric.id}`}
    >
      <span className="stat-label">
        {metric.label}
      </span>
      <div className="flex items-baseline justify-between relative z-10">
        <span className="stat-value tracking-tighter">{metric.value}</span>
      </div>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/50 relative z-10">
        <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border ${
          isPositive ? 'border-primary text-primary' : 'border-zinc-300 text-zinc-400'
        }`}>
          {isPositive ? '+' : '-'}{Math.abs(metric.trend)}%
        </div>
        <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest leading-none">
          {metric.trendLabel}
        </span>
      </div>
      <div className="grid-pattern" />
    </motion.div>
  );
}
