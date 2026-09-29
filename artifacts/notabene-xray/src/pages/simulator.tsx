import React, { useState, useMemo } from 'react';
import { defaultInput, simulate, type SimulationInput, type SimulationResult, type SimulationStep } from '../lib/simulator';
import { ActivitySquare, Play, RotateCcw, ShieldAlert, FileJson, Link as LinkIcon, Info, Users, Database, Shield, Code2, Download, Workflow, ZapOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '../components/status-badge';

export default function Simulator() {
  const [input, setInput] = useState<SimulationInput>(defaultInput);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRun = () => {
    if (input.value <= 0 || !Number.isFinite(input.value)) {
      setError("Please enter a valid positive fiat equivalent value.");
      return;
    }
    setError(null);
    setIsSimulating(true);
    setTimeout(() => {
      try {
        const res = simulate(input);
        setResult(res);
        setActiveStepId(res.steps[0]?.id || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected simulation error occurred.");
      } finally {
        setIsSimulating(false);
      }
    }, 600);
  };

  const handleReset = () => {
    setResult(null);
    setActiveStepId(null);
    setError(null);
  };

  const activeStep = useMemo(() => {
    if (!result || !activeStepId) return null;
    return result.steps.find(s => s.id === activeStepId) || null;
  }, [result, activeStepId]);

  return (
    <div className="min-h-[calc(100dvh-8rem)] lg:h-[calc(100dvh-8rem)] flex flex-col -mx-4 sm:-mx-8 -my-4 sm:-my-8 bg-background font-sans text-foreground">
      <div className="border-b border-border bg-background p-4 shrink-0 z-10 relative">
        <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-border bg-secondary/10 pointer-events-none"></div>
        <h1 className="text-xl font-bold uppercase tracking-widest flex items-center gap-3 mb-2 font-mono">
          <ActivitySquare className="w-5 h-5 text-accent" /> Synthetic_Trace_Simulator
        </h1>
        <p className="text-xs text-muted-foreground max-w-3xl uppercase tracking-wider font-mono">
          Educational 14-step model, 8 facets per step. Performs no network/crypto I/O. No legal-compliance verdict.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 lg:overflow-hidden">
        {/* Configuration Panel */}
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-secondary/20 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-4 border-b border-border bg-background flex items-center justify-between sticky top-0 z-10 font-mono">
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">Parameters</h2>
            <div className="flex gap-2">
              <button 
                onClick={handleReset}
                className="p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors"
                title="Reset" aria-label="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button 
                onClick={handleRun}
                disabled={isSimulating}
                className="flex items-center gap-1.5 px-3 py-1 bg-foreground text-background border border-foreground font-bold uppercase tracking-widest text-[10px] hover:bg-transparent hover:text-foreground transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                <Play className="w-3 h-3" />
                {isSimulating ? 'RUNNING' : 'EXECUTE'}
              </button>
            </div>
          </div>
          
          <div className="p-4 space-y-5 flex-1 font-mono">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Bob's Wallet Type</label>
              <select 
                value={input.wallet} 
                onChange={e => setInput({...input, wallet: e.target.value as any})}
                className="w-full text-xs border border-border bg-background p-2 outline-none focus:border-ring uppercase tracking-wider"
              >
                <option value="hosted">HOSTED (VASP)</option>
                <option value="self-hosted">UNHOSTED (SELF)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Person Type</span>
              <div role="radiogroup" aria-label="Person type" className="grid grid-cols-2 border border-border">
                {(['natural','legal'] as const).map(p => (
                  <button key={p} type="button" role="radio" aria-checked={input.person === p}
                    onClick={() => setInput({...input, person: p})}
                    className={cn("py-2 text-[10px] font-bold uppercase tracking-widest transition-colors motion-reduce:transition-none", input.person === p ? "bg-foreground text-background" : "bg-background hover:bg-secondary")}>
                    {p === 'natural' ? 'Natural Person' : 'Legal Person'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="sim-proof" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Ownership Proof Method</label>
              <select id="sim-proof"
                value={input.proof}
                onChange={e => setInput({...input, proof: e.target.value as SimulationInput['proof']})}
                className="w-full text-xs border border-border bg-background p-2 outline-none focus:border-ring uppercase tracking-wider"
              >
                <option value="signature">Message Signature</option>
                <option value="satoshi">Satoshi Test (micro-transfer)</option>
                <option value="screenshot">Screenshot</option>
                <option value="self-declaration">Self-Declaration</option>
                <option value="reusable">Reusable Proof</option>
                <option value="third-party">Third-Party Attestation</option>
              </select>
              <p className="text-[9px] text-muted-foreground leading-snug">Relevant mainly to self-hosted wallets. Method strength is an institution judgement, not a verdict produced here.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Alice's Jurisdiction</label>
              <select 
                value={input.jurisdiction} 
                onChange={e => setInput({...input, jurisdiction: e.target.value as any})}
                className="w-full text-xs border border-border bg-background p-2 outline-none focus:border-ring uppercase tracking-wider"
              >
                <option value="EU">EU (TFR)</option>
                <option value="GB">UK (FCA)</option>
                <option value="US">US (FINCEN)</option>
                <option value="SG">SG (MAS)</option>
                <option value="JP">JP (FSA)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Fiat Equivalent Value</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-muted-foreground text-xs">{({ GB: 'EUR', EU: 'EUR', US: 'USD', SG: 'SGD', JP: 'JPY' })[input.jurisdiction]}</span>
                <input 
                  type="number" 
                  value={input.value} 
                  onChange={e => setInput({...input, value: Number(e.target.value)})}
                  className="w-full pl-12 pr-3 py-2 text-xs border border-border bg-background outline-none focus:border-ring"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Institution Policy</label>
              <select 
                value={input.policy} 
                onChange={e => setInput({...input, policy: e.target.value as any})}
                className="w-full text-xs border border-border bg-background p-2 outline-none focus:border-ring uppercase tracking-wider"
              >
                <option value="authorize">AUTHORIZE</option>
                <option value="flag">FLAG_REVIEW</option>
                <option value="reject">AUTO_REJECT</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-xs cursor-pointer p-2 bg-background border border-border">
              <input 
                type="checkbox" 
                checked={input.counterpartyFound}
                onChange={e => setInput({...input, counterpartyFound: e.target.checked})}
                className="rounded-none border-border text-foreground focus:ring-0 bg-transparent"
              />
              <span className="font-bold text-foreground uppercase tracking-widest">Counterparty In Directory</span>
            </label>
          </div>
        </div>

        {/* Results Panel */}
        <div className="flex-1 flex flex-col min-w-0 bg-background relative">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
            backgroundSize: `40px 40px`,
            opacity: 0.1
          }}></div>

          {error ? (
            <div className="h-full flex items-center justify-center p-8 relative z-10 font-mono">
              <div className="max-w-md w-full bg-accent/10 text-foreground p-6 border border-accent flex flex-col items-center text-center gap-4">
                <ShieldAlert className="w-10 h-10 text-accent" />
                <div>
                  <h3 className="font-bold text-lg mb-2 uppercase tracking-widest text-accent">Simulation Failed</h3>
                  <p className="text-xs uppercase tracking-wider">{error}</p>
                </div>
                <button 
                  onClick={() => setError(null)}
                  className="mt-4 px-4 py-1.5 border border-foreground hover:bg-foreground hover:text-background text-[10px] uppercase tracking-widest transition-colors font-bold"
                >
                  DISMISS
                </button>
              </div>
            </div>
          ) : !result ? (
            <div className="h-full flex items-center justify-center text-muted-foreground flex-col gap-4 relative z-10 font-mono">
              <Workflow className="w-16 h-16 opacity-20" />
              <p className="text-xs uppercase tracking-widest">Configure parameters & Execute</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden relative z-10">
              {/* Steps Timeline */}
              <div className="w-full md:w-72 max-h-64 md:max-h-none border-b md:border-b-0 md:border-r border-border bg-background overflow-y-auto font-mono">
                <div className="p-3 border-b border-border bg-secondary/50 text-[10px] font-bold uppercase tracking-widest text-foreground sticky top-0 z-10 flex items-center justify-between">
                  <span>Execution Trace</span>
                  <span className="bg-foreground text-background px-1.5">{result.steps.length} STEPS</span>
                </div>
                <ul className="py-2">
                  {result.steps.map((step, i) => (
                    <li key={step.id} className="px-2 mb-1">
                      <button
                        onClick={() => setActiveStepId(step.id)}
                        aria-current={activeStepId === step.id ? 'step' : undefined}
                        className={cn(
                          "w-full text-left p-3 text-xs flex gap-3 transition-colors border relative group",
                          activeStepId === step.id 
                            ? "bg-accent/10 text-foreground border-accent" 
                            : "bg-background text-muted-foreground border-transparent hover:border-border hover:bg-secondary/30"
                        )}
                      >
                        {activeStepId === step.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                        )}
                        <div className="flex flex-col items-center gap-1 shrink-0">
                          <div className={cn("text-[9px] font-bold",
                            activeStepId === step.id ? "text-accent" : "text-muted-foreground"
                          )}>
                            {String(i + 1).padStart(2, '0')}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn("font-bold truncate uppercase tracking-wider", activeStepId === step.id ? "text-foreground" : "")}>
                            {step.title.replace(/^\d+\s/, '')}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step Detail */}
              <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                {activeStep && (
                  <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-4 motion-reduce:animate-none">
                    <div className="mb-8 flex items-start justify-between gap-4 font-mono">
                      <div>
                        <h2 className="text-3xl font-bold text-foreground mb-4 uppercase tracking-tighter leading-none">
                          {activeStep.title}
                        </h2>
                        <StatusBadge status={activeStep.state} />
                      </div>
                    </div>

                    <div className="bg-background p-5 border border-border mb-8 shadow-sm relative">
                      <div className="absolute -top-px -left-px w-2 h-2 bg-foreground"></div>
                      <p className="text-foreground leading-relaxed text-sm">
                        {activeStep.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 font-mono">
                      <div className="border border-border p-4 bg-secondary/20">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2"><Users className="w-3 h-3"/> Actor</div>
                        <div className="text-xs font-bold text-foreground">{activeStep.facets.actor}</div>
                      </div>
                      <div className="border border-border p-4 bg-secondary/20">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2"><Database className="w-3 h-3"/> Data</div>
                        <div className="text-xs font-bold text-foreground">{activeStep.facets.data}</div>
                      </div>
                      <div className="border border-border p-4 bg-secondary/20">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2"><Shield className="w-3 h-3"/> Trust Boundary</div>
                        <div className="text-xs font-bold text-foreground">{activeStep.facets.trust}</div>
                      </div>
                      <div className="border border-border p-4 bg-secondary/20">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2"><Code2 className="w-3 h-3"/> Code / API</div>
                        <div className="text-xs font-bold text-foreground">{activeStep.facets.codeApi}</div>
                      </div>
                      <div className="border border-border p-4 bg-secondary/20">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2"><Download className="w-3 h-3"/> Source</div>
                        <div className="text-xs font-bold text-foreground">{activeStep.facets.source}</div>
                      </div>
                      <div className="border border-border p-4 bg-secondary/20">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2"><ActivitySquare className="w-3 h-3"/> State</div>
                        <div className="text-xs font-bold text-foreground">{activeStep.facets.stateFacet}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 font-mono">
                      <div className="border border-accent/50 p-4 bg-accent/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-1 bg-accent text-background text-[8px] font-bold uppercase">Does</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Modeled Notabene role (illustrative)</div>
                        <div className="text-xs font-bold text-foreground leading-relaxed">{activeStep.facets.does}</div>
                      </div>
                      <div className="border border-destructive/50 p-4 bg-destructive/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-1 bg-destructive text-background text-[8px] font-bold uppercase">Does Not</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1">
                          <ZapOff className="w-3 h-3 text-destructive" /> Outside the modeled Notabene role
                        </div>
                        <div className="text-xs font-bold text-foreground leading-relaxed">{activeStep.facets.doesNotDo}</div>
                      </div>
                    </div>

                    {Object.keys(activeStep.artifacts).length > 0 && (
                      <div className="space-y-4 mb-8">
                        {Object.entries(activeStep.artifacts).map(([name, payload]) => (
                          <div key={name} className="bg-foreground rounded-none overflow-hidden border border-foreground shadow-lg">
                            <div className="flex items-center gap-2 px-4 py-2 border-b border-background/20 bg-foreground">
                              <FileJson className="w-4 h-4 text-accent" />
                              <span className="text-[10px] font-mono font-bold text-background uppercase tracking-widest">{name}.json</span>
                            </div>
                            <div className="p-4 overflow-x-auto bg-[#1a1a1a]">
                              <pre className="text-xs font-mono text-[#d4d4d4]">
                                <code>{JSON.stringify(payload, null, 2)}</code>
                              </pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {activeStep.sourceUrls?.length > 0 && (
                      <div className="pt-6 border-t border-border font-mono">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                          <LinkIcon className="w-3 h-3" /> Docs Context
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeStep.sourceUrls.map((url, i) => (
                            <a 
                              key={i} 
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-bold uppercase tracking-widest text-foreground bg-secondary/50 hover:bg-accent/20 hover:text-accent px-2 py-1 border border-border transition-colors flex items-center gap-1"
                            >
                              {new URL(url).hostname}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
