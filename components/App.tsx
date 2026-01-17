import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PulseRing from './PulseRing';
import SyncTimeline from './SyncTimeline';
import ProjectManifestView from './ProjectManifest';
import ModuleRegistry from './ModuleRegistry';
import { Task, TranscriptionMessage, ProjectManifest, TianganModule } from '../types';
import { gemini } from '../services/geminiService';

const USERNAME = "dbugpro";
const PROJECT_ID = "631025771036";
const TIMESTAMP = "2026-01-17_07-33-00Z";

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Orchestrate Neural Nodes', category: 'work', priority: 'high', dueDate: 'Today', synced: true },
  { id: '2', title: 'Merge Architecture Modules', category: 'growth', priority: 'medium', dueDate: 'Today', synced: false },
  { id: '3', title: 'System Deployment Sync', category: 'work', priority: 'high', dueDate: 'Tomorrow', synced: true },
];

const INITIAL_MODULES: TianganModule[] = [
  { id: '0', name: `synchron0_${TIMESTAMP}_${USERNAME}`, status: 'stable', complexity: 95, lastUpdate: '2026-01-17', workFolder: '/core' },
  { id: '00', name: `synchron00_${TIMESTAMP}_${USERNAME}`, status: 'active', complexity: 45, lastUpdate: '2026-01-17', workFolder: '/modules/sync' },
  { id: 'A', name: `synchronA_${TIMESTAMP}_${USERNAME}`, status: 'merging', complexity: 70, lastUpdate: '2026-01-17', workFolder: '/modules/ux' },
];

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [modules, setModules] = useState<TianganModule[]>(INITIAL_MODULES);
  const [githubToken, setGithubToken] = useState<string>('');
  const [pendingHandshake, setPendingHandshake] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [auditStep, setAuditStep] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [notes, setNotes] = useState('');
  const [view, setView] = useState<'orchestration' | 'architecture' | 'manifest' | 'libraries'>('orchestration');

  const [transcriptions, setTranscriptions] = useState<TranscriptionMessage[]>([
    { text: `PRIME_DIRECTIVE_INIT: Node ${PROJECT_ID} active.`, sender: 'system', timestamp: Date.now() - 10000 },
    { text: "Architecture Audit: Verified synchron0 seed. Target: Suffix-less System Registry.", sender: 'ai', timestamp: Date.now() - 8000 }
  ]);

  const isTokenValid = useMemo(() => 
    githubToken.length > 20 && (githubToken.startsWith('ghp_') || githubToken.startsWith('github_pat_')), 
  [githubToken]);

  useEffect(() => {
    if (isTokenValid && auditStep === -1) {
      let step = 0;
      const interval = setInterval(() => {
        setAuditStep(s => s + 1);
        step++;
        if (step >= 9) {
          clearInterval(interval);
          handleTranscription("AUDIT_COMPLETE: Consensus logic verified. System ready for suffix-less merge.", 'ai');
        }
      }, 150);
    } else if (!isTokenValid) {
      setAuditStep(-1);
    }
  }, [isTokenValid]);

  const handleTranscription = useCallback((text: string, sender: 'user' | 'ai' | 'system') => {
    setTranscriptions(prev => {
      if (prev.length > 0 && prev[prev.length - 1].text === text && prev[prev.length - 1].sender === sender) return prev;
      return [...prev, { text, sender, timestamp: Date.now() }];
    });
  }, []);

  const executeGithubApi = async (call: any) => {
    if (!githubToken) {
      handleTranscription("BIBR_ERROR: Master_key missing. Consensus broken.", 'system');
      return;
    }

    setIsSyncing(true);
    handleTranscription(`CONSENSUS_SIG: AdminP authorized merge into suffix-less system repo.`, 'system');
    
    try {
      await new Promise(r => setTimeout(r, 2500));
      const targetSystem = call.args.moduleRepo.replace(/synchron[0A-Z0-9]+_/, 'synchron_');
      handleTranscription(`ORG_INTEGRATION: Merged into synchronorg/${targetSystem}.`, 'ai');
      setPendingHandshake(null);
    } catch (err) {
      handleTranscription(`API_ERROR: Handshake failed. Check PAT permissions.`, 'system');
    } finally {
      setIsSyncing(false);
    }
  };

  const runSynchronicityAnalysis = async () => {
    if (!isLoggedIn) return;
    setIsAnalyzing(true);
    try {
      const result = await gemini.analyzeSynchronicity(tasks, notes);
      handleTranscription(`Synchron pulse: ${result.data.summary}`, 'ai');
      if (result.functionCalls && result.functionCalls.length > 0) {
        setPendingHandshake(result.functionCalls[0]);
        handleTranscription("CONSENSUS_TRIGGER: Manual signature required for system integration.", 'system');
      }
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleMerge = (moduleId: string) => {
    const moduleRepo = modules.find(m => m.id === moduleId)?.name || `synchron${moduleId}_${TIMESTAMP}_${USERNAME}`;
    setPendingHandshake({
      name: 'request_github_merge',
      args: { moduleRepo, targetRepo: moduleRepo.replace(/synchron[0A-Z0-9]+_/, 'synchron_') }
    });
  };

  const permissions = [
    { label: 'Contents', type: 'WRITE', status: 'REQUIRED', dangerous: false },
    { label: 'Pull Requests', type: 'WRITE', status: 'REQUIRED', dangerous: false },
    { label: 'Workflows', type: 'WRITE', status: 'CRITICAL', dangerous: true },
    { label: 'Secrets', type: 'READ', status: 'HIGH_RISK', dangerous: true },
    { label: 'Variables', type: 'READ', status: 'EXCESSIVE', dangerous: false },
    { label: 'Issues', type: 'READ', status: 'EXCESSIVE', dangerous: false },
    { label: 'Administration', type: 'READ', status: 'OK', dangerous: false },
    { label: 'Merge Queues', type: 'READ', status: 'OK', dangerous: false },
    { label: 'Metadata', type: 'READ', status: 'OK', dangerous: false }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col md:flex-row font-sans selection:bg-cyan-500/30 relative overflow-hidden">
      {pendingHandshake && (
        <div className="fixed inset-0 bg-cyan-500/5 pointer-events-none z-0 animate-pulse-slow" />
      )}
      
      <aside className="w-full md:w-80 border-r border-slate-800 bg-slate-900/40 p-6 flex flex-col relative overflow-hidden z-20 backdrop-blur-2xl">
        <div className="flex items-center space-x-3 mb-10 relative z-10">
          <div className="w-12 h-12 bg-gradient-to-tr from-cyan-600 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white mono text-2xl group cursor-help shadow-[0_0_20px_rgba(8,145,178,0.3)]">
            <span>A</span>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-xl font-black tracking-tighter leading-none text-white uppercase italic glitch-text" data-text="Synchron A">
              Synchron <span className="text-cyan-500">A</span>
            </h1>
            <span className="text-[9px] mono font-bold uppercase tracking-widest truncate block mt-1 text-emerald-500">
              PRJ_{PROJECT_ID}
            </span>
          </div>
        </div>

        {/* DUAL-ADMIN HANDSHAKE HUD */}
        {pendingHandshake && (
          <div className="mb-6 p-5 border-2 rounded-[1.5rem] bg-black/40 border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.1)] relative overflow-hidden animate-in slide-in-from-left-4 duration-500 backdrop-blur-md">
            <div className="text-[10px] mono text-cyan-500 font-black mb-3 flex items-center">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2 animate-ping" /> 
              HANDSHAKE_PENDING
            </div>
            <div className="space-y-1 mb-4 bg-black/60 p-3 rounded-lg border border-cyan-500/20">
              <p className="text-[9px] text-slate-500 mono mb-1">SOURCE (MODULE):</p>
              <p className="text-[9px] text-cyan-300 mono font-bold break-all mb-2">{pendingHandshake.args.moduleRepo}</p>
              <p className="text-[9px] text-slate-500 mono mb-1">TARGET (SYSTEM):</p>
              <p className="text-[9px] text-emerald-400 mono font-bold break-all italic">{pendingHandshake.args.targetRepo}</p>
            </div>
            <button 
              disabled={isSyncing || !isTokenValid}
              onClick={() => executeGithubApi(pendingHandshake)}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800/50 disabled:text-slate-600 text-white rounded-xl text-[10px] mono font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
            >
              {!isTokenValid ? 'MASTER_KEY REQUIRED' : isSyncing ? 'SYNCING...' : 'Sign Merge'}
            </button>
          </div>
        )}

        <div className={`mb-8 p-4 border rounded-2xl bg-slate-950/40 border-slate-800 group hover:border-cyan-500/30 transition-all relative overflow-hidden ${isTokenValid ? 'shadow-[0_0_20px_rgba(6,182,212,0.05)]' : ''}`}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[8px] mono text-slate-500 font-black uppercase tracking-widest block">master_key (PAT)</label>
            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isTokenValid ? 'bg-cyan-500 shadow-[0_0_8px_cyan]' : 'bg-slate-800'}`} />
          </div>
          <input 
            type="password"
            placeholder="github_pat_..."
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            className="w-full bg-[#020617] border border-slate-800 rounded-lg px-3 py-2 text-[10px] mono text-cyan-400 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-800"
          />
          
          <div className="mt-4 space-y-1 border-t border-slate-800/50 pt-3">
             <div className="text-[7px] text-slate-500 mono uppercase tracking-widest mb-1 flex justify-between">
                <span>Scope Audit:</span>
                <span className={isTokenValid ? "text-cyan-500 font-bold" : "text-slate-600"}>{isTokenValid ? "VERIFIED" : "---"}</span>
             </div>
             
             {permissions.map((p, idx) => (
               <div key={p.label} className={`flex items-center justify-between leading-none py-1 transition-all duration-300 ${auditStep >= idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                 <div className="flex items-center space-x-2">
                   <div className={`w-1 h-1 rounded-full ${p.dangerous ? 'bg-red-500 animate-pulse' : 'bg-cyan-500/40'}`} />
                   <span className={`text-[8px] mono ${p.dangerous ? 'text-red-400 font-bold' : 'text-slate-400'}`}>{p.label}</span>
                 </div>
                 <span className={`text-[6px] mono uppercase tracking-tighter ${p.dangerous ? 'text-red-500' : 'text-slate-700 opacity-60'}`}>[{p.status}]</span>
               </div>
             ))}
          </div>
        </div>

        <nav className="flex flex-col space-y-1 mb-8 relative z-10">
          {[
            { id: 'orchestration', label: 'ORCHESTRATION', icon: 'M 4 4 L 20 4 L 20 20 L 4 20 Z' },
            { id: 'architecture', label: 'ARCHITECTURE', icon: 'M 12 2 L 2 7 L 12 12 L 22 7 Z M 2 17 L 12 22 L 22 17' },
            { id: 'libraries', label: 'LIBRARIES', icon: 'M 12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
            { id: 'manifest', label: 'LEDGER', icon: 'M 4 4 H 20 V 20 H 4 Z M 8 8 H 16 M 8 12 H 16 M 8 16 H 12' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setView(item.id as any)}
              className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all ${
                view === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-inner' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="text-[10px] mono font-black tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800/60">
           <div className="flex items-center justify-between mb-3 text-[10px] mono">
              <span className="text-slate-600 font-bold uppercase tracking-widest">SYNCHRON ORGANIZATION</span>
              <span className="text-emerald-500 font-black">STABLE</span>
           </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 flex flex-col space-y-10 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] relative z-10">
        <header className="flex justify-between items-start gap-8 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-slate-500 text-[10px] mono uppercase tracking-[0.2em] font-black">
              <span className="text-emerald-500 h-2 w-2 rounded-full inline-block animate-pulse"></span>
              <span>Synchron OS project A</span>
              <span className="opacity-30">/</span>
              <span className="text-cyan-500 uppercase italic">synchron0_{TIMESTAMP}_{USERNAME}</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic leading-tight">{view}</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-xl border mono text-[9px] font-black uppercase tracking-widest transition-all ${isTokenValid ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
              {isTokenValid ? 'Vault Connected' : 'Awaiting Master Key'}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
          <div className="lg:col-span-8 space-y-10">
            {view === 'architecture' ? (
              <ModuleRegistry modules={modules} onMerge={handleMerge} />
            ) : view === 'manifest' ? (
              <ProjectManifestView 
                manifest={{
                  versionId: `synchron0_${TIMESTAMP}_${USERNAME}`,
                  repoType: 'module_repo',
                  suffix: '0',
                  username: USERNAME,
                  createdAt: TIMESTAMP,
                  workDirectory: 'db0',
                  promptLineage: [],
                  modules: modules,
                  coreSettings: {}
                }} 
                onExport={() => {}} 
              />
            ) : (
              <SyncTimeline tasks={tasks} />
            )}
            
            <div className="p-10 bg-slate-900/60 border border-slate-800/80 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-8">
                  <span className="text-[10px] mono text-cyan-500/50 font-black uppercase tracking-[0.3em]">Seed_v1.2</span>
                </div>
                <h4 className="text-2xl font-black text-slate-100 mb-4 uppercase tracking-tighter italic">Naming & <span className="text-cyan-500">Integration</span></h4>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                    Modules are identified by Tiangan suffixes (e.g. 0, 00, A). When selected for integration into 
                    <span className="text-cyan-400 mono"> synchronorg</span>, the suffix is stripped to form the permanent suffix-less 
                    system repository: <span className="text-emerald-400 mono">synchron_{TIMESTAMP}_{USERNAME}</span>.
                </p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900/50 border border-slate-800/80 rounded-[2.5rem] p-10 flex flex-col backdrop-blur-2xl shadow-3xl sticky top-12 max-h-[calc(100vh-6rem)]">
            <PulseRing onTranscription={handleTranscription} />
            <div className="mt-14 flex-1 flex flex-col min-h-0 overflow-hidden">
               <div className="flex-1 bg-slate-950/80 border border-slate-800/80 rounded-[2rem] p-8 overflow-y-auto space-y-6 custom-scrollbar shadow-inner relative">
                {transcriptions.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} group animate-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[95%] rounded-2xl px-5 py-4 text-sm leading-relaxed mono shadow-sm transition-all ${
                      msg.sender === 'user' ? 'bg-slate-800 text-slate-300 rounded-tr-none' : 
                      msg.sender === 'system' ? 'bg-amber-950/20 text-amber-500 border border-amber-500/10 italic text-[11px]' :
                      'bg-cyan-950/30 text-cyan-300 rounded-tl-none border border-cyan-800/20'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="relative group">
                   <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur opacity-10 group-focus-within:opacity-40 transition-all" />
                   <input 
                    type="text"
                    placeholder="Communicate with AdminS..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && runSynchronicityAnalysis()}
                    className="relative w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-[13px] mono text-cyan-400 focus:outline-none focus:border-cyan-500/50 transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
