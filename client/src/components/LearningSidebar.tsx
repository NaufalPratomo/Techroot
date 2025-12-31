import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, BookOpen, HelpCircle, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LearningSidebarProps {
  pathTitle: string;
  pathId: string;
}

const sidebarItems = [
  { icon: BookOpen, label: 'Materi', path: '' },
  { icon: HelpCircle, label: 'Bantuan', path: '#help' },
  { icon: Settings, label: 'Pengaturan', path: '#settings' },
];

export const LearningSidebar: React.FC<LearningSidebarProps> = ({ pathTitle, pathId }) => {
  const location = useLocation();

  return (
    <div className="w-14 bg-card border-r border-border flex flex-col items-center py-4 gap-6">
      {/* Back to path */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={`/paths/${pathId}`}
              className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Kembali ke {pathTitle}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="w-8 h-px bg-border" />

      {/* Navigation Items */}
      <TooltipProvider>
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '' || location.hash === item.path;

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center justify-center h-10 w-10 rounded-lg transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </TooltipProvider>
    </div>
  );
};
