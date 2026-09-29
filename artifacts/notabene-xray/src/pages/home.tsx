import React, { useState, useRef } from 'react';
import { Box, Code2, Database, Network, Shield, Key, Zap, Eye, EyeOff, Plus, Minus, Move, ScanLine } from 'lucide-react';
import { useEvidence } from '../hooks/use-evidence';

type XClass = 'PUBLIC STANDARD' | 'OPEN SOURCE' | 'NOTABENE HOSTED SERVICE' | 'CUSTOMER RESPONSIBILITY' | 'EXTERNAL PROVIDER' | 'UNKNOWN' | 'CONTRADICTION';
const XCLASS_STYLE: Record<XClass, { code: string; cls: string }> = {
  'PUBLIC STANDARD': { code: 'STD', cls: 'bg-[hsl(205_70%_42%)] text-[hsl(45_20%_96%)]' },
  'OPEN SOURCE': { code: 'OSS', cls: 'bg-[hsl(150_45%_32%)] text-[hsl(45_20%_96%)]' },
  'NOTABENE HOSTED SERVICE': { code: 'NBH', cls: 'bg-foreground text-background' },
  'CUSTOMER RESPONSIBILITY': { code: 'CUS', cls: 'bg-[hsl(28_85%_50%)] text-foreground' },
  'EXTERNAL PROVIDER': { code: 'EXT', cls: 'bg-[hsl(45_10%_70%)] text-foreground' },
  'UNKNOWN': { code: '???', cls: 'bg-background text-foreground border border-dashed border-foreground' },
  'CONTRADICTION': { code: 'CTR', cls: 'bg-destructive text-destructive-foreground' },
};
const XRAY: Record<string, { classes: XClass[]; note: string }> = {
  'm-customer': { classes: ['CUSTOMER RESPONSIBILITY'], note: 'End customer of the institution. Supplies instructions and PII; not operated by Notabene.' },
  'm-safeconnect': { classes: ['OPEN SOURCE', 'NOTABENE HOSTED SERVICE'], note: 'Client widget/SDK is publicly documented; the backing verification service is operated by Notabene. Hosting of UI is embedded by the institution.' },
  'm-backend': { classes: ['CUSTOMER RESPONSIBILITY'], note: 'Institution-operated. Calls the documented API; internal design is outside public evidence.' },
  'm-transact': { classes: ['NOTABENE HOSTED SERVICE'], note: 'API contract is public (OpenAPI). Internal implementation, storage and routing are proprietary and not observable.' },
  'm-tap': { classes: ['PUBLIC STANDARD', 'OPEN SOURCE'], note: 'TAP and DIDComm are published specifications with open-source libraries. Reproducible from public artifacts.' },
  'm-counterparty': { classes: ['CUSTOMER RESPONSIBILITY'], note: 'Counterparty institution decides accept/reject under its own policy and obligations.' },
  'm-settlement': { classes: ['EXTERNAL PROVIDER'], note: 'Blockchain or fiat rail. Notabene does not settle value; the simulator never broadcasts.' },
  's-did': { classes: ['PUBLIC STANDARD', 'UNKNOWN'], note: 'DID methods and JWS are public standards. Who holds signing keys (Notabene-hosted vs customer-held) is mode-dependent and not established by archived evidence. Not labelled custodial.' },
  's-pii': { classes: ['OPEN SOURCE', 'UNKNOWN'], note: 'PII encryption SDK is public. Whether encryption happens client-side or on hosted infrastructure depends on integration mode; per-deployment reality UNKNOWN.' },
  's-jurisdiction': { classes: ['NOTABENE HOSTED SERVICE', 'CONTRADICTION'], note: 'Vendor presentation definitions (pd.notabene.id) are publicly readable, but several diverge from primary law (e.g. FR-0 vs EU 2023/1113 Art. 14; GB-1000 vs UK 2026 GBP 800 threshold). Treat as vendor views, not legal results.' },
  's-directory': { classes: ['NOTABENE HOSTED SERVICE'], note: 'Discovery endpoints are documented publicly; directory contents and curation are operated by Notabene.' },
  's-webhooks': { classes: ['NOTABENE HOSTED SERVICE', 'CUSTOMER RESPONSIBILITY'], note: 'Notabene emits documented events; the receiving endpoint, its security and retries handling belong to the institution.' },
  's-analytics': { classes: ['UNKNOWN'], note: 'No archived source describes analytics internals. Presence inferred from product surface only.' },
  's-custody': { classes: ['EXTERNAL PROVIDER', 'UNKNOWN'], note: 'Third-party custodians. The depth of any integration with Notabene is not established by public evidence.' },
  's-relationships': { classes: ['NOTABENE HOSTED SERVICE'], note: 'Documented API surface; relationship graph is held in the operated network.' },
  's-policies': { classes: ['NOTABENE HOSTED SERVICE', 'CUSTOMER RESPONSIBILITY'], note: 'Rule engine is hosted by Notabene; rule content and the compliance decision remain the institution\'s responsibility.' },
};

