import React, { useState, useMemo } from 'react';
import { useEvidence } from '../hooks/use-evidence';
import { Search, Database, FileJson, Filter } from 'lucide-react';
import { StatusBadge } from '../components/status-badge';
import { cn } from '@/lib/utils';

export default function DataDictionary() {
  const { data: evidence, isLoading } = useEvidence();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'fields' | 'entities'>('fields');

  const items = useMemo(() => {
    if (!evidence?.datasets) return [];
    const ds = activeTab === 'fields' ? evidence.datasets.fields : evidence.datasets.entities;
    if (!ds) return [];
    
    return ds.filter(item => {
      const searchStr = search.toLowerCase();
      const searchMatch = String(item.name || item.id || '').toLowerCase().includes(searchStr) ||
        String(item.description || '').toLowerCase().includes(searchStr) ||
        String(item.type || '').toLowerCase().includes(searchStr) ||
        String(item.status || '').toLowerCase().includes(searchStr);
        
      const statusMatch = statusFilter === 'ALL' || String(item.status || '').toUpperCase() === statusFilter;
      
      return searchMatch && statusMatch;
    }) as any[];
  }, [evidence, search, activeTab, statusFilter]);

  if (isLoading) {
    return <div className="p-8 text-center animate-pulse">Loading data model...</div>;
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col -mx-4 sm:-mx-8 -my-4 sm:-my-8 bg-white border-y border-border">
      <div className="border-b border-border bg-slate-50/50 p-4 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-primary" /> Data Dictionary
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl">
              Catalog of inferred schemas, fields, and entities observed across webhooks, APIs, and SDKs.
            </p>
          </div>
          <div className="flex bg-slate-200/50 p-1 rounded-lg border border-border shrink-0">
            <button
              onClick={() => { setActiveTab('fields'); setSelectedItem(null); }}
              className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-colors", activeTab === 'fields' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >
              Fields
            </button>
            <button
              onClick={() => { setActiveTab('entities'); setSelectedItem(null); }}
              className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-colors", activeTab === 'entities' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >
              Entities
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`}
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
          {items.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No items found</div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item, i) => {
                const title = String(item.name || item.id || `Item ${i}`);
                const subtitle = String(item.type || item.group || '');
                return (
                  <li key={i}>
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className={cn(
                        "w-full text-left p-4 hover:bg-slate-100 transition-colors flex flex-col gap-2",
                        selectedItem === item && "bg-white shadow-[inset_3px_0_0_0] shadow-primary"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono font-semibold text-slate-800 text-sm truncate">{title}</span>
                        {item.status && <StatusBadge status={String(item.status)} />}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {subtitle && <span className="text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded">{subtitle}</span>}
                        {item.description && <span className="text-slate-500 truncate">{String(item.description)}</span>}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Detail */}
        <div className="hidden md:block md:w-2/3 lg:w-3/5 overflow-y-auto bg-white p-6">
          {selectedItem ? (
            <div className="max-w-3xl animate-in fade-in">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-mono font-bold text-slate-900 break-all">
                  {String(selectedItem.name || selectedItem.id || 'Unknown')}
                </h2>
                {selectedItem.status && <StatusBadge status={String(selectedItem.status)} />}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8 bg-slate-50 p-4 rounded-lg border border-border font-mono text-sm">
                {Object.entries(selectedItem).map(([k, v]) => {
                  if (k === 'name' || k === 'id' || k === 'status' || k === 'description' || k === 'sourceUrls' || typeof v === 'object') return null;
                  return (
                    <div key={k}>
                      <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">{k}</span>
                      <span className="text-slate-900 font-medium">{String(v)}</span>
                    </div>
                  );
                })}
              </div>

              {selectedItem.description && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Description</h3>
                  <p className="text-slate-700 leading-relaxed text-sm">{String(selectedItem.description)}</p>
                </div>
              )}

              {selectedItem.sourceUrls && (selectedItem.sourceUrls as string[]).length > 0 && (
                <div className="mb-8 pt-6 border-t border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                    Documentation Context
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedItem.sourceUrls as string[]).map((url, i) => (
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
                  <FileJson className="w-4 h-4" /> Raw Record
                </h3>
                <pre className="bg-[#0f172a] text-slate-300 p-4 rounded-lg overflow-x-auto text-xs font-mono shadow-inner">
                  <code>{JSON.stringify(selectedItem, null, 2)}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 flex-col gap-4">
              <Database className="w-12 h-12 opacity-20" />
              <p>Select a record to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
