import React, { useState } from 'react';
import { useEvidence } from '../hooks/use-evidence';
import { Download, ExternalLink, Search, FileText, Database, ShieldAlert, Archive, Code2, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sources() {
  const { data: evidence, isLoading } = useEvidence();
  const [search, setSearch] = useState('');

  if (isLoading) {
    return <div className="p-8 text-center animate-pulse font-mono text-sm uppercase tracking-widest text-muted-foreground">[ LOADING_SOURCES ]</div>;
  }

  if (!evidence) {
    return (
      <div className="bg-destructive text-destructive-foreground p-6 border border-destructive-border flex items-start gap-4 font-mono text-sm">
        <ShieldAlert className="w-6 h-6 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-lg mb-1 uppercase tracking-widest">Sys_Error</h3>
          <p>No data returned.</p>
        </div>
      </div>
    );
  }

  const filteredSources = evidence.sources.filter(s => 
    s.id.toLowerCase().includes(search.toLowerCase()) || 
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    (s.notes && s.notes.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = evidence.stats || {
    archivedPages: 0, sources: 0, endpoints: 0, fields: 0, repositories: 0
  };

  return (
    <div className="animate-in fade-in max-w-5xl mx-auto pb-12 font-sans">
      <header className="mb-10 font-mono">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground uppercase border-b border-border pb-4">Sources & Evidence Base</h1>
        <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed uppercase tracking-wider">
          Independent research compiled on {evidence.researchDate}. Every claim in this workbench traces back to publicly accessible developer documentation, API references, or SDK source code.
        </p>
      </header>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 font-mono">
        {[
          { label: 'Archived Pages', value: stats.archivedPages, icon: Archive },
          { label: 'Formal Sources', value: stats.sources, icon: FileText },
          { label: 'API Endpoints', value: stats.endpoints, icon: Layers },
          { label: 'Data Fields', value: stats.fields, icon: Database },
          { label: 'SDK Repos', value: stats.repositories, icon: Code2 },
        ].map((stat, i) => (
          <div key={i} className="bg-background p-4 border border-border flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <stat.icon className="w-5 h-5 text-accent mb-2 relative z-10" />
            <div className="text-2xl font-bold text-foreground mb-1 relative z-10">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold relative z-10">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Downloads */}
      {evidence.documents && evidence.documents.length > 0 && (
        <div className="mb-12 font-mono">
          <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2 uppercase tracking-widest border-b border-border pb-2">
            <Download className="w-4 h-4 text-muted-foreground" /> Offline Archives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {evidence.documents.map((doc, i) => (
              <a 
                key={i}
                href={`${import.meta.env.BASE_URL}${doc.path.replace(/^\//, '')}`}
                download
                className="flex items-center gap-3 p-3 bg-background border border-border hover:border-accent transition-all group"
              >
                <div className="w-8 h-8 bg-secondary flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-background transition-colors text-muted-foreground">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-foreground truncate uppercase tracking-widest">{doc.title}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{doc.path.split('/').pop()}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Source Index */}
      <div className="font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-widest">
            <Database className="w-4 h-4 text-muted-foreground" /> Source Index
          </h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="SEARCH_SOURCES..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-background border border-border text-xs focus:outline-none focus:border-ring placeholder:text-muted-foreground text-foreground uppercase tracking-wider"
            />
          </div>
        </div>

        <div className="bg-background border border-border overflow-hidden relative">
          <div className="absolute top-0 right-0 w-2 h-full bg-border"></div>
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/50 border-b border-border text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-bold border-r border-border/50">ID</th>
                <th className="px-4 py-3 font-bold border-r border-border/50">Title & Ext_Link</th>
                <th className="px-4 py-3 font-bold border-r border-border/50">Tier</th>
                <th className="px-4 py-3 font-bold">Local Archive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSources.map((source) => {
                const hasLocal = !!source.localPath;
                const localHref = hasLocal ? `${import.meta.env.BASE_URL}${source.localPath}`.replace('//', '/') : undefined;

                return (
                  <tr key={source.id} className="hover:bg-secondary/20 transition-colors group">
                    <td className="px-4 py-3 border-r border-border/50 align-top">
                      <span className="font-bold bg-secondary text-foreground px-2 py-0.5 border border-border tracking-widest">
                        {source.id}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-r border-border/50">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-bold text-foreground leading-snug">{source.title}</span>
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground hover:text-accent flex items-center gap-1 w-fit transition-colors uppercase tracking-wider">
                          [EXT] {new URL(source.url).hostname} <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-r border-border/50 align-top">
                      <span className={cn(
                        "px-2 py-0.5 font-bold border tracking-widest text-[10px]",
                        source.tier === 1 ? "bg-accent/10 text-accent border-accent/50" :
                        source.tier === 2 ? "bg-secondary text-foreground border-border" :
                        "bg-background text-muted-foreground border-border border-dashed"
                      )}>
                        T{source.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      {hasLocal ? (
                        <a href={localHref} target="_self" className="text-[10px] font-bold text-foreground bg-background border border-foreground/30 px-2 py-1 flex items-center gap-1.5 w-fit hover:border-accent hover:text-accent transition-colors uppercase tracking-widest">
                          <Archive className="w-3 h-3" /> View Local
                        </a>
                      ) : (
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest border border-dashed border-border/50 px-2 py-1 inline-block">
                          Unavailable
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredSources.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground uppercase tracking-widest">
                    [ NO_SOURCES_MATCH ]
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
