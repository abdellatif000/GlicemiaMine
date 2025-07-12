
// src/components/empty-state.tsx
import * as React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 p-8 text-center mt-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
        </div>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}
