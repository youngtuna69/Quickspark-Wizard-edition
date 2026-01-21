
import React from 'react';

interface Props {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

export const DashboardCard: React.FC<Props> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
          <i className={`fas ${icon} text-blue-400 text-xl`}></i>
        </div>
        {trend && (
          <span className={`text-xs font-bold ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">{title}</h3>
      <p className="text-2xl font-bold text-white mono">{value}</p>
    </div>
  );
};
