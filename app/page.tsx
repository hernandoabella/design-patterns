"use client";

import { useState, useRef, useEffect } from "react";
import { 
  ChevronRight, Copy, Check, Cpu, Lightbulb, Zap, Boxes, 
  ExternalLink, ArrowRight, Play, Terminal, Loader2,
  Layout, Fingerprint, Code2, Layers, BookOpen, Microscope
} from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import mermaid from "mermaid";

// --- Mermaid Config ---
mermaid.initialize({ startOnLoad: true, theme: "neutral" });

const MermaidDiagram = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
      mermaid.render("mermaid-svg", chart).then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      });
    }
  }, [chart]);
  return <div ref={ref} className="flex justify-center py-8" />;
};

type Language = "python" | "javascript" | "java";
const LANGUAGES: Language[] = ["python", "javascript", "java"];

const PATTERN = {
  name: "Abstract Factory",
  category: "Creational",
  tagline: "The Factory of Factories.",
  description: "Ensures that products from a factory are compatible with each other by creating families of related objects.",
  diagram: `classDiagram
    class FurnitureFactory { <<interface>> +createChair() Chair }
    class ModernFactory { +createChair() ModernChair }
    class VictorianFactory { +createChair() VictorianChair }
    FurnitureFactory <|-- ModernFactory
    FurnitureFactory <|-- VictorianFactory`,
  roles: [
    { title: "Abstract Factory", description: "Declares an interface for operations that create abstract products.", icon: Boxes },
    { title: "Concrete Factory", description: "Implements operations to create concrete product objects (e.g., Modern style).", icon: Zap },
    { title: "Abstract Product", description: "Declares an interface for a type of product object (e.g., any Chair).", icon: Layout },
    { title: "Client", description: "Only uses interfaces declared by Abstract Factory and Abstract Product classes.", icon: Fingerprint }
  ],
  code: {
    python: `from abc import ABC, abstractmethod

# --- 1. ABSTRACT PRODUCTS ---
# These define the 'Contract'. Any chair must have 'sit_on'.
class Chair(ABC):
    @abstractmethod
    def sit_on(self) -> str: pass

# --- 2. CONCRETE PRODUCTS ---
# Specific versions of the products.
class ModernChair(Chair):
    def sit_on(self): return "Sitting on a sleek Modern Chair."

class VictorianChair(Chair):
    def sit_on(self): return "Sitting on a royal Victorian Chair."

# --- 3. ABSTRACT FACTORY ---
# The interface that groups related products.
class FurnitureFactory(ABC):
    @abstractmethod
    def create_chair(self) -> Chair: pass

# --- 4. CONCRETE FACTORIES ---
# This factory only makes Modern furniture.
class ModernFactory(FurnitureFactory):
    def create_chair(self): return ModernChair()

# This factory only makes Victorian furniture.
class VictorianFactory(FurnitureFactory):
    def create_chair(self): return VictorianChair()

# --- 5. CLIENT CODE ---
# The client doesn't care if it's Modern or Victorian!
def client_code(factory: FurnitureFactory):
    chair = factory.create_chair()
    print(f"Result: {chair.sit_on()}")

client_code(ModernFactory())`,
    javascript: `// JS implementation...`,
    java: `// Java implementation...`
  }
};

export default function PatternExplorer() {
  const [lang, setLang] = useState<Language>("python");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const simulateExecution = () => {
    setIsRunning(true);
    setOutput("");
    gsap.delayedCall(1.2, () => {
      setIsRunning(false);
      const result = ">>> Loading Factory...\n>>> Production: ModernChair created.\n>>> Result: Sitting on a sleek Modern Chair.";
      setOutput(result);
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] text-slate-900 font-sans antialiased">
      
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-200 bg-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl"><Boxes className="w-5 h-5 text-white" /></div>
          <span className="font-bold text-xl tracking-tight">PatternFlow</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">Catalog</p>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-indigo-50 text-indigo-600">
            <Layers className="w-4 h-4" /> Abstract Factory <ChevronRight className="w-4 h-4 ml-auto" />
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-12 lg:px-16 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase mb-6 border border-indigo-100">
              <Cpu className="w-3 h-3" /> {PATTERN.category}
            </div>
            <h1 className="text-6xl font-black tracking-tight mb-6">{PATTERN.name}</h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">{PATTERN.description}</p>
          </header>

          {/* Quick Explanation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {PATTERN.roles.map((role, i) => (
              <div key={i} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 transition-colors group">
                <role.icon className="w-5 h-5 text-indigo-500 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-slate-900 mb-1">{role.title}</h4>
                <p className="text-xs text-slate-500 leading-normal">{role.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            
            {/* LEFT: Analysis & Diagram */}
            <div className="xl:col-span-5 space-y-8">
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Microscope className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Architectural Blueprint</h3>
                </div>
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                  
                  <MermaidDiagram chart={PATTERN.diagram} />
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <p className="text-[11px] font-medium text-slate-400 uppercase mb-3 tracking-tighter">Diagram Guide:</p>
                    <ul className="space-y-2">
                      <li className="text-xs text-slate-600 flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1" />
                        <span><strong>Arrows (Inheritance):</strong> ModernFactory <i>is a</i> type of FurnitureFactory.</span>
                      </li>
                      <li className="text-xs text-slate-600 flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                        <span><strong>Interface:</strong> FurnitureFactory defines the "rules" but doesn't build anything itself.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
                <h4 className="font-bold flex items-center gap-2 mb-4"><BookOpen className="w-4 h-4 text-indigo-400" /> Key Takeaway</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Use this pattern when you have **related objects** (like a chair and a sofa) that must match (both must be "Modern"). It prevents the client from accidentally mixing a Victorian Chair with a Modern Sofa.
                </p>
              </section>
            </div>

            {/* RIGHT: The Lab */}
            <div className="xl:col-span-7">
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full border-b-4 border-b-slate-200">
                <div className="flex items-center justify-between px-8 py-5 bg-slate-50/50 border-b border-slate-100">
                  <div className="flex gap-4">
                    {LANGUAGES.map((l) => (
                      <button key={l} onClick={() => setLang(l)} className={`text-[10px] font-black uppercase tracking-widest ${lang === l ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400"}`}>{l}</button>
                    ))}
                  </div>
                  <button onClick={simulateExecution} disabled={isRunning} className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all">
                    {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
                    {isRunning ? "Computing..." : "Run"}
                  </button>
                </div>

                <div className="flex-1 text-sm bg-white overflow-y-auto max-h-[450px]">
                  <SyntaxHighlighter language={lang} style={oneLight} customStyle={{ margin: 0, padding: '2.5rem', background: 'transparent' }}>
                    {PATTERN.code[lang]}
                  </SyntaxHighlighter>
                </div>

                <div className="bg-[#0f172a] p-8 min-h-[160px] font-mono border-t border-slate-800">
                  <div className="flex items-center gap-2 mb-4 text-slate-500 uppercase text-[9px] font-bold tracking-widest"><Terminal className="w-3 h-3" /> Output Log</div>
                  <pre className="text-xs text-emerald-400 leading-relaxed">{output || "Waiting for signal..."}</pre>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}