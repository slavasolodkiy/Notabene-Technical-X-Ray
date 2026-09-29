import React, { useMemo, useState } from 'react';
import { useRoute } from 'wouter';
import { useEvidence } from '../hooks/use-evidence';
import { MarkdownRenderer } from '../components/markdown-renderer';
import { StatusBadge } from '../components/status-badge';
import { FileText, ExternalLink, ShieldAlert, Filter } from 'lucide-react';

function filterMarkdownByStatus(markdown: string, status: string): string {
  if (status === 'ALL') return markdown;
  
  const blocks = markdown.split('\n\n');
  const filteredBlocks = blocks.map(block => {
    // 1. Table
    if (block.includes('|---') || block.includes('| ---')) {
      const lines = block.split('\n');
      const separatorIdx = lines.findIndex(l => l.includes('|---') || l.includes('| ---'));
      if (separatorIdx > 0) {
        const preTable = lines.slice(0, separatorIdx - 1);
        const headers = lines.slice(separatorIdx - 1, separatorIdx + 1);
        const rows = lines.slice(separatorIdx + 1).filter(r => {
          if (!r.trim().startsWith('|')) return true;
          return r.toUpperCase().includes(status);
        });
        const tableRows = rows.filter(r => r.trim().startsWith('|'));
        if (tableRows.length > 0) {
          return [...preTable, ...headers, ...rows].join('\n');
        }
        return null;
      }
    }
    
    // 2. List
    const lines = block.split('\n');
    const isList = lines.some(l => l.trim().startsWith('- ') || l.trim().startsWith('* '));
    
    if (isList) {
      const filteredLines = lines.filter(l => {
        if (l.trim().startsWith('#')) return true;
        return l.toUpperCase().includes(status);
      });
      if (filteredLines.some(l => l.toUpperCase().includes(status))) {
        return filteredLines.join('\n');
      }
      return null;
    }
    
    // 3. Normal paragraph/block
    if (block.toUpperCase().includes(status)) {
      return block;
    }
    return null;
  }).filter(Boolean);

  if (filteredBlocks.length === 0) {
    return `> *No ${status} evidence snippets found in this section.*`;
  }
  return filteredBlocks.join('\n\n');
}

export default function SectionPage() {
  const [match, params] = useRoute('/section/:id');
  const sectionId = (match && params && params.id) ? params.id : 'unknown';
  
  const { data: evidence, isLoading, error } = useEvidence();
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const section = useMemo(() => {
    if (!evidence) return null;
    return evidence.sections.find(s => s.id === sectionId) || null;
  }, [evidence, sectionId]);

  const displayMarkdown = useMemo(() => {
    if (!section) return '';
    return filterMarkdownByStatus(section.markdown, statusFilter);
  }, [section, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] font-mono text-sm tracking-widest text-muted-foreground uppercase">
        <div className="animate-pulse">[ LOADING_SECTION ]</div>
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

  if (!section) {
    return (
      <div className="text-center py-20 font-mono">
        <h2 className="text-2xl font-bold mb-2 uppercase tracking-widest">[ 404_NOT_FOUND ]</h2>
        <p className="text-muted-foreground text-sm uppercase tracking-wide">Section "{sectionId}" not present in bundle.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto relative z-10">
      <header className="mb-10 relative">
        <div className="absolute -left-8 top-0 bottom-0 w-px bg-border hidden md:block"></div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-4 font-mono">
            <StatusBadge status={section.status} />
            <div className="h-4 w-px bg-border hidden sm:block" />
            <span className="text-xs text-muted-foreground tracking-widest uppercase flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-muted-foreground"></span>
              ID: {section.id}
            </span>
          </div>
          
          <div className="flex items-center gap-2 bg-background border border-border p-1 text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-muted-foreground ml-2" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-foreground outline-none cursor-pointer pr-2 uppercase tracking-wider font-bold"
            >
              <option value="ALL">ALL_EVIDENCE</option>
              <option value="VERIFIED">VERIFIED_ONLY</option>
              <option value="INFERRED">INFERRED_ONLY</option>
              <option value="UNKNOWN">UNKNOWN_ONLY</option>
            </select>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 uppercase text-foreground leading-none">
          {section.title}
        </h1>
      </header>

      <div className="bg-background border border-border mb-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-border"></div>
        <div className="border-b border-border bg-secondary/50 px-6 py-3 flex items-center justify-between ml-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">Content.Markdown</h2>
        </div>
        <div className="p-6 sm:p-8 ml-2 bg-card">
          <MarkdownRenderer content={displayMarkdown} />
        </div>
      </div>

      {section.sourceIds && section.sourceIds.length > 0 && (
        <div className="mt-12 mb-20 border-t border-border pt-8 relative">
          <div className="absolute -top-1 left-0 w-2 h-2 bg-border"></div>
          <div className="absolute -top-1 right-0 w-2 h-2 bg-border"></div>
          
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Ref_Sources [{section.sourceIds.length}]
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.sourceIds.map(sourceId => {
              const source = evidence?.sources.find(s => s.id === sourceId);
              if (!source) return null;
              
              // "Sources local URLs: packaging enriches source.localPath pointing corpus metadata/raw; only link if available; docs paths base-aware."
              const hasLocal = !!source.localPath;
              const linkTarget = hasLocal 
                ? `${import.meta.env.BASE_URL}${source.localPath}`.replace('//', '/')
                : source.url;

              return (
                <div key={source.id} className="bg-background p-4 border border-border flex flex-col hover:border-accent transition-colors group relative">
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-4 border-l-4 border-transparent group-hover:border-accent transition-colors"></div>
                  
                  <div className="flex justify-between items-start gap-4 mb-3 font-mono">
                    <span className="text-[10px] bg-secondary text-foreground px-2 py-1 border border-border uppercase tracking-widest">
                      {source.id}
                    </span>
                    <span className="text-[10px] text-muted-foreground tracking-widest">T-{source.tier}</span>
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-4 flex-1 leading-snug">{source.title}</h4>
                  <a 
                    href={linkTarget} 
                    target={hasLocal ? "_self" : "_blank"} 
                    rel={hasLocal ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-muted-foreground hover:text-accent uppercase tracking-widest transition-colors border-t border-border pt-3 w-full"
                  >
                    {hasLocal ? '[ OPEN_LOCAL ]' : '[ OPEN_EXTERNAL ]'} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
