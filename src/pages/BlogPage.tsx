import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; 
import { ArrowLeft, BookText } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [journals, setJournals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const q = query(collection(db, "jurnal"), orderBy("mingguKe", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJournals(data);
      } catch (error) {
        console.error("Error fetching journals: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  let content;
  
  if (loading) {
    content = (
      <div className="max-w-4xl mx-auto text-center py-32">
        <div className="w-10 h-10 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#808080] animate-pulse">
          Synchronizing Data...
        </p>
      </div>
    );
  } else if (journals.length === 0) {
    content = (
      <div className="max-w-4xl mx-auto text-center py-20 border border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#808080]">No Logs Found in Database.</p>
      </div>
    );
  } else {
    content = (
      <div className="max-w-4xl mx-auto space-y-20 pb-20">
        {journals.map((journal) => (
          <div key={journal.id} className="relative group">
            {/* Week Badge */}
            <div className="absolute -left-4 md:-left-12 top-0 flex flex-col items-center">
                <span className="font-mono text-[10px] text-[var(--color-accent)] rotate-90 origin-left translate-y-8 uppercase tracking-[0.3em] font-bold">
                    Week-{journal.mingguKe}
                </span>
            </div>

            <div className="p-8 md:p-12 border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-[var(--color-accent)]/30 transition-colors duration-500">
              
              <div className="mb-10">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter mb-4">
                  Log_{journal.mingguKe}<span className="text-[var(--color-accent)]">.</span>
                </h2>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#808080] bg-white/5 px-3 py-1">
                        Status: Published
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#808080]">
                        {journal.tanggal}
                    </span>
                </div>
              </div>

              {/* 1. Activity Table */}
              <div className="mb-12">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[var(--color-accent)]"></span>
                  01. Weekly Activity Summary
                </h3>
                <div className="overflow-x-auto border border-white/5 bg-black/20">
                  <table className="w-full text-left text-[11px] font-mono whitespace-nowrap">
                    <thead className="bg-white/5 text-[#808080] uppercase tracking-tighter">
                      <tr>
                        <th className="p-4 border-b border-white/5">Day</th>
                        <th className="p-4 border-b border-white/5">Focus</th>
                        <th className="p-4 border-b border-white/5">Output</th>
                        <th className="p-4 border-b border-white/5 text-center">Dur</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      {journal.aktivitas?.map((act: any) => (
                        <tr key={act.hari} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02]">
                          <td className="p-4 text-white font-bold">{act.hari}</td>
                          <td className="p-4 text-[#808080]">{act.fokus}</td>
                          <td className="p-4 text-[#808080]">{act.output}</td>
                          <td className="p-4 text-center text-[var(--color-accent)]">{act.durasi}h</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                {/* 2. Achievements */}
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[var(--color-accent)]"></span>
                    02. Achievements
                  </h3>
                  <ul className="space-y-4">
                    {journal.capaian?.map((item: string) => (
                      <li key={item} className="flex gap-4 text-[12px] text-[#808080] font-mono leading-relaxed group/item">
                        <span className="text-[var(--color-accent)] group-hover/item:translate-x-1 transition-transform">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Constraints */}
                <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-[var(--color-accent)]"></span>
                        03. Constraints
                    </h3>
                    <div className="space-y-4 font-mono text-[11px] text-[#808080]">
                        <p><span className="text-white uppercase tracking-tighter mr-2">[ACADEMIC]:</span> {journal.kendala?.akademik || "None"}</p>
                        <p><span className="text-white uppercase tracking-tighter mr-2">[TECHNICAL]:</span> {journal.kendala?.teknis || "None"}</p>
                        <p><span className="text-white uppercase tracking-tighter mr-2">[PERSONAL]:</span> {journal.kendala?.pribadi || "None"}</p>
                    </div>
                </div>
              </div>

              {/* 3. Progress Bar - Stylized */}
              <div className="mb-12 p-8 border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.02]">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white mb-6">04. Semester Objectives Progress</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <span className="font-mono text-[10px] text-[#808080] uppercase tracking-widest">Current Completion</span>
                        <span className="font-display font-bold text-2xl text-white">{journal.progress?.persentase || 0}%</span>
                    </div>
                    <div className="relative w-full bg-white/5 h-[2px]">
                        <div 
                            className="absolute top-0 left-0 bg-[var(--color-accent)] h-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,0,0,0.5)]" 
                            style={{ width: `${journal.progress?.persentase || 0}%` }}
                        ></div>
                    </div>
                    <p className="font-mono text-[10px] text-[#808080] italic">Target: {journal.progress?.target || "-"}</p>
                </div>
              </div>

              {/* 5 & 6 Bottom Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-10">
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white mb-6">05. Self Evaluation</h3>
                  <div className="space-y-6 font-mono text-[11px] text-[#808080]">
                    <div>
                        <p className="text-white mb-1 uppercase tracking-tighter underline underline-offset-4 decoration-[var(--color-accent)]/50">Top Success</p>
                        <p>{journal.evaluasi?.terbaik || "-"}</p>
                    </div>
                    <div>
                        <p className="text-white mb-1 uppercase tracking-tighter underline underline-offset-4 decoration-[var(--color-accent)]/50">Critical Error</p>
                        <p>{journal.evaluasi?.kesalahan || "-"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white mb-6">06. Next Step Protocol</h3>
                  <ul className="space-y-3 font-mono text-[11px] text-[#808080]">
                    {journal.rencana?.map((item: string, idx: number) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-[var(--color-accent)]">0{idx + 1}.</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent text-white px-6 md:px-20 pt-32 selection:bg-[var(--color-accent)]/30 font-sans">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-24">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-12"
        >
            <div>
                <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-white uppercase leading-[0.8]">
                    Daily<br />
                    <span className="text-[var(--color-accent)]">Journal</span>.
                </h1>
                <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#808080] mt-8">
                    Academic Activity & Progress Logs / Ichya Ulumiddiin
                </p>
            </div>
            
            <Link 
              to="/" 
              className="group relative inline-flex items-center justify-center bg-transparent border border-white/10 text-[#808080] hover:text-white font-mono text-[10px] font-bold tracking-[0.2em] px-8 py-4 uppercase transition-colors overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                  <ArrowLeft className="w-3 h-3" />
                  Terminal_Home
              </span>
              <div className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-x-100 mix-blend-difference"></div>
            </Link>
        </motion.div>
      </div>

      {content}
      
    </div>
  );
};

// Simple motion wrapper since we can't import complex Reveal here without full setup
const motion = {
    div: ({ children, className, initial, animate }: any) => (
        <div className={className}>{children}</div>
    )
}

export default BlogPage;
