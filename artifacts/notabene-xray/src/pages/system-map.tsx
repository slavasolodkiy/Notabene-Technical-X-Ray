import React, { useMemo } from 'react';
import { useEvidence } from '../hooks/use-evidence';
import { MarkdownRenderer } from '../components/markdown-renderer';
import { Network, ShieldAlert } from 'lucide-react';

export default function SystemMap() {
  const { data: evidence, isLoading, error } = useEvidence();

  const section = useMemo(() => {
    if (!evidence) return null;
    return evidence.sections.find(s => s.id === 'system-map') || null;
  }, [evidence]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] font-mono text-sm tracking-widest text-muted-foreground uppercase">
        <div className="animate-pulse">[ LOADING_SYSTEM_MAP ]</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive text-destructive-foreground p-6 border border-destructive-border flex items-start gap-4 font-mono text-sm">
        <ShieldAlert className="w-6 h-6 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-lg mb-1 uppercase tracking-widest">Sys_Error</h3>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto font-mono">
      <header className="mb-8 border-b border-border pb-4">
        <div className="flex items-center gap-3 mb-2">
          <Network className="w-6 h-6 text-accent" />
          <h1 className="text-2xl font-bold uppercase tracking-widest">System Boundary Map</h1>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Runtime & Boundary analysis distinct from Product/Actor models.
        </p>
      </header>

      {section ? (
        <div className="bg-background border border-border p-6 shadow-sm font-sans relative">
          <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-border bg-secondary/10 pointer-events-none"></div>
          <MarkdownRenderer content={section.markdown} />
        </div>
      ) : (
        <div className="text-center py-20 border border-border border-dashed text-muted-foreground text-xs uppercase tracking-widest">
          [ SYSTEM_MAP_DATA_NOT_FOUND ]
        </div>
      )}
    </div>
  );
}