const MODULES = [
  // Main chain
  { id: 'm-customer', label: 'Customer', type: 'external', x: 10, y: 10, controls: 'Customer', boundary: 'External', inputs: [], outputs: ['Instructions', 'KYC/PII'], public: false, sourceIds: [] },
  { id: 'm-safeconnect', label: 'SafeConnect', type: 'frontend', x: 25, y: 20, controls: 'Institution via SDK Wrapper (Not Hosted UI)', boundary: 'Browser', inputs: ['Customer Auth'], outputs: ['Wallet Link', 'Onboarding Token'], public: true, sourceIds: ['safeconnect-widget'] },
  { id: 'm-backend', label: 'Institution Backend', type: 'system', x: 40, y: 30, controls: 'Institution', boundary: 'Institution Infrastructure', inputs: ['SafeConnect Token'], outputs: ['TX Payload'], public: false, sourceIds: ['api-v2-tx'] },
  { id: 'm-transact', label: 'Notabene Transact', type: 'notabene', x: 55, y: 40, controls: 'Notabene', boundary: 'Notabene Proprietary Cloud', inputs: ['TX Payload'], outputs: ['IVMS101', 'TAP Envelope'], public: false, sourceIds: ['api-v2-tx'] },
  { id: 'm-tap', label: 'TAP + DIDComm', type: 'protocol', x: 70, y: 50, controls: 'Open Protocol / P2P', boundary: 'Internet', inputs: ['DIDComm Msg'], outputs: ['DIDComm Msg'], public: true, sourceIds: ['tap-ts', 'go-didcomm'] },
  { id: 'm-counterparty', label: 'Counterparty Institution', type: 'system', x: 85, y: 60, controls: 'Counterparty', boundary: 'Institution Infrastructure', inputs: ['TAP Envelope'], outputs: ['Auth Response'], public: false, sourceIds: ['api-v2-discovery'] },
  { id: 'm-settlement', label: 'Settlement Rail', type: 'external', x: 100, y: 70, controls: 'Protocol Network', boundary: 'Blockchain / Fiat', inputs: ['Signed TX'], outputs: ['Settlement Proof'], public: true, sourceIds: [] },
  
  // Secondary
  { id: 's-did', label: 'DID & Keys', type: 'notabene', x: 80, y: 30, controls: 'Mode-dependent: UNKNOWN (hosted vs customer-held keys not established by public evidence)', boundary: 'UNKNOWN / mode-dependent', inputs: ['Sign Request'], outputs: ['JWS Signature'], public: false, sourceIds: ['did-pii-keys'] },
  { id: 's-pii', label: 'PII Engine', type: 'notabene', x: 40, y: 50, controls: 'Mode-dependent: client-side SDK or hosted encryption (UNKNOWN per deployment)', boundary: 'Institution or Notabene (mode-dependent)', inputs: ['IVMS101'], outputs: ['ECDH-1PU Encrypted'], public: false, sourceIds: ['pii-sdk'] },
  { id: 's-jurisdiction', label: 'Jurisdiction Engine', type: 'notabene', x: 55, y: 20, controls: 'Notabene', boundary: 'Notabene Proprietary Cloud', inputs: ['Entity Country'], outputs: ['Rule Profile'], public: false, sourceIds: ['jurisdictions-index'] },
  { id: 's-directory', label: 'Network Directory', type: 'notabene', x: 65, y: 30, controls: 'Notabene', boundary: 'Notabene Proprietary Cloud', inputs: ['VASP Search'], outputs: ['VASP Profile', 'DID'], public: true, sourceIds: ['api-v2-discovery'] },
  { id: 's-webhooks', label: 'Webhooks', type: 'notabene', x: 40, y: 70, controls: 'Notabene', boundary: 'Institution Endpoint', inputs: ['Event State'], outputs: ['Notification'], public: false, sourceIds: ['api-v1-webhooks'] },
  { id: 's-analytics', label: 'Analytics', type: 'notabene', x: 30, y: 40, controls: 'Notabene (inferred; no archived source)', boundary: 'UNKNOWN', inputs: ['TX Metrics'], outputs: ['Dashboard'], public: false, sourceIds: [] },
  { id: 's-custody', label: 'Custody Providers', type: 'external', x: 85, y: 80, controls: 'External vendor (integration depth UNKNOWN)', boundary: 'Vendor API (UNKNOWN)', inputs: ['Address'], outputs: ['Custody Proof'], public: false, sourceIds: [] },
  { id: 's-relationships', label: 'Relationships', type: 'notabene', x: 75, y: 15, controls: 'Notabene', boundary: 'Notabene Proprietary Cloud', inputs: ['VASP Link Request'], outputs: ['Relationship Status'], public: false, sourceIds: ['api-v2-relationships'] },
  { id: 's-policies', label: 'Rules & Policies', type: 'notabene', x: 50, y: 65, controls: 'Institution via UI', boundary: 'Notabene Proprietary Cloud', inputs: ['Rule Config'], outputs: ['TX Hold/Pass'], public: false, sourceIds: ['api-v1-policies'] }
];

