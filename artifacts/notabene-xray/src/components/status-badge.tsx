import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, HelpCircle, Eye, AlertTriangle } from 'lucide-react';
import { EvidenceStatus } from '../lib/evidence-types';

export function StatusBadge({ status, className }: { status: EvidenceStatus | string, className?: string }) {
  const normStatus = status.toUpperCase();
  
  if (normStatus === 'VERIFIED' || normStatus === 'CONFIRMED') {
    return (
      <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold bg-background text-foreground border border-foreground uppercase tracking-widest", className)}>
        <CheckCircle2 className="w-3 h-3" />
        {normStatus}
      </span>
    );
  }
  if (normStatus === 'INFERRED') {
    return (
      <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold bg-secondary text-foreground border border-border uppercase tracking-widest", className)}>
        <Eye className="w-3 h-3" />
        {normStatus}
      </span>
    );
  }
  if (normStatus === 'CORRECTED' || normStatus === 'REFUTED' || normStatus.includes('!=')) {
    return (
      <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold bg-accent/20 text-foreground border border-accent uppercase tracking-widest", className)}>
        <AlertTriangle className="w-3 h-3 text-accent" />
        {normStatus}
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold bg-muted text-muted-foreground border border-border uppercase tracking-widest", className)}>
      <HelpCircle className="w-3 h-3" />
      {normStatus || 'UNKNOWN'}
    </span>
  );
}
