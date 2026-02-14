import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-heist-panel border border-heist-border p-4 rounded-xl shadow-hud-panel">
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6 text-cyan-400" />
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 uppercase tracking-wide">{title}</h2>
          <p className="text-gray-400 text-sm font-mono">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
