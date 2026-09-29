import React, { useState, useMemo } from 'react';
import { useEvidence } from '../hooks/use-evidence';
import { Search, Code2, Shield, Lock, FileJson, Filter } from 'lucide-react';
import { StatusBadge } from '../components/status-badge';
import { cn } from '@/lib/utils';

export default function ApiExplorer() {
  const { data: evidence, isLoading } = useEvidence();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedEndpoint, setSelectedEndpoint] = useState<any | null>(null);

  const endpoints = useMemo(() => {
    if (!evidence?.datasets?.endpoints) return [];
    return evidence.datasets.endpoints.filter(ep => {
      const searchMatch = String(ep.method || '').toLowerCase().includes(search.toLowerCase()) || 
        String(ep.path || '').toLowerCase().includes(search.toLowerCase()) ||
        String(ep.description || '').toLowerCase().includes(search.toLowerCase()) ||
        String(ep.status || '').toLowerCase().includes(search.toLowerCase());
        
      const statusMatch = statusFilter === 'ALL' || String(ep.status || '').toUpperCase() === statusFilter;
      
      return searchMatch && statusMatch;
    }) as any[];
  }, [evidence, search, statusFilter]);

  if (isLoading) {
    return <div className="p-8 text-center animate-pulse">Loading API surface...</div>;
  }

  const getMethodColor = (method: string) => {
    switch(String(method).toUpperCase()) {
      case 'GET': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'POST': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PUT': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'DELETE': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'PATCH': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col -mx-4 sm:-mx-8 -my-4 sm:-my-8 bg-white border-y border-border">
      <div className="border-b border-border bg-slate-50/50 p-4 shrink-0">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
          <Code2 className="w-5 h-5 text-primary" /> API Surface Explorer
        </h1>
        <p className="text-sm text-slate-500 mb-4 max-w-3xl">
          Analyzed from public Postman collections and developer documentation. Live requests are disabled in this environment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search paths, methods, or descriptions..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-md px-3 py-2 shadow-sm shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="text-sm font-medium text-slate-700 bg-transparent border-none focus:ring-0 outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="VERIFIED">Verified</option>
              <option value="INFERRED">Inferred</option>
              <option value="UNKNOWN">Unknown</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* List */}
        <div className="w-full md:w-1/3 lg:w-2/5 border-r border-border overflow-y-auto bg-slate-50">
          {endpoints.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No endpoints found</div>
          ) : (
            <ul className="divide-y divide-border">
              {endpoints.map((ep, i) => (
                <li key={i}>
                  <button 
                    onClick={() => setSelectedEndpoint(ep)}
                    className={cn(
                      "w-full text-left p-4 hover:bg-slate-100 transition-colors flex flex-col gap-2",
                      selectedEndpoint === ep && "bg-white shadow-[inset_3px_0_0_0] shadow-primary"
                    )}
                  >
                    <div className="flex items-center gap-2 font-mono text-sm">
                      <span className={cn("px-2 py-0.5 rounded border text-[10px] font-bold w-14 text-center shrink-0", getMethodColor(String(ep.method)))}>
                        {String(ep.method || 'GET')}
                      </span>
                      <span className="font-semibold text-slate-700 truncate">{String(ep.path || '')}</span>
                    </div>
                    {ep.description && (
                      <p className="text-xs text-slate-500 line-clamp-2">{String(ep.description)}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      {ep.auth && <Shield className="w-3 h-3 text-slate-400" />}
                      {ep.status && <StatusBadge status={String(ep.status)} />}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detail */}
        <div className="hidden md:block md:w-2/3 lg:w-3/5 overflow-y-auto bg-white p-6">
          {selectedEndpoint ? (
            <div className="max-w-3xl animate-in fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className={cn("px-3 py-1 rounded-md border text-sm font-bold font-mono shadow-sm", getMethodColor(String(selectedEndpoint.method)))}>
                  {String(selectedEndpoint.method || 'GET')}
                </span>
                <h2 className="text-2xl font-mono font-bold text-slate-900 break-all">
                  {String(selectedEndpoint.path || '')}
                </h2>
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                {selectedEndpoint.status && <StatusBadge status={String(selectedEndpoint.status)} />}
                {selectedEndpoint.auth && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    <Lock className="w-3.5 h-3.5" />
                    {String(selectedEndpoint.auth)}
                  </span>
                )}
                {selectedEndpoint.group && (
                  <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200 uppercase">
                    {String(selectedEndpoint.group)}
                  </span>
                )}
              </div>

              {selectedEndpoint.description && (
                <div className="prose prose-sm prose-slate max-w-none mb-8">
                  <p>{String(selectedEndpoint.description)}</p>
                </div>
              )}

              {selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2 border-b border-border pb-2">
                    Parameters
                  </h3>
                  <div className="bg-slate-50 rounded-lg border border-border overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-100 border-b border-border text-xs uppercase text-slate-600 font-mono">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Name</th>
                          <th className="px-4 py-3 font-semibold">In</th>
                          <th className="px-4 py-3 font-semibold">Type</th>
                          <th className="px-4 py-3 font-semibold">Required</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border font-mono text-xs">
                        {(selectedEndpoint.parameters as any[]).map((p, i) => (
                          <tr key={i} className="bg-white hover:bg-slate-50">
                            <td className="px-4 py-3 font-semibold text-slate-900">{p.name}</td>
                            <td className="px-4 py-3 text-slate-500">{p.in}</td>
                            <td className="px-4 py-3 text-primary">{p.type}</td>
                            <td className="px-4 py-3 text-slate-500">{p.required ? 'Yes' : 'No'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selectedEndpoint.sourceUrls && selectedEndpoint.sourceUrls.length > 0 && (
                <div className="mb-8 pt-6 border-t border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                    Documentation Context
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedEndpoint.sourceUrls as string[]).map((url, i) => (
                      <a 
                        key={i} 
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-primary bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded border border-primary/20 transition-colors"
                      >
                        {new URL(url).hostname}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2 border-b border-border pb-2">
                  <FileJson className="w-4 h-4" /> Raw Definition
                </h3>
                <pre className="bg-[#0f172a] text-slate-300 p-4 rounded-lg overflow-x-auto text-xs font-mono shadow-inner">
                  <code>{JSON.stringify(selectedEndpoint, null, 2)}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 flex-col gap-4">
              <Code2 className="w-12 h-12 opacity-20" />
              <p>Select an endpoint from the left to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
