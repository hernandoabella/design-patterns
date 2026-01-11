import { Layers, ChevronRight } from 'lucide-react';

interface SidebarProps {
  patterns: any[]; // Replace with your Pattern interface if available
  selectedPattern: any;
  setSelectedPattern: (pattern: any) => void;
}

const Sidebar = ({ patterns, selectedPattern, setSelectedPattern }: SidebarProps) => {
  return (
    <aside className="w-72 border-r border-zinc-200 dark:border-zinc-800 p-8 hidden lg:flex flex-col h-screen sticky top-0">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="bg-indigo-600 p-2 rounded-xl">
          <Layers className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight dark:text-white">PatternFlow</span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-6">
        <div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 px-2">
            Creational Patterns
          </p>
          <div className="space-y-1">
            {patterns.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPattern(p)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedPattern.id === p.id 
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-md" 
                  : "hover:bg-zinc-200 dark:hover:bg-zinc-900 text-zinc-500"
                }`}
              >
                {p.name}
                {selectedPattern.id === p.id && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer Info */}
      <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="text-xs">
            <p className="font-bold dark:text-white">Next.js v15</p>
            <p className="text-zinc-500 underline cursor-pointer">Documentation</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;