const FLOWS = [
  { from: 'm-customer', to: 'm-safeconnect' },
  { from: 'm-safeconnect', to: 'm-backend' },
  { from: 'm-backend', to: 'm-transact' },
  { from: 'm-transact', to: 'm-tap' },
  { from: 'm-tap', to: 'm-counterparty' },
  { from: 'm-counterparty', to: 'm-settlement' },
  
  { from: 's-jurisdiction', to: 'm-transact' },
  { from: 's-directory', to: 'm-transact' },
  { from: 's-relationships', to: 'm-transact' },
  { from: 's-did', to: 'm-transact' },
  { from: 's-pii', to: 'm-transact' },
  { from: 'm-transact', to: 's-webhooks' },
  { from: 'm-transact', to: 's-analytics' },
  { from: 's-policies', to: 'm-transact' },
  { from: 'm-counterparty', to: 's-custody' },
  { from: 's-custody', to: 'm-settlement' }
];

export default function HomePage() {
  const [activeMod, setActiveMod] = useState<string | null>(null);
  const [xray, setXray] = useState(false);
  const { data: evidence } = useEvidence();

  const selectedMod = MODULES.find(m => m.id === activeMod);
  
  // Interactive Pan / Zoom state
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleZoom = (delta: number) => {
    setTransform(prev => {
      const newScale = Math.min(Math.max(0.5, prev.scale + delta), 3);
      return { ...prev, scale: newScale };
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return; // ignore clicks on nodes
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    
    setTransform(prev => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      handleZoom(e.deltaY > 0 ? -0.1 : 0.1);
    } else {
      setTransform(prev => ({
        ...prev,
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      const step = 40;
      if (e.key === 'Escape') { setActiveMod(null); return; }
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','+','=','-'].includes(e.key)) e.preventDefault();
      switch (e.key) {
        case 'ArrowUp': setTransform(p => ({ ...p, y: p.y + step })); break;
        case 'ArrowDown': setTransform(p => ({ ...p, y: p.y - step })); break;
        case 'ArrowLeft': setTransform(p => ({ ...p, x: p.x + step })); break;
        case 'ArrowRight': setTransform(p => ({ ...p, x: p.x - step })); break;
        case '=': 
        case '+': handleZoom(0.1); break;
        case '-': handleZoom(-0.1); break;
      }
  };

  return (
    <div className="min-h-[80vh] flex flex-col md:flex-row gap-6 relative">
      <div 
        ref={containerRef}
        className="flex-1 bg-background border border-border relative overflow-hidden flex items-center justify-center p-8 group touch-none outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="application"
        aria-label="System blueprint. Arrow keys pan, plus and minus zoom, Tab moves between components, Escape clears selection."
        style={{ minHeight: '60vh' }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--foreground)_1px,_transparent_1px)] bg-[size:20px_20px]" />
        
        {/* The interactive isometric canvas */}
        <div 
          className="relative w-full max-w-[800px] aspect-square transition-transform duration-75 ease-out origin-center motion-reduce:transition-none"
          style={{ 
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale}) rotateX(60deg) rotateZ(-45deg)`, 
            transformStyle: 'preserve-3d' 
          }}
        >
          {/* Base Grid */}
          <div className="absolute inset-0 border border-foreground/10" style={{ 
            backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: `10% 10%`,
            opacity: 0.2,
            transform: 'translateZ(-1px)'
          }}></div>

          {FLOWS.map((flow, i) => {
            const fromMod = MODULES.find(m => m.id === flow.from);
            const toMod = MODULES.find(m => m.id === flow.to);
            if (!fromMod || !toMod) return null;
            
            const isActive = activeMod === flow.from || activeMod === flow.to;
            const isInput = activeMod === flow.to;
            const isDimmed = activeMod && !isActive;

            return (
              <svg 
                key={i} 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                style={{ opacity: isDimmed ? 0.1 : 1, zIndex: isActive ? 10 : 1, transform: 'translateZ(10px)' }}
              >
                <line 
                  x1={`${fromMod.x}%`} y1={`${fromMod.y}%`} 
                  x2={`${toMod.x}%`} y2={`${toMod.y}%`} 
                  stroke={isActive ? (isInput ? "hsl(205 70% 42%)" : "hsl(28 85% 50%)") : "hsl(var(--foreground))"} 
                  strokeWidth={isActive ? "2" : "1"} 
                  strokeDasharray={isActive ? "4 4" : "none"}
                  className={isActive ? "motion-safe:animate-pulse" : ""}
                />
              </svg>
            );
          })}

          {MODULES.map(mod => {
            const isActive = activeMod === mod.id;
            const isDimmed = activeMod && !isActive;
            const isMain = mod.id.startsWith('m-');

            // Colors for isometric faces based on state
            const xc = XRAY[mod.id]?.classes ?? ['UNKNOWN'];
            const bgClass = isActive ? 'bg-accent text-foreground' : xray ? XCLASS_STYLE[xc[xc.length - 1]].cls : isMain ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground';
            const leftFaceClass = isActive ? 'bg-accent/80' : isMain ? 'bg-foreground/80' : 'bg-muted/80';
            const bottomFaceClass = isActive ? 'bg-accent/60' : isMain ? 'bg-foreground/60' : 'bg-muted/60';

            return (
              <button
                key={mod.id}
                onClick={() => setActiveMod(isActive ? null : mod.id)}
                aria-pressed={isActive}
                aria-label={`${mod.label}. ${xray ? xc.join(', ') : mod.type}`}
                className={`absolute focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none w-16 h-16 -ml-8 -mt-8 flex items-center justify-center transition-all duration-300 group z-20 ${bgClass}`}
                style={{
                  left: `${mod.x}%`,
                  top: `${mod.y}%`,
                  transform: `translateZ(${isActive ? 40 : 20}px)`,
                  opacity: isDimmed ? 0.3 : 1,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Isometric Cube Faces (Left & Bottom due to rotateX/Z config, creating 3D volume) */}
                <div className={`absolute top-0 right-full w-4 h-full origin-right -rotate-y-90 ${leftFaceClass} transition-colors border-r border-background/20`}></div>
                <div className={`absolute top-full left-0 w-full h-4 origin-top rotate-x-90 ${bottomFaceClass} transition-colors border-t border-background/20`}></div>

                {/* Top face content (counter-rotated for readability) */}
                <div className="text-center font-mono absolute inset-0 flex flex-col items-center justify-center border border-background/20" style={{ transform: "rotateZ(45deg) rotateX(-60deg)" }}>
                  {isMain ? <Box className="w-5 h-5 mx-auto mb-1" /> : <Database className="w-4 h-4 mx-auto mb-1" />}
                  <div className="text-[8px] leading-tight font-bold uppercase whitespace-nowrap break-words tracking-tighter">
                    {mod.label.split(' ').map((w,i) => <div key={i}>{w}</div>)}
                  </div>
                  {xray && <div className="mt-0.5 text-[7px] font-bold tracking-widest">{xc.map(c => XCLASS_STYLE[c].code).join('/')}</div>}
                </div>
              </button>
            );
          })}
        </div>

        {/* HUD Controls */}
        <div className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <Network className="w-4 h-4" />
          System_Blueprint.V2
        </div>
        
        <div className="absolute top-4 right-4 flex gap-1 bg-background border border-border p-1">
          <button onClick={() => setXray(v => !v)} aria-pressed={xray} className={`px-2 py-1 font-mono text-[10px] font-bold tracking-widest flex items-center gap-1 border ${xray ? 'bg-foreground text-background border-foreground' : 'border-transparent hover:bg-secondary text-foreground'}`}><ScanLine className="w-3.5 h-3.5"/>X-RAY</button>
          <button onClick={() => handleZoom(0.2)} aria-label="Zoom in" className="p-1 hover:bg-secondary text-foreground"><Plus className="w-4 h-4"/></button>
          <button onClick={() => handleZoom(-0.2)} aria-label="Zoom out" className="p-1 hover:bg-secondary text-foreground"><Minus className="w-4 h-4"/></button>
          <button onClick={() => setTransform({x:0, y:0, scale:1})} aria-label="Reset view" className="p-1 hover:bg-secondary text-foreground" title="Reset view"><Move className="w-4 h-4"/></button>
        </div>

        {xray && (
          <div className="absolute top-14 left-4 right-4 sm:right-auto sm:max-w-xs bg-background/95 border border-foreground p-2 font-mono text-[9px] uppercase tracking-widest animate-in fade-in motion-reduce:animate-none">
            <div className="font-bold mb-1">X-RAY: reproducible from public artifacts vs operated network</div>
            <div className="grid grid-cols-2 gap-1">
              {(Object.keys(XCLASS_STYLE) as XClass[]).map(c => (
                <div key={c} className="flex items-center gap-1"><span className={`px-1 ${XCLASS_STYLE[c].cls}`}>{XCLASS_STYLE[c].code}</span>{c}</div>
              ))}
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 hidden sm:flex gap-2 font-mono text-[10px]">
          <span className="bg-background border border-border px-2 py-1 flex items-center gap-1"><span className="w-3 h-0.5 bg-[hsl(205_70%_42%)] inline-block"/>INPUT</span>
          <span className="bg-background border border-border px-2 py-1 flex items-center gap-1"><span className="w-3 h-0.5 bg-[hsl(28_85%_50%)] inline-block"/>OUTPUT</span>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <div className="text-[10px] font-mono bg-background border border-foreground px-2 py-1 text-foreground flex items-center gap-1">
            <span className="w-2 h-2 bg-foreground inline-block" /> MAIN_CHAIN
          </div>
          <div className="text-[10px] font-mono bg-background border border-muted-foreground/50 px-2 py-1 text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 bg-muted inline-block" /> SECONDARY
          </div>
        </div>
      </div>

      <div className="w-full md:w-80 flex flex-col gap-4">
        <div className="bg-background border border-border p-4 font-mono h-full flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-border bg-secondary/30"></div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-border pb-2 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
 Node_Inspector
          </h2>
          <label className="sr-only" htmlFor="node-select">Select component</label>
          <select id="node-select" value={activeMod ?? ''} onChange={e => setActiveMod(e.target.value || null)} className="w-full mb-4 text-xs border border-border bg-background p-2 uppercase tracking-wider outline-none focus:border-foreground">
            <option value="">-- Select component --</option>
            {MODULES.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
          
          {selectedMod ? (
            <div className="space-y-4 flex-1 overflow-auto animate-in fade-in">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">SELECTED_NODE</div>
                <div className="text-lg font-bold uppercase tracking-tight text-foreground">{selectedMod.label}</div>
                <div className="text-[10px] bg-accent/20 text-accent border border-accent/50 px-2 py-0.5 inline-block mt-2 uppercase tracking-widest">
                  TYPE: {selectedMod.type}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/50">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">X-RAY CLASSIFICATION</div>
                <div className="flex flex-wrap gap-1">
                  {(XRAY[selectedMod.id]?.classes ?? ['UNKNOWN' as XClass]).map(c => (
                    <span key={c} className={`text-[9px] font-bold px-1.5 py-0.5 tracking-widest ${XCLASS_STYLE[c].cls}`}>{c}</span>
                  ))}
                </div>
                <p className="text-[10px] leading-snug text-foreground">{XRAY[selectedMod.id]?.note ?? 'No classification recorded.'}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/50">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">TRUST_BOUNDARY</div>
                <div className="text-xs font-bold text-foreground flex items-center gap-2 leading-snug">
                  <Shield className="w-3 h-3 text-muted-foreground shrink-0" />
                  {selectedMod.boundary}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/50">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">CONTROLLER</div>
                <div className="text-xs font-bold text-foreground flex items-center gap-2 leading-snug">
                  <Key className="w-3 h-3 text-muted-foreground shrink-0" />
                  {selectedMod.controls}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/50">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">VISIBILITY</div>
                <div className="text-xs font-bold text-foreground flex items-center gap-2">
                  {selectedMod.public ? <Eye className="w-3 h-3 text-accent" /> : <EyeOff className="w-3 h-3 text-muted-foreground" />}
                  {selectedMod.public ? 'PUBLIC CONTRACT / PROTOCOL' : 'PROPRIETARY OR NON-PUBLIC'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">INPUTS</div>
                  {selectedMod.inputs.length > 0 ? selectedMod.inputs.map(i => (
                    <div key={i} className="text-[10px] text-foreground border border-border px-1 py-0.5 mb-1 bg-secondary/50">+{i}</div>
                  )) : <div className="text-[10px] text-muted-foreground">- NONE -</div>}
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">OUTPUTS</div>
                  {selectedMod.outputs.length > 0 ? selectedMod.outputs.map(i => (
                    <div key={i} className="text-[10px] text-foreground border border-border px-1 py-0.5 mb-1 bg-secondary/50">-{i}</div>
                  )) : <div className="text-[10px] text-muted-foreground">- NONE -</div>}
                </div>
              </div>

              <div className="pt-2 border-t border-border/50 mt-auto">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">ARCHIVED SOURCES</div>
                <div className="flex flex-col gap-1.5">
                  {selectedMod.sourceIds.length > 0 ? selectedMod.sourceIds.map(sid => {
                    const src = evidence?.sources?.find(s => s.id === sid);
                    if (!src) return <span key={sid} className="text-[10px] text-muted-foreground">[{sid} NOT_FOUND]</span>;
                    
                    const hasLocal = !!src.localPath;
                    const linkTarget = hasLocal 
                      ? `${import.meta.env.BASE_URL}${src.localPath}`.replace('//', '/')
                      : src.url;
                      
                    return (
                      <a key={sid} href={linkTarget} target={hasLocal ? "_self" : "_blank"} rel="noopener noreferrer" className="text-[9px] bg-secondary/30 hover:bg-accent/20 border border-border hover:border-accent p-1.5 text-foreground flex items-center justify-between group transition-colors">
                        <span className="truncate flex-1 mr-2">{src.title}</span>
                        <span className="text-muted-foreground group-hover:text-accent shrink-0">{hasLocal ? '[LOCAL]' : '[EXT]'}</span>
                      </a>
                    );
                  }) : <div className="text-[10px] text-muted-foreground">- NO_DIRECT_SOURCE -</div>}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <Code2 className="w-8 h-8 text-border mb-2" />
              <div className="text-xs text-muted-foreground uppercase tracking-widest">
                SELECT_NODE_TO_INSPECT
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
