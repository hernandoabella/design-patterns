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
  ChevronDown,
  FolderCode
} from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

// --- TYPES ---
interface PatternListItem {
  id: string;
  name: string;
  category: string;
}

// --- MERMAID CONFIG ---
mermaid.initialize({ 
  startOnLoad: true, 
  theme: "neutral", 
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
    <div className="fixed inset-0 z-[200] bg-white flex flex-col animate-in fade-in zoom-in duration-200">
      <div className="h-16 border-b border-slate-100 flex items-center justify-between px-8 bg-slate-50/50">
        <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">{title}</span>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-hidden p-8 md:p-12 bg-slate-50/30">
        <div className="max-w-6xl mx-auto h-full flex flex-col">{children}</div>
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
  
  // Estado para el acordeón (solo un string para permitir solo una abierta)
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  // Memorizar la lista plana para navegación por teclado
  const allPatterns = useMemo(() => Object.values(PATTERNS_REGISTRY).map(p => ({
    id: p.id, name: p.name, category: p.category
  })), []);

  // Memorizar el mapa por categorías
  const categoriesMap = useMemo(() => allPatterns.reduce<Record<string, PatternListItem[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {}), [allPatterns]);

  // Efecto inicial: abrir la categoría del patrón por defecto
  useEffect(() => {
    const activeCat = PATTERNS_REGISTRY[currentId].category;
    setExpandedCat(activeCat);
  }, []);

  // Navegación por Teclado (Flechas)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalType) return;
      
      const currentIndex = allPatterns.findIndex(p => p.id === currentId);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = allPatterns[(currentIndex + 1) % allPatterns.length];
        setCurrentId(next.id);
        setExpandedCat(next.category); // Abre la categoría al navegar
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = allPatterns[(currentIndex - 1 + allPatterns.length) % allPatterns.length];
        setCurrentId(prev.id);
        setExpandedCat(prev.category); // Abre la categoría al navegar
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
    <div className="flex h-screen bg-white text-slate-900 font-sans overflow-hidden">
      
      {/* 1. SIDEBAR ACORDEÓN */}
      <aside className="w-72 border-r border-slate-100 bg-slate-50/50 flex flex-col shrink-0 h-full">
        <div className="p-8 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-100">
            <FolderCode size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Design Patterns</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {Object.entries(categoriesMap).map(([categoryName, patterns]) => {
            const isExpanded = expandedCat === categoryName;
            const hasActivePattern = patterns.some(p => p.id === currentId);

            return (
              <div key={categoryName} className="space-y-1">
                <button
                  onClick={() => toggleCategory(categoryName)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                    hasActivePattern 
                      ? "text-indigo-600 bg-indigo-50/80 font-semibold" 
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {categoryName}
                  </span>
                  <ChevronRight 
                    size={14} 
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} 
                  />
                </button>
                
                {isExpanded && (
                  <div className="space-y-1 ml-2 border-l-2 border-slate-200 pl-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    {patterns.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setCurrentId(p.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
                          currentId === p.id 
                            ? "bg-slate-900 text-white shadow-md font-medium" 
                            : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-900"
                        }`}
                      >
                        <Hash size={12} className={currentId === p.id ? "text-indigo-400" : "text-slate-300"} />
                        {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* INDICADOR DE TECLADO */}
        <div className="p-6 border-t border-slate-100 bg-white/50">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
            <kbd className="px-1.5 py-0.5 border border-slate-200 rounded bg-white shadow-sm">↑</kbd>
            <kbd className="px-1.5 py-0.5 border border-slate-200 rounded bg-white shadow-sm">↓</kbd>
            <span>Navigate</span>
          </div>
        </div>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div className="max-w-5xl mx-auto p-8 md:p-16 space-y-12">
          
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              <ChevronRight size={14} /> {pattern.category}
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-950">{pattern.name}</h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl italic">{pattern.description}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-7 space-y-10">
              {/* DIAGRAMA */}
              <div className="group relative aspect-video bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden p-6 shadow-inner">
                <button 
                  onClick={() => setModalType("diagram")} 
                  className="absolute top-4 right-4 p-2 bg-white border border-slate-200 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-indigo-600 z-10"
                >
                  <Maximize2 size={16} />
                </button>
                <Mermaid chart={pattern.diagram} />
              </div>

              {/* ROLES */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest">Roles & Architecture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pattern.roles.map((role: PatternRole, i: number) => (
                    <div key={i} className="p-4 border border-slate-100 rounded-xl bg-slate-50/30">
                      <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-xs uppercase">
                        <div className="p-1.5 bg-white rounded-md shadow-sm">
                          <role.icon size={14} className="text-indigo-500" />
                        </div>
                        {role.title}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{role.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CÓDIGO */}
            <div className="lg:col-span-5">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm sticky top-8 flex flex-col bg-white">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                  <div className="flex gap-4">
                    {LANGUAGES.map(l => (
                      <button key={l} onClick={() => setLang(l)} className={`text-[10px] font-bold uppercase transition-all ${lang === l ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400 hover:text-slate-600"}`}>{l}</button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setModalType("code")} className="text-slate-400 hover:text-indigo-600 p-1"><Maximize2 size={14} /></button>
                    <button onClick={handleCopy} className="text-slate-400 hover:text-slate-600 p-1">{copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}</button>
                  </div>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                  <SyntaxHighlighter language={lang} style={vs} customStyle={{ margin: 0, padding: '1.5rem', fontSize: '12px', background: 'transparent' }}>
                    {pattern.code[lang]}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODALES */}
      <FullscreenModal isOpen={modalType === "diagram"} onClose={() => setModalType(null)} title={`UML: ${pattern.name}`}>
        <div className="flex-1 overflow-auto bg-white rounded-2xl border border-slate-100 flex items-center justify-center p-8 custom-scrollbar">
          <div className="min-w-[800px]"><Mermaid chart={pattern.diagram} /></div>
        </div>
      </FullscreenModal>

      <FullscreenModal isOpen={modalType === "code"} onClose={() => setModalType(null)} title={`Code: ${pattern.name} (${lang})`}>
        <div className="flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-white custom-scrollbar">
          <SyntaxHighlighter language={lang} style={vs} customStyle={{ padding: '2.5rem', fontSize: '14px', margin: 0 }}>
            {pattern.code[lang]}
          </SyntaxHighlighter>
        </div>
      </FullscreenModal>

    </div>
  );
}