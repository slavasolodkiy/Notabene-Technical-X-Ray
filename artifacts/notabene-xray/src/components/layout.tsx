import React, { useState } from 'react';
import { Link } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { cn } from '@/lib/utils';
import { 
  Network, Box, Users, Database, Shield, LayoutDashboard, 
  Map, Code2, Replace, Activity, Workflow, CheckCircle, 
  HelpCircle, Download, Menu, Search, X, ActivitySquare, ListTree, Archive, AlertTriangle, ScrollText
} from 'lucide-react';
import { useEvidence } from '../hooks/use-evidence';

const NAV_ITEMS = [
  { id: 'blueprint', title: 'System Blueprint', icon: Box, path: '/' },
  { id: 'system-map', title: 'System Map', icon: Network, path: '/system-map' },
  { id: 'corrections', title: 'Audit Corrections', icon: AlertTriangle, path: '/section/corrections' },
  { id: 'code-archaeology', title: 'Code Archaeology', icon: ScrollText, path: '/section/code-archaeology' },
  { id: 'simulator', title: 'Trace Simulator', icon: ActivitySquare, path: '/simulator' },
  { id: 'api-explorer', title: 'API Explorer', icon: Code2, path: '/api-explorer' },
  { id: 'data-dictionary', title: 'Data Dictionary', icon: ListTree, path: '/data-dictionary' },
  { id: 'product-map', title: 'Product Map', icon: Box, path: '/section/product-map' },
  { id: 'actor-map', title: 'Actor Map', icon: Users, path: '/section/actor-map' },
  { id: 'entity-model', title: 'ER Diagram', icon: Database, path: '/section/entity-model' },
  { id: 'data-model', title: 'Data Model', icon: Database, path: '/section/data-model' },
  { id: 'authentication', title: 'Authentication', icon: Shield, path: '/section/authentication' },
  { id: 'onboarding', title: 'Onboarding Flow', icon: LayoutDashboard, path: '/section/onboarding' },
  { id: 'transact-state-machine', title: 'TX State Machine', icon: Activity, path: '/section/transact-state-machine' },
  { id: 'jurisdictions', title: 'Jurisdictions', icon: Map, path: '/section/jurisdictions' },
  { id: 'sdks', title: 'SDKs & Repos', icon: Code2, path: '/section/sdks' },
  { id: 'flow', title: 'Flow / Stablecoin', icon: Replace, path: '/section/flow' },
  { id: 'tap', title: 'TAP Explainer', icon: Workflow, path: '/section/tap' },
  { id: 'trust-model', title: 'Security / Privacy', icon: Shield, path: '/section/trust-model' },
  { id: 'integrations', title: 'Integrations', icon: Box, path: '/section/integrations' },
  { id: 'unknowns', title: 'Unknowns', icon: HelpCircle, path: '/section/unknowns' },
  { id: 'sources', title: 'Sources & Research', icon: Download, path: '/sources' },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [location] = useHashLocation();
  const [search, setSearch] = useState('');
  
  const filtered = NAV_ITEMS.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-sidebar/50 z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 border-r border-sidebar-border shadow-xl md:shadow-none font-mono",
        "md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border bg-sidebar shrink-0">
          <div className="w-8 h-8 rounded-none bg-primary text-primary-foreground flex items-center justify-center font-bold tracking-tighter border border-foreground">
            NX
          </div>
          <div className="flex-1 truncate">
            <h2 className="text-sm font-bold tracking-tight uppercase">Notabene X-Ray</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">v2 Lab Analysis</p>
          </div>
          <button className="md:hidden text-muted-foreground" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 shrink-0 border-b border-sidebar-border bg-sidebar">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="FILTER_MODULES..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-background text-xs border border-border rounded-none pl-9 pr-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-px">
          {filtered.map(item => {
            const isActive = location === item.path;
            return (
              <Link key={item.id} href={item.path} className={cn(
                "flex items-center gap-3 px-3 py-2 text-xs uppercase tracking-wide transition-colors border border-transparent",
                isActive 
                  ? "bg-accent/10 text-foreground font-bold border-accent/30" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )} onClick={() => { if(window.innerWidth < 768) onClose(); }}>
                <item.icon className={cn("w-4 h-4", isActive ? "text-accent" : "opacity-60")} />
                {item.title}
              </Link>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-3 py-8 text-center text-xs text-muted-foreground">
              [ NO_MATCH ]
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: evidence, isLoading } = useEvidence();

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background text-foreground selection:bg-accent selection:text-foreground">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center gap-4 px-4 sm:px-6 border-b border-border bg-background shrink-0 z-10 relative">
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground border border-border p-1"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 flex items-center justify-end">
            <div className="text-[10px] text-muted-foreground flex items-center gap-4 font-mono uppercase tracking-widest">
              <span className="hidden sm:inline-block">
                UPDATED: {isLoading ? 'SYNCING...' : evidence?.researchDate}
              </span>
              <span className="flex items-center gap-1.5 bg-secondary text-foreground px-2 py-1 border border-border">
                <Archive className="w-3 h-3" />
                V2_SNAPSHOT
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto relative">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
            backgroundSize: `40px 40px`,
            opacity: 0.2
          }}></div>
          <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 relative z-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
