"use client";
import { useState } from "react";
import { Code2, BookOpen, Layers, Terminal } from "lucide-react";

// Mock data structure - easily extendable
const PATTERNS = [
  {
    id: "abstract-factory",
    name: "Abstract Factory",
    category: "Creational",
    description: "Creates families of related objects without specifying concrete classes.",
    code: {
      python: `class AbstractFactory(ABC):\n    @abstractmethod\n    def create_button(self):\n        pass`,
      javascript: `class GUIFactory {\n  createButton() {}\n  createCheckbox() {}\n}`,
      java: `public interface GUIFactory {\n    Button createButton();\n    Checkbox createCheckbox();\n}`
    }
  },
  {
    id: "singleton",
    name: "Singleton",
    category: "Creational",
    description: "Ensures a class has only one instance and provides a global point of access.",
    code: {
      python: `class Singleton:\n    _instance = None\n    def __new__(cls):\n        if not cls._instance:\n            cls._instance = super().__new__(cls)\n        return cls._instance`,
      javascript: `const Singleton = (function () {\n  let instance;\n  return { getInstance: () => instance || (instance = {}) };\n})();`,
      java: `public class Singleton {\n    private static Singleton instance;\n    public static Singleton getInstance() { ... }\n}`
    }
  }
];

const LANGUAGES = ["python", "javascript", "java"];

export default function DesignPatternExplorer() {
  const [selectedPattern, setSelectedPattern] = useState(PATTERNS[0]);
  const [lang, setLang] = useState("python");

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10 font-bold text-xl tracking-tighter">
          <Layers className="w-6 h-6 text-indigo-600" />
          <span>PatternLabs</span>
        </div>
        
        <nav className="space-y-1">
          <p className="text-xs font-semibold text-zinc-400 uppercase mb-4 px-2">Creational Patterns</p>
          {PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPattern(p)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                selectedPattern.id === p.id 
                ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-lg" 
                : "hover:bg-zinc-200 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {p.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 max-w-5xl">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-indigo-600 font-medium mb-2">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm uppercase tracking-widest">{selectedPattern.category}</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4">{selectedPattern.name}</h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
            {selectedPattern.description}
          </p>
        </header>

        {/* Code Section */}
        <section className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-500" />
              <span className="text-xs font-mono text-zinc-400 italic">implementation_snippet</span>
            </div>
            <div className="flex gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-md text-xs font-bold uppercase transition-all ${
                    lang === l ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="p-8 overflow-x-auto">
            <pre className="font-mono text-sm leading-6 text-indigo-300">
              <code>{selectedPattern.code[lang as key of typeof selectedPattern.code]}</code>
            </pre>
          </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
            <p className="text-sm text-zinc-400 font-mono">Exploring: {selectedPattern.id}.{lang}</p>
            <button className="text-sm font-semibold hover:underline decoration-indigo-500 underline-offset-4">
                View Documentation →
            </button>
        </footer>
      </main>
    </div>
  );
}