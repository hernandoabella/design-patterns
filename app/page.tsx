"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import mermaid from "mermaid";
import { 
  PATTERNS_REGISTRY, 
  LANGUAGES, 
  type Language, 
  type PatternRole, 
  type PatternData 
} from "@/data/patterns"; 
import { 
  Copy, Check, Hash, Box, 
  ChevronRight, Maximize2, X, Layers, 
  Folder, Sparkles, Zap, ShieldAlert
} from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

// --- TYPES ---
interface PatternListItem {
  id: string;
  name: string;
  category: string;
}

// --- MERMAID CONFIG ---
mermaid.initialize({ 
  startOnLoad: true, 
  theme: "dark", 
  securityLevel: "loose",
  fontFamily: "var(--font-geist-sans)"
});

// --- SUB-COMPONENTE DIAGRAMA ---
const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute("data-processed");
      mermaid.contentLoaded();
    }
  }, [chart]);
  return <div key={chart} className="mermaid flex justify-center items-center w-full" ref={ref}>{chart}</div>;
};

// --- SUB-COMPONENTE MODAL ---
const FullscreenModal = ({ 
  isOpen, onClose, title, children 
}: { 
  isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode 
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col animate-in fade-in zoom-in duration-200">
      <div className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl">
        <span className="text-sm font-black text-indigo-300 uppercase tracking-[0.2em]">{title}</span>
        <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all text-white/50 hover:text-white">
          <X size={24} />
        </button>
      </div>
      <div className="flex-1 overflow-hidden p-8 md:p-12 bg-gradient-to-b from-slate-950 to-indigo-950/20">
        <div className="max-w-7xl mx-auto h-full flex flex-col">{children}</div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function DesignPatternsPage() {
  const [currentId, setCurrentId] = useState<string>("abstract-factory");
  const [lang, setLang] = useState<Language>(LANGUAGES[0]);
  const [copied, setCopied] = useState(false);
  const [modalType, setModalType] = useState<"code" | "diagram" | null>(null);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const allPatterns = useMemo(() => Object.values(PATTERNS_REGISTRY).map(p => ({
    id: p.id, name: p.name, category: p.category
  })), []);

  const categoriesMap = useMemo(() => allPatterns.reduce<Record<string, PatternListItem[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {}), [allPatterns]);

  useEffect(() => {
    const activeCat = PATTERNS_REGISTRY[currentId].category;
    setExpandedCat(activeCat);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalType) return;
      const currentIndex = allPatterns.findIndex(p => p.id === currentId);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = allPatterns[(currentIndex + 1) % allPatterns.length];
        setCurrentId(next.id);
        setExpandedCat(next.category);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = allPatterns[(currentIndex - 1 + allPatterns.length) % allPatterns.length];
        setCurrentId(prev.id);
        setExpandedCat(prev.category);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentId, allPatterns, modalType]);

  const toggleCategory = (cat: string) => {
    setExpandedCat(prevCat => (prevCat === cat ? null : cat));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PATTERNS_REGISTRY[currentId].code[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pattern: PatternData = PATTERNS_REGISTRY[currentId];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white font-sans overflow-hidden relative">
      {/* Animated background blobs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] animate-pulse delay-1000"></div>
      </div>

      {/* SIDEBAR */}
      <aside className="w-80 border-r border-white/10 bg-black/20 backdrop-blur-xl flex flex-col shrink-0 h-full relative z-10">
        <div className="p-8 border-b border-white/10 flex items-center gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-2xl shadow-indigo-500/50">
            <Folder size={24} className="text-white" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight block">Design Patterns</span>
            <span className="text-xs text-indigo-300">Interactive Explorer</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
          {Object.entries(categoriesMap).map(([categoryName, patterns]) => {
            const isExpanded = expandedCat === categoryName;
            const hasActivePattern = patterns.some(p => p.id === currentId);

            return (
              <div key={categoryName} className="space-y-2">
                <button
                  onClick={() => toggleCategory(categoryName)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                    hasActivePattern 
                      ? "text-white bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border border-indigo-500/50 shadow-lg shadow-indigo-500/20" 
                      : "text-slate-400 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                    <Layers size={14} />
                    {categoryName}
                  </span>
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} 
                  />
                </button>
                
                {isExpanded && (
                  <div className="space-y-1.5 ml-4 pl-4 border-l-2 border-indigo-500/30 animate-in fade-in slide-in-from-top-2 duration-300">
                    {patterns.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setCurrentId(p.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                          currentId === p.id 
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 font-semibold scale-105" 
                            : "text-slate-300 hover:bg-white/5 hover:text-white hover:translate-x-1"
                        }`}
                      >
                        <Hash size={14} className={currentId === p.id ? "text-white" : "text-slate-500"} />
                        {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
            <kbd className="px-2 py-1 border border-white/20 rounded-lg bg-white/5 shadow-inner">↑</kbd>
            <kbd className="px-2 py-1 border border-white/20 rounded-lg bg-white/5 shadow-inner">↓</kbd>
            <span>Navigate patterns</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
        <div className="max-w-6xl mx-auto p-12 md:p-20 space-y-16">
          
          <header className="space-y-6">
            <div className="flex items-center gap-3 text-indigo-400 text-sm font-bold uppercase tracking-[0.3em]">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              {pattern.category}
            </div>
            <h1 className="text-7xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              {pattern.name}
            </h1>
            <p className="text-2xl text-slate-300 leading-relaxed max-w-4xl font-light">
              {pattern.description}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-7 space-y-12">
              {/* DIAGRAM */}
              <div className="group relative bg-gradient-to-br from-slate-900/50 to-indigo-900/30 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
                <button 
                  onClick={() => setModalType("diagram")} 
                  className="absolute top-6 right-6 p-3 bg-white/10 border border-white/20 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 text-white hover:bg-white/20 hover:scale-110 z-10 backdrop-blur-sm"
                >
                  <Maximize2 size={18} />
                </button>
                <div className="p-8 min-h-[400px] flex items-center justify-center">
                  <Mermaid chart={pattern.diagram} />
                </div>
              </div>

              {/* ROLES */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase text-indigo-300 tracking-[0.2em] flex items-center gap-2">
                  <Sparkles size={16} />
                  Architecture Components
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pattern.roles.map((role: PatternRole, i: number) => (
                    <div 
                      key={i} 
                      className="group p-6 border border-white/10 rounded-2xl bg-gradient-to-br from-slate-900/50 to-indigo-900/30 hover:from-indigo-900/40 hover:to-purple-900/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3 mb-3 text-white font-bold text-sm uppercase tracking-wider">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                          <role.icon size={16} className="text-white" />
                        </div>
                        {role.title}
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{role.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CODE */}
            <div className="lg:col-span-5">
              <div className="border border-white/10 rounded-3xl overflow-hidden shadow-2xl sticky top-8 flex flex-col bg-gradient-to-br from-slate-900/80 to-indigo-900/50 backdrop-blur-xl">
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-6 py-4 border-b border-white/10 flex justify-between items-center">
                  <div className="flex gap-6">
                    {LANGUAGES.map(l => (
                      <button 
                        key={l} 
                        onClick={() => setLang(l)} 
                        className={`text-xs font-bold uppercase transition-all pb-1 tracking-widest ${
                          lang === l 
                            ? "text-white border-b-2 border-indigo-400" 
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setModalType("code")} className="text-slate-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all">
                      <Maximize2 size={16} />
                    </button>
                    <button onClick={handleCopy} className="text-slate-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all">
                      {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                  <SyntaxHighlighter 
                    language={lang} 
                    style={tomorrow} 
                    customStyle={{ 
                      margin: 0, 
                      padding: '1.5rem', 
                      fontSize: '13px', 
                      background: 'transparent',
                      lineHeight: '1.6'
                    }}
                  >
                    {pattern.code[lang]}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODALS */}
      <FullscreenModal isOpen={modalType === "diagram"} onClose={() => setModalType(null)} title={`UML Diagram: ${pattern.name}`}>
        <div className="flex-1 overflow-auto bg-slate-900/50 rounded-3xl border border-white/10 flex items-center justify-center p-12 backdrop-blur-sm">
          <div className="min-w-[1000px]"><Mermaid chart={pattern.diagram} /></div>
        </div>
      </FullscreenModal>

      <FullscreenModal isOpen={modalType === "code"} onClose={() => setModalType(null)} title={`Source Code: ${pattern.name} (${lang})`}>
        <div className="flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl custom-scrollbar">
          <SyntaxHighlighter 
            language={lang} 
            style={tomorrow} 
            customStyle={{ padding: '3rem', fontSize: '16px', margin: 0, background: 'transparent' }}
          >
            {pattern.code[lang]}
          </SyntaxHighlighter>
        </div>
      </FullscreenModal>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}